package com.zackmurry.blubo.service;

import com.zackmurry.blubo.dao.book.BookDao;
import com.zackmurry.blubo.exception.BadRequestException;
import com.zackmurry.blubo.exception.BookNotFoundException;
import com.zackmurry.blubo.exception.ForbiddenException;
import com.zackmurry.blubo.exception.InternalServerException;
import com.zackmurry.blubo.model.book.BookEntity;
import com.zackmurry.blubo.model.user.UserEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BookService {

    private static final Logger logger = LoggerFactory.getLogger(BookService.class);

    @Autowired
    private BookDao bookDao;

    @Autowired
    private UserService userService;

    @Value("${app.upload.dir:${user.home}/.blubo}")
    private String uploadDirectory;

    @PostConstruct
    private void init() {
        File f = new File(uploadDirectory);
        if (!f.exists()) {
            logger.info("Upload directory {} not found. Creating...", f.getAbsolutePath());
            if (!f.mkdirs()) {
                logger.warn("Failed to create upload directory. Expect problems.");
            }
        }
    }

    private Path resolvePathFromBookId(UUID id) {
        return Paths.get(uploadDirectory + File.separator + StringUtils.cleanPath(id.toString()) + ".pdf");
    }

    public UUID createBook(@NonNull MultipartFile file) {
        if (file.getOriginalFilename() == null || !file.getOriginalFilename().endsWith(".pdf")) {
            throw new BadRequestException();
        }

        final UUID userId = ((UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        // using a temporary title for the book. the user will be prompted to enter a title
        final BookEntity bookEntity = new BookEntity(userId, file.getOriginalFilename());
        final UUID bookId = bookDao.createBook(bookEntity);
        try {
            Path copyLocation = resolvePathFromBookId(bookId);
            if (copyLocation.toFile().exists()) {
                logger.warn("UUID of book non-unique! Tried to create a file with the name of an existing file");
                throw new InternalServerException();
            }
            Files.copy(file.getInputStream(), copyLocation, StandardCopyOption.REPLACE_EXISTING);
            return bookId;
        } catch (IOException e) {
            e.printStackTrace();
            throw new InternalServerException();
        }
    }

    public List<BookEntity> getBooksByUser(@NonNull UUID userId, int limit) {
        List<BookEntity> bookEntities = bookDao.getBooksByUser(userId);
        if (limit < 0) {
            return bookEntities;
        }
        return bookEntities.stream().limit(limit).collect(Collectors.toList());
    }

    public List<BookEntity> getBooksByUser(@NonNull UUID userId) {
        return getBooksByUser(userId, -1);
    }

    public byte[] getRawBook(@NonNull UUID id) {
        final UUID userId = ((UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        final BookEntity bookEntity = bookDao.getBook(id).orElse(null);
        if (bookEntity == null) {
            throw new BookNotFoundException();
        }
        if (!bookEntity.getOwnerId().equals(userId)) {
            throw new ForbiddenException();
        }
        Path bookPath = resolvePathFromBookId(id);
        byte[] rawContent;
        try {
            rawContent = Files.readAllBytes(bookPath);
        } catch (IOException e) {
            e.printStackTrace();
            throw new BadRequestException();
        }

        bookDao.updateLastOpened(id);
        return rawContent;
    }

    public BookEntity getBookDetails(@NonNull UUID id) {
        final BookEntity bookEntity = bookDao.getBook(id).orElse(null);
        if (bookEntity == null) {
            throw new BookNotFoundException();
        }
        final UUID userId = ((UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        if (!userId.equals(bookEntity.getOwnerId())) {
            throw new ForbiddenException();
        }
        return bookEntity;
    }

    public void setBookPage(@NonNull UUID id, int page) {
        final UserEntity principal = (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        final UUID userId = principal.getId();
        final BookEntity bookEntity = bookDao.getBook(id).orElse(null);
        if (bookEntity == null) {
            throw new BookNotFoundException();
        }
        if (!userId.equals(bookEntity.getOwnerId())) {
            throw new ForbiddenException();
        }
        if (page < 1) {
            throw new BadRequestException();
        }

        // updating pages_read field in users
        final int numNewPagesRead = page - bookEntity.getPageNumber(); // can be negative for good reasons
        userService.addNewPages(userId, numNewPagesRead);

        bookDao.updateLastOpened(id);

        bookDao.setBookPage(id, page);
    }

    public void updateBook(@NonNull UUID id, @NonNull String title, @NonNull String author) {
        final UUID userId = ((UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        final BookEntity bookEntity = bookDao.getBook(id).orElse(null);
        if (bookEntity == null) {
            throw new BookNotFoundException();
        }
        if (!userId.equals(bookEntity.getOwnerId())) {
            throw new ForbiddenException();
        }
        if (title.equals("")) {
            title = bookEntity.getTitle();
        }
        bookDao.updateBook(id, title, author);
    }
}

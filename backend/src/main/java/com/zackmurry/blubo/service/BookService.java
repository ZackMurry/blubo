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

@Service
public class BookService {

    private static final Logger logger = LoggerFactory.getLogger(BookService.class);

    @Autowired
    private BookDao bookDao;

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

    public void createBook(@NonNull MultipartFile file) {
        if (file.getOriginalFilename() == null) {
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
        } catch (IOException e) {
            e.printStackTrace();
            throw new InternalServerException();
        }
    }

    public List<BookEntity> getBooksByUser(@NonNull UUID userId) {
        return bookDao.getBooksByUser(userId);
//        for (BookEntity bookEntity : bookEntities) {
//            Path bookLocation = resolvePathFromBookId(bookEntity.getId());
//            if (!bookLocation.toFile().exists()) {
//                logger.warn("Book in database but no file found! Id: {}", bookEntity.getId().toString());
//                // delete book from database so that this doesn't happen again
//                if (bookDao.deleteBook(bookEntity.getId()) != 1) {
//                    logger.warn("Book found in database, file not found, then not found in database when deleting. Bruh. Id: {}", bookEntity.getId());
//                    throw new InternalServerException();
//                }
//            }
//
//        }
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
}

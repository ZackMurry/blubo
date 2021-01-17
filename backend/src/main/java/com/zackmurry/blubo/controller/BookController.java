package com.zackmurry.blubo.controller;

import com.zackmurry.blubo.model.book.BookCreateResponse;
import com.zackmurry.blubo.model.book.UpdateBookRequest;
import com.zackmurry.blubo.model.book.UpdatePageRequest;
import com.zackmurry.blubo.exception.BadRequestException;
import com.zackmurry.blubo.model.book.BookEntity;
import com.zackmurry.blubo.model.user.UserEntity;
import com.zackmurry.blubo.service.BookService;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RequestMapping("/api/v1/books")
@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    @PostMapping("")
    public BookCreateResponse createBook(@RequestParam("file") MultipartFile file) {
        return new BookCreateResponse(bookService.createBook(file));
    }

    @GetMapping("")
    public List<BookEntity> getBooksByUser(@RequestParam(required = false) Integer limit) {
        if (limit == null) {
            limit = -1;
        }
        final UUID userId = ((UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return bookService.getBooksByUser(userId, limit);
    }

    @GetMapping("/{id}/raw")
    public String getRawBook(@PathVariable String id) {
        final UUID bookId = UUID.fromString(id);
        byte[] contents = bookService.getRawBook(bookId);
        return "data:application/pdf;base64," + Base64.encodeBase64String(contents);
    }

    @GetMapping("/{id}")
    public BookEntity getBookDetails(@PathVariable String id) {
        final UUID bookId = UUID.fromString(id);
        return bookService.getBookDetails(bookId);
    }

    @PutMapping("/{id}/page")
    public void setBookPage(@PathVariable String id, @RequestBody @NonNull UpdatePageRequest request) {
        if (request.getPage() == null) {
            throw new BadRequestException();
        }
        final UUID bookId = UUID.fromString(id);
        bookService.setBookPage(bookId, request.getPage());
    }

    @PutMapping("/{id}")
    public void updateBook(@PathVariable String id, @RequestBody @NonNull UpdateBookRequest request) {
        final UUID bookId = UUID.fromString(id);
        bookService.updateBook(bookId, request.getTitle(), request.getAuthor());
    }

}

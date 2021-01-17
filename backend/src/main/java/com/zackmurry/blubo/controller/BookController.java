package com.zackmurry.blubo.controller;

import com.zackmurry.blubo.model.book.BookEntity;
import com.zackmurry.blubo.model.user.UserEntity;
import com.zackmurry.blubo.service.BookService;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Locale;
import java.util.UUID;

@RequestMapping("/api/v1/books")
@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    @PostMapping("")
    public void createBook(@RequestParam("file") MultipartFile file) {
        bookService.createBook(file);
    }

    // todo add limit param
    @GetMapping("")
    public List<BookEntity> getBooksByUser() {
        final UUID userId = ((UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return bookService.getBooksByUser(userId);
    }

    @GetMapping("/{id}/raw")
    public String getRawBook(@PathVariable String id) {
        final UUID bookId = UUID.fromString(id);
        byte[] contents = bookService.getRawBook(bookId);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        final String fileName = id + ".pdf";
        headers.setContentDispositionFormData(fileName, fileName);
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
        return "data:application/pdf;base64," + Base64.encodeBase64String(contents);
    }

    @GetMapping("/{id}")
    public BookEntity getBookDetails(@PathVariable String id) {
        final UUID bookId = UUID.fromString(id);
        return bookService.getBookDetails(bookId);
    }

}

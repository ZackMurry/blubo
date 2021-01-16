package com.zackmurry.blubo.controller;

import com.zackmurry.blubo.model.book.BookEntity;
import com.zackmurry.blubo.model.user.UserEntity;
import com.zackmurry.blubo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public void createBook(@RequestParam("file") MultipartFile file) {
        bookService.createBook(file);
    }

    // todo add limit param
    @GetMapping("")
    public List<BookEntity> getBooksByUser() {
        final UUID userId = ((UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return bookService.getBooksByUser(userId);
    }

}

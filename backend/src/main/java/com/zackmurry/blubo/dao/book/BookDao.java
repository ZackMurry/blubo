package com.zackmurry.blubo.dao.book;

import com.zackmurry.blubo.model.book.BookEntity;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BookDao {

    UUID createBook(BookEntity bookEntity);

    Optional<BookEntity> getBook(UUID ownerId, String title);

    Optional<BookEntity> getBook(UUID id);

    List<BookEntity> getBooksByUser(UUID ownerId);

    int deleteBook(UUID id);

}

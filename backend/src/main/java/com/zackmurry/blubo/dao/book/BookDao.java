package com.zackmurry.blubo.dao.book;

import com.zackmurry.blubo.model.book.BookEntity;

import java.util.Optional;
import java.util.UUID;

public interface BookDao {

    UUID createBook(BookEntity bookEntity);

    Optional<BookEntity> getBook(UUID ownerId, String title);

}

package com.zackmurry.blubo.model.book;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookEntity {

    private UUID id;
    private UUID ownerId;
    private String title;
    private String author;
    private Integer pageNumber;
    private Timestamp lastOpened;

    public BookEntity(UUID ownerId, String title) {
        this.ownerId = ownerId;
        this.title = title;
    }

}

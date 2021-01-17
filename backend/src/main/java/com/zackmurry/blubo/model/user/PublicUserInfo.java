package com.zackmurry.blubo.model.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PublicUserInfo {

    private UUID id;
    private String firstName;
    private String lastName;
    private Integer pagesRead;

    public static PublicUserInfo of(UserEntity userEntity) {
        return new PublicUserInfo(
                userEntity.getId(),
                userEntity.getFirstName(),
                userEntity.getLastName(),
                userEntity.getPagesRead()
        );
    }

}

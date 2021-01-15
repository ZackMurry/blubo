package com.zackmurry.blubo.model.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccountCreateRequest {

    private String email;
    private String firstName;
    private String lastName;
    private String password;

    public UserEntity toUserEntity() {
        return new UserEntity(
                email,
                firstName,
                lastName,
                password
        );
    }

}

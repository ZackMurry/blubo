package com.zackmurry.blubo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserNotFoundException extends Exception {

    public UserNotFoundException() {
        super("Username not found");
    }

    public UserNotFoundException(String name) {
        super("Username not found: " + name);
    }

}

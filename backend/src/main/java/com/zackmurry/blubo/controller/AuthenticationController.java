package com.zackmurry.blubo.controller;

import com.zackmurry.blubo.model.auth.AuthenticationRequest;
import com.zackmurry.blubo.model.auth.AuthenticationResponse;
import com.zackmurry.blubo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/v1/auth")
@RestController
public class AuthenticationController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public AuthenticationResponse authenticateUser(@NonNull @RequestBody AuthenticationRequest request) {
        final String jwt = userService.createAuthenticationToken(request);
        return new AuthenticationResponse(jwt);
    }

}

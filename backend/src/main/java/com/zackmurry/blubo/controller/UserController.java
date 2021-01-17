package com.zackmurry.blubo.controller;

import com.zackmurry.blubo.model.auth.AuthenticationResponse;
import com.zackmurry.blubo.model.user.AccountCreateRequest;
import com.zackmurry.blubo.model.user.PublicUserInfo;
import com.zackmurry.blubo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/users")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("")
    public AuthenticationResponse createAccount(@NonNull @RequestBody AccountCreateRequest request) {
        return userService.createAccount(request);
    }

    @GetMapping("/leaderboard")
    public List<PublicUserInfo> getTopUsers(@RequestParam int limit) {
        return userService.getTopUsers(limit);
    }

}

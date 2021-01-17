package com.zackmurry.blubo.controller;

import com.zackmurry.blubo.exception.BadRequestException;
import com.zackmurry.blubo.model.follow.UserIdHolder;
import com.zackmurry.blubo.model.user.UserEntity;
import com.zackmurry.blubo.service.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequestMapping("/api/v1/follows")
@RestController
public class FollowController {

    @Autowired
    private FollowService followService;

    @PostMapping("")
    public void followUser(@NonNull @RequestBody UserIdHolder request) {
        if (request.getId() == null) {
            throw new BadRequestException();
        }
        final UUID userId = ((UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        followService.followUser(userId, request.getId());
    }

    @GetMapping("")
    public List<UserEntity> getFollowing() {
        final UUID id = ((UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return followService.getFollowingByUser(id);
    }

    @DeleteMapping("/{id}")
    public void unfollowUser(@PathVariable String id) {
        final UUID userId = ((UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        final UUID followedId = UUID.fromString(id);
        followService.unfollowUser(userId, followedId);
    }

}

package com.zackmurry.blubo.service;

import com.zackmurry.blubo.dao.follow.FollowDao;
import com.zackmurry.blubo.exception.UserNotFoundException;
import com.zackmurry.blubo.model.user.PublicUserInfo;
import com.zackmurry.blubo.model.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class FollowService {

    @Autowired
    private FollowDao followDao;

    @Autowired
    private UserService userService;

    public List<PublicUserInfo> getFollowingByUser(@NonNull UUID followerId) {
        List<UUID> followingIds = followDao.getFollowing(followerId);
        List<UserEntity> users = userService.getUsersByIds(followingIds);
        // sort by pages read
        // todo this might be backwards idk
        users.sort((a, b) -> b.getPagesRead().compareTo(a.getPagesRead()));

        // inserting principal
        final UserEntity principal = (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        boolean added = false;
        for (int i = 0; i < users.size(); i++) {
            if (users.get(i).getPagesReadInWeek() <= principal.getPagesReadInWeek()) {
                users.add(i, principal);
                added = true;
                break;
            }
        }
        if (!added) {
            users.add(principal);
        }
        return users.stream().map(PublicUserInfo::of).collect(Collectors.toList());
    }

    public void followUser(@NonNull UUID followerId, @NonNull String followedEmail) throws UserNotFoundException {
        final UUID followedId = userService.getIdByEmail(followedEmail).orElse(null);
        if (followedId == null) {
            throw new UserNotFoundException();
        }
        followDao.followUser(followerId, followedId);
    }

    public void unfollowUser(@NonNull UUID followerId, @NonNull UUID followedId) {
        followDao.unfollowUser(followerId, followedId);
    }

}

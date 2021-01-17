package com.zackmurry.blubo.service;

import com.zackmurry.blubo.dao.follow.FollowDao;
import com.zackmurry.blubo.model.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class FollowService {

    @Autowired
    private FollowDao followDao;

    @Autowired
    private UserService userService;

    public List<UserEntity> getFollowingByUser(@NonNull UUID followerId) {
        List<UUID> followingIds = followDao.getFollowing(followerId);
        List<UserEntity> users = userService.getUsersByIds(followingIds);
        users.forEach(userEntity -> userEntity.setHash(null));
        return users;
    }

    public void followUser(@NonNull UUID followerId, @NonNull UUID followedId) {
        followDao.followUser(followerId, followedId);
    }

    public void unfollowUser(@NonNull UUID followerId, @NonNull UUID followedId) {
        followDao.unfollowUser(followerId, followedId);
    }

}

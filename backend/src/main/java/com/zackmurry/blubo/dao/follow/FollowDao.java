package com.zackmurry.blubo.dao.follow;


import java.util.List;
import java.util.UUID;

public interface FollowDao {

    void followUser(UUID followerId, UUID followedId);

    void unfollowUser(UUID followerId, UUID followedId);

    List<UUID> getFollowing(UUID followerId);

}

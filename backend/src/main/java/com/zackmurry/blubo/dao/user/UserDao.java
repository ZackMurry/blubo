package com.zackmurry.blubo.dao.user;

import com.zackmurry.blubo.model.user.UserEntity;

import java.util.Optional;

public interface UserDao {

    Optional<UserEntity> findByEmail(String email);

    void create(UserEntity userEntity);

}

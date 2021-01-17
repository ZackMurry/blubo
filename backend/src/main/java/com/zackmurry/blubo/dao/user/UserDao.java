package com.zackmurry.blubo.dao.user;

import com.zackmurry.blubo.model.user.UserEntity;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserDao {

    Optional<UserEntity> findByEmail(String email);

    void create(UserEntity userEntity);

    List<UserEntity> findByIds(List<UUID> ids);

}

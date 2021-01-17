package com.zackmurry.blubo.dao.user;

import com.zackmurry.blubo.exception.InternalServerException;
import com.zackmurry.blubo.model.user.UserEntity;
import org.flywaydb.core.internal.jdbc.JdbcTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

@Repository
public class UserDataAccessService implements UserDao {

    private static final Logger logger = LoggerFactory.getLogger(UserDataAccessService.class);

    private final JdbcTemplate jdbcTemplate;

    public UserDataAccessService(DataSource dataSource) throws SQLException {
        this.jdbcTemplate = new JdbcTemplate(dataSource.getConnection());
    }

    @Override
    public Optional<UserEntity> findByEmail(String email) {
        String sql = "SELECT id, first_name, last_name, hash, pages_read, pages_read_in_week FROM users WHERE email = ?";
        try {
            List<UserEntity> userEntityList = jdbcTemplate.query(
                    sql,
                    resultSet -> new UserEntity(
                            UUID.fromString(resultSet.getString("id")),
                            email,
                            resultSet.getString("first_name"),
                            resultSet.getString("last_name"),
                            resultSet.getString("hash"),
                            resultSet.getInt("pages_read"),
                            resultSet.getInt("pages_read_in_week")
                    ),
                    email
            );
            if (userEntityList.isEmpty()) {
                return Optional.empty();
            }
            return Optional.of(userEntityList.get(0));
        } catch (SQLException e) {
            e.printStackTrace();
            throw new InternalServerException();
        }
    }

    @Override
    public void create(UserEntity userEntity) {
        String sql = "INSERT INTO users (email, first_name, last_name, hash) VALUES (?, ?, ?, ?)";
        try {
            final String[] returnId = new String[] { "id" };
            PreparedStatement preparedStatement = jdbcTemplate.getConnection().prepareStatement(sql, returnId);
            preparedStatement.setString(1, userEntity.getEmail());
            preparedStatement.setString(2, userEntity.getFirstName());
            preparedStatement.setString(3, userEntity.getLastName());
            preparedStatement.setString(4, userEntity.getHash());
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            throw new InternalServerException();
        }
    }

    @Override
    public List<UserEntity> findByIds(@NonNull List<UUID> ids) {
        if (ids.size() == 0) {
            return new ArrayList<>();
        }
        final String questionMarks = String.join(",", Collections.nCopies(ids.size(), "?"));
        final String sql = String.format("SELECT id, email, first_name, last_name, hash, pages_read, pages_read_in_week FROM users WHERE id IN (%s)", questionMarks);
        try {
            PreparedStatement preparedStatement = jdbcTemplate.getConnection().prepareStatement(sql);
            for (int i = 0; i < ids.size(); i++) {
                preparedStatement.setObject(i + 1, ids.get(i));
            }
            ResultSet resultSet = preparedStatement.executeQuery();
            List<UserEntity> users = new ArrayList<>();
            while (resultSet.next()) {
                users.add(
                        new UserEntity(
                                UUID.fromString(resultSet.getString("id")),
                                resultSet.getString("email"),
                                resultSet.getString("first_name"),
                                resultSet.getString("last_name"),
                                resultSet.getString("hash"),
                                resultSet.getInt("pages_read"),
                                resultSet.getInt("pages_read_in_week")
                        )
                );
            }
            return users;
        } catch (SQLException e) {
            e.printStackTrace();
            throw new InternalServerException();
        }
    }

    @Override
    public void updatePagesRead(UUID userId, int pagesRead, int pagesReadInWeek) {
        final String sql = "UPDATE users SET pages_read = ?, pages_read_in_week = ? WHERE id = ?";
        try {
            PreparedStatement preparedStatement = jdbcTemplate.getConnection().prepareStatement(sql);
            preparedStatement.setInt(1, pagesRead);
            preparedStatement.setInt(2, pagesReadInWeek);
            preparedStatement.setObject(3, userId);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            throw new InternalServerException();
        }
    }

    @Override
    public List<UserEntity> getUsersSortedByPages(int limit) {
        final String sql = "SELECT id, email, first_name, last_name, hash, pages_read, pages_read_in_week FROM users ORDER BY pages_read DESC LIMIT ?";
        try {
            PreparedStatement preparedStatement = jdbcTemplate.getConnection().prepareStatement(sql);
            preparedStatement.setInt(1, limit);
            ResultSet resultSet = preparedStatement.executeQuery();
            List<UserEntity> userEntities = new ArrayList<>();
            while (resultSet.next()) {
                userEntities.add(
                        new UserEntity(
                                UUID.fromString(resultSet.getString("id")),
                                resultSet.getString("email"),
                                resultSet.getString("first_name"),
                                resultSet.getString("last_name"),
                                resultSet.getString("hash"),
                                resultSet.getInt("pages_read"),
                                resultSet.getInt("pages_read_in_week")
                        )
                );
            }
            return userEntities;
        } catch (SQLException e) {
            e.printStackTrace();
            throw new InternalServerException();
        }
    }

    @Override
    public void resetWeeklyLeaderboard() {
        final String sql = "UPDATE users SET pages_read_in_week = 0";
        try {
            jdbcTemplate.execute(sql);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new InternalServerException();
        }
    }

}

package com.zackmurry.blubo.dao.follow;

import com.zackmurry.blubo.exception.InternalServerException;
import org.flywaydb.core.internal.jdbc.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Repository
public class FollowDataAccessService implements FollowDao {

    private final JdbcTemplate jdbcTemplate;

    public FollowDataAccessService(DataSource dataSource) throws SQLException {
        this.jdbcTemplate = new JdbcTemplate(dataSource.getConnection());
    }
    @Override
    public void followUser(UUID followerId, UUID followedId) {
        final String sql = "INSERT INTO follows (follower_id, followed_id) VALUES (?, ?)";
        try {
            PreparedStatement preparedStatement = jdbcTemplate.getConnection().prepareStatement(sql);
            preparedStatement.setObject(1, followedId);
            preparedStatement.setObject(2, followedId);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            throw new InternalServerException();
        }
    }

    @Override
    public void unfollowUser(UUID followerId, UUID followedId) {
        final String sql = "DELETE FROM follows WHERE follower_id = ? AND followed_id = ?";
        try {
            PreparedStatement preparedStatement = jdbcTemplate.getConnection().prepareStatement(sql);
            preparedStatement.setObject(1, followerId);
            preparedStatement.setObject(2, followedId);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            throw new InternalServerException();
        }
    }

    @Override
    public List<UUID> getFollowing(UUID followerId) {
        final String sql = "SELECT followed_id FROM follows WHERE follower_id = ?";
        try {
            PreparedStatement preparedStatement = jdbcTemplate.getConnection().prepareStatement(sql);
            preparedStatement.setObject(1, followerId);
            ResultSet resultSet = preparedStatement.executeQuery();
            List<UUID> ids = new ArrayList<>();
            while (resultSet.next()) {
                ids.add(UUID.fromString(resultSet.getString("followed_id")));
            }
            return ids;
        } catch (SQLException e) {
            e.printStackTrace();
            throw new InternalServerException();
        }
    }
}

package com.zackmurry.blubo.dao.book;

import com.zackmurry.blubo.exception.BadRequestException;
import com.zackmurry.blubo.exception.InternalServerException;
import com.zackmurry.blubo.model.book.BookEntity;
import org.flywaydb.core.internal.jdbc.JdbcTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;
import java.util.UUID;

@Repository
public class BookDataAccessService implements BookDao {

    private static final Logger logger = LoggerFactory.getLogger(BookDataAccessService.class);

    private final JdbcTemplate jdbcTemplate;

    public BookDataAccessService(DataSource dataSource) throws SQLException {
        this.jdbcTemplate = new JdbcTemplate(dataSource.getConnection());
    }

    @Override
    public UUID createBook(@NonNull BookEntity bookEntity) {
        if (bookEntity.getOwnerId() == null || bookEntity.getTitle() == null) {
            logger.warn("A book entity with a null ownerId or title was passed to the DAO layer");
            throw new BadRequestException();
        }
        final String sql = "INSERT INTO books (owner_id, title) VALUES (?, ?)";
        try {
            String[] returnFields = new String[]{ "id" };
            PreparedStatement preparedStatement = jdbcTemplate.getConnection().prepareStatement(sql, returnFields);
            preparedStatement.setObject(1, bookEntity.getId());
            preparedStatement.setString(2, bookEntity.getTitle());
            int rowsAffected = preparedStatement.executeUpdate();
            if (rowsAffected != 1) {
                logger.warn("Rows changed an insert statement was not equal to 1. Rows affected: {}", rowsAffected);
                throw new InternalServerException();
            }
            ResultSet resultSet = preparedStatement.getResultSet();
            if (resultSet.next()) {
                return UUID.fromString(resultSet.getString("id"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        throw new InternalServerException();
    }

    @Override
    public Optional<BookEntity> getBook(@NonNull UUID ownerId, @NonNull String title) {
        final String sql = "SELECT id FROM books WHERE owner_id = ? AND title = ?";
        try {
            PreparedStatement preparedStatement = jdbcTemplate.getConnection().prepareStatement(sql);
            preparedStatement.setObject(1, ownerId);
            preparedStatement.setString(2, title);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                return Optional.of(
                        new BookEntity(
                            UUID.fromString(resultSet.getString("id")),
                            ownerId,
                            title
                    )
                );
            }
            return Optional.empty();
        } catch (SQLException e) {
            e.printStackTrace();
            throw new InternalServerException();
        }
    }
}

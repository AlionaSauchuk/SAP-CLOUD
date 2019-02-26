package com.leverx.leverxspringdemo.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.leverx.leverxspringdemo.dao.intfce.IBookDao;
import com.leverx.leverxspringdemo.domain.Book;

@Repository
public class BookDao implements IBookDao {

	private static final Logger logger = LoggerFactory.getLogger(BookDao.class);

	@Autowired
	private DataSource dataSource;

	@Override
	public Optional<Book> getById(Long id) {
		Optional<Book> entity = null;
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"SELECT TOP 1 \"bid\", \"authid\", \"caption\" FROM \"javaSAM::Book\" WHERE \"bid\" = ?")) {
			stmnt.setLong(1, id);
			ResultSet result = stmnt.executeQuery();
			if (result.next()) {
				Book book = new Book();
				book.setId(id);
				book.setAuthid(result.getInt("authid"));
				book.setCaption(result.getString("caption"));
				
				entity = Optional.of(book);
			} else {
				entity = Optional.empty();
			}
		} catch (SQLException e) {
			logger.error("Error while trying to get entity by Id: " + e.getMessage());
		}
		return entity;
	}

	@Override
	public List<Book> getAll() {
		List<Book> bookList = new ArrayList<Book>();
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn
						.prepareStatement("SELECT \"bid\", \"authid\", \"caption\" FROM \"javaSAM::Book\"")) {
			ResultSet result = stmnt.executeQuery();
			while (result.next()) {
				Book book = new Book();
				book.setId(result.getLong("bid"));
				book.setAuthid(result.getInt("authid"));
				book.setCaption(result.getString("caption"));
				bookList.add(book);
			}
		} catch (SQLException e) {
			logger.error("Error while trying to get list of entities: " + e.getMessage());
		}
		return bookList;
	}

	@Override
	public void save(Book entity) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"INSERT INTO \"javaSAM::Book\"(\"authid\", \"caption\") VALUES (?, ?)")) {
			stmnt.setInt(1, entity.getAuthid());
			stmnt.setString(2, entity.getCaption());
			stmnt.execute();
		} catch (SQLException e) {
			logger.error("Error while trying to add entity: " + e.getMessage());
		}
	}

	@Override
	public void delete(Long id) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement("DELETE FROM \"javaSAM::Book\" WHERE \"bid\" = ?")) {
			stmnt.setLong(1, id);
			stmnt.execute();
		} catch (SQLException e) {
			logger.error("Error while trying to delete entity: " + e.getMessage());
		}
	}

	@Override
	public void update(Book entity) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"UPDATE \"javaSAM::Book\" SET \"authid\" = ?, \"caption\" = ? WHERE \"bid\" = ?")) {
			stmnt.setInt(1, entity.getAuthid());
			stmnt.setString(2, entity.getCaption());
			stmnt.setLong(3, entity.getId());
			stmnt.executeUpdate();
		} catch (SQLException e) {
			logger.error("Error while trying to update entity: " + e.getMessage());
		}
	}

}

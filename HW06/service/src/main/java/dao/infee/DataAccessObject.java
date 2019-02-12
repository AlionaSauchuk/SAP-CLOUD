public interface DataAccessObject<T, K> {
	public Optional<T> getById(K id);
	public List<T> getAll();
	public void save(T entity) throws SQLException;
	public void delete(K id);
	public void update(T entity);
}
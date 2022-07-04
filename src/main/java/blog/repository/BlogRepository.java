package blog.repository;

import blog.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
    @Query(value = "select b.content, b.description, u.username\n" +
            "from user u join blog b on u.id = b.user_id\n" +
            "where lower(u.username) like(concat('%', lower(:username), '%'));", nativeQuery = true)
    Iterable<Blog> findByUser(@Param("username") String username);
}

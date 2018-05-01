package ee.ttu.tarkvaratehnika.task;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {
    public List<Task> findByCompleted(boolean completed);
    
    @Query("SELECT t FROM Task t WHERE t.completed = :c AND (t.title LIKE :s OR t.description LIKE :s)")
    public List<Task> findByCompletedAndSearchString(@Param("c") boolean completed, @Param("s") String searchString);
}

package ee.ttu.tarkvaratehnika.task;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {
    public List<Task> findByCompleted(boolean completed);
}

package ee.ttu.tarkvaratehnika.task;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    Task addTask(Task task) {
        return taskRepository.save(task);
    }

    Task updateTask(long taskId, Task task) {
        task.setId(taskId);
        return taskRepository.save(task);
    }

    List<Task> getTasksByCompletedAndSearchString(boolean completed, String searchString) {
    	if (searchString == null || searchString.isEmpty()) {
    		return taskRepository.findByCompleted(completed);
    	}
        return taskRepository.findByCompletedAndSearchString(completed, "%" + searchString + "%");
    }

    Task getTaskById(long taskId) {
        return taskRepository.findOne(taskId);
    }

    boolean login(String username, String password){
        return false;
    }

    boolean register(String username, String password){
        return false;
    }
}

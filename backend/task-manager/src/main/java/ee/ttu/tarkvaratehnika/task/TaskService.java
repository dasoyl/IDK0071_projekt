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

    List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    Task getTaskById(long taskId) {
        return taskRepository.findOne(taskId);
    }
}

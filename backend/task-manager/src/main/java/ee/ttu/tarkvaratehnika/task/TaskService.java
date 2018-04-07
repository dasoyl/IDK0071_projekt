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

//    List<Task> getAllTasks() {
//        return taskRepository.findAll();
//    }
    
    List<Task> getTasksByCompleted(boolean completed) {
        return taskRepository.findByCompleted(completed);
    }

    Task getTaskById(long taskId) {
        return taskRepository.findOne(taskId);
    }
}

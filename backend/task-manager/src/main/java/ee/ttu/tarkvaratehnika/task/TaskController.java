package ee.ttu.tarkvaratehnika.task;

import org.springframework.web.bind.annotation.*;

// import javax.servlet.http.HttpServletRequest;
// import javax.servlet.http.HttpServletResponse;
// import javax.servlet.ServletException;
// import java.io.IOException;


import java.util.List;

@RestController
public class TaskController {

    private TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @RequestMapping(value="/tasks/add", method=RequestMethod.POST, consumes="application/json")
    public Task addTask(@RequestBody Task task) {
        return taskService.addTask(task);
    }

    @RequestMapping(value="/tasks", method=RequestMethod.GET)
    public List<Task> getAllTasks(@RequestParam("completed") boolean completed,@RequestParam(value = "search", required = false) String searchString ) {
        return taskService.getTasksByCompletedAndSearchString(completed, searchString);
    }

    @RequestMapping(value="/tasks/{id}", method=RequestMethod.GET)
    public Task getTask(@PathVariable("id") long taskId) {
        return taskService.getTaskById(taskId);
    }

    @RequestMapping(value="/tasks/{id}", method=RequestMethod.POST)
    public Task getTask(@PathVariable("id") long taskId, @RequestBody Task task) {
        return taskService.updateTask(taskId, task);
    }

    @RequestMapping(value = "/callback", method = RequestMethod.GET)
    protected String getCallback() {
      int a = 5;
      return "ok";
    }
}

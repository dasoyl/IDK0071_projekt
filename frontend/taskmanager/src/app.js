export class App {
  constructor() {
      this.userName = "TEST_USER";
  }

  configureRouter(config, router){
        config.title = 'Tasks';
        config.map([
          { route: '',              moduleId: 'home',   title: 'Home', nav:true},
          { route: 'tasks/',  moduleId: 'tasks', title: 'Tasks', nav:true},
          { route: 'tasks/:id', moduleId: 'task-detail', title: 'Task'},
          { route: 'tasks/add', moduleId: 'add-task', title: 'Add Task'}
        ]);

        this.router = router;
      }
}

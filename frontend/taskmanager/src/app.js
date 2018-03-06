export class App {
  constructor() {
      this.userName = "TEST_USER";
  }

  configureRouter(config, router){
        config.title = 'Tasks';
        config.map([
          { route: '',              moduleId: 'home',   title: 'Home', nav:true},
          { route: 'tasks',  moduleId: 'tasks/tasks', title: 'Tasks', nav:true}
        ]);

        this.router = router;
      }
}

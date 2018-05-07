import { PLATFORM } from 'aurelia-pal';
import {inject} from 'aurelia-framework';
import {AuthService} from './auth-service';

@inject(AuthService)
export class App {
  constructor(AuthService) {
      // this.userName = "TEST_USER";
      this.auth = AuthService;
      this.authenticated = this.auth.isAuthenticated();
      this.auth.authNotifier.on('authChange', authState => {
        this.authenticated = authState.authenticated;
      });
  }

  login(){
    this.auth.login();
  }

  logout(){
    this.auth.logout();
  }

  updateUsername(){
    this.username = this.auth.username;
  }

  configureRouter(config, router){
        config.options.pushState = true;
        config.title = 'Tasks';
        config.map([
          { route: 'callback',       moduleId: 'callback',   title: 'Callback', nav:false},
          { route: '',               moduleId: 'home',   title: 'Home', nav:true},
          { route: 'tasks',          moduleId: 'tasks/tasks', title: 'Tasks', nav:true},
          { route: 'viewtasks',      moduleId: 'tasks/viewtasks', title: 'View Tasks', nav:true},
          { route: 'completedtasks', moduleId: 'tasks/completedtasks', title: 'Completed Tasks', nav:true}
       ]);

        this.router = router;
      }
}

export class App {

    configureRouter(config, router) {
        this.router = router; 
 
        config.title = "Spring Boot with Aurelia";
        
        config.map([
            { route: "", name: 'home', moduleId: "tasks/add", title:"Tasks", nav:true},
            { route: "tasks/:id", name:"details", moduleId: "tasks/tasks"},
            { route: "tasks/add/:id", name:"add", moduleId: "tasks/add" },
            { route: "create", name:"create", moduleId:"tasks/add" }
        ]);
    }
}
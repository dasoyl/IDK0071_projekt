import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";

let baseUrl = "http://localhost:8080/tasks";
let parse = message => JSON.parse(message.response);

@inject(HttpClient)
export class TaskData {
    
    constructor(client) {
		this.http = client;
        this.http.configure(c => {
            c.withBaseUrl(baseUrl);
            c.withHeader("Accept", "application/json");
            c.withHeader("Content-Type", "application/json");
        });
		this.tasks = {};
    }

    getById(id) {
        return this.tasks[id];
    }

    getAll() {
        return this.tasks;
    }
	
	getDetails(task){
		details = {};
		details['title'] = task.title;
		details['description'] = task.description;
		details['author'] = task.author;
		return details;
	}


    save(task) {
        if(task.id) {
			this.tasks[task.id] = task;
            return this.http.post('', task).then(parse);                          
        }
        return this.http.post('', task).then(parse);
    }

    remove(id){
		this.tasks.splice(id, 1);
        return this.http.delete(id);
    }

}
import {inject} from 'aurelia-framework';
import {TaskData} from './taskData';
import {Router} from 'aurelia-router'

@inject(TaskData, Router)
export class List {

    constructor(data, router) {
        this.data = data;
        this.router = router;
    }


    activate(params) {    		
       	return this.data.getAll()
                   .then(tasks => this.tasks = task);	
    }
	
	loadAll(){
    	return this.data.getAll()
                   .then(tasks => this.tasks = task);	
    }
	

	
	delete(id) {
		var confirmed = confirm("Are you sure?");
		if (confirmed) {
			this.data.remove(id)
			return this.loadAll();
		}
	}
}
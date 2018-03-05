import {inject} from 'aurelia-framework';
import {TaskData} from './taskData';

@inject(TaskData)
export class Tasks {

    constructor(data) {
        this.data = data;
        this.details = {};
    }

    activate(params) {
        return this.data.getById(params.id).then(task => this.task = task);
    }

    loadDetails() {
    	return this.data.getDetails(this.task)
    				   .then(details => this.details = details);
    }
}
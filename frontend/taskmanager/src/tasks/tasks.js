import {HttpClient, json} from 'aurelia-fetch-client'

export class Tasks{

	taskData = {}
	addedTaskData = null;

	constructor() {}

	activate() {
//		let client = new HttpClient();
//
//		client.fetch('http://localhost:8080/tasks')
//			.then(response => response.json())
//			.then(tasks => this.taskList = tasks);
	}

	addTask() {
		let client = new HttpClient();

		client.fetch('http://localhost:8080/tasks/add', {
			'method': "POST",
			'body': json(this.taskData)
		})
			.then(response => response.json())
			.then(data => {
				this.addedTaskData = data;
				//console.log("Received task: " + data.title);
		});
	}
}

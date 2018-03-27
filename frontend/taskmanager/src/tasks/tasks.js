import {HttpClient, json} from 'aurelia-fetch-client'

export class Tasks{

	taskData = {}
	taskData = {};
	taskList = [];
	showAuthor = true;
	isImportant;
	isUrgent;

	constructor() {}

	activate() {
		let client = new HttpClient();

		client.fetch('http://localhost:8080/tasks')
			//.error(error => alert(error))
			.then(response => response.json())
			.then(tasks => this.taskList = tasks);
	}

	addTask() {
		let client = new HttpClient();

		client.fetch('http://localhost:8080/tasks/add', {
			'method': "POST",
			'body': json(this.taskData)
		})
			.then(response => response.json())
			.then(data => {
				console.log("Received task: " + data.title);
				this.taskData = {};
				this.activate();
				this.showAuthor = true;
				
		});
	}
}

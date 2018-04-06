import {HttpClient, json} from 'aurelia-fetch-client'

export class Tasks{
	taskData = {}
	taskList = []

	constructor() {}

	activate() {
		let client = new HttpClient();

		client.fetch('http://localhost:8080/tasks')
			.then(response => response.json())
			.then(tasks => this.taskList = tasks);
	}

}
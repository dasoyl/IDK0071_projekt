import {HttpClient, json} from 'aurelia-fetch-client'
export class completedTasks{
	taskData = {}
	taskList = []
	
	
	constructor() {}

	activate() {
		let client = new HttpClient();

		client.fetch('http://localhost:8080/tasks?completed=true')
			.then(response => response.json())
			.then(tasks => {
				for (let row of tasks){
					row.isUrgent = row.urgent;
					row.isImportant = row.important;
				}
				this.taskList = tasks;
			});
	}
	updateTask(task){
		let client = new HttpClient();
		task.urgent = task.isUrgent;
		task.important = task.isImportant;
		client.fetch('http://localhost:8080/tasks/' + Number(task.id), {
			'method': "POST",
			'body': json(task)
		})
			.then(response => response.json())
			.then(data => {
				//alert("Saved!");
				this.activate();
		});
	}

}

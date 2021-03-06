import {HttpClient, json} from 'aurelia-fetch-client'
export class completedTasks{
	taskData = {}
	taskList = []
	searchString="";


	constructor() {}

	activate() {
		if (localStorage.getItem("access_token")){
			console.log("Good, you are logged in");
		} else {
			console.log("UNAUTHENTICATED USER!!!");
			window.location.replace("/");
			return;
		}
		let client = new HttpClient();

		client.fetch('http://localhost:8080/tasks?completed=true&search='+encodeURIComponent(this.searchString))
			.then(response => response.json())
			.then(tasks => {
				for (let row of tasks){
					row.isUrgent = row.urgent;
					row.isImportant = row.important;
				}
				this.taskList = tasks;
			});
	}
	search(){
		this.activate();
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

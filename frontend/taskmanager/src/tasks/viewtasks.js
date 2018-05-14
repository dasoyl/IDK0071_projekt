import {HttpClient, json} from 'aurelia-fetch-client'
export class ViewTasks{
	taskList = [];
	searchString="";
	errorMessage="";
	viewedTaskData = null;
	constructor() {}

	activate() {
		if (localStorage.getItem("access_token")){
			console.log("Good, you are logged in");
      this.search();
		} else {
			console.log("UNAUTHENTICATED USER!!!");
			window.location.replace("/");
			return;
		}

		let client = new HttpClient();


	search() {
		let client = new HttpClient();
		this.errorMessage = "";
		client.fetch('http://localhost:8080/tasks?completed=false&search='+encodeURIComponent(this.searchString))
			.catch(reason=>{
				this.errorMessage = reason.message;
			})
			.then(response => response.json())
			.then(tasks => {
				for (let task of tasks){
					task.isUrgent = task.urgent;
					task.isImportant = task.important;
					task.expanded = false;
				}
				this.taskList = tasks;
			});
	}
	
	invertExpanded(task){
		task.expanded = !task.expanded;
	}

	displayTask(task){
		viewedTaskData = task;
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
				this.search();
		});
	}

}

export class FilterValueConverter {
    toView(items, urgent, important) {
		if (!items){
			return items;
		}
        return items.filter((item) => item.urgent === urgent && item.important === important);
    }
}

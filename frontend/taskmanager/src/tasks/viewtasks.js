import {HttpClient, json} from 'aurelia-fetch-client'
export class ViewTasks{
	updateMessage;
	document.getElementById("update").onclick = updateTask;
	updateTask(){
		updateMessage="The Task has been updated";
	}

}

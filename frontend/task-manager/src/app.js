import {List} from './list';
import {Todo} from './todo';
import swal from 'sweetalert2';

export class App {
  constructor() {
    this.heading = 'Your TODO lists';
	  this.lists = [];
    this.names = [];
  }

  addList(){
	  if (this.listName) {
      if (this.names.indexOf(this.listName) != -1){
        this.listName = '';
        swal("Error", "This name already exists", "error");
      } else{
        this.lists.push(new List(this.listName));
        this.names.push(this.listName);
  			this.listName = '';
        swal("Success", "Successfully added new list", "success");
      }
		}
  }

  removeList(list){
		let index = this.lists.indexOf(list);
    let index2 = this.names.indexOf(list.name)
		if (index !== -1){
			this.lists.splice(index, 1);
      this.names.splice(index2, 1);
      swal("Success", "Successfully deleted: " + list.name, "success")
		} else {
        swal("Error", "Could not find: " + list.name, "error")
    }
  }

  addTodo(list){
	  if (list){
			if (this.todoDescription) {
				list.todos.push(new Todo(this.todoDescription));
				this.todoDescription = '';
			}
	  }
  }

  removeTodo(list, todo){
		let index = list.todos.indexOf(todo);
		if (index !== -1){
			list.todos.splice(index, 1);
		}
  }


}

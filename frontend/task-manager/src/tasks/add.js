import {inject} from "aurelia-framework";
import {Validation} from "aurelia-validation"
import {TaskData} from "./taskData"
import {Router} from "aurelia-router";

@inject(TaskData, Validation, Router)
export class Add {

    constructor(data, validation, router) {
        this.data = data;
        this.router = router;
        this.validation = validation.on(this)
            .ensure('task.title') 
              .isNotEmpty()
              .hasMinLength(3)
              .hasMaxLength(100)
            .ensure('task.description')
              .isNotEmpty()
              .hasMinLength(5)
            .ensure('task.author')
              .isNotEmpty()
              .hasMaxLength(100)
    }

    activate(params) {
        if (params.id){
			 this.data.getById(params.id).then(task => {
                this.task = task;
                this.validation.validate();
            });
		} else{
			
		}
    }

    save() {
		
        this.validation.validate().then(() => {
            return this.data.save(this.task);
         }).then(task => {
            console.log(task);
            let url = this.router.generate("details", { id: task.id });
            this.router.navigate(url);
         });
    }

}
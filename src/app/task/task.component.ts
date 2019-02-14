import { Component, OnInit } from '@angular/core';
import { TaskDataService } from '../service/data/task-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  id: number;
  task: Task;
  user = sessionStorage.getItem('authenticaterUser');

  constructor(
    private taskService: TaskDataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];

    this.task = new Task(this.id, null, '', 2, new Date(), 0, false, null);

    if (this.id != -1) {
      this.taskService.retrieveTask(this.user, this.id)
        .subscribe(
          data => this.task = data
        )
    }
  }

  saveTask() {

    if (this.id == -1) {
      this.taskService.createTask(this.user, this.task)
        .subscribe(
          data => {
            console.log(data)
            this.router.navigate(['tasks'])
          }
        )
    } else {
      this.taskService.updateTask(this.user, this.id, this.task)
        .subscribe(
          data => {
            console.log(data)
            this.router.navigate(['tasks'])
          }
        )
    }
  }


}

export class Task {
  constructor(
    public id: number,
    public userId: number,
    public description: string,
    public priority: number,
    public dueDate: Date,
    public progress: number,
    public isCompleted: boolean,
    public subtasks: Task[]
  ) {

  }
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskDataService } from '../service/data/task-data.service';
import { Task } from '../task/task.component';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css']
})
export class ListTasksComponent implements OnInit {

  user = sessionStorage.getItem('authenticaterUser');
  tasks = Task[];
  message: string;
  constructor(
    private taskService: TaskDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.refreshtasks();
  }

  refreshtasks() {
    this.taskService.retrieveAllTasks(this.user).subscribe(
      response => {
        console.log(response);
        this.tasks = response;
      }
    )
  }

  deletetask(id) {
    console.log(`delete task ${id}`)
    this.taskService.deleteTask(this.user, id).subscribe(
      response => {
        console.log(response);
        this.message = `Delete of task ${id} Successful!`;
        this.refreshtasks();
      }
    )
  }

  updatetask(id) {
    console.log(`update ${id}`)
    this.router.navigate(['tasks', id])
  }

  addtask() {
    this.router.navigate(['tasks', -1])
  }

}

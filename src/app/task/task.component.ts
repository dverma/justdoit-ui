import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export class Task {
  constructor(
    public id: number,
    public userId: 1,
    public description: string,
    public priority: number,
    public dueDate: Date,
    public progress: number,
    public isCompleted: boolean,
    public subtasks: Task[]
  ) {

  }
}
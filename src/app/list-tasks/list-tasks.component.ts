import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TaskDataService } from '../service/data/task-data.service';
import { Task } from '../task/task.component';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';

interface FlatTaskNode {
  expandable: boolean;
  id: number;
  description: string;
  priority: number;
  dueDate: Date;
  progress: number;
  isCompleted: boolean;
  level: number;
}

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css']
})
export class ListTasksComponent implements OnInit {

  user = sessionStorage.getItem('authenticaterUser');
  tasks: Task[];
  message: string;
  noMsgs = false;

  private transformer = (node: Task, level: number) => {
    return {
      expandable: !!node.subtasks && node.subtasks.length > 0,
      id: node.id,
      description: node.description,
      priority: node.priority,
      dueDate: node.dueDate,
      progress: node.progress,
      isCompleted: node.isCompleted,
      level: level
    };
  }

  treeControl = new FlatTreeControl<FlatTaskNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => node.subtasks);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private taskService: TaskDataService,
    private router: Router
  ) { }

  hasChild = (_: number, node: FlatTaskNode) => node.expandable;

  ngOnInit() {
    this.refreshTasks();
    this.treeControl.expandAll();
  }

  refreshTasks() {
    this.taskService.retrieveAllTasks(this.user).subscribe(
      response => {
        console.log(response);
        if (response.length === 0) { console.log(response.length); this.noMsgs = true; }

        this.dataSource.data = response;
        // this.dataSource = response;
      }
    )
  }

  deleteTask(id) {
    console.log(`delete task ${id}`)
    this.taskService.deleteTask(this.user, id).subscribe(
      response => {
        console.log(response);
        this.message = `Task ${id} successfully deleted`;
        this.refreshTasks();
      }
    )
  }

  updateTask(id) {
    console.log(`update ${id}`);
    this.router.navigate(['tasks', id]);
  }

  addTask() {
    sessionStorage.setItem("MASTER_TASK", '0');
    this.router.navigate(['tasks', -1]);
  }

  addSubTask(masterTaskID) {
    sessionStorage.setItem("MASTER_TASK", masterTaskID);
    this.addTask();
  }

}

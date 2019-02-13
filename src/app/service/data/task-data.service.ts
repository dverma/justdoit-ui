import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from 'src/app/task/task.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskDataService {

  constructor(
    private http: HttpClient
  ) { }

  retrieveAllTasks(username: string) {
    return this.http.get<Task[]>(`${environment.API_URL}/users/${username}/taskTasks`);
  }

  deleteTask(username: string, id: number) {
    return this.http.delete(`${environment.API_URL}/users/${username}/taskTasks/${id}`);
  }

  retrieveTask(username: string, id: number) {
    return this.http.get<Task>(`${environment.API_URL}/users/${username}/taskTasks/${id}`);
  }

  updateTask(username: string, id: number, task: Task) {
    return this.http.put(
      `${environment.API_URL}/users/${username}/taskTasks/${id}`
      , task);
  }

  createTask(username: string, task: Task) {
    return this.http.post(
      `${environment.API_URL}/users/${username}/taskTasks`
      , task);
  }
}

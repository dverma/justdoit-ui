import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
    return this.http.get<Task[]>(`${environment.API_URL}/users/${username}/tasks`);
  }

  deleteTask(username: string, id: number) {
    return this.http.delete(`${environment.API_URL}/users/${username}/tasks/${id}`);
  }

  retrieveTask(username: string, id: number) {
    return this.http.get<Task>(`${environment.API_URL}/users/${username}/tasks/${id}`);
  }

  updateTask(username: string, id: number, task: Task) {
    return this.http.put(
      `${environment.API_URL}/users/${username}/tasks/${id}`
      , task);
  }

  createTask(username: string, task: Task) {
    let masterTaskId = sessionStorage.getItem("MASTER_TASK");
    if (masterTaskId !== null) {
      sessionStorage.removeItem('MASTER_TASK');
    }

    const options = {
      params: new HttpParams().set('masterId', masterTaskId)
    };
    return this.http.post(
      `${environment.API_URL}/users/${username}/tasks`
      , task, options);
  }
}

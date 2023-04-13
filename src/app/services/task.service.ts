import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Task } from '../Task';

//Another way to pass in headers or content for a resquest method
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/tasks'

  constructor(private fetch: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.fetch.get<Task[]>(this.apiUrl)
  }

  deleteTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`
    return this.fetch.delete<Task>(url);
  }
  // Another way to pass in content. The updated fields were defined in the component. 
  updateTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`
    return this.fetch.put<Task>(url, task);
  }

  // passing in headers or content for as the 3rd parameter
  updateTaskReminder(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`
    return this.fetch.put<Task>(url, task, httpOptions);
  }
}
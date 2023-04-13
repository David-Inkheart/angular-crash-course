import { Component, OnInit  } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  deleteTask(task: Task) {
    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id
        )));
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));
  }

  // Additional functionality added by me
  updateTask(task: Task) {
    const newText = window.prompt('Update this task', task.text);
    const newDay = window.prompt('Update the date', task.day);

    // Check if form is empty
    if (newText !== null && newDay !== null) {
      const updatedTask: Task = {
        ...task,
        text: newText,
        day: newDay,
      };
      this.taskService.updateTask(updatedTask).subscribe(() => {
        this.tasks = this.tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
      });
    }
  }
   
}
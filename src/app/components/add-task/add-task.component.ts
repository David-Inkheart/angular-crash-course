import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { Task } from '../../Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<any> = new EventEmitter();
  text: string = '';
  day: string = '';
  reminder: boolean = false;
  showAddTask: boolean = false;
  subscription!: Subscription;

  constructor(private uiService:UiService) { 
    this.subscription = this.uiService
      .onToggle().
      subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit() { }

  onSubmit() { 
    // Check if form is empty
    if (!this.text) {
      alert('Please add a task');
      return;
    }

    if (!this.day) {
      alert('Please add a day');
      return;
    }

    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    }

    // Emit event to parent component `TasksComponent`
    this.onAddTask.emit(newTask);

    // Clear form
    this.text = '';
    this.day = '';
    this.reminder = false;
  }
}


import { Component, OnInit } from '@angular/core';
import {
  Todo,
  TodoListControllerService,
  TodoRepresentation,
} from './core/api/v1';
import { TodoappService } from './todoapp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    private todoListService: TodoListControllerService,
    private todoappService: TodoappService
  ) {}

  ngOnInit() {}

  addTodoList(name: string) {
    this.todoappService.addTodoList(name);
  }

  get todoLists() {
    return this.todoappService.todoListObservable;
  }
}

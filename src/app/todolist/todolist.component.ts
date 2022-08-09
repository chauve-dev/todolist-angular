import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo, TodoList, TodoRepresentation } from '../core/api/v1';
import { TodoappService } from '../todoapp.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
})
export class TodolistComponent implements OnInit {
  constructor(private todoappService: TodoappService) {}
  @Input() public todolist!: TodoList;

  @Output() public addTodoEvent = new EventEmitter<
    Partial<TodoRepresentation>
  >();

  ngOnInit(): void {}

  addTodo(todo: Partial<Todo>) {
    this.todoappService.addTodo(this.todolist.id!, todo);
  }

  updateTodo(todo: Partial<Todo>) {
    this.todoappService.toggleTodo(this.todolist.id!, todo);
  }

  deleteTodo(id: number) {
    this.todoappService.deleteTodo(this.todolist.id!, id);
  }
}

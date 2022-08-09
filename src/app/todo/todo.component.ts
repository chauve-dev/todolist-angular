import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../core/api/v1';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  constructor() {}

  @Input() public todo!: Todo;
  @Output() public checkTodo = new EventEmitter<Partial<Todo>>;
  @Output() public deleteTodo = new EventEmitter<number>;

  ngOnInit(): void {}

  toggle(checked: boolean) {
    this.todo.status = checked;
    this.checkTodo.emit(this.todo);
  }

  delete() {
    this.deleteTodo.emit(this.todo.id!)
  }
}

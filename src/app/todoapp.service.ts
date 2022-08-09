import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import {
  Todo,
  TodoList,
  TodoListControllerService,
  TodoRepresentation,
} from './core/api/v1';

@Injectable({
  providedIn: 'root',
})
export class TodoappService {
  private todoSubject = new BehaviorSubject<TodoList[]>([]);
  constructor(private todoListService: TodoListControllerService) {
    this.updateTodoList();
  }

  async updateTodoList() {
    const todoLists = await firstValueFrom(
      this.todoListService.getTodoListsUsingGET()
    );
    this.todoSubject.next(todoLists);
  }

  async addTodoList(todoList: string) {
    await firstValueFrom(this.todoListService.addTodoListUsingPOST(todoList));
    this.updateTodoList();
  }

  async addTodo(id: number, todo: Partial<Todo>) {
    todo = { ...todo, status: false };
    await firstValueFrom(this.todoListService.addTodoUsingPOST(id, todo));
    this.updateTodoList();
  }

  async toggleTodo(list_id: number, todo: Partial<Todo>) {
    await firstValueFrom(
      this.todoListService.setTodoStatusUsingPUT(
        list_id,
        todo.id!,
        todo.status!
      )
    );
    this.updateTodoList();
  }

  async deleteTodo(list_id: number, todo_id: number) {
    await firstValueFrom(
      this.todoListService.deleteTodoUsingDELETE(list_id, todo_id)
    );
    this.updateTodoList();
  }

  get todoListObservable() {
    return this.todoSubject.asObservable();
  }
}

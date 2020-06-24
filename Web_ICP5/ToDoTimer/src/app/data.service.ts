import { Injectable } from '@angular/core';
import {Item} from './item';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  id = 0;

  items: Item[] = [];

  constructor() {
  }

  addItem(item: Item): DataService {
    if (!item.id) {
      item.id = ++this.id;
    }
    this.items.push(item);
    return this;
  }

  deleteItem(id: number): DataService {
    this.items = this.items
      .filter(todo => todo.id !== id);
    return this;
  }

  // tslint:disable-next-line:ban-types
  updateItem(id: number, values: Object = {}): Item {
    const item = this.getItem(id);
    if (!item) {
      return null;
    }
    Object.assign(item, values);
    return item;
  }

  getAllItems(): Item[] {
    return this.items;
  }

  getItem(id: number): Item {
    return this.items
      .filter(item => item.id === id)
      .pop();
  }

  completeItem(item: Item){
    const updatedTodo = this.updateItem(item.id, {
      complete: !item.complete
    });
    return updatedTodo;
  }
}

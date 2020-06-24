import { Injectable } from '@angular/core';
import {Item} from './item';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  id = 0;

  items: Item[] = [];
  // A service to mimic a real application with database and REST api calls
  constructor() {
  }
  // adding and item
  addItem(item: Item): DataService {
    if (!item.id) {
      item.id = ++this.id;
    }
    this.items.push(item);
    return this;
  }
  // delete item
  deleteItem(id: number): DataService {
    this.items = this.items
      .filter(todo => todo.id !== id);
    return this;
  }
  // update item
  // tslint:disable-next-line:ban-types
  updateItem(id: number, values: Object = {}): Item {
    const item = this.getItem(id);
    if (!item) {
      return null;
    }
    Object.assign(item, values);
    return item;
  }
  // retrieve all items
  getAllItems(): Item[] {
    return this.items;
  }
  // get a particular item by id
  getItem(id: number): Item {
    return this.items
      .filter(item => item.id === id)
      .pop();
  }
  // switch item to a complete one, meaning that the line will pass through the text.
  completeItem(item: Item){
    const updatedTodo = this.updateItem(item.id, {
      complete: !item.complete
    });
    return updatedTodo;
  }
}

import { Injectable } from '@angular/core';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {
  constructor() {
    this.loadStorage();
  }

  lists: List[] = [];

  createList( title: string) {
    const newList = new List(title);
    this.lists.push(newList);
    this.saveStorage();
    return newList.id;
  }

  getList(id: string | number) {
    id = Number(id);
    return this.lists.find( listData => listData.id === id );
  }

  deleteList(list: List) {
    this.lists = this.lists.filter( listData => listData.id !== list.id);
    this.saveStorage();
  }

  saveStorage() {
    localStorage.setItem('data', JSON.stringify(this.lists));
  }

  loadStorage() {
    if (localStorage.getItem('data')) {
      this.lists = JSON.parse(localStorage.getItem('data'));
    }
  }
}

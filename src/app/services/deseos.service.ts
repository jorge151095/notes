import { Injectable } from '@angular/core';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {
  constructor() {
    const list1 = new List('recolectar piedras del infinito');
    const list2 = new List('recolectar piedras del infinito x2');
    this.lists.push(list1);
    this.lists.push(list2);
  }

  lists: List[] = [];

  createList( title: string) {
    const newList = new List(title);
    this.lists.push(newList);
  }
}

import { Component, OnInit } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { ListItem } from 'src/app/models/list-item.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  constructor( private desiresServives: DeseosService,
               private route: ActivatedRoute) {
    const listId = this.route.snapshot.paramMap.get('listId');
    this.list = this.desiresServives.getList(listId);
  }

  list: List;
  itemName = '';

  ngOnInit() {
  }

  addItem() {
    if (this.itemName.length === 0 ) {
      return;
    }

    const newItem = new ListItem(this.itemName);
    this.list.items.push( newItem );
    this.itemName = '';
    this.desiresServives.saveStorage();
  }

  checkChanged(item: ListItem) {
    const pending = this.list.items
                        .filter( itemData => !itemData.completed )
                        .length;
    if (pending === 0) {
      this.list.completedIn = new Date();
      this.list.completed = true;
    } else {
      this.list.completedIn = null;
      this.list.completed = false;
    }
    this.desiresServives.saveStorage();
  }
}

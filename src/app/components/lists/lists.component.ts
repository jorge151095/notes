import { Component, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { List } from 'src/app/models/list.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent {

  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertCtrl: AlertController) { }

  @Input() finished = true;
  @ViewChild(IonList, {static: true}) ionList: IonList;

  listSelected( list: List) {
    if (this.finished) {
      this.router.navigateByUrl(`/tabs/tab2/add/${list.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/add/${list.id}`);
    }
  }

  deleteList( list: List) {
    this.deseosService.deleteList(list);
  }

  async editLabelName(list: List) {
    const alert = await this.alertCtrl.create({
      header: 'Editar lista',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Nombre de la lista',
          value: list.title
        }
      ],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          this.ionList.closeSlidingItems();
        }
      },
      {
        text: 'Editar',
        handler: (data) => {
          if (data.title.length === 0) {
            return;
          }
          list.title = data.title;
          this.deseosService.saveStorage();
          this.ionList.closeSlidingItems();
        }
      }]
    });
    alert.present();
  }
}

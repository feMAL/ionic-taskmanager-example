import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router'
import { Lista } from 'src/app/models/lista.model';
import { AlertController } from '@ionic/angular'
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  listas:Lista[]=[];

  constructor( 
    private _deseoService:DeseosService,
    private _router: Router,
    private _alertCtr: AlertController
  ) {
  }

  async addList(){
    //
    const alert = await this._alertCtr.create({
      header: 'New List',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Name new list'
        }
      ],
      buttons: [
        { text:'Cancel', role:'cancel', handler:()=>{ console.log('cancelar') } },
        { text:'Create',
          handler:
            ( data ) => {
              if(data.title.length == 0){
                return;
              }
              let idNewList = this._deseoService.createList(data.title)
              
              this._router.navigateByUrl(`/tabs/tab1/add/${idNewList}`)
            } 
        }
      ]
    })

    alert.present();
  }



}

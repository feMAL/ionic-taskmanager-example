import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular'
import { Lista } from 'src/app/models/lista.model';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild( IonList ) lista: IonList
  @Input() terminada = true

  constructor( public _deseoService:DeseosService, private _router: Router, private _alertCtr:AlertController){
  }

  ngOnInit() {}

  navigateTo(list){
    let ruta:string;
    if(this.terminada){
      ruta='tab2'
    }else{
      ruta='tab1'
    }
    this._router.navigateByUrl(`/tabs/${ruta}/add/${list.id}`)
  } 

  async editList(list:Lista){

    let listname = list.titulo

    const alert = await this._alertCtr.create(
        {
          header: 'Editar nombre de lista',
          inputs: [
            {
              name: 'editarlista',
              type: 'text',
              placeholder: 'Nuevo nombre',
              value: `${listname}`
            }
          ],
          buttons:[
            { text:'Cancel', role:'cancel', handler:()=>{ this.lista.closeSlidingItems() } },
            { text:'Edit', handler: ( edited ) =>{ 
              if(edited.editarlista === 0){
                return
              }
              
              list.titulo = edited.editarlista
              this._deseoService.saveStorage();
              this.lista.closeSlidingItems()
              
            } }
          ]
        });

  alert.present()

  }

  deleteList(item:Lista){
    //Personal Options
    //this.listas.splice(this.listas.indexOf(item),1)

    this._deseoService.deleteList(item)

    this._deseoService.saveStorage()
  }

}

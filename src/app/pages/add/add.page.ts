import { Component, OnInit } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { ActivatedRoute } from '@angular/router';
import { ListaItem } from 'src/app/models/lista-items.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  list: Lista
  itemName: string

  constructor( private _deseosService:DeseosService, private _rotue: ActivatedRoute) {
    this._rotue.params
      .subscribe( params => {
          let idlista = params['listId']
          this.list = this._deseosService.getList(idlista)
        })
          
  }

  ngOnInit() {
  }

  addItem(){
    if(this.itemName.length === 0){
      return
    }
    const newItem = new ListaItem(this.itemName);
    this.list.items.push(newItem)
    this.itemName = ''
    this._deseosService.saveStorage()
  }

  deleteItem(item){
    let newItemList:ListaItem[] = []
    this.list.items.forEach( listItem =>{
      listItem != item ? newItemList.push(listItem) : false
    } )
    this.list.items = newItemList
    this._deseosService.saveStorage()
  }

  itemChange(item: ListaItem){

    const notReady = this.list.items.filter( datalist => datalist.completado==false ).length

    if(notReady != 0){
      this.list.terminadaEn = null
      this.list.completada = false      
    }else {
      this.list.terminadaEn = new Date()
      this.list.completada = true
    }

    this._deseosService.saveStorage()
  }

}
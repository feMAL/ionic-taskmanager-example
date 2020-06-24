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
          console.log(this.list)
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

}

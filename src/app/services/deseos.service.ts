import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] =[]

  constructor(  ) {
    this.listas = this.loadStorage()
  }

   createList(listTitle){
    const newList = new Lista(listTitle)
    this.listas.push(newList)
    this.saveStorage()
    return newList.id
   }

   getList(id:number | string){
    let numericId = Number(id)

    return this.listas.find( listData => {return listData.id === numericId })
   }

   loadStorage(){
    if(localStorage.getItem('data')){
      this.listas = JSON.parse(localStorage.getItem('data'))
    }
    return this.listas
   }

   saveStorage(){
    localStorage.setItem('data',JSON.stringify(this.listas))
   }
}

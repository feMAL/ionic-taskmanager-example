import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router'
import { Lista } from 'src/app/models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  listas:Lista[]=[];

  constructor( 
    private _deseoService:DeseosService,
    private _router: Router
  ) {
    this.listas = this._deseoService.listas
  }

  addList(){
    this._router.navigateByUrl('/tabs/tab1/add')
  }



}

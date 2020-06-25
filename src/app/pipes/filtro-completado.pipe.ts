import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'filtroCompletado',
  pure: false
})
export class FiltroCompletadoPipe implements PipeTransform {

  transform(value: Lista[], args: boolean = true): Lista[] {
    let res:Lista[] = []
    res = value.filter( lista => lista.completada == args )
    return res
  }

}

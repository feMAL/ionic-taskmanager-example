import { ListaItem } from './lista-items.model';

export class Lista{
    id: number;
    titulo:string;
    creadaEn: Date;
    terminadaEn: Date;
    completada: boolean;
    items: ListaItem[];

    constructor(title: string){
        this.titulo = title
        this.creadaEn = new Date()
        this.completada = false
        this.items = []
        this.id = new Date().getTime();
    }
}
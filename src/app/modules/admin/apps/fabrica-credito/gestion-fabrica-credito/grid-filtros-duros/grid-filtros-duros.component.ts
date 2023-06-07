import { Component, OnInit } from '@angular/core';
import { PoliticasService } from "../../../../../../core/services/politicas.service";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-grid-filtros-duros',
    templateUrl: './grid-filtros-duros.component.html',
    styleUrls: ['./grid-filtros-duros.component.scss']
  })

export class GridFiltrosDurosComponent implements OnInit {
    public politicas$: Observable<any>;
    public politicasTipos:any = {};

    public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
    constructor(
        private politicasService: PoliticasService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.getPoliticas(this.numeroSolicitud);
    }

    private getPoliticas(numeroSolicitud: string): void {
        this.politicasService.getPoliticas(numeroSolicitud).subscribe(data => {
            data.data.forEach(element => {
                if(!this.politicasTipos[element.tipoTercero]){
                    this.politicasTipos[element.tipoTercero] = []
                }

                this.politicasTipos[element.tipoTercero].push(element)
            });


        });
    }

    // 21 corresponde a la politica de filtros duros
    hasIDPolitica(array: any[]){
        return array.find(item => item.idPolitica === 21)
    }


    getTitulo(tipo: string){
        const titulo = tipo.toUpperCase()

        if(titulo === 'C'){
            return 'Filtros duros del codedudor'
        }
        if(titulo === 'S'){
            return 'Filtros duros del dedudor solidario'
        }
        if(titulo === 'R'){
            return 'Filtros duros del representante'
        }

        return 'Filtros duros del titular'
    }

}

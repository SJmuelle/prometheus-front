import { Component, OnInit } from '@angular/core';
import { PoliticasService } from "../../../../../../core/services/politicas.service";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-grid-politicas',
    templateUrl: './grid-politicas.component.html',
    styleUrls: ['./grid-politicas.component.scss']
})
export class GridPoliticasComponent implements OnInit {
    public politicas$: Observable<any>;
    public titular: any[] = [];
    public codeudor: any[] = [];
    public representante: any[] = [];
    public solidario: any[] = [];
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
                if (element.tipoTercero === 'T') {
                    this.titular.push(element)
                }
                else if (element.tipoTercero === 'C') {
                    this.codeudor.push(element)
                } else if (element.tipoTercero === 'S') {
                    this.solidario.push(element)
                }else if(element.tipoTercero === 'R'){
                    this.representante.push(element)
                }
            });

        });
    }

    // 21 corresponde a la politica de filtros duros
    hasIDPolitica(array: any[]){
        return array.find(item => item.idPolitica === 21)
    }

}

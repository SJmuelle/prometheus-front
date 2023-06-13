import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GenericasService } from 'app/core/services/genericas.service';

import Swal from 'sweetalert2';
import { PqrService } from '../../pqr/pqr.service';


@Component({
  selector: 'app-reporterd-mercadeo',
  templateUrl: './reporterd-mercadeo.component.html',
  styleUrls: ['./reporterd-mercadeo.component.scss']
})
export class ReporterdMercadeoComponent implements OnInit {
    listadoTipo: any;
    datos: any[] = [];

    public page: number = 1;
    public tamanoTabl = new FormControl("10");
    public filtrarTabla = new FormControl('');

    constructor(
    private _datareporteService: GenericasService, private _pqrService: PqrService
    ) {}

    ngOnInit(): void {
     this.obtenerinformacion();
    }
    
    obtenerinformacion(): void{
    this._datareporteService.getReporteRd().subscribe(resp=>{
      console.log(resp,'data reporte:')
      this.datos=resp.data
    })
    }
    exportAsXLSX():void {
      this._pqrService.exportAsExcelFile(this.datos, 'listado');
    }
}

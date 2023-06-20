import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  element = false;
  filtroBusqueda: FormGroup;
  minFecha: Date;
  maxFecha: Date;
  public fechaActual = new Date();
  public page: number = 1;
  public tamanoTabl = new FormControl("10");
  public filtrarTabla = new FormControl('');

  constructor(
    private _datareporteService: GenericasService, private _pqrService: PqrService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.filtroBusqueda = this.fb.group({
      fechaInicial: ['', [Validators.required]],
      fechaFinal: [this.fechaActual, [Validators.required]]
    });

    this.obtenerinformacion();
    const currentYear = new Date().getFullYear();
    this.minFecha = new Date(currentYear - 20, 0, 1);
    this.maxFecha = new Date(this.fechaActual);
  }

  obtenerinformacion(): void {
    this._datareporteService.getReporteRd('2023-05-31', '2023-06-13').subscribe(resp => {
      console.log(resp, 'data reporte:')
      if (resp.msg = 'OK') {
        this.datos = resp.data
        this.element = true
      }
    })
  }
  exportAsXLSX(): void {
    this._pqrService.exportAsExcelFile(this.datos, 'listado');
  }
}

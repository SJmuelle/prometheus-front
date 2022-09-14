import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AsignarComponent } from './asignar/asignar.component';
import { ReasignarComponent } from './reasignar/reasignar.component';
import { AsignarSolicitudesService } from 'app/core/services/asignar-solicitudes.service';
import moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-solicitudes',
  templateUrl: './list-solicitudes.component.html',
  styleUrls: ['./list-solicitudes.component.scss']
})
export class ListSolicitudesComponent implements OnInit {

  asignados: any[] = [];
  reasignados: any[] = [];
  solicitudes: any[] = [];
  asesores: any[] = [];
  buscarForm: FormGroup;
  formatoFechaInicial:any;
  formatoFechaFinal:any;

  constructor(public dialog: MatDialog, public asigService: AsignarSolicitudesService, private fb: FormBuilder) {
    this.buscarForm = this.fb.group({
      analista: ['', [Validators.required]],
      fechaInicial: ['', [Validators.required]],
      fechaFinal: ['', [Validators.required]],
      unidad: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.consultarAsesores();
    this.consultarSolicitudes();
  }

  consultarSolicitudes(){
    let data = {
      "unidadNegocio":22,
      "entidad":"ASIGNACION_NEGOSIO",
      "analista":"null",
      "fechaInicial":"2022-01-01",
      "fechaFinal":"2022-09-01"
    }
    this.asigService.getSolicitudes(data).subscribe((res: any) => {
      if (res) {
        this.solicitudes = res.data.listadoSolicitud;
        this.asignados = res.data.solicitudAsignada;
        this.reasignados = res.data.solicitudAsignada;
      }else{
        this.solicitudes = [];
        this.asignados = [];
        this.reasignados = [];
      }
    })
  }

  consultarAsesores(){
    this.asigService.getAsesores().subscribe((res: any) => {
      if (res) {
        this.asesores = res.data;
      }else{
        this.asesores = [];
      }
    })
  }

  buscar(){
    this.formatoFechaInicial = moment(this.buscarForm.value.fechaInicial).format("YYYY-MM-DD");
    this.formatoFechaFinal = moment(this.buscarForm.value.fechaFinal).format("YYYY-MM-DD");
    let data = {
      "unidadNegocio":parseInt(this.buscarForm.value.unidad),
      "entidad":"ASIGNACION_NEGOSIO",
      "analista":this.buscarForm.value.analista,
      "fechaInicial":this.formatoFechaInicial,
      "fechaFinal":this.formatoFechaFinal
    }
    console.log(data);
    this.asigService.getSolicitudes(data).subscribe((res: any) => {
      if (res) {
        this.solicitudes = res.data.listadoSolicitud;
        this.asignados = res.data.solicitudAsignada;
        this.reasignados = res.data.solicitudAsignada;
      }else{
        this.solicitudes = [];
        this.asignados = [];
        this.reasignados = [];
      }
    })
  }

  cambiarFecha(date) {
    if (date) {
      moment.locale('es');
      return moment(date).format('MMMM D YYYY')
    }
    return 'No registra';
  }

  asignar() {
    const dialogRef = this.dialog.open(AsignarComponent, {
      width: '20%'
    });
    dialogRef.afterClosed().subscribe(result => {});
  }

  reasignar() {
    const dialogRef = this.dialog.open(ReasignarComponent, {
      width: '20%'
    });
    dialogRef.afterClosed().subscribe(result => {});
  }

}

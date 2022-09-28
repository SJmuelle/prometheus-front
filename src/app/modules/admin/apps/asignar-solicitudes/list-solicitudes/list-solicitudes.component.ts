import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AsignarComponent } from './asignar/asignar.component';
import { ReasignarComponent } from './reasignar/reasignar.component';
import { ReasignarVariosComponent } from './reasignar-varios/reasignar-varios.component';
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
  solicitudes: any[] = [];
  asesores: any[] = [];
  unidades: any[] = [];
  antiguos: any[] = [];
  buscarForm: FormGroup;
  formatoFechaInicial:any;
  formatoFechaFinal:any;
  numSolicitud:number;
  numIdentificacion:number;
  soliAsignar: any[] = [];
  soliReasignar: any[] = [];
  disBtn: boolean;
  fechActual: any = new Date();
  maxFecha: Date;
  filtrarTabla:string='';
  chequeada: boolean = false;
  userVacio: string = "";

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
    this.consultarUnidades();
    this.maxFecha = new Date(this.fechActual);
  }

  updateAllComplete() {
    this.chequeada = this.solicitudes != null && this.solicitudes.every(t => (t.chequeado));
  }

  setAll(completed: boolean) {
    this.chequeada = completed;
    if (this.solicitudes == null) {
      return;
    }
    this.solicitudes.forEach(t => (t.chequeado = completed));
    this.soliReasignar = [];
    this.soliAsignar = [];
    this.antiguos = [];

  }

  agregarSoli(item, event){
    let num = {
      "numeroSolicitud":item.numeroSolicitud.toString()
    }
    let asesorAntiguo = {
      "analista":item.asesor,
      "solicitud":item.numeroSolicitud,
      "fecha":item.fecha_re_asigado
    }
    if (item.asesor=='') { 
      if (event.checked==false) {
        const dataBuscar = this.soliAsignar.filter(num => num.numeroSolicitud == item.numeroSolicitud);
        let idxSoli = this.soliAsignar.indexOf(dataBuscar[0]);
        this.soliAsignar.splice(idxSoli, 1);
      }else{
        this.soliAsignar.push(num);
      }
    } else {
      if (event.checked==false) {
        const dataBuscar = this.soliReasignar.filter(num => num.numeroSolicitud == item.numeroSolicitud);
        let idxSoli = this.soliReasignar.indexOf(dataBuscar[0]);
        this.soliReasignar.splice(idxSoli, 1);
        this.antiguos.splice(idxSoli, 1);
      }else{
        this.soliReasignar.push(num);
        this.antiguos.push(asesorAntiguo);
      }
    }
  }

  consultarSolicitudes(){
    let data = {
      "unidadNegocio":22,
      "entidad":"ASIGNACION_NEGOSIO",
      "analista":"",
      "fechaInicial":"2021-01-01",
      "fechaFinal":moment(this.fechActual).format("YYYY-MM-DD")
    }
    this.asigService.getSolicitudes(data).subscribe((res: any) => {
      if (res) {
        this.solicitudes = res.data.listadoSolicitud;
        console.log(this.solicitudes)
        this.asignados = res.data.solicitudAsignada;
        console.log(this.asignados)
      }else{
        this.solicitudes = [];
        this.asignados = [];
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

  consultarUnidades(){
    this.asigService.getUnidades().subscribe((res: any) => {
      if (res) {
        this.unidades = res.data;
        console.log(this.unidades)
      }else{
        this.unidades = [];
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
    this.asigService.getSolicitudes(data).subscribe((res: any) => {
      if (res) {
        this.solicitudes = res.data.listadoSolicitud;
        this.asignados = res.data.solicitudAsignada;
        console.log(this.asignados)
      }else{
        this.solicitudes = [];
        this.asignados = [];
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

  asignarVarias() {
    let data = {
      "tipoAsesor":"E",
      "asesorNuevo":"",
      "details":this.soliAsignar
    }
    const dialogRef = this.dialog.open(AsignarComponent, {
      width: '20%',
      disableClose: true,
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result==true) {
        this.consultarSolicitudes();
        this.soliReasignar = [];
        this.soliAsignar = [];
        this.antiguos = [];
      }
    });
  }

  asignarUna(item){
    let data = {
      "tipoAsesor":"E",
      "asesorNuevo":"",
      "details":[{
        "numeroSolicitud":item.toString()
      }]
    }
    const dialogRef = this.dialog.open(AsignarComponent, {
      width: '20%',
      disableClose: true,
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result==true) {
        this.consultarSolicitudes();
        this.soliReasignar = [];
        this.soliAsignar = [];
        this.antiguos = [];
      }
    });
  }

  reasignarVarias() {
    let data = {
      "tipoAsesor":"E",
      "asesorNuevo":"",
      "details":this.soliReasignar
    }
    const dialogRef = this.dialog.open(ReasignarVariosComponent, {
      width: '35%',
      disableClose: true,
      data: {enviar: data, asesoresActuales: this.antiguos}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result==true) {
        this.consultarSolicitudes();
        this.soliReasignar = [];
        this.soliAsignar = [];
        this.antiguos = [];
      }
    });
  }

  reasignarUna(item) {
    let data = {
      "tipoAsesor":"E",
      "asesorNuevo":"",
      "details":[{
        "numeroSolicitud":item.numeroSolicitud.toString()
      }]
    }
    const dialogRef = this.dialog.open(ReasignarComponent, {
      width: '20%',
      disableClose: true,
      data: {enviar: data, asesorActual: item.asesor}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result==true) {
        this.consultarSolicitudes();
        this.soliReasignar = [];
        this.soliAsignar = [];
        this.antiguos = [];
      }
    });
  }

}

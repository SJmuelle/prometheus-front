import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AsignarVariosComponent } from './asignar-varios/asignar-varios.component';
import { ReasignarVariosComponent } from './reasignar-varios/reasignar-varios.component';
import { AsignarSolicitudesService } from 'app/core/services/asignar-solicitudes.service';
import moment from 'moment';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';

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
  formatoFechaInicial:any = '';
  formatoFechaFinal:any = '';
  unidadNegocio:any = '';
  numSolicitud:number;
  numIdentificacion:number;
  soliAsignar: any[] = [];
  soliReasignar: any[] = [];
  disBtn: boolean;
  fechActual: any = new Date();
  maxFecha: Date;
  filtrarTabla:string='';
  chequeada: boolean = false;
  dataFiltro:any;

  busqueda:string = '';
  opcionesBusqueda: any[] = [];

  constructor(public dialog: MatDialog, public asigService: AsignarSolicitudesService, private fb: FormBuilder) {
    this.buscarForm = this.fb.group({
      analista: [''],
      fechaInicial: [''],
      fechaFinal: [''],
      unidad: [''],
      agenda: [''],
    });
  }

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  ngOnInit(): void {
    this.consultarAsesores();
    this.consultarSolicitudes();
    this.consultarUnidades();
    this.maxFecha = new Date(this.fechActual);
    this.opcionesBusqueda = [
      {
        "id":"AN",
        "descripcion":"Analista"
      },
      {
        "id":"PE",
        "descripcion":"Periodo"
      },
      {
        "id":"UN",
        "descripcion":"Unidad de negocio"
      },
      {
        "id":"AG",
        "descripcion":"Agenda"
      }
    ]
  }

  limpiar(){
    this.busqueda = '';
    this.dataFiltro = {
      "unidadNegocio":"",
      "entidad":"",
      "analista":"",
      "fechaInicial":"",
      "fechaFinal":"",
      "agenda":""
    }
    console.log(this.dataFiltro)
    this.formGroupDirective.resetForm();
    this.consultarSolicitudes();
  }

  elegirFiltro(eleccion){
    this.busqueda = eleccion;
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
      "entidad": "ASIGNACION_NEGOSIO",
      "details": [
          {
              "tipo": "STATUS",
              "buscar": ""
          },
          {
              "tipo": "AGENDA_ASESOR",
              "buscar": ""
          },
          {
              "tipo": "ASESOR_CREDITO",
              "buscar": ""
          },
          {
              "tipo": "UNIDAD_NEGOCIO",
              "buscar": ""
          },
          {
              "tipo": "FECHA_INICIAL",
              "buscar": "2022-01-01"
          },
          {
              "tipo": "FECHA_FINAL",
              "buscar": moment(this.fechActual).format("YYYY-MM-DD")
          }
      ]
    }
    this.asigService.getSolicitudes(data).subscribe((res: any) => {
      if (res) {
        this.solicitudes = res.data.listadoSolicitud;
        this.asignados = res.data.solicitudAsignada;
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
      }else{
        this.unidades = [];
      }
    })
  }

  buscar(){
    if (this.buscarForm.value.analista!='') {
      this.dataFiltro = {
        "entidad": "ASIGNACION_NEGOSIO",
        "details": [
            {
                "tipo": "STATUS",
                "buscar": ""
            },
            {
              "tipo": "ASESOR_CREDITO",
              "buscar": this.buscarForm.value.analista
          },
        ]
      }
    }

    if (this.buscarForm.value.fechaInicial!='' && this.buscarForm.value.fechaFinal!='') {
      this.formatoFechaInicial = moment(this.buscarForm.value.fechaInicial).format("YYYY-MM-DD");
      this.formatoFechaFinal = moment(this.buscarForm.value.fechaFinal).format("YYYY-MM-DD");
      this.dataFiltro = {
        "entidad": "ASIGNACION_NEGOSIO",
        "details": [
            {
                "tipo": "STATUS",
                "buscar": ""
            },
            {
                "tipo": "FECHA_INICIAL",
                "buscar": this.formatoFechaInicial
            },
            {
                "tipo": "FECHA_FINAL",
                "buscar": this.formatoFechaFinal
            }
        ]
      }
    }

    if (this.buscarForm.value.unidad!='') {
      this.dataFiltro = {
        "entidad": "ASIGNACION_NEGOSIO",
        "details": [
            {
                "tipo": "STATUS",
                "buscar": ""
            },
            {
              "tipo": "UNIDAD_NEGOCIO",
              "buscar": this.buscarForm.value.unidad
            },
        ]
      }
    }

    if (this.buscarForm.value.agenda!='') {
      this.dataFiltro = {
        "entidad": "ASIGNACION_NEGOSIO",
        "details": [
            {
                "tipo": "STATUS",
                "buscar": ""
            },
            {
              "tipo": "AGENDA_ASESOR",
              "buscar": this.buscarForm.value.agenda
            },
        ]
      }
    }

    if (this.buscarForm.value.unidad!='') {
      this.dataFiltro = {
        "entidad": "ASIGNACION_NEGOSIO",
        "details": [
            {
                "tipo": "STATUS",
                "buscar": ""
            },
            {
              "tipo": "UNIDAD_NEGOCIO",
              "buscar": this.buscarForm.value.unidad
            },
        ]
      }
    }
    
    this.asigService.getSolicitudes(this.dataFiltro).subscribe((res: any) => {
      if (res) {
        this.solicitudes = res.data.listadoSolicitud;
        this.asignados = res.data.solicitudAsignada;
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
    const dialogRef = this.dialog.open(AsignarVariosComponent, {
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

}

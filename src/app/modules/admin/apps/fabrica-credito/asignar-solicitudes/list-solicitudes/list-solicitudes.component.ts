import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AsignarVariosComponent } from './asignar-varios/asignar-varios.component';
import { ReasignarVariosComponent } from './reasignar-varios/reasignar-varios.component';
import { AsignarSolicitudesService } from 'app/core/services/asignar-solicitudes.service';
import moment from 'moment';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import Swal from 'sweetalert2';

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
  fechAsignacion: any = '';
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
  dataFiltro:any = {"details":[]};
  busqueda:string = '';
  opcionesBusqueda: any[] = [];
  analista:string = '';
  unidad:string = '';
  agenda:string = '';
  fecha:string = '';

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
      "entidad": "ASIGNACION_NEGOSIO",
      "details": [
          {
              "tipo": "STATUS",
              "buscar": ""
          }
      ]
    }
    this.buscarForm.value.analista = '';
    this.buscarForm.value.fechaInicial = '';
    this.buscarForm.value.fechaFinal = '';
    this.buscarForm.value.unidad = '';
    this.buscarForm.value.agenda = '';
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
      "numeroSolicitud":item.numero_solicitud.toString()
    }

    if (item.fecha_re_asigado=='' || item.fecha_re_asigado=='0099-01-01 00:01:00') {
      this.fechAsignacion = item.fecha_asigacion;
    } else {
      this.fechAsignacion = item.fecha_re_asigado;
    }
    
    let asesorAntiguo = {
      "analista":item.asesor_credito,
      "solicitud":item.numero_solicitud,
      "fecha":this.fechAsignacion
    }
    
    if (item.asesor_credito=='') { 
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
          }
      ]
    }
    Swal.fire({ title: 'Cargando', html: 'Buscando solicitudes', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this.asigService.getSolicitudes(data).subscribe((res: any) => {
      Swal.close();
      if (res) {
        this.solicitudes = res.data.listadoSolicitud
        console.log(this.solicitudes.sort((a, b)=> b.fecha_ingreso_agenda - a.fecha_ingreso_agenda))
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
      this.dataFiltro = {
        "entidad": "ASIGNACION_NEGOSIO",
        "details": [
            {
                "tipo": "STATUS",
                "buscar": ""
            },
            {
                "tipo": "FECHA_INICIAL",
                "buscar": moment(this.buscarForm.value.fechaInicial).format("YYYY-MM-DD")
            },
            {
                "tipo": "FECHA_FINAL",
                "buscar": moment(this.buscarForm.value.fechaFinal).format("YYYY-MM-DD")
            }
        ]
      }
    }

    if (this.buscarForm.value.unidad!='') {
      this.unidad = this.buscarForm.value.unidad;
      this.dataFiltro = {
        "entidad": "ASIGNACION_NEGOSIO",
        "details": [
            {
                "tipo": "STATUS",
                "buscar": ""
            },
            {
              "tipo": "UNIDAD_NEGOCIO",
              "buscar": this.buscarForm.value.unidad.toString()
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
    Swal.fire({ title: 'Cargando', html: 'Buscando solicitudes', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this.asigService.getSolicitudes(this.dataFiltro).subscribe((res: any) => {
      this.buscarForm.value.analista = '';
      this.buscarForm.value.fechaInicial = '';
      this.buscarForm.value.fechaFinal = '';
      this.buscarForm.value.unidad = '';
      this.buscarForm.value.agenda = '';
      Swal.close();
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
      if (moment(date).format('MMMM D YYYY')=='enero 1 0099') {
        return 'No registra'
      }else{
        return moment(date).format('MMMM D YYYY')
      }
    }
    return 'No registra'
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
        this.setAll(false);
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
        this.setAll(false);
        this.consultarSolicitudes();
        this.soliReasignar = [];
        this.soliAsignar = [];
        this.antiguos = [];
      }
    });
  }

}

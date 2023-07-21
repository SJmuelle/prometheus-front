import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AsignarVariosComponent } from './asignar-varios/asignar-varios.component';
import { ReasignarVariosComponent } from './reasignar-varios/reasignar-varios.component';
import { AsignarSolicitudesService } from 'app/core/services/asignar-solicitudes.service';
import moment from 'moment';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from 'app/core/auth/auth.service';
import { Subject } from 'rxjs';
import {  takeUntil } from 'rxjs/operators';

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
  rol:number;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  public page: number = 1;
  public tamanoTabl = new FormControl("20");

  constructor(public dialog: MatDialog, public asigService: AsignarSolicitudesService, private fb: FormBuilder,private el: ElementRef, private refreshToken: AuthService) {
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
    this.refreshToken.signInUsingToken().pipe(takeUntil(this._unsubscribeAll)).subscribe(rep => {
      this.consultarAsesores();
      this.consultarSolicitudes();
      this.consultarUnidades();
    })

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

    if(event.checked){
      this.soliAsignar.push(num);
    }else{
      const index = this.soliAsignar.findIndex(soli => soli.numeroSolicitud === item.numero_solicitud.toString())
      this.soliAsignar.splice(index, 1)
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
        this.rol = res.data.rolUsuario.resultado
        
        this.solicitudes = res.data.listadoSolicitud
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

  leftScroll(){
      const scrollContaier:NodeListOf<Element> = document.querySelectorAll('#scrollContainer');
      const maxScroll = 0;
      const currentScroll = scrollContaier.item(0).scrollLeft
      let newLeftValue = 0;

      if(currentScroll - 300 < maxScroll){
        newLeftValue = maxScroll
      }else{
        newLeftValue = currentScroll - 300
      }

      scrollContaier.item(0).scrollTo({
        left: newLeftValue,
        behavior: 'smooth'
      })
  }

  rigthScroll(){
    const scrollContaier:NodeListOf<Element> = document.querySelectorAll('#scrollContainer');
    const maxScroll = scrollContaier.item(0).scrollWidth;
    const currentScroll = scrollContaier.item(0).scrollLeft
    let newLeftValue = 0;

    if(currentScroll + 300 > maxScroll){
      newLeftValue = maxScroll
    }else{
      newLeftValue =  currentScroll + 300
    }

    scrollContaier.item(0).scrollTo({
      left: newLeftValue,
      behavior: 'smooth'
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
    if(date === 'NO') return 'NO REGISTRA'
    if (date) {
      moment.locale('es');
      if (moment(date).format('MMMM D YYYY')=='enero 1 0099') {
        return 'NO REGISTRA'
      }else{
        return moment(date).format('MMMM D YYYY')
      }
    }
    return 'NO REGISTRA'
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._unsubscribeAll.next()
    this._unsubscribeAll.complete()
  }
}

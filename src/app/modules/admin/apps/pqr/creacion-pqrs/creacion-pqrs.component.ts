import { Component, OnInit } from '@angular/core';
import { PqrService } from '../pqr.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-creacion-pqrs',
  templateUrl: './creacion-pqrs.component.html',
  styleUrls: ['./creacion-pqrs.component.scss']
})
export class CreacionPQRSComponent implements OnInit {
  datos: any = {};
  tabMostrar: number;
  identificaiconCliente: any;
  // listados
  listadoTipoCliente: any[];
  listadoLineaNegocio: any[];
  listadoNegocio: any[];
  //formulario
  datosBasicosDisabled: boolean;
  mensaje:any;
  quillModules: any = {
    toolbar: [
        ['bold', 'italic', 'underline'],
        [{align: []}, {list: 'ordered'}, {list: 'bullet'}],
        ['clean']
    ]
};
  listadoTipoPQRS: any[];
  listadoCasualPQRS: any[];
  listadoSolucionPQRS: any[];
  listadoResponsablePQRS: any[];
  listadoOrigenCliente: any[];
  constructor(private _pqrService: PqrService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(param => {
      this.identificaiconCliente = param.cliente
    })
    this.tabMostrar = 1
    this.buscarListados();
  }

  buscarListados() {
    //datos ingreso
    let urlOrigenCliente = `/tk/informacion-pqrs-origen`;
    this._pqrService
      .getListados(urlOrigenCliente)
      .subscribe((response: any) => {
        if (response) {
          this.listadoOrigenCliente = response;
        } else {
          this.listadoOrigenCliente = [];
        }
      });
    let urlTIpoCliente = `/tk/informacion-tipos-cliente`;
    this._pqrService
      .getListados(urlTIpoCliente)
      .subscribe((response: any) => {
        if (response) {
          this.listadoTipoCliente = response;
        } else {
          this.listadoTipoCliente = [];
        }
      });
    let urlLineaNegocio = `/tk/informacion-lineas-negocio`;
    this._pqrService
      .getListados(urlLineaNegocio)
      .subscribe((response: any) => {
        if (response) {
          this.listadoLineaNegocio = response;
        } else {
          this.listadoLineaNegocio = [];
        }
      });
    //datos basicos
    let urlinfoCliente = `/informacion-cliente/${this.identificaiconCliente}`;
    this._pqrService
      .getListados(urlinfoCliente)
      .subscribe((response: any) => {
        if (response) {
          this.datos.identificacion = this.identificaiconCliente;
          this.datos.nombres = `${response.primerNombre} ${response.segundoNombre}`;
          this.datos.apellidos = `${response.primerApellido} ${response.segundoApellido}`;
          this.datos.departamento = `${response.departamento}`;
          this.datos.ciudad = `${response.ciudad}`;
          this.datos.direccion = `${response.direccion}`;
          this.datos.barrio = `${response.barrio}`;
          this.datos.telefono = `${response.telefono==0?'':response.telefono+' / '}${response.celular}`;
          this.datos.email = `${response.email}`;
          this.datosBasicosDisabled=true
        } else {
          this.datos.identificacion = this.identificaiconCliente;
          this.datos.nombres ='';
          this.datos.apellidos ='';
          this.datos.departamento ='';
          this.datos.ciudad ='';
          this.datos.direccion ='';
          this.datos.barrio ='';
          this.datos.telefono ='';
          this.datos.email ='';
          this.datosBasicosDisabled=false;
        }
      });
    //detalle de PQRS
    let urltipoPQRS = `/tk/informacion-tipo-pqrs`;
    this._pqrService
      .getListados(urltipoPQRS)
      .subscribe((response: any) => {
        if (response) {
          this.listadoTipoPQRS = response;
        } else {
          this.listadoTipoPQRS = [];
        }
    });
  }
  //datos ingreso
  negociosCabeceras(tipo) {
    let url = `/pqrs-negocios-cabecera/${tipo}/${this.identificaiconCliente}`;
    this._pqrService
      .getListados(url)
      .subscribe((response: any) => {
        if (response) {
          this.listadoNegocio = response;
        } else {
          this.listadoNegocio = [];
        }
      });
  }
  seleccionarNegocio(negocio) {
    let index = this.listadoNegocio.findIndex(data => data.codigoNegocio === negocio);
    if (index != undefined) {
      this.datos.agencia = this.listadoNegocio[index].agencia;
      this.datos.entidad = this.listadoNegocio[index].entidad;
    } else {
      this.datos.agencia = '';
      this.datos.entidad = '';
    }
  }
  //detalles
  buscarSelectDinamico(path,tipo,variable) {
    let url = `/${path}/${tipo}`;
    this._pqrService
      .getListados(url)
      .subscribe((response: any) => {
        if (response) {
          this[variable] = response;
        } else {
          this[variable] = [];
        }
      });
  }
  mostrarMensaje(){
    debugger;
    console.log(this.mensaje);
  }



  guardar() {
    alert(this.identificaiconCliente);
  }
}

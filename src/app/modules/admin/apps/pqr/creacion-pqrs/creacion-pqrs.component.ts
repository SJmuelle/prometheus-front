import { Component, OnInit } from '@angular/core';
import { PqrService } from '../pqr.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  mensaje: any;
  quillModules: any = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
      ['clean']
    ]
  };
  listadoTipoPQRS: any[];
  listadoCasualPQRS: any[];
  listadoSolucionPQRS: any[];
  listadoResponsablePQRS: any[];
  listadoOrigenCliente: any[];
  clienteExistente: boolean;
  constructor(private _pqrService: PqrService, private _activatedRoute: ActivatedRoute,   private router: Router,) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(param => {
      this.identificaiconCliente = param.cliente
    })
    this.tabMostrar = 1
    this.buscarListados();
    this.datos = {
      campana:'',
      origen:null,
      tipo:null,
      codigoNegocio:'',
      agencia:'',
      entidad:'',
      identificacion:'',
      nombres:'',
      apellidos:'',
      departamento:'',
      ciudad:'',
      barrio:'',
      direccion:'',
      telefono:'',
      email:'',
      causal:null,
    }
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
    if(this.identificaiconCliente==0){
      this.datos.identificacion = '';
      this.datos.nombres = '';
      this.datos.apellidos = '';
      this.datos.departamento = '';
      this.datos.ciudad = '';
      this.datos.direccion = '';
      this.datos.barrio = '';
      this.datos.telefono = '';
      this.datos.email = '';
      this.datosBasicosDisabled = false;
      this.clienteExistente = false;
    }else{
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
            this.datos.telefono = `${response.telefono == 0 ? '' : response.telefono + ' / '}${response.celular}`;
            this.datos.email = `${response.email}`;
            this.datosBasicosDisabled = false
            this.clienteExistente = true;
          } else {
            this.datos.identificacion = this.identificaiconCliente;
            this.datos.nombres = '';
            this.datos.apellidos = '';
            this.datos.departamento = '';
            this.datos.ciudad = '';
            this.datos.direccion = '';
            this.datos.barrio = '';
            this.datos.telefono = '';
            this.datos.email = '';
            this.datosBasicosDisabled = false;
            this.clienteExistente = true;
          }
        });
    }
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
  //datos basicos
  buscarDatosBasicos(){
    let urlinfoCliente = `/informacion-cliente/${this.identificaiconCliente}`;
    this._pqrService
      .getListados(urlinfoCliente)
      .subscribe((response: any) => {
        if(response){
          Swal.fire(
            '¡Advertencia!',
            'Esta opción es para clientes nuevos, por favor ingresar mediante hoja de vida/historial de PQRS/Crear PQRS.',
            'warning'
          );
          setTimeout(() => {
            this.router.navigateByUrl('dashboard');
          }, 1000);
        }
      });
  }
  //detalles
  buscarSelectDinamico(path, tipo, variable) {
    let url = `/${path}/${tipo}`;
    this._pqrService
      .getListados(url)
      .subscribe((response: any) => {
        if (response) {
          this[variable] = response;
          if (variable == "listadoResponsablePQRS") {
            this.datos.responsable = this.listadoResponsablePQRS[0].login;
            let index = this.listadoSolucionPQRS.findIndex(data => data.id == tipo);
            if (index != -1) {
              this.datos.fechaParaSolucion = this.listadoSolucionPQRS[index].diaSolucion;
            } else {
              this.datos.fechaParaSolucion = '';
            }
          }
        } else {
          this[variable] = [];
        }
      });
  }
  mostrarMensaje() {
    console.log(this.mensaje);
  }



  guardar() {
    console.log(this.datos);

    let data = {
      "empresa": "FINV",
      "campanha": this.datos.campana,
      "origenPqrs": parseInt(this.datos.origen) ,
      "tipoCliente": parseInt(this.datos.tipo),
      "codigoNegocio": this.datos.codigoNegocio,
      "sucursal": this.datos.agencia,
      "entidad": this.datos.entidad,
      "idCliente": this.datos.identificacion,
      "nombres": this.datos.nombres,
      "apellidos": this.datos.apellidos,
      "departamento": this.datos.departamento,
      "ciudad": this.datos.ciudad,
      "barrio": this.datos.barrio,
      "direccion": this.datos.direccion,
      "celular": this.datos.telefono,
      "email": this.datos.email,
      "idSolucion": parseInt(this.datos.solucion),
      "detallePqrs": this.datos.descripcion,
      "idPqrspadre": '',
      "fechaSolucion": '',
    }
    let url = "/agregar-informacion-pqrs";
    Swal.fire({ title: 'Cargando', html: 'Guardando información de PQRS', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._pqrService
      .Create(url, data)
      .subscribe((response: any) => {
        Swal.close();
        if (response) {
          if (response.status == 200) {
            Swal.fire(
              '¡Información!',
              `Se guardo el registro con exito`,
              'success'
            );
          } else {
            Swal.fire(
              '¡Información!',
              `Hubo un error en los datos enviados, favor evaluar`,
              'success'
            );
          }
        } else {
          Swal.fire(
            '¡Advertencia!',
            'Error en la respuesta del servicio, favor intente nuevamente',
            'error'
          );
        }

      });
  }
}

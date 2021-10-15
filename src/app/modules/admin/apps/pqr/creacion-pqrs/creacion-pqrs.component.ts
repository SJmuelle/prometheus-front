import { Component, OnInit } from '@angular/core';
import { PqrService } from '../pqr.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { InsertarCausalLegalComponent } from './insertar-causal-legal/insertar-causal-legal.component';
import { InsertarAdjuntosComponent } from './insertar-adjuntos/insertar-adjuntos.component';

@Component({
  selector: 'app-creacion-pqrs',
  templateUrl: './creacion-pqrs.component.html',
  styleUrls: ['./creacion-pqrs.component.scss']
})
export class CreacionPQRSComponent implements OnInit {
  datos: any = {};
  panelOpenState: boolean = false;
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
  filename: string;
  file: any;
  evidencia: any = [];
  causalesLegales: any = [];
  constructor(private _pqrService: PqrService,
    private _activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(param => {
      this.identificaiconCliente = param.cliente
    })
    this.tabMostrar = 1
    this.buscarListados();
    this.datos = {
      campana: '',
      origen: null,
      tipo: null,
      codigoNegocio: '',
      agencia: '',
      entidad: '',
      identificacion: '',
      nombres: '',
      apellidos: '',
      departamento: '',
      ciudad: '',
      barrio: '',
      direccion: '',
      telefono: '',
      email: '',
      causal: null,
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
    let urlLineaNegocio = `/informacion-lineas-negocio/${this.identificaiconCliente}`;
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
    if (this.identificaiconCliente == 0) {
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
      this.datos.tipo = 2;
      this.datos.tipoPQRS_nombre = 'Nuevo';
    } else {
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
            this.datosBasicosDisabled = true
            this.clienteExistente = false;
            this.datos.tipo = 1;
            this.datos.tipoPQRS_nombre = 'Cliente';
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
            this.datos.tipo = 2;
            this.datos.tipoPQRS_nombre = 'Nuevo';

          }
        });
    }
    //detalle de PQRS
    let urltipoPQRS = `/tk/select-tipo-pqrs`;
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


  validaForm(tab) {
    // debugger;
    switch (tab) {
      case 1:
        if ((this.datos.origen != '') && (this.datos.origen != undefined) && (this.datos.origen != null)) {
          this.tabMostrar = 2
        }
        break;
      case 3:
        if (
          (this.datos.tipoPQRS != '') && (this.datos.tipoPQRS != undefined) && (this.datos.tipoPQRS != null) &&
          (this.datos.solucion != '') && (this.datos.solucion != undefined) && (this.datos.solucion != null) &&
          (this.datos.causal != '') && (this.datos.causal != undefined) && (this.datos.causal != null)
        ) {
          this.tabMostrar = 4
        }
        break;
      default:
        break;
    }

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

  eliminarCausal(dato) {
    debugger
    this.causalesLegales.splice(dato, 1);
  }

  //datos basicos
  buscarDatosBasicos() {
    let urlinfoCliente = `/informacion-cliente/${this.identificaiconCliente}`;
    this._pqrService
      .getListados(urlinfoCliente)
      .subscribe((response: any) => {
        if (response) {
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
  validoLegal() {
    // this.datos.responsable = this.listadoResponsablePQRS[0].login;
    let index = this.listadoTipoPQRS.findIndex(data => data.id == this.datos.tipoPQRS);
    if (index != -1) {
      this.datos.legal = this.listadoTipoPQRS[index].legal == 'Si' ? true : false;
      this.datos.Tiponombre = this.listadoTipoPQRS[index].tipoPqrs;
    }

  }
  buscarSelectDinamico(path, tipo, variable, titulo) {
    let url = `/${path}/${tipo}`;
    this._pqrService
      .getListados(url)
      .subscribe((response: any) => {
        if (response.length != 0) {
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
          Swal.fire(
            '¡Información!',
            `No tiene ${titulo} parametrizada`,
            'error'
          );
          this[variable] = [];
        }
      });
  }

  mostrarMensaje() {
    console.log(this.datos.descripcion);
  }



  guardar() {
    console.log(this.datos);

    let data = {
      "empresa": "FINV",
      "campanha": this.datos.campana,
      "origenPqrs": parseInt(this.datos.origen),
      "tipoCliente": parseInt(this.datos.tipo),
      "codigoNegocio": this.datos.negocio,
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
      "detallePqrs": this.datos.descripcion + '',
      "idPqrspadre": '',
      "fechaSolucion": this.datos.fechaParaSolucion,
    }
    let url = "/agregar-informacion-pqrs";
    Swal.fire({ title: 'Cargando', html: 'Guardando información de PQRS', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._pqrService
      .Create(url, data)
      .subscribe((response: any) => {
        Swal.close();
        if (response) {
          if (response.status == 200) {
            if (response.data.salida != 200) {
              Swal.fire(
                '¡Información!',
                `Datos incompletos, favor evaluar`,
                'error'
              );
              return;
            }
            //contesto bien
            //valida si hay adjunto

            this.guardHijos(response.data, data, url);
            this.guardarAdjunto(response.data.idSolucion);



            //redirijo a gestionar
            // Swal.fire(
            //   '¡Información!',
            //   `PQRS guardado con exito, PQRS ${response.data.idPadre}`,
            //   'success'
            // );
            // setTimeout(() => {
            //   let url = `pqr/gestion/${response.data.idPadre}`;
            //   this.router.navigateByUrl(url);
            // }, 1200);


          } else {
            Swal.fire(
              '¡Información!',
              `Hubo un error en los datos enviados, favor validar`,
              'error'
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

  public onCharge(input: HTMLInputElement, ind): void {
    // this.showButtonSave = false;
    // this.showButtonRecord = true;
    // this.nameFile = 'masivo.cvs';
    const files = input.files;
    console.log(files);
    if (files && files.length) {
      const fileToRead = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(fileToRead);
      reader.onloadend = () => {
        const file: string | ArrayBuffer = reader.result;
        this.evidencia[ind].file = file;
        this.evidencia[ind].filename = fileToRead.name;
        let nombre = this.evidencia[ind].filename.split('.');
        this.evidencia[ind].ext = nombre[1];
        this.evidencia[ind].nombre = nombre[0];
        console.log(this.evidencia[ind].file);

      };
    }
  }
  guardarAdjunto(ind) {
    this.evidencia.forEach(element => {
      if (element.file != null) {
        let nombre = element.filename.split('.');
        let data = {
          "idComentario": ind + '',
          "nombreArchivo": nombre[0],
          "extension": nombre[1],
          "fuente": "registro-pqrs",
          "identificador": "pqrs",
          "base64": element.file,
          "descripcion": element.descripcion,
  
        }
        let url = "/file/cargar-archivo-pqrs";
        this._pqrService
          .postFile(url, data)
          .subscribe((response: any) => {
         
            if (response) {
            
            }
          })
      }
    });
    
  }

  insertarCausal() {
    const dialogRef = this.dialog.open(InsertarCausalLegalComponent, {
      width: '60%',
      data: {
        Tiponombre: this.datos.Tiponombre,
        tipo: this.datos.tipoPQRS
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      let dataModal = result;
      if (
        (dataModal.solucion != '') && (dataModal.solucion != undefined) && (dataModal.solucion != null) &&
        (dataModal.causal != '') && (dataModal.causal != undefined) && (dataModal.causal != null)
      ) {
        this.causalesLegales.push(
          dataModal
        )
      }
    });
  }

  guardHijos(respuesta, dataPadre, url) {
    this.causalesLegales.forEach(element => {
      let dataHijos = {
        "empresa": "FINV",
        "campanha": this.datos.campana,
        "origenPqrs": parseInt(this.datos.origen),
        "tipoCliente": parseInt(this.datos.tipo),
        "codigoNegocio": this.datos.negocio,
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
        "idSolucion": parseInt(element.solucion),
        "detallePqrs": this.datos.descripcion + '',
        "idPqrspadre": respuesta.idPadre+'',
        "fechaSolucion": element.fechaParaSolucion,
      }
      this._pqrService
        .Create(url, dataHijos)
        .subscribe((response: any) => {
          Swal.close();
          if (response) {
            if (response.status == 200) {
              if (response.data.salida != 200) {
                Swal.fire(
                  '¡Información!',
                  `Datos incompletos, favor evaluar`,
                  'error'
                );
                return;
              }
            
              this.guardarAdjunto(response.data.idSolucion);

            } else {
              Swal.fire(
                '¡Información!',
                `Hubo un error en los datos enviados, favor validar`,
                'error'
              );
              return;
            }
          } else {
            Swal.fire(
              '¡Advertencia!',
              'Error en la respuesta del servicio, favor intente nuevamente',
              'error'
            );
            return;
          }
        });
    });
    Swal.fire(
      '¡Información!',
      `Se guardo el registro con exito`,
      'success'
    );
    setTimeout(() => {
        let url = `pqr/gestion/${ respuesta.idPadre}`;
        this.router.navigateByUrl(url);
      }, 1200);

  
  }

  insertadjunti(){
    const dialogRef = this.dialog.open(InsertarAdjuntosComponent, {
      width: '60%',
      data: {
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      let dataModal = result;
      if (
        (dataModal.file != '') && (dataModal.file != undefined) && (dataModal.file != null) &&
        (dataModal.descripcion != '') && (dataModal.descripcion != undefined) && (dataModal.descripcion != null)
      ) {
        this.evidencia.push(
          dataModal
        )
      }
    });
  }
}

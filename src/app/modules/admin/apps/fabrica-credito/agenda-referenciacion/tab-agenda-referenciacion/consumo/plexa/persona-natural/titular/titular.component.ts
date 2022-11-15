import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartamentosCiudadesService } from 'app/core/services/departamentos-ciudades.service';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { GenericasService } from 'app/core/services/genericas.service';
import { OfertaService } from 'app/core/services/oferta.service';
import { UtilityService } from 'app/resources/services/utility.service';
import { DirectionsBasicComponent } from 'app/shared/modal/directions-basic/directions-basic.component';
import { Subscription, Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'CONSUMO-NATURAL-TITULAR',
  templateUrl: './titular.component.html',
  styleUrls: ['./titular.component.scss']
})
export class TitularConsumoPlexaComponent implements OnInit {
  @Input() currentStep: number;

  // currentStep = 1;
  @ViewChild('editor') editor;
  public form: FormGroup;
  public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
  public undadNegocio: string = this.route.snapshot.paramMap.get('unidadNegocio');
  public identificacion: string = this.route.snapshot.paramMap.get('id');
  public subscription$: Subscription;
  public unSubscribe$: Subject<any> = new Subject<any>();
  public departamentos$: Observable<any>;
  public ciudades$: Observable<any>;
  public barrios$: Observable<any>;
  public actividadEconomica$: Observable<any>;
  public tipoCombustible$: Observable<any>;
  public formOferta: FormGroup;
  public fabricaDatos: any;
  public MostrarfabricaDatos: boolean = false;
  public mensajeQuill: any;
  public capacidadPago$: Observable<any>;
  public listadoOferta: any;
  public quillModules: any = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
    ],
  };
  // consulta todos los datos de la solicitud 
  public datosCompletoSolicitud: any;
  public mostrarDepartamento: boolean;
  public mostrarCiudad: boolean;
  public mostrarBarrio: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fabricaCreditoService: FabricaCreditoService,
    public utility: UtilityService,
    private fb: FormBuilder,
    private departamentosCiudadesService: DepartamentosCiudadesService,
    private genericaServices: GenericasService,
    private _dialog: MatDialog,
    private ofertaService: OfertaService
  ) {
    this.createFormulario();
    this.getFabricaCreditoAgenda(this.numeroSolicitud, this.identificacion);

  }

  ngOnInit(): void {
    this.getDepartamentos();
    this.getTipoCombustible();
    this.getCapacidadPago(Number(this.numeroSolicitud));
    this.getTodosFabricaCreditoAgenda(this.numeroSolicitud, this.identificacion);
  }

  /**
 * @description: Valida que el campo solo sea numeros
 */
  public soloNumero(field: string) {
    return this.form.controls[field].hasError('pattern');
  }

  /**
 * @description :modal de direcion
 */
  public openModalDirection(): void {
    const dialogRef = this._dialog.open(DirectionsBasicComponent, {
      width: '60%',
      data: {
        direccion: '',
      },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((res) => {
      const dataModal: any = res;
      if (dataModal.viaNombre != undefined) {
        this.form.controls.direccionResidenciaCorregido.setValue(
          (dataModal.viaNombre == undefined
            ? ''
            : `${dataModal.viaNombre}`) +
          (dataModal.callePrincipal == undefined
            ? ''
            : ` ${dataModal.callePrincipal}`) +
          (dataModal.numero == undefined
            ? ''
            : ` # ${dataModal.numero}`) +
          (dataModal.numero2 == undefined
            ? ''
            : ` - ${dataModal.numero2}`) +
          (dataModal.complemento == undefined
            ? ''
            : ` ${dataModal.complemento}`));
      }
    });
  }

  /**
 * @description :cantidad de caracteres del mensajes
 */
  logChange($event) {
    console.log(this.editor);
    this.mensajeQuill = $event.text;
  }

  /**
 * @description :creando el formulario
 */
  private createFormulario(): void {
    this.form = this.fb.group({
      unidadNegocio: [''],
      numeroSolicitud: [''],
      tipoReferencia: [''],
      idReferencia: [''],
      nombreCompleto: [''],
      celular: [''],
      numeroFormularioValida: [''],
      numeroFormularioValida_bool: Boolean,
      telefonoContacto: [''],
      telefonoContactoValida: [''],
      telefonoContactoValida_bool: Boolean,
      telefonoContactoCorregido: [''],
      telefonoContactoObservacion: [''],
      departamentoResidencia: [''],
      departamentoResidenciaValida: [''],
      departamentoResidenciaValida_bool: Boolean,
      departamentoResidenciaCorregido: [''],
      descripcionDepartamento: [''],
      descripcionDepartamentoCorregido: [''],
      ciudadResidencia: [''],
      ciudadResidenciaValida: [''],
      ciudadResidenciaValida_bool: Boolean,
      ciudadResidenciaCorregido: [''],
      descripcionCiudad: [''],
      descripcionCiudadCorregida: [''],
      direccionResidencia: [''],
      direccionResidenciaValida: [''],
      direccionResidenciaValida_bool: Boolean,
      direccionResidenciaCorregido: [''],
      barrioResidencia: [''],
      barrioResidenciaValida: [''],
      barrioResidenciaValida_bool: Boolean,
      barrioResidenciaCorregido: [''],
      descripcionBarrio: [''],
      descripcionBarrioCorregido: [''],
      correoElectronico: [''],
      correoElectronicoValida: [''],
      correoElectronicoValida_bool: Boolean,
      correoElectronicoCorregido: [''],
      celularReconocerValida: [''],
      celularReconocerValida_bool: Boolean,
      conoceCelularReconocerValida: [''],
      conoceCelularReconocerValida_bool: Boolean,
      comentarioReconocerCelular: [''],
      direccionReconocerValida: [''],
      direccionReconocerValida_bool: Boolean,
      conoceDireccionReconocerValida: [''],
      conoceDireccionReconocerValida_bool: Boolean,
      comentarioReconocerDireccion: [''],
      emailReconocerValida: [''],
      emailReconocerValida_bool: Boolean,
      conoceEmailReconocerValida: [''],
      conoceEmailReconocerValida_bool: Boolean,
      comentarioReconocerEmail: [''],
      actividadEspecifica: [''],
      actividadEspecificaValida: [''],
      actividadEspecificaValida_bool: Boolean,
      actividadEspecificaCorregida: [''],
      ingresosAdicionalesValida: [''],
      ingresosAdicionalesValida_bool: Boolean,
      otrosIngresos: [''],
      comentarioOtrosIngresos: [''],
      otrosIngresosCorregido: [''],
      diasTrabajados: [''],
      diastrabajadosvalida: [''],
      diastrabajadosvalida_bool: Boolean,
      diasTrabajadosCorregido: [''],
      tipoCombustible: [''],
      tipoCombustibleValida: [''],
      tipoCombustibleValida_bool: Boolean,
      tipoCombustibleCorregido: [''],
      compraCombustibleDia: [''],
      compraCombustibleValida: [''],
      compraCombustibleValida_bool: Boolean,
      compraCombustiblediaCorregido: [''],
      referenciaValidada: [''],
      referenciaValida_bool: Boolean,
      comentarioValidacion:[''],
      resultadoReferencia:[''],
      recurso: [''],
    });

    this.formOferta = this.fb.group({
      valorSolicitado: [''],
      plazo: [''],
      tanqueoDia: [''],
      tipoCombustible: [''],
      ingresosDiarios: [''],
      ingresos: [''],
      valorCuotaDiaria: [''],
      valorCuota:[''],
      numeroSolicitud: Number(this.numeroSolicitud),
    })
  }

  /**
   * @description: Obtiene la data para cargar al formulario
   */
  private getFabricaCreditoAgenda(numeroSolicitud: string, identificacion: string): void {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    const datosSolicitud: any = {
      "numeroSolicitud": this.numeroSolicitud,
      "tipo": "T",
      "identificacion": this.identificacion
    };
    this.fabricaCreditoService.getDatosFabricaAgendaReferenciacion(datosSolicitud).pipe(takeUntil(this.unSubscribe$))
      .subscribe(({ data }) => {
        Swal.close();
        console.log(data);
        this.MostrarfabricaDatos = true;
        this.fabricaDatos = { ...data }
        this.form.patchValue(data);
        this.form.controls['departamentoResidenciaValida_bool'].setValue(this.form.value.departamentoResidenciaValida == 'N' ? true : false)
        this.form.controls['ciudadResidenciaValida_bool'].setValue(this.form.value.ciudadResidenciaValida == 'N' ? true : false)
        this.form.controls['barrioResidenciaValida_bool'].setValue(this.form.value.barrioResidenciaValida == 'N' ? true : false)

        if (data.departamentoResidenciaCorregido) {
          this.getCiudades(data.departamentoResidenciaCorregido);
        } else {
          this.getCiudades(data.departamentoResidencia);
        }

        if (data.ciudadResidenciaCorregido) {
          this.getBarrios(data.ciudadResidenciaCorregido);
        } else {
          this.getBarrios(data.ciudadResidencia);
        }


        //para el backend --LUIS CANTILLO-- la palabra valida signica modificado, es decir si el dato fue modificado o si esta malo colocar un s por lo tanto 
        //la estructura del envio esta invertida 
        this.form.controls['correoElectronicoValida_bool'].setValue(this.form.value.correoElectronicoValida == 'N' ? true : false)
        this.form.controls['direccionResidenciaValida_bool'].setValue(this.form.value.direccionResidenciaValida == 'N' ? true : false)
        this.form.controls['numeroFormularioValida_bool'].setValue(this.form.value.numeroFormularioValida == 'N' ? true : false)
        this.form.controls['telefonoContactoValida_bool'].setValue(this.form.value.telefonoContactoValida == 'N' ? true : false)
        this.form.controls['actividadEspecificaValida_bool'].setValue(this.form.value.actividadEspecificaValida == 'N' ? true : false)
        this.form.controls['ingresosAdicionalesValida_bool'].setValue(this.form.value.ingresosAdicionalesValida == 'N' ? true : false)
        this.form.controls['diastrabajadosvalida_bool'].setValue(this.form.value.diastrabajadosvalida == 'N' ? true : false)
        this.form.controls['tipoCombustibleValida_bool'].setValue(this.form.value.tipoCombustibleValida == 'N' ? true : false)
        this.form.controls['compraCombustibleValida_bool'].setValue(this.form.value.compraCombustibleValida == 'N' ? true : false)

        //reconocer va tener una logica distinta-->donde si lo conce es SI y no lo conoce es NO
        this.form.controls['celularReconocerValida_bool'].setValue(this.form.value.celularReconocerValida == 'S' ? true : false)
        this.form.controls['conoceCelularReconocerValida_bool'].setValue(this.form.value.conoceCelularReconocerValida == 'S' ? true : false)
        this.form.controls['direccionReconocerValida_bool'].setValue(this.form.value.direccionReconocerValida == 'S' ? true : false)
        this.form.controls['conoceDireccionReconocerValida_bool'].setValue(this.form.value.conoceDireccionReconocerValida == 'S' ? true : false)
        this.form.controls['emailReconocerValida_bool'].setValue(this.form.value.emailReconocerValida == 'S' ? true : false)
        this.form.controls['conoceEmailReconocerValida_bool'].setValue(this.form.value.conoceEmailReconocerValida == 'S' ? true : false)


        //tambien la logica es diferente pq lo tamn como pregunta 
        this.form.controls['referenciaValida_bool'].setValue(this.form.value.referenciaValidada == 'S' ? true : false)

        if (data.ciudadResidenciaCorregido) {
          this.getBarrios(data.ciudadResidenciaCorregido);
        } else {
          this.getBarrios(data.ciudadResidencia);
        }

        this.form.controls['compraCombustiblediaCorregido'].setValue(this.utility.formatearNumero(String(this.form.value.compraCombustiblediaCorregido)));
        this.form.controls['otrosIngresosCorregido'].setValue(this.utility.formatearNumero(String(this.form.value.otrosIngresosCorregido)));


      });
  }

  public seleccionDepartamento(event: MatSelectChange): void {
    const codigo: string = event.value;
    this.getCiudades(codigo);
  }


  /**
   * @description: Selecciona el codigo para cargar el api barrios
   *
   */
  public seleccionCiudad(event: MatSelectChange): void {
    const codigo: string = event.value;
    this.getBarrios(codigo);
  }

  /**
 * @description: Obtiene el listado de ciudades
 */
  private getCiudades(codigo: string): void {
    this.ciudades$ = this.departamentosCiudadesService.getCiudades(codigo);
  }

  /**
   * @description: Obtiene el listado de departamento
   */
  private getDepartamentos(): void {
    this.departamentos$ = this.departamentosCiudadesService.getDepartamentos();
  }



  /**
   * @description: Obtiene el listado de barrios
   */
  private getBarrios(codigo: string): void {
    this.barrios$ = this.departamentosCiudadesService.getBarrios(codigo);
  }


  private getActividadEconomica(codigo: string): void {
    this.actividadEconomica$ = this.genericaServices.postActividadEconomica(codigo);
  }

  /**
* * @description: Obtiene los tipos de estados civiles
*/
  private getTipoCombustible(): void {
    this.tipoCombustible$ = this.genericaServices.getTipoCombustibles();
  }



  /**
  * @description:
  */
  public onPostDatos(): void {
    const datos: any = this.form.getRawValue();
    const { ...data } = datos;


    //para el backend --LUIS CANTILLO-- la palabra valida signica modificado, es decir si el dato fue modificado o si esta malo colocar un s por lo tanto 
    //la estructura del envio esta invertida 
    const numeroFormularioValida = this.form.value.numeroFormularioValida_bool == true ? 'N' : 'S';
    const telefonoContactoValida = this.form.value.telefonoContactoValida_bool == true ? 'N' : 'S';
    const departamentoResidenciaValida = this.form.value.departamentoResidenciaValida_bool == true ? 'N' : 'S';
    const ciudadResidenciaValida = this.form.value.ciudadResidenciaValida_bool == true ? 'N' : 'S';
    const direccionResidenciaValida = this.form.value.direccionResidenciaValida_bool == true ? 'N' : 'S';
    const barrioResidenciaValida = this.form.value.barrioResidenciaValida_bool == true ? 'N' : 'S';
    const correoElectronicoValida = this.form.value.correoElectronicoValida_bool == true ? 'N' : 'S';
    const actividadEspecificaValida = this.form.value.actividadEspecificaValida_bool == true ? 'N' : 'S';
    const ingresosAdicionalesValida = this.form.value.ingresosAdicionalesValida_bool == true ? 'N' : 'S';
    const diastrabajadosvalida = this.form.value.diastrabajadosvalida_bool == true ? 'N' : 'S';
    const tipoCombustibleValida = this.form.value.tipoCombustibleValida_bool == true ? 'N' : 'S';
    const compraCombustibleValida = this.form.value.compraCombustibleValida_bool == true ? 'N' : 'S';
    
    //logica diferente
    const celularReconocerValida = this.form.value.celularReconocerValida_bool == true ? 'S' : 'N';
    const conoceCelularReconocerValida = this.form.value.conoceCelularReconocerValida_bool == true ? 'S' : 'N';
    const direccionReconocerValida = this.form.value.direccionReconocerValida_bool == true ? 'S' : 'N';
    const conoceDireccionReconocerValida = this.form.value.conoceDireccionReconocerValida_bool == true ? 'S' : 'N';
    const emailReconocerValida = this.form.value.emailReconocerValida_bool == true ? 'S' : 'N';
    const conoceEmailReconocerValida = this.form.value.conoceEmailReconocerValida_bool == true ? 'S' : 'N';

    //empanda de lucho
    const referenciaValida = this.form.value.referenciaValida_bool == true ? 'S' : 'N';


    //valor 
    const otrosIngresosCorregidoFormato = Number(this.utility.enviarNumero(this.form.value.otrosIngresosCorregido.toString()));
    const compraCombustiblediaCorregidoFormato = Number(this.utility.enviarNumero(this.form.value.compraCombustiblediaCorregido.toString()));


    delete data.otrosIngresosCorregido;
    delete data.compraCombustiblediaCorregido;
    delete data.numeroFormularioValida;
    delete data.numeroFormularioValida_bool;
    delete data.telefonoContactoValida;
    delete data.telefonoContactoValida_bool;
    delete data.departamentoResidenciaValida;
    delete data.departamentoResidenciaValida_bool;
    delete data.ciudadResidenciaValida;
    delete data.ciudadResidenciaValida_bool;
    delete data.direccionResidenciaValida;
    delete data.direccionResidenciaValida_bool;
    delete data.barrioResidenciaValida;
    delete data.barrioResidenciaValida_bool;
    delete data.correoElectronicoValida;
    delete data.correoElectronicoValida_bool;
    delete data.celularReconocerValida;
    delete data.celularReconocerValida_bool;
    delete data.conoceCelularReconocerValida;
    delete data.conoceCelularReconocerValida_bool;
    delete data.direccionReconocerValida;
    delete data.direccionReconocerValida_bool;
    delete data.conoceDireccionReconocerValida;
    delete data.conoceDireccionReconocerValida_bool;
    delete data.emailReconocerValida;
    delete data.emailReconocerValida_bool;
    delete data.conoceEmailReconocerValida;
    delete data.conoceEmailReconocerValida_bool;
    delete data.actividadEspecificaValida;
    delete data.actividadEspecificaValida_bool;
    delete data.ingresosAdicionalesValida;
    delete data.ingresosAdicionalesValida_bool;
    delete data.diastrabajadosvalida;
    delete data.diastrabajadosvalida_bool;
    delete data.tipoCombustibleValida;
    delete data.tipoCombustibleValida_bool;
    delete data.compraCombustibleValida;
    delete data.compraCombustibleValida_bool;
    delete data.referenciaValida;
    delete data.referenciaValida_bool;
    delete data.comentarioValida;
    delete data.numeroSolicitud;
    delete data.diasTrabajadosCorregido;

    const datosFormularios: any = {
      numeroSolicitud: this.numeroSolicitud.toString(),
      otrosIngresosCorregido:otrosIngresosCorregidoFormato,
      compraCombustiblediaCorregido:compraCombustiblediaCorregidoFormato,
      numeroFormularioValida: numeroFormularioValida,
      telefonoContactoValida: telefonoContactoValida,
      departamentoResidenciaValida: departamentoResidenciaValida,
      ciudadResidenciaValida: ciudadResidenciaValida,
      direccionResidenciaValida: direccionResidenciaValida,
      barrioResidenciaValida: barrioResidenciaValida,
      correoElectronicoValida: correoElectronicoValida,
      celularReconocerValida: celularReconocerValida,
      conoceCelularReconocerValida: conoceCelularReconocerValida,
      direccionReconocerValida: direccionReconocerValida,
      conoceDireccionReconocerValida: conoceDireccionReconocerValida,
      emailReconocerValida: emailReconocerValida,
      conoceEmailReconocerValida: conoceEmailReconocerValida,
      actividadEspecificaValida: actividadEspecificaValida,
      ingresosAdicionalesValida: ingresosAdicionalesValida,
      diastrabajadosvalida: diastrabajadosvalida,
      tipoCombustibleValida: tipoCombustibleValida,
      compraCombustibleValida: compraCombustibleValida,
      referenciaValida: referenciaValida,
      diasTrabajadosCorregido:this.form.value.diasTrabajadosCorregido.toString(),
      ...data
    };
    Swal.fire({
      title: 'Guardar información',
      text: '¿Está seguro de guardar información?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#a3a0a0',
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.postFormularioFabrica(datosFormularios);
        console.log(this.form.getRawValue());
        console.log(datosFormularios);
      }
    });

  }

  /**
 * @description: Guardado de datos fabrica
 */
  private postFormularioFabrica(datos: any): void {
    Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    this.subscription$ = this.fabricaCreditoService.postDatosFabricaCreditoReferenciacion(datos)
      .subscribe(() => {
        Swal.fire(
          'Completado',
          'Información guardada con éxito',
          'success'
        ).then((result) => {
          if (result) {
            this.router.navigate([`credit-factory/agenda-referencing/${this.undadNegocio}/${this.numeroSolicitud}/${this.identificacion}`]);
          }
        })
        setTimeout(() => {
          this.router.navigate([`credit-factory/agenda-referencing/${this.undadNegocio}/${this.numeroSolicitud}/${this.identificacion}`]);
        }, 1000);
      }, (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          text: error.error.msg,
        });
      });
  }

  // CAPCIDAD DE PAGO Y OFERTA

  private getCapacidadPago(numeroSolicitud: number): void {
    this.capacidadPago$ = this.ofertaService.getCapacidadPagoConsumo(numeroSolicitud);
  }

  public SelectOferta(item: any): void {
    let data = {
      numeroSolicitud: Number(this.numeroSolicitud),
      numeroCapacidadPago: item.numeroCapacidadPago,
    }

    Swal.fire({
      title: 'Cargando',
      html: 'Guardando información',
      timer: 500000,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => { });

    this.ofertaService
      .SelectOfertaConsumo(data)
      .subscribe((res) => {
        Swal.close();
        debugger
        if (res.msg == 'OK') {
          this.listadoOferta=res.data;
          this.getCapacidadPago(Number(this.numeroSolicitud));
          // this.getListadoOferta(Number(this.numeroSolicitud));
        } else {
          Swal.fire('Error', res.data.resultado, 'error');
        }
      });
  }

  /**
 * Track by function for ngFor loops
 *
 * @param index
 * @param item
 */
  private getTodosFabricaCreditoAgenda(numeroSolicitud: string, identificacion: string): void {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    const datosSolicitud: any = {
      numeroSolicitud: numeroSolicitud,
      identificacion: identificacion
    };
    this.fabricaCreditoService.getDatosFabricaAgenda(datosSolicitud).pipe(takeUntil(this.unSubscribe$))
      .subscribe(({ data }) => {
        Swal.close();
        debugger
        this.datosCompletoSolicitud = data;
        this.getActividadEconomica(data.ocupacion);
        this.llenarDatosFormOferta(data)
      }); 
  }

  private llenarDatosFormOferta(data) {
    // ingresosDiarios
    if (data.valorSolicitado) {
      this.formOferta.controls['valorSolicitado'].setValue(this.utility.formatearNumero(String(data.valorSolicitado)));
    }
    if (data.ingresosDiarios) {
      this.formOferta.controls['ingresosDiarios'].setValue(this.utility.formatearNumero(String(data.ingresosDiarios)));
    }
    if (data.ingresos) {
      this.formOferta.controls['ingresos'].setValue(this.utility.formatearNumero(String(data.ingresos)));
    }
    if (data.plazo) {
      this.formOferta.controls['plazo'].setValue(this.utility.formatearNumero(String(data.plazo)));
    }
    if (data.tanqueoDia) {
      this.formOferta.controls['tanqueoDia'].setValue(this.utility.formatearNumero(String(data.tanqueoDia)));
    }
    if (data.valorCuotaDiaria) {
      this.formOferta.controls['valorCuotaDiaria'].setValue(this.utility.formatearNumero(String(data.valorCuotaDiaria)));
    }
    if (data.valorCuota) {
      this.formOferta.controls['valorCuota'].setValue(this.utility.formatearNumero(String(data.valorCuota)));
    }
    this.formOferta.controls['tipoCombustible'].setValue(data.tipoCombustible);
  }

  public recalcularOferta(): void {
    let data = {
      numeroSolicitud: Number(this.numeroSolicitud),
      plazo: Number(this.utility.enviarNumero(this.formOferta.value.plazo)),
      monto: Number(this.utility.enviarNumero(this.formOferta.value.valorSolicitado)),
      tanqueoDiario: Number(this.utility.enviarNumero(this.formOferta.value.tanqueoDiario)),
      tipoCombustible: this.formOferta.value.tipoCombustible,
      ingresosDiarios: Number(this.utility.enviarNumero(this.formOferta.value.ingresosDiarios)),
    }

    Swal.fire({
      title: 'Cargando',
      html: 'Guardando información',
      timer: 500000,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => { });

    this.ofertaService
      .recalcularOfertaConsumo(data)
      .subscribe((res) => {
        Swal.close();
        if (res.data.cre_sp_calcular_capacidad_pago_consumo == 'OK') {

          this.getCapacidadPago(Number(this.numeroSolicitud));
        } else {
          Swal.fire('Error', res.data.resultado, 'error');
        }
      });
  }
}



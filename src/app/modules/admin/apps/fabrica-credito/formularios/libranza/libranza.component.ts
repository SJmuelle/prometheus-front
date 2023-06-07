import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormularioCreditoService } from 'app/core/services/formulario-credito.service';
import { GenericasService } from 'app/core/services/genericas.service';
import { PermisosService } from 'app/core/services/permisos.service';
import moment from 'moment';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-libranza',
  templateUrl: './libranza.component.html',
  styleUrls: ['./libranza.component.scss']
})
export class LibranzaComponent implements OnInit, OnDestroy {
  form: FormGroup;
  dataInicial;
  dataGeneralIncial;
  listadoActividadEconomica: any[];
  listadoCiudades: any[];
  listadoBarrios: any[];
  editable = true;
  timerInterval: any;
  public unidadNegocio: 1;
  public tipoIdentificacion: string = this.route.snapshot.paramMap.get('tipoIdentificacion');
  public identificacion: string = this.route.snapshot.paramMap.get('id');
  public numeroSolicitud: string = this.route.snapshot.paramMap.get('numeroSolicitud');
  public unSubscribe$: Subject<any> = new Subject<any>();
  public plazosCredito: any;
  public salarioMinimo$: Observable<any>;
  public salarioMinimo: number = 0;
  public habilitarInput: boolean = false;
  public numeroSolicitudTemporal: number;
  public otpValidado: boolean = false;
  public validandoOTPLoading: boolean = false;
  public changeTextOTP: boolean = false;
  fechaActual: any = moment().locale('co');
  public contador: number = 180;

  constructor(
    private fb: FormBuilder,
    private _formularioCreditoService: FormularioCreditoService,
    private route: ActivatedRoute,
    private router: Router,
    private el: ElementRef,
    private genericaServices: GenericasService,
    public _permisosService: PermisosService
  ) { }

  ngOnInit(): void {
    this.cargueInicial();
    this.form = this.fb.group({
      tipoDocumento: ['', [Validators.required]],
      identificacion: ['', [Validators.required, Validators.pattern('^[0-9]{5,10}$')]],
      primerNombre: ['', [Validators.required, Validators.pattern('^[a-zA-zÀ-úA-Z \u00f1\u00d1]+$')]],
      primerApellido: ['', [Validators.required, Validators.pattern('^[a-zA-zÀ-úA-Z \u00f1\u00d1]+$')]],
      celular: ['', [Validators.required, Validators.pattern('^[3][0-9]{9}$')]],
      email: ['', [Validators.required, Validators.email]],
      genero: [''],
      fechaNacimiento: ['', [Validators.required, this.validatedDate.bind(this), this.validateMayorEdad.bind(this)]],
      // nivelEstudio: ['', [Validators.required]],
      // estrato: ['', [Validators.required]],

      // tipoActividad: ['', [Validators.required]],
      // camaraComercio: ['', [Validators.required]],
      // tipoLocal: ['', [Validators.required]],
      // actividadEconomica: ['', [Validators.required]],
      // actividadEspecifica: ['', [Validators.required]],
      // antiguedadActividad: ['', [Validators.required, Validators.min(0)]],
      // antiguedadNegocio: ['', [Validators.required, Validators.min(0)]],
      // departamentoNegocio: ['', [Validators.required]],
      // ciudadNegocio: ['', [Validators.required]],
      // barrioNegocio: ['', [Validators.required]],
      // valorCredito: ['', [Validators.required, Validators.min(this.salarioMinimo), Validators.max(100000000)]],
      // plazoCredito: ['', [Validators.required]],
      // asesorMicro: [''],
      // antiguedadLocal: [0],
      // autorizacionCentrales: [true],
      // clausulaVeracidad: [true],
      // terminosCondiciones: [true],
      // numeroOTP: [''],
      // numOTP1: [''],
      // numOTP2: [''],
      // numOTP3: [''],
      // numOTP4: [''],
      // numOTP5: [''],
      // numOTP6: [''],
      asesorComercial: [''],
      pagaduria: ['', [Validators.required]],
      otraPagaduria: [{ value: '', disabled: true }],
      tipoContrato: ['', [Validators.required]],
      fechaVinculacion: ['', [Validators.required]],
      fechaFinalizacion: [{ value: '', disabled: true }],
      salario: ['', [Validators.required]],
      comisiones: ['', [Validators.required]],
      descuentos: ['', [Validators.required]],
      monto: ['', [Validators.required]],
      cuotas: ['', [Validators.required]],
      tipoCargoPerfil: [''],
      rechazoContratoFijo: ['OK'],
      salario_minimo: [''],
      min: [''],
      max: [''],
      monto_minimo: [''],
      monto_maximo: [''],
    });

    this.agregarValidaciones();

    // this.form.get('nivelEstudio')?.valueChanges.subscribe((e: string) => {
    //   this.cargueActividadEconomica()
    // });
    // this.form.get('tipoActividad')?.valueChanges.subscribe((e: string) => {
    //   this.cargueActividadEconomica()
    // });
    // this.form.get('camaraComercio')?.valueChanges.subscribe((e: string) => {
    //   this.cargueActividadEconomica()
    // });

    // this.form.get('valorCredito')?.valueChanges.subscribe((valor: string) => {

    //   this.getPlazosCredito(!!valor ? valor : '0')
    // })

    setTimeout(() => {
      if ((this.tipoIdentificacion) && (this.identificacion)) {
        this.form.controls.tipoDocumento.setValue(this.tipoIdentificacion);
        this.form.controls.identificacion.setValue(this.identificacion);
        this.solicitudesFormularioSimulaciones()
        this.editable = true;

      }
    }, 1000);
    this.getSalarioMinimo();

    this.marginTopInputDynamic()

  }

  private cargueActividadEconomica() {
    const datos = this.form.getRawValue();
    const { nivelEstudio, tipoActividad, camaraComercio } = datos;
    if ((nivelEstudio) && (nivelEstudio != null) && (tipoActividad) && (tipoActividad != null) && (camaraComercio) && (camaraComercio != null)) {
      this._formularioCreditoService.cargueActividadEconomica(nivelEstudio, tipoActividad, camaraComercio).subscribe((resp: any) => {
        if (resp) {
          this.listadoActividadEconomica = resp.data
        }
      })
    } else {
      this.listadoActividadEconomica = [];
    }
  }

  public preSolicitud() {
    const data = {
      celular: this.form.get('celular').value,
      identificacion: this.form.get('identificacion').value,
      tipoDocumento: this.form.get('tipoDocumento').value,
      email: this.form.get('email').value
    }

    this._formularioCreditoService.postPreSolicitud(data).pipe(takeUntil(this.unSubscribe$)).subscribe(rep => {
      this.numeroSolicitudTemporal = rep.data.numeroSolicitud;
      if (rep.data.resultado !== 'OK') {
        Swal.fire({
          icon: 'info',
          text: rep.data.msg,
        }).then(rep => {
          this.form.reset();
        });
      }

    })

  }

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    this.marginTopInputDynamic()
  }


  startTimer() {
    this.contador = 0;
    this.changeTextOTP = true;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.timerInterval = setInterval(() => {
      if (this.contador < 180) {
        this.contador++;
      }
    }, 1000)
  }

  private getSalarioMinimo() {
    this.genericaServices.getSalarioBasico().subscribe(({ data }) => {
      this.salarioMinimo = data.salarioMinimo;

      this.form.get('valorCredito').setValidators([Validators.required, Validators.min(data.salarioMinimo), Validators.max(100000000)])
    })
  }

  marginTopInputDynamic() {
    if (window.innerWidth < 600) {
      setTimeout(() => {
        let elementToMargin = this.el.nativeElement.querySelectorAll('.mat-form-field-flex');

        elementToMargin.forEach((element: HTMLElement) => {

          let titleSpan: HTMLElement = element?.querySelector('.mat-form-field-infix').querySelector('.mat-form-field-label-wrapper');
          titleSpan = titleSpan ? titleSpan : element?.querySelector('.mat-form-field-infix')?.querySelector('.mat-form-field-infix')

          let titleSpanHeigth = titleSpan?.clientHeight
          element.style.width = '20px' + ' !important';
          element.style['marginTop'] = '20px !important'
          element.style.setProperty('margin-top', (titleSpanHeigth ? (titleSpanHeigth > 35 ? titleSpanHeigth + 10 + 'px' : titleSpanHeigth + 'px') : '30px'), 'important')
          if (titleSpanHeigth > 30) {
            if (titleSpanHeigth > 50) {
              titleSpan.style.top = '-60px'
            } else {
              titleSpan.style.top = '-42px'
            }
          }
        });
      }, 1000);
    }
  }

  private validatedDate(control: AbstractControl) {
    const valueControl = control?.value ?? '';
    const date = moment(valueControl).format('YYYY-MM-DD')
    const errors = { dateError: true };
    // Set the validation error on the matching control
    if (this.fechaActual.isBefore(date)) {

      return errors
    } else {
      return null
    }
  }

  private validateMayorEdad(control: AbstractControl) {
    const valueControl = control?.value ?? '';
    const date = moment(valueControl).format('YYYY-MM-DD')
    const errors = { dateMayor: true };

    const fechaMayor = moment().locale('co')
    fechaMayor.subtract(18, 'years');
    // Set the validation error on the matching control

    if (fechaMayor.isBefore(date)) {

      return errors
    } else {
      return null
    }
  }

  private agregarValidaciones() {

    // this.form.get('tipoLocal').valueChanges.subscribe((e: string) => {
    //   if (e !== '6') {
    //     this.form.get('antiguedadLocal')?.setValidators([Validators.required, Validators.min(0)])
    //     this.form.get('antiguedadLocal')?.enable({ emitEvent: true, onlySelf: true })
    //   }
    //   else {
    //     this.form.get('antiguedadLocal')?.setValidators(null)
    //     this.form.get('antiguedadLocal')?.disable({ emitEvent: true, onlySelf: true })
    //   }
    // })
  }

  public listarBarrios() {
    const datos = this.form.getRawValue();
    const { ciudadNegocio } = datos;
    this._formularioCreditoService.listarBarriosMicro(ciudadNegocio).subscribe((resp: any) => {
      if (resp) {
        this.listadoBarrios = resp.data
      } else {
        this.listadoBarrios = []
      }
    })
  }

  public listarCiudades() {
    const datos = this.form.getRawValue();
    const { departamentoNegocio } = datos;
    this._formularioCreditoService.listarCiudadesMicro(departamentoNegocio).subscribe((resp: any) => {
      if (resp) {
        this.listadoCiudades = resp.data
      } else {
        this.listadoCiudades = []
      }
    })
  }

  public getAsesor() {

    const cod = this.form.controls.barrioNegocio.value
    this._formularioCreditoService.asesorMicro(cod).subscribe(rep => this.form.controls.asesorMicro.setValue(rep?.data?.resultado))
  }

  public solicitudesFormularioSimulaciones() {
    const datos = this.form.getRawValue();
    const { tipoDocumento, identificacion, } = datos;
    if ((tipoDocumento) && (identificacion)) {
      this._formularioCreditoService.cargueSolicitudesFormularioSimulaciones(tipoDocumento, identificacion, 1).subscribe((resp: any) => {
        if (resp) {
          this.form.patchValue(resp.data);

          this.dataGeneralIncial = resp.data
          this.getPlazosCredito(resp.data?.valorCredito | 0);
          this.form.controls.valorCredito.setValue(resp.data?.valorCredito | 0)
          this.form.controls.autorizacionCentrales.setValue(resp.data?.autorizacionCentrales === 'S');
          this.form.controls.clausulaVeracidad?.setValue(resp.data?.clausulaVeracidad === 'S');
          this.form.controls.terminosCondiciones.setValue(resp.data?.terminosCondiciones === 'S');
          this.form.controls.fechaNacimiento.setValue(resp.data?.fechaNacimiento === '0099-01-01' ? '' : resp.data?.fechaNacimiento)

          if (resp.data?.celular) {
            this.preSolicitud()
          }
          if (resp.data?.departamentoNegocio) {
            this.listarCiudades();
          }
          if (resp.data?.ciudadNegocio) {
            this.listarBarrios();
          }
          this.cargueActividadEconomica();

          setTimeout(() => {
            this.form.controls['ciudadNegocio'].setValue(resp.data?.ciudadNegocio);
            this.form.controls['barrioNegocio'].setValue(resp.data?.barrioNegocio.toString());
            this.form.controls['actividadEconomica'].setValue(resp.data?.actividadEconomica);
          }, 2500);

        }
      })
    }
  }

  private cargueInicial() {
    let data = {
      entidad: "PRESOLICITUD_LIBRANZA",
      unidadNegocio: 22,
      codigoReferido: ''
    };
    this._formularioCreditoService.cargueInicialLibranza(data).subscribe((resp: any) => {
      if (resp) {
        this.dataInicial = resp.data

      }
    })
  }

  /**
   * @description: Obtener limite de plazos por el valor de credito
   */
  public getPlazosCredito(valorCredito: any) {

    this._formularioCreditoService.validationPlazoMicro({ valorCredito }).subscribe(rep => {
      this.plazosCredito = rep

    })

  }

  solicitarCodigo(): void {
    if (this.form.valid) {
      const data = {
        numeroSolicitud: this.numeroSolicitudTemporal ? this.numeroSolicitudTemporal : this.numeroSolicitud,
        tipo: 'T',
        tipoOTP: "AUTORIZACION"
      }
      this.validandoOTPLoading = true;
      this._formularioCreditoService.solicitarOTP(data).subscribe(rep => {
        if (rep.status === 200) {
        }
        this.startTimer();
        this.validandoOTPLoading = false;

      })
    } else {
      this.scrollToFirstInvalidControl();
    }


  }

  validarCodigo(): void {
    const numero = this.form.get('numeroOTP').value;

    if (numero.length === 6 && !this.otpValidado) {
      const data = {
        numeroSolicitud: this.numeroSolicitudTemporal ? this.numeroSolicitudTemporal : this.numeroSolicitud,
        tipoTercero: 'T',
        numeroOTP: numero
      }

      this._formularioCreditoService.validatarOTP(data).pipe(takeUntil(this.unSubscribe$)).subscribe(rep => {
        this.otpValidado = rep.data.resultado === 'OK'
      }, err => {
        this.form.get('numeroOTP').setValue('');
      })
    }

  }




  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      setTimeout(() => {
        this.scrollToFirstInvalidControl();
      }, 200);
      return;
    }
    // let data = this.form.getRawValue();

    // const { barrioNegocio, valorCredito } = data;
    // delete data.barrioNegocio
    // data.barrioNegocio = Number(barrioNegocio)
    // delete data.valorCredito
    // data.valorCredito = Number(valorCredito)
    // data.autorizacionCentrales = 'S',
    //   data.terminosCondiciones = 'S',
    //   data.clausulaVeracidad = 'S',
    //   data.unidadNegocio = 1,
    //   data.tipoTercero = 'T',
    //   data.autorizacionCentrales = 'S',
    //   data.clausulaVeracidad = 'S',
    //   data.terminosCondiciones = 'S'

    let dataTempo = this.form.value;
    dataTempo.recurso = "guardar-presolicitud-datos-basico",
      dataTempo.numeroSolicitud = '';
    dataTempo.idSimulacion = '';
    dataTempo.tipoTercero = 'T';
    dataTempo.unidadNegocio = 22;
    dataTempo.documento = dataTempo.identificacion;
    // dataTempo.primerApellido = this.formulario.primerApellido
    // dataTempo.email = this.formulario.email
    // dataTempo.documento = this.formulario.identificacion
    // dataTempo.idSimulacion = ""
    let data = dataTempo;
    this._formularioCreditoService.postGuardarFormularioSolicitud(data).subscribe((resp) => {
      if (resp.data.resultado === 'OK') {
        let dataTempo2 = {
          recurso:"",
          numeroSolicitud: Number(resp.data.numeroSolicitud),
          tipoCargo: this.form.value.tipoCargoPerfil,
          rechazoContratoFijo: this.form.value.rechazoContratoFijo ? this.form.value.rechazoContratoFijo : 'OK',
          tipoTercero: 'T',
          pagaduria: this.form.value.pagaduria,
          otraPagaduria: this.form.value.otraPagaduria ? this.form.value.otraPagaduria : '',
          tipoContrato: this.form.value.tipoContrato,
          salarioBasico: this.form.value.salario,
          descuentos: this.form.value.descuentos,
          comisiones: this.form.value.comisiones,
          valorSolicitado: this.form.value.monto,
          plazo: this.form.value.cuotas,
          aceptoCentrales: 'S',
          aceptoTerminos: 'S',
        }
        this._formularioCreditoService.postGuardarFormularioSolicitudLaboral(dataTempo2).subscribe((datos) => {
          if (datos.data.resultado === 'OK') {
            Swal.fire(
              'Completado',
              datos.data.mensaje,
            ).then((result) => {
              if (result) {
                this.form.reset();
                this.irAtras()
              }
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error al guardar',
              text: datos.data.msg,
            }).then(rep => {
              this.form.reset();
            });
          }
        });
      }
      // let dataTempo2 = {
      //   numeroSolicitud: Number(this.numeroSolicitud),
      //   tipoCargo: this.form.value.tipoCargoPerfil,
      //   rechazoContratoFijo: this.form.value.rechazoContratoFijo ? this.form.value.rechazoContratoFijo : 'OK',
      //   tipoTercero: this.form.value.tipoTercero,
      //   pagaduria: this.form.value.pagaduria,
      //   otraPagaduria: this.form.value.otraPagaduria ? this.form.value.otraPagaduria : '',
      //   tipoContrato: this.form.value.tipoContrato,
      //   fechaVinculacion: this.form.value.fechaVinculacion ? moment(this.form.value.fechaVinculacion).format("MM-DD-YYYY") : '',
      //   fechaFinalizacion: this.form.value.fechaFinalizacion ? moment(this.form.value.fechaFinalizacion).format("MM-DD-YYYY") : '',
      //   salarioBasico: this.form.value.salario,
      //   descuentos: this.form.value.descuentos,
      //   comisiones: this.form.value.comisiones,
      //   valorSolicitado: this.form.value.monto,
      //   plazo: this.form.value.cuotas,
      //   aceptoCentrales: 'S',
      //   aceptoTerminos: 'S',
      // }
      // let data2: DatosLaborales = dataTempo2;
      // this._simulacionService.postGuardarFormularioSolicitudLaborales(data2).subscribe((resp: Response) => {
      //   Swal.fire(
      //     'Correcto',
      //     'Datos actualizada.',
      //     'success'
      //   )
      //   setTimeout(() => {
      //     this.modal.close()
      //     this.router.navigate(['/dashboard/listado'])
      //     setTimeout(() => {
      //       location.reload();  
      //     }, 1000);
      //   }, 1000);
      // })
    })
    // Swal.fire({ title: 'Cargando', html: 'Guardando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
    // this._formularioCreditoService.postDatos(data).subscribe((datos) => {
    //   if (datos.data.resultado === 'OK') {
    //     Swal.fire(
    //       'Completado',
    //       datos.data.mensaje,
    //     ).then((result) => {
    //       if (result) {
    //         this.form.reset();
    //         this.irAtras()
    //       }
    //     })
    //   } else {
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Error al guardar',
    //       text: datos.data.msg,
    //     }).then(rep => {
    //       this.form.reset();
    //     });
    //   }


    // }, (error) => {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Ha ocurrido un error',
    //     text: error.error.msg,
    //   });
    // });


  }


  public validacionCampos(campo: string, modificado: string, variable: string, type: String): void {
    let mensaje = `<p>¿Estás seguro de editar el campo de <strong>${campo}</strong>?, ${modificado}.</p>`;
    Swal.fire({
      title: 'Guardar información',
      html: mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#a3a0a0',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
      } else {

        if (type === "INTEGER") {

          this.form.controls[variable].setValue(Number(this.dataGeneralIncial[variable]));
        }
        if (type === "STRING") {
          this.form.controls[variable].setValue(this.dataGeneralIncial[variable].toString());
        }
      }
    });
  }

  /**
   * @description hace scroll al primerer input invalido, puede ser un input o select
   */
  private scrollToFirstInvalidControl() {
    let firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector('.mat-form-field-invalid')?.querySelector('.mat-input-element');

    if (!firstInvalidControl) {
      firstInvalidControl = this.el.nativeElement.querySelector('.mat-form-field-invalid')?.querySelector('.mat-select');
      if (!firstInvalidControl) {
        firstInvalidControl = this.el.nativeElement.querySelector('.mat-error');
      }
    }

    firstInvalidControl?.focus(); //without smooth behavior
  }

  changeFocus() {
    let firstInvalidControl2: HTMLElement = this.el.nativeElement.querySelector('#num2');
    let firstInvalidControl3: HTMLElement = this.el.nativeElement.querySelector('#num3');
    let firstInvalidControl4: HTMLElement = this.el.nativeElement.querySelector('#num4');
    let firstInvalidControl5: HTMLElement = this.el.nativeElement.querySelector('#num5');
    let firstInvalidControl6: HTMLElement = this.el.nativeElement.querySelector('#num6');

    if (this.form.get('numOTP1').value !== '') {
      if (this.form.get('numOTP2').value === '') {
        firstInvalidControl2.focus();
      } else {
        if (this.form.get('numOTP3').value === '') {
          firstInvalidControl3.focus();
        } else {
          if (this.form.get('numOTP4').value === '') {
            firstInvalidControl4.focus();
          } else {
            if (this.form.get('numOTP5').value === '') {
              firstInvalidControl5.focus();
            } else {
              if (this.form.get('numOTP6').value === '') {
                firstInvalidControl6.focus();
              }
            }
          }
        }
      }
    }
    else {
      let elemeOne: HTMLElement = this.el.nativeElement.querySelector('#num1');
      elemeOne.focus();
    }
  }

  irAtras() {
    if (this._permisosService.ruta === 'agenda-comercial') {
      this.router.navigate([`/credit-factory/agenda-comercial`]);
    } else {
      this.router.navigate([`/credit-factory/agenda-venta-digital`]);
    }
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next(null);
    this.unSubscribe$.complete();
    // this.agendaCompletacionService.resetSeleccionAgenda();
  }
}
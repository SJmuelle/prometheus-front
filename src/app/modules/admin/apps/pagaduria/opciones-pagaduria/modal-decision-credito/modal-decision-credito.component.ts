import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DecisionService } from 'app/core/services/decision.service';
import { FormularioCreditoService } from 'app/core/services/formulario-credito.service';
import { GenericasService } from 'app/core/services/genericas.service';
import { PermisosService } from 'app/core/services/permisos.service';
import { UtilityService } from 'app/resources/services/utility.service';
import { toInteger } from 'lodash';
import moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormDialogListErrorDialogComponent } from '../../../fabrica-credito/agenda-referenciacion/form-dialog-list-error-dialog/form-dialog-list-error-dialog.component';
import { FormDialogDecisionComponent } from '../../../fabrica-credito/gestion-fabrica-credito/form-dialog-decision/form-dialog-decision.component';

@Component({
  selector: 'app-modal-decision-credito',
  templateUrl: './modal-decision-credito.component.html',
  styleUrls: ['./modal-decision-credito.component.scss']
})
export class ModalDecisionCreditoComponent implements OnInit, OnDestroy {
  public fechaActual = moment(new Date()).format('YYYY-MM-DD');
  public decision$: Observable<any>;
  public form: FormGroup;
  public unsuscribe$: Subject<any> = new Subject<any>();
  public causal$: Observable<any>;
  mostrarAccion: boolean;
  mostrarCupo: boolean;
  mostrarPlazo: boolean = false;
  tituloModal: string;
  listadoAgenda: any;
  public salarioMinimo: number = 0;
  tipoContrato$: Observable<any>;
  dataLaboral: any;


  constructor(
    private fb: FormBuilder,
    public _permisosService: PermisosService,

    private decisionService: DecisionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialog: MatDialogRef<FormDialogDecisionComponent>,
    public utility: UtilityService,
    public dialog: MatDialog,
    private router: Router,
    private genericaServices: GenericasService,
    private _formularioCreditoService: FormularioCreditoService,

  ) {
    this.crearFormulario();
    this.dataLaboral = JSON.parse(localStorage.getItem("data"))

  }



  ngOnInit(): void {
    this.getDecision();
    this.escuchaObservable();
    this.getCausal();
    this.getTipoContrato()
    this.tituloModal = "Decisión"
    this.form.controls.numeroSolicitud.setValue(this.data.numeroSolicitud);
    this.form.controls.unidadNegocio.setValue(this.data.unidadNegocio);

  }





  /**
   * @description: Cierra el dialogo
   */
  public onCerrar(): void {
    this._dialog.close();
  }


  /**
   * @description: Guarda una decision
   */
  public onGuardar(): void {
    if (this.form.valid) {
      const data: any = { ...this.form.getRawValue() };
      const valorCuota = Number(this.form.controls.valorCuota.value)
      data.numeroSolicitud = Number(this.form.controls.numeroSolicitud.value);
      data.cupo = Number(this.utility.enviarNumero(this.form.controls.cupo.value));
      data.descuentos = Number(this.form.controls.descuentos.value);
      data.comisiones = Number(this.form.controls.comisiones.value);
      data.salario = Number(this.form.controls.salario.value);
      data.causal = Number(this.form.controls.causal.value);

      data.valorCuota = data.causal === 82 ? data.valorCuota = valorCuota : data.valorCuota = 0

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
          switch (data.concepto) {
            case 'A':
              this.postDecision(data);
              break;
            case 'R':
              this.postDecisionNoVisado(data)
              break;

            default:
              break;
          }
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }


  /**
   * @description: Escucha el observable
   */
  public escuchaObservable(): void {

    this.form.controls.concepto.valueChanges.subscribe((concepto) => {

      switch (concepto) {
        case 'A':
          this.form.controls['cargo'].setValue("");
          this.form.controls['cargo'].clearValidators();
          this.form.controls['cargo'].updateValueAndValidity();

          this.form.controls['tipoContrato'].setValue("");
          this.form.controls['tipoContrato'].clearValidators();
          this.form.controls['tipoContrato'].updateValueAndValidity();

          this.form.controls['salario'].setValue("");
          this.form.controls['salario'].clearValidators();
          this.form.controls['salario'].updateValueAndValidity();

          this.form.controls['fechaVinculacion'].setValue("");
          this.form.controls['fechaVinculacion'].clearValidators();
          this.form.controls['fechaVinculacion'].updateValueAndValidity();

          this.form.controls['fechaFinalizacion'].setValue(this.fechaActual);
          this.form.controls['fechaFinalizacion'].clearValidators();
          this.form.controls['fechaFinalizacion'].updateValueAndValidity();

          this.form.controls['descuentos'].setValue("");
          this.form.controls['descuentos'].clearValidators();
          this.form.controls['descuentos'].updateValueAndValidity();

          this.form.controls['comisiones'].setValue("");
          this.form.controls['comisiones'].clearValidators();
          this.form.controls['comisiones'].updateValueAndValidity();

          break;
        case 'R':
          if (this.form.value.causal == '18') {
            this.form.controls['cargo'].setValue("");
            this.form.controls['cargo'].setValidators(Validators.required);
            this.form.controls['cargo'].updateValueAndValidity();

            this.form.controls['tipoContrato'].setValue("");
            this.form.controls['tipoContrato'].setValidators(Validators.required);
            this.form.controls['tipoContrato'].updateValueAndValidity();

            this.form.controls['salario'].setValue("");
            this.form.controls['salario'].setValidators(Validators.required);
            this.form.controls['salario'].updateValueAndValidity();

            this.form.controls['fechaVinculacion'].setValue("");
            this.form.controls['fechaVinculacion'].setValidators(Validators.required);
            this.form.controls['fechaVinculacion'].updateValueAndValidity();

            this.form.controls['fechaFinalizacion'].setValue(this.fechaActual);
            this.form.controls['fechaFinalizacion'].setValidators(Validators.required);
            this.form.controls['fechaFinalizacion'].updateValueAndValidity();

            this.form.controls['descuentos'].setValue("");
            this.form.controls['descuentos'].setValidators(Validators.required);
            this.form.controls['descuentos'].updateValueAndValidity();

            this.form.controls['comisiones'].setValue("");
            this.form.controls['comisiones'].setValidators(Validators.required);
            this.form.controls['comisiones'].updateValueAndValidity();
          }
          break;
        default:
          break;
      }

    });


    this.form.controls.causal.valueChanges.subscribe((causal) => {



      causal = parseInt(causal)
      switch (causal) {
        case 19:
          this.form.controls['cargo'].setValue("");
          this.form.controls['cargo'].clearValidators();
          this.form.controls['cargo'].updateValueAndValidity();

          this.form.controls['tipoContrato'].setValue("");
          this.form.controls['tipoContrato'].clearValidators();
          this.form.controls['tipoContrato'].updateValueAndValidity();

          this.form.controls['salario'].setValue("");
          this.form.controls['salario'].clearValidators();
          this.form.controls['salario'].updateValueAndValidity();

          this.form.controls['fechaVinculacion'].setValue("");
          this.form.controls['fechaVinculacion'].clearValidators();
          this.form.controls['fechaVinculacion'].updateValueAndValidity();

          this.form.controls['fechaFinalizacion'].setValue(this.fechaActual);
          this.form.controls['fechaFinalizacion'].clearValidators();
          this.form.controls['fechaFinalizacion'].updateValueAndValidity();

          this.form.controls['descuentos'].setValue("");
          this.form.controls['descuentos'].clearValidators();
          this.form.controls['descuentos'].updateValueAndValidity();

          this.form.controls['comisiones'].setValue("");
          this.form.controls['comisiones'].clearValidators();
          this.form.controls['comisiones'].updateValueAndValidity();

          break;
        case 82:
          this.form.controls['cargo'].setValue("");
          this.form.controls['cargo'].setValidators(Validators.required);
          this.form.controls['cargo'].updateValueAndValidity();

          this.form.controls['tipoContrato'].setValue("");
          this.form.controls['tipoContrato'].setValidators(Validators.required);
          this.form.controls['tipoContrato'].updateValueAndValidity();

          this.form.controls['salario'].setValue("");
          this.form.controls['salario'].setValidators(Validators.required);
          this.form.controls['salario'].updateValueAndValidity();

          this.form.controls['fechaVinculacion'].setValue("");
          this.form.controls['fechaVinculacion'].setValidators(Validators.required);
          this.form.controls['fechaVinculacion'].updateValueAndValidity();

          this.form.controls['fechaFinalizacion'].setValue(this.fechaActual);
          this.form.controls['fechaFinalizacion'].setValidators(Validators.required);
          this.form.controls['fechaFinalizacion'].updateValueAndValidity();

          this.form.controls['descuentos'].setValue("");
          this.form.controls['descuentos'].setValidators(Validators.required);
          this.form.controls['descuentos'].updateValueAndValidity();

          this.form.controls['comisiones'].setValue("");
          this.form.controls['comisiones'].setValidators(Validators.required);
          this.form.controls['comisiones'].updateValueAndValidity();
          this.dataCreditoRechazo();

          this.asignarValor();

          break;
        default:
          break;
      }

    });
  }

  public errorForm(): boolean {
    const { cartaLaboral, condicionesCredito } = this.form.getRawValue();
    const cartaLaboralTouched = this.form.controls['cartaLaboral'].touched;
    const condicionesCreditoTouched = this.form.controls['condicionesCredito'].touched
    // console.log('cartaLaboral', cartaLaboral, 'condicionesCredito', condicionesCredito, 'condicionesCreditoTouched', condicionesCreditoTouched, 'cartaLaboralTouched', cartaLaboralTouched);
    if ((!cartaLaboral || !condicionesCredito) && (cartaLaboralTouched || condicionesCreditoTouched)) {
      return true
    } else {
      return false
    }

  }

  public validarForm(): void {
    const formcontrols = ['cartaLaboral', 'condicionesCredito']
    // console.log(this.form.controls['concepto'].value)
    if (this.form.controls['concepto'].value === 'A') {
      formcontrols.forEach((controlsValue) => {
        this.form.controls[controlsValue]?.setValue(false);
        this.form.controls[controlsValue]?.setValidators([Validators.requiredTrue]);
        this.form.controls[controlsValue]?.updateValueAndValidity();

      })
    } else {
      formcontrols.forEach((controlsValue) => {
        this.form.controls[controlsValue]?.setValue(false);
        this.form.controls[controlsValue]?.clearValidators();
        this.form.controls[controlsValue]?.updateValueAndValidity();
      })

    }
  }

  /**
   * @description: Definicion de formulario
   */
  public crearFormulario(): void {

    this.form = this.fb.group({
      numeroSolicitud: [''],
      unidadNegocio: [''],
      comentario: ['', [Validators.required]],
      concepto: [''],

      cargo: [''],
      tipoContrato: [''],
      salario: [''],
      fechaVinculacion: [''],
      fechaFinalizacion: [this.fechaActual, []],
      descuentos: [''],
      comisiones: [''],
      valorCuota: [''],

      cupo: [''],
      causal: [0],
      cartaLaboral: [false,],
      condicionesCredito: [false,]
    });
  }


  asignarValor(): void {



    this.form.controls['cargo'].setValue(this.dataLaboral.cargo);
    this.form.controls['tipoContrato'].setValue(this.dataLaboral.tipoContrato);
    this.form.controls['salario'].setValue(this.dataLaboral.salarioBasico);
    this.form.controls['comisiones'].setValue(this.dataLaboral.comisiones);
    this.form.controls['descuentos'].setValue(this.dataLaboral.descuentoNomina);
    this.form.controls['fechaVinculacion'].setValue(this.dataLaboral.fechaFinalizacion);

    this.form.controls['fechaFinalizacion'].setValue(this.fechaActual);
    this.form.controls['fechaFinalizacion'].updateValueAndValidity();

  }

  /**
   * @description: Obtiene el listado de opciones
   */
  private getDecision(): void {
    this.decision$ = this.decisionService.getOpciones();
  }

  /**
 * @description: Obtiene el listado de opciones
 */
  private getTipoContrato(): void {
    this.tipoContrato$ = this.genericaServices.getSelectDinamicoSinBase('tipos-contratos');
  }

  /**
   * @description: Obtiene el listado de causales
   */
  private getCausal(): void {
    this.causal$ = this.decisionService.getCausalesAgendaPagaduria();
  }

  /**
   * @description: Guarda la decision
   */
  private postDecision(data: any): void {
    Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    this.decisionService.postDecision(data).pipe(takeUntil(this.unsuscribe$))
      .subscribe((res) => {
        Swal.close();
        let respuesta: any = {};
        switch (res.status) {
          case 200:
            if (res.data.respuesta == 'OK') {
              respuesta = {
                icon: 'success',
                title: 'Mensaje',
                text: 'Ha cambiado el estado con éxito'
              };
              this.mostrarAlerta(respuesta);
              setTimeout(() => {
                this._dialog.close(true);
              }, 1000);
            } else {
              respuesta = {
                icon: 'error',
                title: 'Mensaje',
                text: res.data.resultado
              };
              this.mostrarAlerta(respuesta);
            }
            break;
          case 400:
            respuesta = {
              icon: 'error',
              title: 'Mensaje',
              text: 'Advertencia'
            };
            this.mostrarAlerta(respuesta);
            break;
          case 500:
            respuesta = {
              icon: 'error',
              title: 'Mensaje',
              text: 'Ha ocurrido un error'
            };
            this.mostrarAlerta(respuesta);
            break;
          default:
            break;
        }
      });
  }

  /**
   * @description: Guarda la cre-lib-no-visar
   */
  private postDecisionNoVisado(data: any): void {
    Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    this.decisionService.postDecisionNoVisado(data).pipe(takeUntil(this.unsuscribe$))
      .subscribe((res) => {
        Swal.close();
        let respuesta: any = {};
        switch (res.status) {
          case 200:
            if (res.data.resultado == 'OK') {
              respuesta = {
                icon: 'success',
                title: 'Mensaje',
                text: 'Ha cambiado el estado con éxito'
              };
              this.mostrarAlerta(respuesta);
              setTimeout(() => {
                this._dialog.close(true);
              }, 1000);
            } else {
              respuesta = {
                icon: 'error',
                title: 'Mensaje',
                text: res.data.resultado
              };
              this.mostrarAlerta(respuesta);
            }
            break;
          case 400:
            respuesta = {
              icon: 'error',
              title: 'Mensaje',
              text: 'Advertencia'
            };
            this.mostrarAlerta(respuesta);
            break;
          case 500:
            respuesta = {
              icon: 'error',
              title: 'Mensaje',
              text: 'Ha ocurrido un error'
            };
            this.mostrarAlerta(respuesta);
            break;
          default:
            break;
        }
      });
  }




  /**
    * @description: Obtiene el listado de agenda de completacion
   */
  private dataCreditoRechazo(): void {
    let info = {
      numeroSolicitud: this.data.numeroSolicitud
    }
    this.decisionService.dataCreditoRechazo(info).subscribe((res) => {
      const { fechaFinalizacion, ...values } = res?.data
      this.form.patchValue(values);
      // console.log('res data', res.data)
    });
  }


  /**
   * @description: Captura el mensaje de la respuesta
   */
  private mostrarAlerta(respuesta: any): void {
    Swal.fire({
      icon: respuesta.icon,
      title: respuesta.title,
      text: respuesta.text,
    }).then((result) => {
      if (result.isConfirmed) {
        this.onCerrar();
      }
    });
    setTimeout(() => {
      this.onCerrar();
    }, 1000);
  }

  get requeridoCupo(): any {
    return (this.form.controls.cupo.dirty || this.form.controls.cupo.touched);
  }

  get requeridoPlazo(): any {
    return (this.form.controls.plazo.dirty || this.form.controls.plazo.touched);
  }

  get requeridoComentario(): any {
    return (this.form.controls.comentario.dirty || this.form.controls.comentario.touched);
  }

  ngOnDestroy(): void {
    this.unsuscribe$.unsubscribe();
  }



}


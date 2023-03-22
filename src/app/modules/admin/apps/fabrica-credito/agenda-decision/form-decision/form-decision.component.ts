import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import { DecisionesService } from 'app/core/services/decisiones.service';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { UtilityService } from 'app/resources/services/utility.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-decision',
  templateUrl: './form-decision.component.html',
  styleUrls: ['./form-decision.component.scss']
})
export class FormDecisionComponent implements OnInit, OnDestroy {
  public unSubscribe$: Subject<any> = new Subject<any>();
  form: FormGroup;//formulario para hacer las validaciones requeridas
  numPattern: any = /(0|[1-9][0-9]*)$/; // expresion regular para validar que solo se digitan numeros.
  porcenPattern: any = /^((100(\.0{1,2})?)|(\d{1,2}(\.\d{1,2})?))$/; // expresion regular para escribir valores porcentuales.
  visible: boolean = false; // esconder o mostrar el input causal
  valorNum: number; // almacenar el valor digitado en el input de valor
  listadoDeciones: any = [];// listado de decisiones
  listadoCausales: any = [];// listado de causales



  constructor(
    @Inject(MAT_DIALOG_DATA) public fabricaDatos: any,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialogRef<FormDecisionComponent>,
    public utility: UtilityService,
    public _decisionesService: DecisionesService) {
    this.form = this.fb.group({
      decision: ['', [Validators.required]],
      causal: [''],
      cupo: [''],
      comentario: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(500)]]
    })
  }

  ngOnInit() {
    this.consultaDecisiones();
    this.form.controls['cupo'].setValue(this.utility.formatearNumero(String(this.fabricaDatos.cupoTotal)));

  }


  consultaDecisiones() {
    this.fabricaDatos.agenda
    let agenda;
    switch (this.fabricaDatos.agenda) {
      case 'DE':
        agenda = 'DECISION';
        break;
      case 'VD':
        agenda = 'VENTA-DIGITAL';
        break;
      default:
        agenda = 'COMPLETACION';
      break;
    }
    this._decisionesService.getOpciones(agenda).subscribe((response: any) => {
      console.log(response);
      if (response) {
        this.listadoDeciones = response.data;
        // if (this.fabricaDatos.agenda != 'DE') {


        //   this.form.controls['decision'].setValue('D')
        //   this.form.value.decision = 'D'
        //   // this.form.controls['decision'].disable();
        //   this.consultaCauDesestimiento();
        //   this.form.get('causal').setValidators([Validators.required, Validators.minLength(1)])
        //   this.form.get('causal').updateValueAndValidity();
        // }
      }
    })
  }

  private consultaCausalesRechazo() {
    this._decisionesService.getCausalesRechazo(this.fabricaDatos.numeroSolicitud).subscribe((response: any) => {
      console.log(response);
      if (response) {
        this.listadoCausales = response.data;
      }
    })
  }
  private consultaCauDesestimiento() {
    this._decisionesService.getCauDesestimiento(this.fabricaDatos.numeroSolicitud).subscribe((response: any) => {
      console.log(response);
      if (response) {
        this.listadoCausales = response.data;
      }
    })
  }
  private consultaCausalesAprobacion() {
    this._decisionesService.getCausalesAprobacion(this.fabricaDatos.numeroSolicitud, this.form.value.decision).subscribe((response: any) => {
      console.log(response);
      if (response) {
        this.listadoCausales = response.data;
      }
    })
  }

  public getlistadoCausales() {
    switch (this.form.value.decision) {
      case 'R':
        this.consultaCausalesRechazo();
        this.form.get('causal').setValidators([Validators.required])

        break;
      case 'D':
        this.consultaCauDesestimiento();
        this.form.get('causal').setValidators([Validators.required])
        break;
      default:
        this.consultaCausalesAprobacion();
        this.form.get('causal').setValidators(null)

        break;
    }

  }


  public guardar() {

    if (!this.form.valid) {
      return
    }
    if ((this.form.value.decision == 'R') || (this.form.value.decision == 'D')) {
      this.postDecicion();
    } else {
      if (this.fabricaDatos.unidadNegocio == 22) {
        let data_pagare = {
          "numeroSolicitud": this.fabricaDatos.numeroSolicitud,
        }
        this._decisionesService.generarNumeroPagare(data_pagare)
          .subscribe((res2) => {
            let datoComprobacion = {
              "numeroSolicitud": this.fabricaDatos.numeroSolicitud,
              "unidadNegocio": this.fabricaDatos.unidadNegocio,
              "tipoTercero": 'T'
            }
            this._decisionesService.comprobacionCampos(datoComprobacion)
              .subscribe((res2) => {
                this.postDecicion()
              })
          })
      } else {
        this.postDecicion();
      }
    }
  }

  private postDecicion() {
    Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    let datos = {
      numeroSolicitud: this.fabricaDatos.numeroSolicitud,
      concepto: this.form.value.decision,
      cupo: Number(this.utility.enviarNumero(String(this.form.value.cupo))),
      comentario: this.form.value.comentario,
      causal: Number(this.form.value.causal),
      unidadNegocio: this.fabricaDatos.unidadNegocio,
    }
    this._decisionesService.postGuardado(datos).subscribe((response: any) => {
      Swal.close()
      if (response) {
        Swal.fire(
          '¡Correcto!',
          'Decisión guardada con éxito.',
          'success'
        ).then((result) => {
          if (result) {
            this.dialog.close(true);
          }
        })
        setTimeout(() => {
          this.dialog.close(true);
          // this.router.navigate(['/credit-factory/agenda-decision']);
        }, 10000);
      }
    })
  }



  ngOnDestroy(): void {
    this.unSubscribe$.unsubscribe();
  }

}

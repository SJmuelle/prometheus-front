import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {DecisionService} from '../../../../../../core/services/decision.service';
import {Observable, Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {UtilityService} from '../../../../../../resources/services/utility.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-form-dialog-decision',
  templateUrl: './form-dialog-decision.component.html',
  styleUrls: ['./form-dialog-decision.component.scss']
})
export class FormDialogDecisionComponent implements OnInit, OnDestroy {
  public decision$: Observable<any>;
  public form: FormGroup;
  public unsuscribe$: Subject<any> = new Subject<any>();
  public causal$: Observable<any>;
  constructor(
      private fb: FormBuilder,
      private decisionService: DecisionService,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private _dialog: MatDialogRef<FormDialogDecisionComponent>,
      public utility: UtilityService
  ) {
      this.crearFormulario();
  }

  ngOnInit(): void {
      this.getDecision();
      this.escuchaObservable();
      this.getCausal();
      this.form.controls.numeroSolicitud.setValue(this.data.numeroSolicitud);
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
          const data: any = {...this.form.getRawValue()};
          data.numeroSolicitud = Number(this.form.controls.numeroSolicitud.value);
          data.cupo =  Number(this.utility.enviarNumero(this.form.controls.cupo.value));
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
                  this.postDecision(data);
              }
          });
      }else {
          this.form.markAllAsTouched();
      }
  }
  /**
   * @description: Escucha el observable
   */
  public escuchaObservable(): void {
      this.form.controls['concepto'].setValue('A');
      this.form.controls.concepto.valueChanges.subscribe((concepto) => {
          if (concepto !== 'A') {
              this.form.controls['cupo'].setValue('1');
              this.form.controls['causal'].setValue(1);
              this.form.controls['cupo'].clearValidators();
              this.form.controls['comentario'].setValidators(Validators.required);
              this.form.controls['comentario'].updateValueAndValidity();
              this.form.controls['cupo'].updateValueAndValidity();
          }else {
              this.form.controls['cupo'].setValue('');
              this.form.controls['causal'].setValue(0);
              this.form.controls['cupo'].setValidators(Validators.required);
              this.form.controls['comentario'].clearValidators();
              this.form.controls['comentario'].updateValueAndValidity();
              this.form.controls['cupo'].updateValueAndValidity();
          }
      });
  }
  /**
   * @description: Definicion de formulario
   */
  public crearFormulario(): void {
      this.form = this.fb.group({
          numeroSolicitud: [''],
          concepto: [''],
          cupo: ['', [Validators.required]],
          comentario: [''],
          causal: [0]
      });
  }
  /**
   * @description: Obtiene el listado de opciones
   */
  private getDecision(): void {
      this.decision$ = this.decisionService.getOpciones();
  }
  /**
   * @description: Obtiene el listado de causales
   */
  private getCausal(): void {
      this.causal$ = this.decisionService.getCausales();
  }
  /**
   * @description: Guarda la decision
   */
  private postDecision(data: any): void {
      Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
      this.decisionService.postDecision(data).pipe(takeUntil(this.unsuscribe$))
          .subscribe((res) => {
              let respuesta: any = {};
          switch (res.status) {
              case 200:
                  respuesta = {
                      icon: 'success',
                      title: 'Mensaje',
                      text: 'Completado'
                  };
                  this.mostrarAlerta(respuesta);
              break;
              case 400:
                  respuesta = {
                      icon: 'warning',
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
  }

  get requeridoCupo(): any {
      return (this.form.controls.cupo.dirty || this.form.controls.cupo.touched);
  }

  get requeridoComentario(): any {
      return (this.form.controls.comentario.dirty || this.form.controls.comentario.touched);
  }

    ngOnDestroy(): void {
      this.unsuscribe$.unsubscribe();
    }

}

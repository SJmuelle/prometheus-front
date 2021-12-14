import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {DecisionService} from '../../../../../../core/services/decision.service';
import {Observable, Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {UtilityService} from '../../../../../../resources/services/utility.service';

@Component({
  selector: 'app-form-dialog-decision',
  templateUrl: './form-dialog-decision.component.html',
  styleUrls: ['./form-dialog-decision.component.scss']
})
export class FormDialogDecisionComponent implements OnInit, OnDestroy {
  public decision$: Observable<any>;
  public form: FormGroup;
  public subscription$: Subscription;
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
  }
  /**
   * @description: Escucha el observable
   */
  public escuchaObservable(): void {
      this.form.controls['concepto'].setValue('A');
      this.form.controls.concepto.valueChanges.subscribe((concepto) => {
          if (concepto !== 'A') {
              this.form.controls['cupo'].setValue('1');
          }else {
              this.form.controls['cupo'].setValue('');
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
          cupo: ['']
      });
  }
  /**
   * @description: Obtiene el listado de opciones
   */
  private getDecision(): void {
      this.decision$ = this.decisionService.getOpciones();
  }
  /**
   * @description: Guarda la decision
   */
  private postDecision(data: any): void {
      Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
      this.subscription$ = this.decisionService.postDecision(data).subscribe((res) => {
          switch (res.status) {
              case 200:
                  this.mostrarAlerta(res.data.respuesta);
              break;
              case 400:
                  this.mostrarAlerta(res.data.respuesta);
              break;
              case 500:
                  this.mostrarAlerta(res.data.respuesta);
              break;
              default:
              break;
          }
      });
  }
  /**
   * @description: Captura el mensaje de la respuesta
   */
  private mostrarAlerta(respuesta: string): void {
      Swal.fire({
          icon: 'error',
          title: 'Mensaje',
          text: respuesta,
      }).then((result) => {
          if (result.isConfirmed) {
              this.onCerrar();
          }
      });
  }

    ngOnDestroy(): void {
      this.subscription$.unsubscribe();
    }

}

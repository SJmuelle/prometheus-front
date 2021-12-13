import {Component, Inject, OnInit} from '@angular/core';
import {DecisionService} from "../../../../../../core/services/decision.service";
import {Observable} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-dialog-decision',
  templateUrl: './form-dialog-decision.component.html',
  styleUrls: ['./form-dialog-decision.component.scss']
})
export class FormDialogDecisionComponent implements OnInit {
  public decision$: Observable<any>;
  public form: FormGroup;
  constructor(
      private fb: FormBuilder,
      private decisionService: DecisionService,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private _dialog: MatDialogRef<FormDialogDecisionComponent>
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

  public onGuardar(): void {
      const data: any = this.form.getRawValue();
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
              Swal.fire(
                  'Completado',
                  'Información guardada con exito',
                  'success'
              );
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
              this.form.controls['cupo'].setValue('0');
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
      this.decisionService.postDecision(data).subscribe((res) => {
          console.log(res);
      });
  }

}

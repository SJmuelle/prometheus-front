import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { PoliticasService } from 'app/core/services/politicas.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modal-excepcion-credito',
  templateUrl: './modal-excepcion-credito.component.html',
  styleUrls: ['./modal-excepcion-credito.component.scss']
})
export class ModalExcepcionCreditoComponent implements OnInit {

  public form: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private _dialog: MatDialogRef<ModalExcepcionCreditoComponent>,
    private fb: FormBuilder,
    private _politicasService: PoliticasService
  ) {
    this.form = this.fb.group({
      excepcionText: ['', [Validators.required, Validators.maxLength(1000)]],
      excepcion: [],
    })
  }

  ngOnInit(): void {
    // console.log('datos politica', this.data)
    this.form.controls.excepcionText.setValue(this.data.comentarioExcepcion)
    this.form.patchValue(this.data);
  }

  /**
  * @description: Cierra el dialogo
  */
  public onCerrar(): void {
    this._dialog.close();
  }

  public onGuardar(): void {
    if (this.form.valid) {
      let data = this.data

      data.comentarioExcepcion = this.form.getRawValue().excepcionText
      data.excepcion = this.form.getRawValue().excepcion

      Swal.fire({
        title: 'Guardar información',
        text: '¿Está seguro de guardar la excepción?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#a3a0a0',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this._politicasService.guardarExcepcionCredito(data).subscribe(rep => {
            // console.log('respuesta', rep)
            Swal.fire({
              title: '¡Correcto!',
              text: 'Excepción guardada exitosamente.',
              icon: 'success',
              allowOutsideClick: false
            }).then((result)=>{
              this._dialog.close(rep['data'].ejecutoMotor)
            })
          })
        }
      });
    }
  }
}

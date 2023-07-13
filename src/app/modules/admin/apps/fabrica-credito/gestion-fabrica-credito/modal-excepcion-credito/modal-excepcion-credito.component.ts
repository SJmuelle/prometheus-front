import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-excepcion-credito',
  templateUrl: './modal-excepcion-credito.component.html',
  styleUrls: ['./modal-excepcion-credito.component.scss']
})
export class ModalExcepcionCreditoComponent implements OnInit {

  public form: FormGroup

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
   private _dialog: MatDialogRef<ModalExcepcionCreditoComponent>,
   private fb: FormBuilder) {
    this.form = this.fb.group({
        excepcionText: ['']
    })
   }

  ngOnInit(): void {
  }

     /**
     * @description: Cierra el dialogo
     */
     public onCerrar(): void {
        this._dialog.close();
    }

    public onGuardar(): void {
        // if (this.form.valid) {
        //     const data: any = this.form.getRawValue();
        //     let valida=this.datoFabrica.agenda!='GC'&&this.datoFabrica.agenda!='CM';
        //     let envioData = {
        //         comentario: data.comentario,
        //         numeroSolicitud: data.numeroSolicitud,
        //         tipoComentario: valida?Number(data.tipoComentario):2,
        //     }
        //     let mensaje=envioData.tipoComentario==2?'¿Está seguro de agregar este comentario en la gestión del crédito?. Recuerde que este comentario será visible para todos los usuarios.':'¿Está seguro de agregar este comentario en la gestión del crédito?. Recuerde que este comentario no será visible para todos los usuarios';
        //     Swal.fire({
        //         title: 'Guardar información',
        //         text: mensaje,
        //         icon: 'warning',
        //         showCancelButton: true,
        //         confirmButtonColor: '#3085d6',
        //         cancelButtonColor: '#a3a0a0',
        //         confirmButtonText: 'Guardar',
        //         cancelButtonText: 'Cancelar'
        //     }).then((result) => {
        //         if (result.isConfirmed) {
        //             this.postComentario(envioData);
        //         }
        //     });
        // } else {
        //     this.form.markAllAsTouched();
        // }

    }
}

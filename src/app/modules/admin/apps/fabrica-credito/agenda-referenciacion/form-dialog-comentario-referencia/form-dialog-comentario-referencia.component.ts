import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ReferenciacionClienteService} from "../../../../../../core/services/referenciacion-cliente.service";
import {FormControl, Validators} from "@angular/forms";
import {ComentariosService} from "../../../../../../core/services/comentarios.service";
import {Subject} from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-dialog-comentario-referencia',
  templateUrl: './form-dialog-comentario-referencia.component.html',
  styleUrls: ['./form-dialog-comentario-referencia.component.scss']
})
export class FormDialogComentarioReferenciaComponent implements OnInit, OnDestroy {
  public comentario: FormControl = new FormControl('', [Validators.minLength(10)]);
  public unsubscribe$: Subject<any> = new Subject<any>();
  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private _matDialog: MatDialogRef<FormDialogComentarioReferenciaComponent>,
      private comentariosService: ComentariosService
  ) { }

  ngOnInit(): void {
  }

  public onComentario(): void {
      const numeroSolicitud: string = this.data.numeroSolicitud;
      const data: any = {
          numeroSolicitud,
          comentario: this.comentario.value
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
              this.postComentario(data);
          }
      });
  }
    /**
     * @description: Cierra el modal activo
     */
    public onCerrar(): void {
        this._matDialog.close(true);
    }

    private postComentario(data: any): void {
        this.comentariosService.postComentario(data).subscribe((res) => {
            if (res.data.respuesta == 'OK') {
                Swal.fire(
                    'Completado',
                    'Información guardada con éxito',
                    'success'
                );
                this.onCerrar();
            }else {
                Swal.fire(
                    'Advertencia',
                    `${res.data.respuesta}`,
                    'warning'
                );
            }
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.unsubscribe();
    }
}

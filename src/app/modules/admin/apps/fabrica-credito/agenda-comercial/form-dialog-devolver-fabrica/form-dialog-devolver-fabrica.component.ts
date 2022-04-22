import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComentariosService } from 'app/core/services/comentarios.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormDialogComentariosComponent } from '../../gestion-fabrica-credito/form-dialog-comentarios/form-dialog-comentarios.component';

@Component({
  selector: 'app-form-dialog-devolver-fabrica',
  templateUrl: './form-dialog-devolver-fabrica.component.html',
  styleUrls: ['./form-dialog-devolver-fabrica.component.scss']
})
export class FormDialogDevolverFabricaComponent implements OnInit {

  public form: FormGroup;
  public unsubscribe$: Subject<any> = new Subject<any>();
  constructor(
    private fb: FormBuilder,
    private _dialog: MatDialogRef<FormDialogComentariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private comentariosService: ComentariosService
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.form.controls.numeroSolicitud.setValue(this.data.numeroSolicitud + "");
    if (this.data.idComentario) {
      this.form.controls.comentario.setValue(this.data.comentario);
    }
  }
  /**
   * @description: Cierra el dialogo
   */
  public onCerrar(): void {
    setTimeout(() => {
      this._dialog.close(true);
    }, 1000);
  }

  public onGuardar(): void {
    if (this.form.valid) {
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
          this.postDevolverFabrica(data);
        }
      });
    } else {
      this.form.markAllAsTouched();
    }

  }

  private crearFormulario(): void {
    this.form = this.fb.group({
      numeroSolicitud: [''],
      recurso: ["devolver-agenda-fabrica"],
      comentario: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  private postDevolverFabrica(data: any): void {
    debugger;
    Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    this.comentariosService.postComentarioDevolver(data)
      .subscribe((res) => {
        Swal.close();
        // debugger;
        if (res.data.respuesta == 0) {
          Swal.fire(
            'Completado',
            res.data.msg,
            'success'
          );
          this.onCerrar();
        }else{
         
            Swal.fire(
              'Completado',
              res.data.resultado,
              'success'
            );
          
        }
       
      });
  }

  get requeridoComentario(): any {
    return (this.form.controls.comentario.dirty || this.form.controls.comentario.touched);
  }
  get minimoComentario(): any {
    return (this.form.controls.comentario.errors?.minlength);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }


}

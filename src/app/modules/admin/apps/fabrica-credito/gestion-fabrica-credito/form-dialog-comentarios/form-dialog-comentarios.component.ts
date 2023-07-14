import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import Swal from "sweetalert2";
import { ComentariosService } from "../../../../../../core/services/comentarios.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-form-dialog-comentarios',
    templateUrl: './form-dialog-comentarios.component.html',
    styleUrls: ['./form-dialog-comentarios.component.scss']
})
export class FormDialogComentariosComponent implements OnInit, OnDestroy {
    public form: FormGroup;
    public unsubscribe$: Subject<any> = new Subject<any>();
    listadoTipo: any;
    datoFabrica: any;
    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private _dialog: MatDialogRef<FormDialogComentariosComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private comentariosService: ComentariosService,
        private fabricaCreditoService: FabricaCreditoService,
    ) { 
        this.getFabricaCreditoAgenda(this.data.numeroSolicitud)
    }

    ngOnInit(): void {
        this.crearFormulario();
        this.getTipoComentario();
      
        this.form.controls.numeroSolicitud.setValue(Number(this.data.numeroSolicitud));
        if (this.data.idComentario) {
            this.form.controls.comentario.setValue(this.data.comentario);
        }
    }
    
  /**
 * @description: Obtiene la data para cargar al formulario
 */
  private getFabricaCreditoAgenda(numeroSolicitud: string): void {
      this.comentariosService.obtenerAgendaSolicitud(numeroSolicitud).pipe()
      .subscribe(({ data }) => {
        Swal.close();
        this.datoFabrica = data;
        console.log('datos fabrica', data);
        
      })
  }

    /**
     * @description: Cierra el dialogo
     */
    public onCerrar(): void {
        this._dialog.close();
    }

    public onGuardar(): void {
        if (this.form.valid) {
            const data: any = this.form.getRawValue();
            let valida=this.datoFabrica.agenda!='GC'&&this.datoFabrica.agenda!='CM' && this.datoFabrica.agenda != 'VD';
            let envioData = {
                comentario: data.comentario,
                numeroSolicitud: data.numeroSolicitud,
                tipoComentario: valida?Number(data.tipoComentario):2,
            }
            let mensaje=envioData.tipoComentario==2?'¿Está seguro de agregar este comentario en la gestión del crédito?. Recuerde que este comentario será visible para todos los usuarios.':'¿Está seguro de agregar este comentario en la gestión del crédito?. Recuerde que este comentario no será visible para todos los usuarios';
            Swal.fire({
                title: 'Guardar información',
                text: mensaje,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#a3a0a0',
                confirmButtonText: 'Guardar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.postComentario(envioData);
                }
            });
        } else {
            this.form.markAllAsTouched();
        }

    }

    private crearFormulario(): void {
        this.form = this.fb.group({
            tipoComentario: [""],
            numeroSolicitud: [''],
            comentario: ['', [Validators.required, Validators.minLength(10)]]
        });
    }

    private postComentario(data: any): void {
        Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
        this.comentariosService.postComentario(data).pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => {
                Swal.close();
                this.onCerrar();
            });
    }

    get requeridoComentario(): any {
        return (this.form.controls.comentario.dirty || this.form.controls.comentario.touched);
    }
    get minimoComentario(): any {
        return (this.form.controls.comentario.errors?.minlength);
    }

    /**
* @description: Obtiene el listado de agenda de completacion
*/
    private getTipoComentario(): void {
        Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
        this.comentariosService.getTipoComentario().subscribe((res) => {
            Swal.close();
            if (res.status === 200) {
                this.listadoTipo = res.data;
            } else {
                this.listadoTipo = [];
            }
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.unsubscribe();
    }

}

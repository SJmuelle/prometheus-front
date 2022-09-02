import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComentariosService } from 'app/core/services/comentarios.service';
import { DecisionService } from 'app/core/services/decision.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormDialogComentariosComponent } from '../../gestion-fabrica-credito/form-dialog-comentarios/form-dialog-comentarios.component';

@Component({
    selector: 'app-form-dialog-devolver-fabrica',
    templateUrl: './form-dialog-devolver-fabrica.component.html',
    styleUrls: ['./form-dialog-devolver-fabrica.component.scss'],
})
export class FormDialogDevolverFabricaComponent implements OnInit {
    public form: FormGroup;
    public unsubscribe$: Subject<any> = new Subject<any>();
    titulo: string;
    constructor(
        private fb: FormBuilder,
        private decisionService: DecisionService,
        private _dialog: MatDialogRef<FormDialogComentariosComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private comentariosService: ComentariosService
    ) {}

    ngOnInit(): void {
        this.crearFormulario();
        this.form.controls.numeroSolicitud.setValue(
            this.data.numeroSolicitud + ''
        );
        if (this.data.idComentario) {
            this.form.controls.comentario.setValue(this.data.comentario);
        }
        if (this.data.tipo == 'R') {
            this.titulo = 'Rechazar solicitud';
        } else {
            this.titulo = 'Devolver a fábrica';
        }
    }
    /**
     * @description: Cierra el dialogo
     */
    public onCerrar(): void {
        setTimeout(() => {
            this._dialog.close(true);
            location.reload();
        }, 1000);
    }

    public onGuardar(): void {
        if (this.data.tipo != 'R') {
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
                    cancelButtonText: 'Cancelar',
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.postDevolverFabrica(data);
                    }
                });
            } else {
                this.form.markAllAsTouched();
            }
        } else {
            const data: any = this.form.getRawValue();
            // debugger;
            this.postCambioEstado({
                numeroSolicitud: this.data.numeroSolicitud,
                estado: 'RE',
                subestado: 'GC',
                comentario: data.comentario
            });
        }
    }

    private crearFormulario(): void {
        this.form = this.fb.group({
            numeroSolicitud: [''],
            recurso: ['devolver-agenda-fabrica'],
            comentario: ['', [Validators.required, Validators.minLength(10)]],
        });
    }

    private postDevolverFabrica(data: any): void {
        // debugger;
        Swal.fire({
            title: 'Cargando',
            html: 'Guardando información',
            timer: 500000,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then((result) => {});
        this.comentariosService
            .postComentarioDevolver(data)
            .subscribe((res) => {
                Swal.close();
                // debugger;
                if (res.data.respuesta == 0) {
                    Swal.fire('Completado', res.data.msg, 'success');
                    this.onCerrar();
                } else {
                    Swal.fire('Completado', res.data.resultado, 'success');
                }
            });
    }

    /**
     * @description: Guarda la decision
     */
    private postCambioEstado(data: any): void {
        Swal.fire({
            title: 'Cargando',
            html: 'Guardando información',
            timer: 500000,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then((result) => {});
        this.decisionService
            .postCambioEstado(data)
            .pipe()
            .subscribe((res) => {
                let respuesta: any = {};
                switch (res.status) {
                    case 200:
                        respuesta = {
                            icon: 'success',
                            title: 'Mensaje',
                            text: 'Ha cambiado el estado con éxito',
                        };
                        this.mostrarAlerta(respuesta);

                        //redireccionar

                        break;
                    case 400:
                        respuesta = {
                            icon: 'warning',
                            title: 'Mensaje',
                            text: 'Advertencia',
                        };
                        this.mostrarAlerta(respuesta);
                        break;
                    case 500:
                        respuesta = {
                            icon: 'error',
                            title: 'Mensaje',
                            text: 'Ha ocurrido un error',
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

    get requeridoComentario(): any {
        return (
            this.form.controls.comentario.dirty ||
            this.form.controls.comentario.touched
        );
    }
    get minimoComentario(): any {
        return this.form.controls.comentario.errors?.minlength;
    }

    ngOnDestroy(): void {
        this.unsubscribe$.unsubscribe();
    }
}

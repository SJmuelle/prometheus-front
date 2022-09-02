import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DecisionService } from '../../../../../../core/services/decision.service';
import { Observable, Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { UtilityService } from '../../../../../../resources/services/utility.service';
import { takeUntil } from 'rxjs/operators';
import { FormDialogListErrorDialogComponent } from '../../agenda-referenciacion/form-dialog-list-error-dialog/form-dialog-list-error-dialog.component';
import { Router } from '@angular/router';

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
    mostrarAccion: boolean;
    mostrarCupo: boolean;
    tituloModal: string;
    listadoAgenda: any;
    constructor(
        private fb: FormBuilder,
        private decisionService: DecisionService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialog: MatDialogRef<FormDialogDecisionComponent>,
        public utility: UtilityService,
        public dialog: MatDialog,
        private router: Router
    ) {
        this.crearFormulario();
    }

    ngOnInit(): void {
        this.getDecision();
        this.escuchaObservable();
        this.getCausal();
        console.log(this.data)
        this.getTipoComentario(this.data.idAgenda)
        this.form.controls.numeroSolicitud.setValue(this.data.numeroSolicitud);
        switch (this.data.etapa) {
            case 1:
                this.mostrarAccion = false;
                this.mostrarCupo = false;
                this.tituloModal = "Siguiente etapa"
                break;
            case 2:
                this.mostrarAccion = false;
                this.mostrarCupo = false;
                this.tituloModal = "Devolver Etapa"
                break;

            default:
                this.mostrarAccion = true;
                this.mostrarCupo = true;
                this.tituloModal = "Decisión"

                break;
        }
    }


    /**
* @description: Obtiene el listado de agenda de completacion
*/
    private getTipoComentario(agenda: string): void {
        // Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
        this.decisionService.getAgendasFabrica(agenda).subscribe((res) => {
            // Swal.close();
            if (res.status === 200) {
                this.listadoAgenda = res.data;
            } else {
                this.listadoAgenda = {};
            }
        });
    }
    /**
     * @description: Cierra el dialogo
     */
    public onCerrar(): void {
        this._dialog.close();

        // setTimeout(() => {
        //     location.reload()
        // }, 2000);
    }
    /**
     * @description: Guarda una decision
     */
    public onGuardar(): void {
        if (this.form.valid) {
            const data: any = { ...this.form.getRawValue() };
            data.numeroSolicitud = Number(this.form.controls.numeroSolicitud.value);
            data.cupo = Number(this.utility.enviarNumero(this.form.controls.cupo.value));
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
                    switch (this.data.etapa) {
                        case 1:
                            let data_cambioEstado = {
                                numeroSolicitud: data.numeroSolicitud,
                                estado: this.listadoAgenda.estadoSgte,
                                subestado: this.listadoAgenda.subEstadoSgte,
                                comentario: data.comentario
                            }
                            //validacion del servicio
                            this.validacionCampos({
                                numeroSolicitud: data.numeroSolicitud,
                            },
                                data_cambioEstado
                            )


                            break;
                        case 2:
                            this.postCambioEstado({
                                numeroSolicitud: data.numeroSolicitud,
                                estado: this.listadoAgenda.estadoAnterior,
                                subestado: this.listadoAgenda.subEstadoAnterior,
                                comentario: data.comentario
                            })
                            break;
                        default:
                            this.postDecision(data);
                            break;

                    }
                }
            });
        } else {
            this.form.markAllAsTouched();
        }
    }
    /**
     * @description: Escucha el observable
     */
    public escuchaObservable(): void {
        this.form.controls['concepto'].setValue('A');
        this.form.controls.concepto.valueChanges.subscribe((concepto) => {
            switch (this.data.etapa) {
                case 1:
                    this.form.controls['comentario'].setValidators(Validators.required);
                    break;
                case 2:
                    this.form.controls['comentario'].setValidators(Validators.required);
                    break;

                default:
                    if (concepto !== 'A') {
                        this.form.controls['cupo'].setValue('1');
                        this.form.controls['causal'].setValue(1);
                        this.form.controls['cupo'].clearValidators();
                        this.form.controls['comentario'].setValidators(Validators.required);
                        this.form.controls['comentario'].updateValueAndValidity();
                        this.form.controls['cupo'].updateValueAndValidity();
                    } else {
                        this.form.controls['cupo'].setValue('');
                        this.form.controls['causal'].setValue(0);
                        this.form.controls['cupo'].setValidators(Validators.required);
                        this.form.controls['comentario'].clearValidators();
                        this.form.controls['comentario'].updateValueAndValidity();
                        this.form.controls['cupo'].updateValueAndValidity();
                    }
                    break;
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
            cupo: [''],
            comentario: ['', [Validators.required]],
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
                        if (res.data.resultado == 'OK') {
                            respuesta = {
                                icon: 'success',
                                title: 'Mensaje',
                                text: 'Ha cambiado el estado con éxito'
                            };
                            this.mostrarAlerta(respuesta);
                        }else{
                            respuesta = {
                                icon: 'warning',
                                title: 'Mensaje',
                                text: res.data.resultado
                            };
                            this.mostrarAlerta(respuesta);
                        }
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
    * @description: validacion de campos
    */
    private validacionCampos(data: any, data_cambioEstado): void {
        Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
        this.decisionService.postValidacionDatos(data).subscribe((res) => {
            console.log(res)
            Swal.close();
            if (res.data.estado == 1) {
                this.modalDetalle(res.data.detalle)
            } else {
                this.postCambioEstado(data_cambioEstado)
            }

        })
    }

    private modalDetalle(data) {
        const dialogRef = this.dialog.open(FormDialogListErrorDialogComponent,
            {
                width: '60%',
                data: data,
                disableClose: false
            });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    /**
     * @description: redireciona a la grilla de completacion
     */
    private redireccionar() {
        let agenda = '';
        switch (this.data.idAgenda) {
            case 'CO':
                agenda = 'agenda-completion';
                break;
            case 'CM':
                agenda = 'agenda-comercial';
                break;
            case 'RE':
                agenda = 'agenda-referencing';
                break;
            case 'DE':
                agenda = 'agenda-decision';
                break;
            case 'GC':
                agenda = 'agenda-cartera';
                break;
            default:
                agenda = 'trazabilidad';
                break;
        }
        this.router.navigate([`/credit-factory/${agenda}`]);
    }
    /**
     * @description: Guarda la decision
     */
    private postCambioEstado(data: any): void {
        Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
        this.decisionService.postCambioEstado(data).pipe(takeUntil(this.unsuscribe$))
            .subscribe((res) => {
                let respuesta: any = {};
                switch (res.status) {
                    case 200:
                        if (res.data.resultado == 'OK') {
                            respuesta = {
                                icon: 'success',
                                title: 'Mensaje',
                                text: 'Ha cambiado el estado con éxito'
                            };
                            this.mostrarAlerta(respuesta);
                            setTimeout(() => {
                                //redireccionar
                                this.redireccionar()
                            }, 1000);
                        }else{
                            respuesta = {
                                icon: 'warning',
                                title: 'Mensaje',
                                text: res.data.resultado
                            };
                            this.mostrarAlerta(respuesta);
                        }


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
        setTimeout(() => {
            this.onCerrar();
        }, 1000);
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

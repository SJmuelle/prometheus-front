import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormularioCreditoService } from 'app/core/services/formulario-credito.service';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-microcredito',
    templateUrl: './microcredito.component.html',
    styleUrls: ['./microcredito.component.scss']
})
export class MicrocreditoComponent implements OnInit, OnDestroy {
    form: FormGroup;
    dataInicial;
    dataGeneralIncial;
    listadoActividadEconomica: any[];
    listadoCiudades: any[];
    listadoBarrios: any[];
    editable = true;
    public unidadNegocio: 1;
    public tipoIdentificacion: string = this.route.snapshot.paramMap.get('tipoIdentificacion');
    public identificacion: string = this.route.snapshot.paramMap.get('id');
    public numeroSolicitud: string = this.route.snapshot.paramMap.get('numeroSolicitud');
    public unSubscribe$: Subject<any> = new Subject<any>();
    public plazosCredito$: Observable<any>;

    constructor(
        private fb: FormBuilder,
        private _formularioCreditoService: FormularioCreditoService,
        private route: ActivatedRoute,
        private router: Router,
        private el: ElementRef,
    ) { }

    ngOnInit(): void {
        this.cargueInicial();
        this.form = this.fb.group({
            tipoDocumento: ['', [Validators.required]],
            identificacion: ['', [Validators.required, Validators.pattern('^[0-9]{5,10}$')]],
            primerNombre: ['', [Validators.required, Validators.pattern('^[a-zA-zÀ-úA-Z \u00f1\u00d1]+$')]],
            primerApellido: ['', [Validators.required, Validators.pattern('^[a-zA-zÀ-úA-Z \u00f1\u00d1]+$')]],
            celular: ['', [Validators.required,Validators.pattern('^[1-9][0-9]*$')]],
            email: ['', [Validators.required, Validators.email]],
            fechaNacimiento: ['', [Validators.required]],
            nivelEstudio: ['', [Validators.required]],
            estrato: ['', [Validators.required]],
            genero: [''],
            tipoActividad: ['', [Validators.required]],
            camaraComercio: ['', [Validators.required]],
            tipoLocal: ['', [Validators.required]],
            actividadEconomica: ['', [Validators.required]],
            actividadEspecifica: ['', [Validators.required]],
            antiguedadActividad: ['', [Validators.required, Validators.min(0)]],
            antiguedadNegocio: ['', [Validators.required, Validators.min(0)]],
            departamentoNegocio: ['', [Validators.required]],
            ciudadNegocio: ['', [Validators.required]],
            barrioNegocio: ['', [Validators.required]],
            valorCredito: ['', [Validators.required, Validators.min(1000000), Validators.max(100000000)]],
            plazoCredito: ['', [Validators.required]],
            asesorMicro: [''],
            antiguedadLocal: [''],
            autorizacionCentrales: ['', Validators.requiredTrue],
            clausulaVeracidad: ['', Validators.requiredTrue],
            terminosCondiciones: ['', Validators.requiredTrue]
        });

        this.agregarValidaciones();

        this.form.get('nivelEstudio')?.valueChanges.subscribe((e: string) => {
            this.cargueActividadEconomica()
        });
        this.form.get('tipoActividad')?.valueChanges.subscribe((e: string) => {
            this.cargueActividadEconomica()
        });
        this.form.get('camaraComercio')?.valueChanges.subscribe((e: string) => {
            this.cargueActividadEconomica()
        });

        setTimeout(() => {
            if ((this.tipoIdentificacion) && (this.identificacion)) {
                this.form.controls.tipoDocumento.setValue(this.tipoIdentificacion);
                this.form.controls.identificacion.setValue(this.identificacion);
                this.solicitudesFormularioSimulaciones()
                this.editable = true;
            }
        }, 1000);
    }

    private cargueActividadEconomica() {
        const datos = this.form.getRawValue();
        const { nivelEstudio, tipoActividad, camaraComercio } = datos;
        if ((nivelEstudio) && (nivelEstudio != null) && (tipoActividad) && (tipoActividad != null) && (camaraComercio) && (camaraComercio != null)) {
            this._formularioCreditoService.cargueActividadEconomica(nivelEstudio, tipoActividad, camaraComercio).subscribe((resp: any) => {
                if (resp) {
                    this.listadoActividadEconomica = resp.data
                }
            })
        } else {
            this.listadoActividadEconomica = [];
        }
    }

    private agregarValidaciones(){
        
        this.form.get('tipoLocal').valueChanges.subscribe((e: string) => {
            if (e !== '6') {
                this.form.get('antiguedadLocal')?.setValidators([Validators.required])
                this.form.get('antiguedadLocal')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.form.get('antiguedadLocal')?.setValidators(null)
                this.form.get('antiguedadLocal')?.disable({ emitEvent: true, onlySelf: true })
            }
        })
    }

    public listarBarrios() {
        const datos = this.form.getRawValue();
        const { ciudadNegocio } = datos;
        this._formularioCreditoService.listarBarriosMicro(ciudadNegocio).subscribe((resp: any) => {
            if (resp) {
                this.listadoBarrios = resp.data
            } else {
                this.listadoBarrios = []
            }
        })
    }

    public listarCiudades() {
        const datos = this.form.getRawValue();
        const { departamentoNegocio } = datos;
        this._formularioCreditoService.listarCiudadesMicro(departamentoNegocio).subscribe((resp: any) => {
            if (resp) {
                this.listadoCiudades = resp.data
            } else {
                this.listadoCiudades = []
            }
        })
    }

    public getAsesor() {

        const cod = this.form.controls.barrioNegocio.value
        this._formularioCreditoService.asesorMicro(cod).subscribe(rep => this.form.controls.asesorMicro.setValue(rep?.data?.resultado))
    }

    public solicitudesFormularioSimulaciones() {
        const datos = this.form.getRawValue();
        const { tipoDocumento, identificacion, } = datos;
        if ((tipoDocumento) && (identificacion)) {
            this._formularioCreditoService.cargueSolicitudesFormularioSimulaciones(tipoDocumento, identificacion, 1).subscribe((resp: any) => {
                if (resp) {
                    this.form.patchValue(resp.data);
                    this.dataGeneralIncial = resp.data
                    console.log("Datos", resp.data);
                    this.getPlazosCredito(resp.data?.valorCredito | 0);
                    this.form.controls.valorCredito.setValue(resp.data?.valorCredito | 0)
                    this.form.controls.autorizacionCentrales.setValue(false);
                    this.form.controls.clausulaVeracidad.setValue(false);
                    this.form.controls.terminosCondiciones.setValue(false);

                    if (resp.data.departamentoNegocio) {
                        this.listarCiudades();
                    }
                    if (resp.data.ciudadNegocio) {
                        this.listarBarrios();
                    }
                    this.cargueActividadEconomica()
                    setTimeout(() => {
                        this.form.controls['ciudadNegocio'].setValue(resp.data.ciudadNegocio);
                        this.form.controls['barrioNegocio'].setValue(resp.data.barrioNegocio.toString());
                        this.form.controls['actividadEconomica'].setValue(resp.data.actividadEconomica);
                    }, 2500);

                }
            })
        }
    }

    private cargueInicial() {
        let data = {
            entidad: "CONFIG-MICRO",
            unidadNegocio: 1
        };
        this._formularioCreditoService.cargueInicial(data).subscribe((resp: any) => {
            if (resp) {
                this.dataInicial = resp.data

            }
        })
    }

    /**
     * @description: Obtener limite de plazos por el valor de credito
     */
    public getPlazosCredito(valorCredito: number){
        console.log("Obteniendo");
        
        this.plazosCredito$ = this._formularioCreditoService.validationPlazoMicro({valorCredito})
    }


    save(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            setTimeout(() => {
                this.scrollToFirstInvalidControl();
            }, 200);
            return;
        }
        let data = this.form.getRawValue();

        const { barrioNegocio, valorCredito } = data;
        delete data.barrioNegocio
        data.barrioNegocio = Number(barrioNegocio)
        delete data.valorCredito
        data.valorCredito = Number(valorCredito)
        data.autorizacionCentrales = 'S',
            data.terminosCondiciones = 'S',
            data.clausulaVeracidad = 'S',
            data.unidadNegocio = 1,
            data.tipoTercero = 'T',
            data.autorizacionCentrales = 'S',
            data.clausulaVeracidad = 'S',
            data.terminosCondiciones = 'S'
            
            this._formularioCreditoService.postDatos(data).subscribe(() => {
                Swal.fire(
                    'Completado',
                    'Información guardada con éxito',
                    'success'
                ).then((result) => {
                    if (result) {
                        this.form.reset();
                        this.router.navigate([`/credit-factory/agenda-venta-digital`]);
                    }
                })
                setTimeout(() => {
                    this.form.reset();
                    this.router.navigate([`/credit-factory/agenda-venta-digital`]);
                }, 2000);
            }, (error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Ha ocurrido un error',
                    text: error.error.msg,
                });
            });


    }


    public validacionCampos(campo: string, modificado: string, variable: string, type: String): void {
        let mensaje = `<p>¿Estás seguro de editar el campo de <strong>${campo}</strong>?, ${modificado}.</p>`;
        Swal.fire({
            title: 'Guardar información',
            html: mensaje,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#a3a0a0',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
            } else {
                console.log("Type", type, "Variable", variable);

                if (type === "INTEGER") {

                    this.form.controls[variable].setValue(Number(this.dataGeneralIncial[variable]));
                }
                if (type === "STRING") {
                    this.form.controls[variable].setValue(this.dataGeneralIncial[variable].toString());
                }
            }
        });
    }

    /**
     * @description hace scroll al primerer input invalido, puede ser un input o select
     */
    private scrollToFirstInvalidControl() {
        let firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector('.mat-form-field-invalid')?.querySelector('.mat-input-element');

        if (!firstInvalidControl) {
            firstInvalidControl = this.el.nativeElement.querySelector('.mat-form-field-invalid')?.querySelector('.mat-select');
            if (!firstInvalidControl) {
                firstInvalidControl = this.el.nativeElement.querySelector('.mat-error');
            }
        }
        console.log("firstInvalidControl", firstInvalidControl);

        firstInvalidControl?.focus(); //without smooth behavior
    }


    ngOnDestroy(): void {
        this.unSubscribe$.unsubscribe();
        // this.agendaCompletacionService.resetSeleccionAgenda();
    }
}

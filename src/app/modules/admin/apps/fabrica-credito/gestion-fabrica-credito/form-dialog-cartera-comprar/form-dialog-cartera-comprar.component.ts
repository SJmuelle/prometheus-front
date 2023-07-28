import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenericasService } from 'app/core/services/genericas.service';
import { ListadoCarteraService } from 'app/core/services/listadoCartera.service';
import { UtilityService } from 'app/resources/services/utility.service';
import { map, startWith, takeUntil } from 'rxjs/operators';

import { Subject, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';

@Component({
    selector: 'app-form-dialog-cartera-comprar',
    templateUrl: './form-dialog-cartera-comprar.component.html',
    styleUrls: ['./form-dialog-cartera-comprar.component.scss']
})
export class FormDialogCarteraComprarComponent implements OnInit, OnDestroy {

    public form: FormGroup;
    public unsubscribe$: Subject<any> = new Subject<any>();
    listadoTipo: any;
    tipo: string;

    public entidadBancaria$: Observable<any>;
    public tipoCuentaBancaria$: Observable<any>;
    public estadoCuenta$: Observable<any>;

    //varibales d eprueba
    myControl = new FormControl('');
    options: string[] = ['One', 'Two', 'Three'];
    filteredOptions: Observable<any[]>;
    entidadOptions: any[] = [];
    entidadFinanciera: any[] = [];
    entidadOptionsNueva: any[] = [];
    nuevo: boolean = false;
    //fin prueba

    constructor(
        private fb: FormBuilder,
        private _dialog: MatDialogRef<FormDialogCarteraComprarComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private genericaServices: GenericasService,
        private _listadoCarteraService: ListadoCarteraService,
        public utility: UtilityService,
        private _fabricaService: FabricaCreditoService

    ) {
        this.crearFormulario();
    }

    ngOnInit(): void {

        this.getEntidadBancaria();
        this.getTipoCuentaBancaria();
        this.form.get('nombreEntidadNueva').valueChanges.subscribe(value => this.colocarNit(value));
        this.form.get('nombreEntidadNueva').valueChanges.subscribe(value => this.postBusquedaEntidadFinanciera(value));
        this.form.controls.numeroSolicitud.setValue(Number(this.data.numeroSolicitud));
        this.form.controls.identificacion.setValue(this.data.identificacion.toString());

        // this.form.controls.estadoCuenta.setValue(this.data.tipo == 'D' ? 'DEUDA' : 'AL DIA');
        this.form.controls.alDia.setValue(this.data.tipo == 'D' ? false : true);
        this.tipo = this.data.tipo;
        this.postBusquedaEntidadFinanciera('');
        this.getEstadoCuenta(this.data.tipo != 'D' ? "AL DIA" : "EN MORA");
        this.filteredOptions = this.form.controls.nombreEntidadNueva.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
        );



        if (this.data.item != null) {
            this.nuevo = true;
            if (this.data.item.nit) {
                this.form.controls.nit.setValue(this.data.item.nit);
            }
            this.form.controls.entidad.setValue(this.data.item.entidad);
            this.form.controls.nombreEntidadNueva.setValue(this.data.item.entidad)
            this.getEntidadesObservable(this.form.controls.entidad.value);
            this.form.controls.numeroCuenta.setValue(this.data.item.numeroCuenta);
            this.form.controls.maximaMora.setValue(this.data.item.maximaMora);
            this.form.controls.saldoActual.setValue(this.utility.formatearNumero(this.data.item.saldoActual));
            this.form.controls.estadoCuenta.setValue(this.data.item.estadoCuenta);
            this.form.controls.idObligacion.setValue(Number(this.data.item.id.toString()));
            this.form.controls.codigoEstado.setValue(this.data.item.codigoEstado);
            // this.form.controls.nombreEntidadNueva.setValue(true)

            // this.form.get('entidad').valueChanges.subscribe(entidad => {
            //     this.getEntidadesObservable(entidad);
            // })

            this.form.get('nombreEntidadNueva').valueChanges.subscribe(entidad => {
                this.getEntidadesObservable(entidad);
            })
        }
    }

    private _filter(value: string): any[] {
        const filterValue = value.toLowerCase();
        return this.entidadFinanciera.filter(option => option.nombre.toLowerCase().includes(filterValue));
        // return this.genericaServices.postBusquedaEntidadFinanciera(filterValue);
    }

    private postBusquedaEntidadFinanciera(nombre: string) {
        this.genericaServices.postBusquedaEntidadFinanciera(nombre).subscribe((res) => {
            this.entidadFinanciera = res.data;
            console.log('entidad financiera', res.data);

        });
    }

    /**
     * @description: Cierra el dialogo
     */
    public onCerrar(): void {
        this._dialog.close();
    }


    /**
     * @description: Obtiene los tipos de estados civiles
     */
    private getTipoCuentaBancaria(): void {
        this.tipoCuentaBancaria$ = this.genericaServices.getTipoCuentaBancaria();
    }

    /**
   * @description: Obtiene los tipos de estados civiles
   */
    private getEstadoCuenta(tipo): void {
        this.estadoCuenta$ = this.genericaServices.getEstadoCuenta(tipo);
    }


    /**
  * @description: Obtiene los tipos de estados civiles
  */
    private getEntidadBancaria(): void {
        this.entidadBancaria$ = this.genericaServices.getEntidadBancaria();
    }
    public onGuardar(): void {
        if (this.form.valid) {
            const datos: any = this.form.getRawValue();
            const { nitNuevo, saldoActual, estadoCuenta, entidad, nombreEntidadNueva, saldoReal, ...data } = datos;
            const saldoRealFormato = Number(this.utility.enviarNumero(this.form.value.saldoReal));
            const saldoActualFormato = this.utility.enviarNumero(this.form.value.saldoActual);
            const saldoMoraFormato = this.utility.enviarNumero(this.form.value.saldoMora);
            delete data.saldoActual;
            delete data.saldoMora;
            delete data.estadoCuenta;
            delete data.entidad;
            let datosFormularios: any
            let mensaje;
            // const data: any = this.form.getRawValue();
            mensaje = '¿Desea comprar esta obligación?'
            datosFormularios = {
                saldoActual: saldoActualFormato,
                saldoMora: saldoMoraFormato,
                saldoReal: saldoRealFormato,
                estadoCuenta: estadoCuenta.toUpperCase(),
                entidad: entidad.toUpperCase(),
                nombreEntidadNueva: this.form.value.nuevaEntidad ? entidad : nombreEntidadNueva.toUpperCase(),
                nitNuevo: this.form.value.nuevaEntidad ? this.form.value.nit : nitNuevo,
                ...data
            }
            // ;

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
                    this.editarCambio(datosFormularios);


                }
            });
        } else {
            this.form.markAllAsTouched();
        }

    }

    public guardadoCambio(data) {
        Swal.fire({
            title: 'Cargando',
            html: 'Guardando información',
            timer: 500000,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then((result) => { });
        this._listadoCarteraService
            .createCartera(data)
            .subscribe((res) => {
                Swal.close();
                if (res.data.resultado == 'OK') {
                    this.onCerrar();
                } else {
                    Swal.fire('Error', res.data.msg, 'error');
                }
            });

    }
    public editarCambio(data) {
        Swal.fire({
            title: 'Cargando',
            html: 'Guardando información',
            timer: 500000,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then((result) => { });
        this._listadoCarteraService
            .guardarGestionCompra(data)
            .subscribe((res) => {
                Swal.close();
                if (res.data.resultado == 'OK') {
                    let msg = res.data.msg == 'OK' ? 'Registro guardado con éxito' : res.data.msg;
                    Swal.fire('Completado', res.data.msg, 'success');
                    setTimeout(() => {
                        this.onCerrar();
                    }, 1000);
                } else {
                    Swal.fire('Error', res.data.resultado, 'error');
                }
            });

    }

    private crearFormulario(): void {
        this.form = this.fb.group({
            numeroSolicitud: [''],
            identificacion: [''],
            entidad: [''],
            sector: [''],
            tipoCuenta: [''],
            numeroCuenta: [''],
            estadoCuenta: [''],
            maximaMora: [''],
            saldoActual: [''],
            saldoReal: ['', Validators.required],
            saldoMora: [''],
            nit: [''],
            nitNuevo: [''],
            idObligacion: [''],
            agregadaManualmente: true,
            codigoEstado: [''],
            alDia: Boolean,
            nombreEntidadNueva: [''],
            nuevaEntidad: true,
            gestionCartera: 'COM'


        });
    }

    colocarNit(valor) {
        if (valor) {
            const result = this.entidadFinanciera.filter(entidadFinanciera => entidadFinanciera.nombre == valor);
            if (result.length == 1) {
                this.form.controls.nitNuevo.setValue(result[0].nit);
            }
        }
    }



    getEntidadesObservable(entidad: string) {
        if(entidad.length > 0){
            this._fabricaService.carteraEntidadNombres({
                entidad
            }).subscribe(({ data }) => {
                this.entidadOptions = data
                this.getNitApi()
            })
        }
    }

    getEntidadesObservableNueva(entidad: string) {
        if(entidad.length > 0){
            this._fabricaService.carteraEntidadNombres({
                entidad
            }).subscribe(({ data }) => {
                this.entidadOptionsNueva = data
                this.getNitApiNueva()
            })
        }
    }

    getNitApiNueva(){
        console.log('length', this.entidadOptionsNueva.length);

        if(this.entidadOptionsNueva.length === 1){
            this.form.get('nitNuevo').setValue(this.entidadOptionsNueva[0].nitEntidad)
        }
    }

    getNitApi(){
        console.log('length', this.entidadOptions.length);

        if(this.entidadOptions.length === 1){
            this.form.get('nit').setValue(this.entidadOptions[0].nitEntidad)
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe$.unsubscribe();
    }
}

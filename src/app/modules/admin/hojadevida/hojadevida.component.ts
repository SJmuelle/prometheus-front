import { Component, Input, OnInit } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl,
} from '@angular/forms';
import { ICredito } from 'app/resources/interfaces/hojadevida/credito/icredito';
import { ITableData } from 'app/resources/interfaces/itable-data';
import { CreditoService } from 'app/resources/services/hojadevida/credito/credito.service';
import { HistorialGestionService } from 'app/resources/services/hojadevida/historial-gestion.service';
import { HojadevidaService } from 'app/resources/services/hojadevida/hojadevida.service';
import { NegociacionesService } from 'app/resources/services/hojadevida/negociaciones.service';
import { List } from 'lodash';

@Component({
    selector: 'app-hojadevida',
    templateUrl: './hojadevida.component.html',
    styleUrls: ['./hojadevida.component.scss'],
})
export class HojadevidaComponent implements OnInit {
    formHv: FormGroup;
    datosCliente: FormGroup;
    negocios: any[];
    datosClientesVal: boolean = false;
    codNegocio: string = '';

    // NOMBRE DE LAS TAB DE LAS PESTAÑAS
    iTable: ITableData = {
        state: false,
        data: { nombres: [], titulos: [], filas: [] },
    };

    tabCartera: boolean = false;
    tabGestion: ITableData;
    tabNegociaciones: ITableData;
    tabExtractos: boolean = false;
    tabReportes: boolean = false;
    tabPqrs: boolean = false;

    // INTERFACES DE PESTAÑAS
    @Input() iCredito: List<ICredito>;

    constructor(
        private fb: FormBuilder,
        private _hojadevidaService: HojadevidaService,
        private _creditoService: CreditoService,
        private _historialService: HistorialGestionService,
        private _negociacionesService: NegociacionesService
    ) {
        this.formHv = this.fb.group({
            search: ['', Validators.required],
        });
        this.datosCliente = this.fb.group({
            primerNombre: [{ value: '', disabled: true }, Validators.required],
            segundoNombre: [{ value: '', disabled: true }, Validators.required],
            primerApellido: [
                { value: '', disabled: true },
                Validators.required,
            ],
            segundoApellido: [
                { value: '', disabled: true },
                Validators.required,
            ],
            departamento: [{ value: '', disabled: true }, Validators.required],
            ciudad: [{ value: '', disabled: true }, Validators.required],
            barrio: [{ value: '', disabled: true }, Validators.required],
            direccion: [{ value: '', disabled: true }, Validators.required],
            telefono: [{ value: 0, disabled: true }, Validators.required],
            celular: [{ value: 0, disabled: true }, Validators.required],
            email: [{ value: '', disabled: true }, Validators.required],
            segmento: [{ value: '', disabled: true }, Validators.required],
            tipoNegociacion: [
                { value: '', disabled: true },
                Validators.required,
            ],
            fechaNegociacion: [
                { value: '', disabled: true },
                Validators.required,
            ],
        });

        // TABS
        this.tabGestion = this.tabNegociaciones = this.iTable;
    }

    compareObjects(o1: any, o2: any) {
        if (o1 === o2) {
            return true;
        } else {
            return false;
        }
    }

    buscarClientes(formS: any) {
        if (this.formHv.invalid) {
            return;
        }

        // Disable the form
        this.formHv.disable();
        this._hojadevidaService
            .getNegocios(formS.cedula)
            .subscribe((response: any) => {
                this.negocios = response.data;
                this.formHv.enable();
            });
    }

    ngOnInit(): void {
        this.formHv.get('search').valueChanges.subscribe((value) => {
            if (value === '1') {
                this.formHv.addControl(
                    'cedula',
                    new FormControl('77013013', Validators.required)
                );
                this.formHv.addControl('codigoNegocio', new FormControl(''));
            } else {
                this.addControls(this.formHv, ['codigoNegocio']);
                this.removeControl(this.formHv, ['cedula']);
            }
        });
    }

    buscarInfo(form: any) {
        this._hojadevidaService
            .getInfoCliente(form.codigoNegocio)
            .subscribe((response: any) => {
                this.datosClientesVal = true;
                this.datosCliente.patchValue(response.data);
                this.getCreditoData(form.codigoNegocio);
                this.codNegocio = form.codigoNegocio;
            });
    }

    /**
     * Metodo para eliminar controles al formulario
     *
     * @param form Formulario al cual se va eliminar el control
     * @param arrayName Lista de nombre de controles para eliminar al formulario
     */
    removeControl(form: FormGroup, arrayName: Array<string>) {
        arrayName.forEach((name) => form.removeControl(name));
    }

    /**
     * Metodo para agregar controles al formulario
     *
     * @param form Formulario al cual se va agregar el control
     * @param arrayName Lista de nombre de controles para agregar al formulario
     */
    addControls(form, arrayName: Array<string>) {
        arrayName.forEach((name) =>
            form.addControl(name, new FormControl('', Validators.required))
        );
    }

    get f() {
        return this.formHv.controls;
    }

    // SUBSCRIBES
    getCreditoData(codigoNegocio) {
        // SERVICIO DE LA PESTAÑA DEL CREDITO
        this._creditoService
            .getCredito(codigoNegocio)
            .subscribe((respCredito: any) => {
                if (respCredito.data) {
                    this.iCredito = respCredito.data;
                }
            });
    }

    onTabChanged(event): void {
        switch (event.index) {
            case 1:
                this.tabCartera = true;
                break;
            case 2:
                this._historialService
                    .getHistorialGestion(this.codNegocio)
                    .subscribe((response: any) => {
                        this.tabGestion.data.titulos =
                            this._historialService.titulos;
                        this.tabGestion.data.nombres =
                            this._historialService.nombres;

                        if (response.data) {
                            this.tabGestion.data.filas = response.data;
                        }

                        this.tabGestion.state = true;
                    });
                break;
            case 3:
                this._negociacionesService
                    .getNegociaciones(this.codNegocio)
                    .subscribe((response: any) => {
                        this.tabNegociaciones.data.titulos =
                            this._negociacionesService.titulos;
                        this.tabNegociaciones.data.nombres =
                            this._negociacionesService.nombres;

                        if (response.data) {
                            this.tabNegociaciones.data.filas = response.data;
                        }

                        this.tabNegociaciones.state = true;
                    });
                break;
            default:
                break;
        }
    }
}

import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ConductoresService } from "app/core/services/conductores.service";
import { DepartamentosCiudadesService } from "app/core/services/departamentos-ciudades.service";
import { GenericasService } from "app/core/services/genericas.service";
import { Observable, Subscription } from "rxjs";
import Swal from "sweetalert2";

@Component({
    selector: 'app-form-detalles-conductores',
    templateUrl: './form-detalles-conductores.component.html',
    styleUrls: ['./form-detalles-conductores.component.scss'],
})
export class FormDetallesConductoresComponent implements OnInit, OnDestroy {
    public form: FormGroup;
    public estadoReferencia$: Observable<any>;
    public departamentos$: Observable<any>;
    public ciudades$: Observable<any>;
    public barrios$: Observable<any>;
    public tipoVia$: Observable<any>;
    public subscription$: Subscription;


    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialog: MatDialogRef<FormDetallesConductoresComponent>,
        private fb: FormBuilder,
        private genericaService: GenericasService,
        private departamentosCiudadesService: DepartamentosCiudadesService,
        private genericaServices: GenericasService,
        private conductoresService: ConductoresService,
    ) { }


    ngOnInit(): void {     
        this.crearFormulario();
        this.form.patchValue(this.data);
        this.getEstadosReferencias();
        this.getDepartamentos();
        this.getTipoVia();
        
        this.form.get('codigoDepartamento')?.valueChanges.subscribe(id => { this.getCiudades(id) })
        this.form.get('codigoCiudad')?.valueChanges.subscribe(id => { this.getBarrios(id) })
    }


    private getDepartamentos(): void {
        this.departamentos$ = this.departamentosCiudadesService.getDepartamentos();
    }
    private getCiudades(codigo: string): void {
        this.ciudades$ = this.departamentosCiudadesService.getCiudades(codigo);
    }
    private getBarrios(codigo: string): void {
        this.barrios$ = this.departamentosCiudadesService.getBarrios(codigo);
    }

    private getEstadosReferencias(): void {
        this.estadoReferencia$ = this.genericaService.getEstadoReferencias();
    }
    private getTipoVia(): void {
        this.tipoVia$ = this.genericaServices.getTipoVia();
    }

    private crearFormulario(): void {
        this.form = this.fb.group({
            numeroSolicitud: ['', [Validators.required]],
            idConductor: ['', [Validators.required]],
            identificacion: ['', [Validators.required], [Validators.required], [Validators.pattern(/^[0-9]*$/), Validators.minLength(5), Validators.maxLength(10)]],
            primerNombre: ['', [Validators.required]],
            segundoNombre: [''],
            primerApellido: ['', [Validators.required]],
            segundoApellido: [''],
            nombreCompleto: ['', [Validators.required]],
            email: ['', [Validators.required]],
            codigoDepartamento:["",[Validators.required]],
            codigoCiudad:["",[Validators.required]],
            codigoBarrio:["",[Validators.required]],
            celular: ['', [Validators.required], [Validators.pattern(/^[0-9]*$/), Validators.minLength(7), Validators.maxLength(11)]],
            direccion: ['', [Validators.required]],
            direccionViaTipo: ['', [Validators.required]],
            direccionViaPrincipal: ['', [Validators.required]],
            direccionViaNumero: ['', [Validators.required]],
            direccionViaDistancia: ['', [Validators.required]],
            direccionViaComplemento: ['', [Validators.required]],
            estadoConductor: ['', [Validators.required]],
            tipo: [''],
        });
    }

    public onGuardar() {
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
                Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
                this.conductoresService.postConductores( this.form.getRawValue())
                .subscribe((res) => {
                    debugger
                    if(res){

                    }
                    this._dialog.close();
                })
               
            } 
        })
    }

    public campoRequerido(field: string) {
        return this.form.controls[field].errors && this.form.controls[field].touched;
    }


    public onCerrar(): void {
        this.subscription$.unsubscribe();
        this._dialog.close();
    }

    ngOnDestroy(): void {

    }

}

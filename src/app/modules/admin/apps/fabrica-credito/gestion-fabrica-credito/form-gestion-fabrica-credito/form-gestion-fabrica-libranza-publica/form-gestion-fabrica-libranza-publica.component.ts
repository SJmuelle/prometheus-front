import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { FormularioCreditoService } from 'app/core/services/formulario-credito.service';
import { Subject, Observable, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import moment from 'moment';

@Component({
    selector: 'app-form-gestion-fabrica-libranza-publica',
    templateUrl: './form-gestion-fabrica-libranza-publica.component.html',
    styleUrls: ['./form-gestion-fabrica-libranza-publica.component.scss']
})
export class FormGestionFabricaLibranzaPublicaComponent implements OnInit {

    public form: FormGroup;
    public fabricaDatos;
    public unSubscribe$: Subject<any> = new Subject<any>();
    public dataInicial;
    fechaActual: any = moment().locale("co");

    constructor(private _fabricaCreditoService: FabricaCreditoService,
        private _formularioCreditoService: FormularioCreditoService, private fb: FormBuilder) { }

    ngOnInit(): void {
        this.cargueInicial();
    }

    private cargueInicial() {
        let data = {
            entidad: "CONFIG-MICRO",
            unidadNegocio: 1
        };
        this._formularioCreditoService.cargueInicial(data).pipe(takeUntil(this.unSubscribe$)).subscribe((resp: any) => {
            if (resp) {
                this.dataInicial = resp.data
            }
        })}

    /**
     * @description :creando el formulario
     */

    private createFormulario() {
        this.form = this.fb.group({
            numeroSolicitud: [''],
            tipo: [''],
            aplicaDeudorSolidario: [''],
            creditoTitularLineas: [''],
            fechaIngresoFabrica: [''],
            tipoCredito: [''],
            emision: [''],
            tipoDocumento: [''],
            identificacion: [''],
            nombreCompleto: [''],
            descripcionTipoDocumento: [''],
            celular: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern('^[3][0-9]{9}$')]],
            descripcionTipoCredito: [''],
            primerNombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/)]],
            descripcionEstado: [''],
            descripcionSubestado: [''],
            segundoNombre: ['', [Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/)]],
            primerApellido: ['', [Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/)]],
            segundoApellido: ['', [Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/)]],
            estadoCivil: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            genero: ['', [Validators.required]],
            nacionalidad: ['', [Validators.required]],
            fechaNacimiento: ['', [Validators.required, this.validatedDate.bind(this)]],
            nivelEstudio: ['', [Validators.required]],
            numeroHijos: ['', [Validators.required, Validators.minLength(0), Validators.min(0), Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/)]],
            personasACargo: ['', [Validators.required, Validators.minLength(0), Validators.min(0), Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/)]],
            fechaExpedicion: ['', [Validators.required, this.validatedDate.bind(this), this.validateExpedicion.bind(this)]],
            codigoDepartamentoExpedicion: ['', Validators.required],
            codigoCiudadExpedicion: ['', [Validators.required]],
            estrato: ['', [Validators.required]],
            codigoDepartamento: ['', [Validators.required]],
            codigoCiudad: ['', Validators.required],
            barrioResidencia: ['', Validators.required],
            direccionResidencial: [''],
            direccionTipoVia: ['', [Validators.required]],
            direccionViaPrincipal: ['', [Validators.required, Validators.min(0)]],
            direccionNumeroVia: ['', [Validators.required, Validators.min(0)]],
            direccionDistanciaVia: ['', [Validators.required]],
            direccionComplemento: [''],
            tipoVivienda: ['', Validators.required],
            annosTiempoResidencia: ['', [Validators.required, Validators.minLength(0), Validators.min(0)]],
            mesesTiempoResidencia: ['', [Validators.required, Validators.minLength(0), Validators.min(0)]],
            tipoActividad: ['', Validators.required],
            actividadEconomica: ['', Validators.required],
            actividadEspecifica: ['', Validators.required],
            antiguedadActividad: ['', [Validators.required, Validators.minLength(0), Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/)]],
            antiguedadNegocio: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/)]],
            camaraComercio: ['', [Validators.required]],
            tieneRut: [''],
            nitNegocio: [''],
            nombreNegocio: ['', Validators.required],
            codigoDepartamentoNegocio: ['', [Validators.required]],
            codigoCiudadNegocio: ['', Validators.required],
            codigoBarrioNegocio: ['', Validators.required],
            segmento: [''],
            direccionNegocio: [''],
            direccionNegocioVia: ['', Validators.required],
            direccionNegocioPrincipal: ['', Validators.required],
            direccionNegocioNroVia: ['', Validators.required],
            direccionNegocioDistanciaVia: ['', Validators.required],
            direccionNegocioCompleto: [''],
            telefonoNegocio: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/), Validators.minLength(7), Validators.maxLength(10)]],
            tipoLocal: [''],
            tipoLocalCalulado: [''],
            antiguedadLocal: ['', Validators.required],
            nombreArrendador: [''],
            celularArrendador: [''],
            tipoUbicacionNegocio: ['', Validators.required],
            numeroEmpleados: ['', [Validators.required]],
            nombreAtiendeNegocio: ['', Validators.required],
            tieneOtrosPuntos: ['', Validators.required],
            tipoDocumentoConyuge: [''],
            identificacionConyuge: [''],
            nombreCompletoConyuge: [''],
            celularConyuge: [''],
            primerNombreConyuge: [''],
            segundoNombreConyuge: [''],
            primerApellidoConyuge: [''],
            segundoApellidoConyuge: [''],
            emailConyuge: [''],
            tipoEmpleoConyuge: [''],
            nombreEmpresaConyuge: [''],
            cargoConyuge: [''],
            salarioConyuge: [''],
            telefonoEmpresaConyuge: [''],
            poseeCuentaBancaria: ['', Validators.required],
            tipoCuentaBancaria: [''],
            entidadBancaria: [''],
            numeroCuentaBancaria: [''],
            autorizacionBanco: [''],
            tipoDeudor: ['', Validators.required],
            legalCargoPublico: ['N', Validators.required],
            entidadPublico: [''],
            vinculadoActualPublico: [''],
            fechaDesvinculacionPublico: [''],
            legalPersonalExpuesta: ['N', Validators.required],
            tiposTercerosSolicitud: [''],
            vinculacionExpuesta: [''],
            familiarDePersonaExpuestaPyP: [''],
            cargoRecursosPartidoPolitico: [''],
            nombreExpuesta: [''],
            tipoIdentificacionExpuesta: [''],
            identificacionExpuesta: [''],
            nacionalidadExpuesta: [''],
            entidadExpuesta: [''],
            cargoExpuesta: [''],
            vinculadoActualExpuesta: [''],
            fechaDesvinculacionExpuesta: [''],
            legalDesarrollaActividadApnfd: ['N', Validators.required],
            legalCargoPartidoPolitico: ['N', Validators.required],
            legalOperacionCriptomoneda: ['N', Validators.required],
            tipoOperacionCripto: [''],
            tipoOperacionCriptomoneda: [''],
            legalOperacionExtranjera: ['N', Validators.required],
            tipoOperacionExtranjera: [''],
            declaroIngresoDeclaracionAuto: ['', Validators.required],
            otroIngresoDeclaracionAuto: [''],
            plazo: ['', [Validators.required]],
            descripcionTipo: [''],
            titularMicro: [''],
            aplicaCodeudor: [''],
            valorSolicitadoWeb: ['', [Validators.required, Validators.min(0)]],
            creditoCodeudorLineas: [''],
            modificadaSolicitud: [''],
            valorSolicitado: ['', [Validators.required, Validators.minLength(0)]],
            destinoCredito: ['', [Validators.required]],
            codeudorMicro: [''],
            codigoBarrio: ['', [Validators.required]],
            declaraRenta: ['N', [Validators.required]],
            cargoPublico: [''],
            entidad: [''],
            vinculadoActualmente: [''],
            fechaDesvinculacion: [''],
            actividadNoDesignada: [''],
            ubicacionNegocioCalculado: [''],
            tipoVereda: ['', Validators.required],
            descripcionVereda: [''],
            tipoVeredaNegocio: [''],
            descripcionVeredaNegocio: [''],
            autoricacionDatosPersonalClaracionAuto: [''],
            clausulaAnticurrupcionClaracionAuto: [''],
            score: ['']
        },
        );
    }

    private validatedDate(control: AbstractControl) {
        const valueControl = control?.value ?? '';
        const date = moment(valueControl).format('YYYY-MM-DD')
        const errors = { dateError: true };

        // Set the validation error on the matching control
        if (this.fechaActual.isBefore(date)) {

            return errors
        } else {
            return null
        }
    }

    private validateExpedicion(control: AbstractControl) {
        const valueControl = control?.value ?? '';
        let date: any = moment(valueControl)

        const errors = { expedicionDate: true };

        const nacimientoDate: any = moment(this.form?.controls.fechaNacimiento.value || '').format('YYYY-MM-DD');
        // Set the validation error on the matching control

        date.subtract(18, 'years');
        if (date.isBefore(nacimientoDate)) {

            return errors
        } else {
            return null
        }
    }
}



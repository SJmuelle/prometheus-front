import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { FormularioCreditoService } from 'app/core/services/formulario-credito.service';
import { Subject, Observable, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
import { DepartamentosCiudadesService } from 'app/core/services/departamentos-ciudades.service';
import Swal from 'sweetalert2';

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
    public dataGeneralIncial: any;
    public agendaActual: string;
    public actividadEconomica: string;
    public unidadNegocio: any;

    fechaActual: any = moment().locale("co");
    public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
    public identificacion: string = this.route.snapshot.paramMap.get('id');

    public ciudades: any;
    public ciudadesNacimiento$: Observable<any>;
    public ciudadesNegocio: any;
    public barrios: any;
    public barriosNegocio: any;
    public ciudadesExpedicion: any;
    public plazosCredito: any;

    constructor(private _fabricaCreditoService: FabricaCreditoService,
        private _formularioCreditoService: FormularioCreditoService, private fb: FormBuilder,private route: ActivatedRoute
        , private fabricaCreditoService: FabricaCreditoService,private departamentosCiudadesService: DepartamentosCiudadesService,
        private el: ElementRef) { 
            this.createFormulario();
        }

    ngOnInit(): void {
        this.cargueInicial();
        this.getFabricaCreditoAgenda(this.numeroSolicitud,this.identificacion);
    }

    private cargueInicial() {
        let data = {
            entidad: "CONFIG-LIBRANZA-PUBLICA",
            unidadNegocio: 22
        };
        this._formularioCreditoService.cargueInicial(data).pipe(takeUntil(this.unSubscribe$)).subscribe((resp: any) => {
            if (resp) {
                this.dataInicial = resp.data
                console.log('data inicial', resp.data);
                
            }
        })}

    /**
     * @description :creando el formulario
     */

    private createFormulario() {
        this.form = this.fb.group({
            numeroSolicitud: [''],
            tipo: [''],
            creditoTitularLineas: [''],
            fechaIngresoFabrica: [''],
            tipoCredito: [''],
            emision: [''],
            tipoDocumento: [''],
            identificacion: [''],
            nombreCompleto: [''],
            descripcionTipoDocumento: [''],
            celular: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern('^[3][0-9]+$')]],
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
            // numeroHijos: ['', [Validators.required, Validators.minLength(0), Validators.min(0), Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/)]],
            personasACargo: ['', [Validators.required, Validators.minLength(0), Validators.min(0), Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/)]],
            fechaExpedicion: ['', [Validators.required, this.validatedDate.bind(this), this.validateExpedicion.bind(this)]],
            codigoDepartamentoExpedicion: ['', Validators.required],
            codigoCiudadExpedicion: ['', [Validators.required]],
            estrato: ['', [Validators.required]],
            codigoDepartamento: ['', [Validators.required]],
            codigoDepartamentoNacimiento: ['', Validators.required],
            codigoMunicipioNacimiento: ['', Validators.required],
            codigoCiudad: ['', Validators.required],
            barrioResidencia: ['', Validators.required],
            direccionResidencial: [''],
            direccionTipoVia: ['', [Validators.required]],
            direccionViaPrincipal: ['', [Validators.required, Validators.min(0)]],
            direccionNumeroVia: ['', [Validators.required, Validators.min(0)]],
            direccionDistanciaVia: ['', [Validators.required]],
            direccionComplemento: [''],
            tipoVivienda: ['', Validators.required],

            tipoDocumentoConyuge: [''],
            identificacionConyuge: [''],
            nombreCompletoConyuge: [''],
            celularConyuge: [''],
            primerNombreConyuge: [''],
            segundoNombreConyuge: [''],
            primerApellidoConyuge: [''],
            segundoApellidoConyuge: [''],
            poseeCuentaBancaria: ['', Validators.required],
            tipoCuentaBancaria: [''],
            entidadBancaria: [''],
            numeroCuentaBancaria: [''],
            autorizacionBanco: [''],
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
            aplicaCodeudor: [''],
            valorSolicitadoWeb: ['', [Validators.required, Validators.min(0)]],
            creditoCodeudorLineas: [''],
            modificadaSolicitud: [''],
            valorSolicitado: ['', [Validators.required, Validators.minLength(0)]],
            destinoCredito: ['', [Validators.required]],
            codigoBarrio: ['', [Validators.required]],
            cargoPublico: [''],
            entidad: [''],
            vinculadoActualmente: [''],
            fechaDesvinculacion: [''],
            actividadNoDesignada: [''],
            autoricacionDatosPersonalClaracionAuto: [''],
            clausulaAnticurrupcionClaracionAuto: [''],
            
            ocupacio: [''],
            pagaduria: ['', Validators.required],
            otraPagaduria: [''],
            tipoContrato: [''],
            fechaVinculacion: [''],
            cargo: [''],
            claveVolantePago: ['', [Validators.required, Validators.maxLength(50)]],
            salarioBasico: [''],
            otrosIngreso: [''],
            descuentoNomina: [''],
            totalIngresosLaborales: [''],
            declaraRenta: ['N', [Validators.required]],
            codigoAsesor: ['']
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

    /**
     * @description: Obtiene la data para cargar al formulario
     */
    private getFabricaCreditoAgenda(numeroSolicitud: string, identificacion: string): void {


        this.fabricaCreditoService.getInformacionTipoTercero(numeroSolicitud, 'T').pipe(takeUntil(this.unSubscribe$))
            .subscribe(({ data }) => {
                this.dataGeneralIncial = data;
                this.form.patchValue(data);

                // this.form.controls.tipoVeredaNegocio.setValue(data.tipoVeredaNegocio === '' ? '2' : data.tipoVeredaNegocio);
                // this.form.controls.tipoVereda.setValue(data.tipoVereda === '' ? '2' : data.tipoVereda);
                // this.form.controls['legalCargoPublico'].setValue(data.legalCargoPublico ? data.legalCargoPublico : 'N')
                // this.form.controls['legalPersonalExpuesta'].setValue(data.legalPersonalExpuesta ? data.legalPersonalExpuesta : 'N')
                // this.form.controls['legalCargoPartidoPolitico'].setValue(data.legalCargoPartidoPolitico ? data.legalCargoPartidoPolitico : 'N')
                // this.form.controls['legalOperacionExtranjera'].setValue(data.legalOperacionExtranjera ? data.legalOperacionExtranjera : 'N')
                // this.form.controls['legalOperacionCriptomoneda'].setValue(data.legalOperacionCriptomoneda ? data.legalOperacionCriptomoneda : 'N')
                // this.form.controls['legalDesarrollaActividadApnfd'].setValue(data.legalDesarrollaActividadApnfd ? data.legalDesarrollaActividadApnfd : 'N')
                // this.form.controls['declaraRenta'].setValue(data.declaraRenta ? data.declaraRenta : 'N')

                this.getPlazosCredito(this.form.controls.valorSolicitado.value)

                if (data.codigoDepartamento) {
                    this.getCiudades(data.codigoDepartamento);
                }
                if (data.codigoDepartamentoNacimiento) {
                    this.getCiudadesNacimiento(data.codigoDepartamentoNacimiento);
                }

                if (data.codigoCiudad) {
                    this.getBarrios(data.codigoCiudad);
                }

                if (data.estrato) {
                    this.form.controls.estrato.setValue(data.estrato.toString());
                }
                if (data.codigoDepartamentoExpedicion) {
                    this.getCiudadesExpedicion(data.codigoDepartamentoExpedicion);
                }


            });

        const datosSolicitud: any = {
            numeroSolicitud: numeroSolicitud,
            identificacion: identificacion
        }

        this.fabricaCreditoService.getDatosFabricaAgenda(datosSolicitud).pipe(takeUntil(this.unSubscribe$))
            .subscribe(({ data }) => {
                Swal.close();
                this.form.patchValue({
                    descripcionTipo: data.descripcionTipo,
                    codigoBarrio: data.codigoBarrio,
                    score: data.score
                });

                this.agendaActual = data.agenda
                this.unidadNegocio = data.unidadNegocio;
                this.fabricaDatos = data;

            });
    }

     /**
     * @description: Departamento de nacimiento
     */
     public seleccionDepartamento(event: MatSelectChange): void {
        const codigo: string = event.value;
        this.getCiudades(codigo);
        // eliminar la ciudad y barrio anterior
        this.form.get('codigoCiudad').setValue('')
        this.form.get('barrioResidencia').setValue('')
    }

    /**
     * @description: Departamento de nacimiento
     */
    public seleccionDepartamentoNacimiento(event: MatSelectChange): void {
        const codigo: string = event.value;
        this.getCiudadesNacimiento(codigo);
    }


    /**
  * @description: Departamento de expedicion
  */
    public seleccionDepartamentoExpedicion(event: MatSelectChange): void {
        const codigo: string = event.value;
        this.getCiudadesExpedicion(codigo);
         // eliminar la ciudad
         this.form.get('codigoCiudadExpedicion').setValue('')
    }

    /**
     * @description: Selecciona el codigo para cargar el api barrios
     *
     */
    public seleccionCiudad(event: MatSelectChange): void {
        const codigo: string = event.value;
        this.getBarrios(codigo);
        this.form.get('barrioResidencia').setValue('')
    }


    /**
     * @description: Obtiene el listado de ciudades
     */
    private getCiudades(codigo: string): void {
        this.departamentosCiudadesService.getCiudades(codigo).subscribe(rep => {
            this.ciudades = rep
        })
    }

    /**
     * @description: Obtiene listado de ciudades nacimiento
     */
    private getCiudadesNacimiento(codigo: string): void {
        this.ciudadesNacimiento$ = this.departamentosCiudadesService.getCiudades(codigo);
        this.form.get('codigoMunicipioNacimiento').setValue('')
    }

    /**
     * @description: Obtiene listado de ciudades negocio
     */
    private getCiudadesNegocio(codigo: string): void {
        this.departamentosCiudadesService.getCiudades(codigo).subscribe(rep => {
            this.ciudadesNegocio = rep
        })
    }

    /**
    * @description: Obtiene listado de ciudades negocio
    */
    private getCiudadesExpedicion(codigo: string): void {
        this.departamentosCiudadesService.getCiudades(codigo).subscribe(rep => {
            this.ciudadesExpedicion = rep
        })
    }

    /**
     * @description: Obtiene el listado de barrios
     */
    private getBarrios(codigo: string): void {
        this.departamentosCiudadesService.getBarrios(codigo).subscribe(rep => {
            this.barrios = rep
        })
    }

      /**
     * @description: Obtiene el listado de barrios del negocio
     */
      private getBarriosNegocio(codigo: string): void {
        this.departamentosCiudadesService.getBarrios(codigo).subscribe(rep => {
            this.barriosNegocio = rep;
        })
    }



     /**
     * @description: Obtener limite de plazos por el valor de credito
     */
     private getPlazosCredito(valorCredito: number) {
        this._formularioCreditoService.validationPlazoMicro({ valorCredito }).subscribe(rep => {
            this.plazosCredito = rep
        })
    }

    public validationPost(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            setTimeout(() => {
                this.scrollToFirstInvalidControl();
            }, 200);
        } else {
          //  this.onPostDatos();
        }
    }

   

    /**
     * @description hace scroll al primerer input invalido, puede ser un input o select
     */
    private scrollToFirstInvalidControl() {
        
        Object.keys(this.form.controls).forEach(key => {
            const controlErrors: any = this.form.get(key).errors;
            if (controlErrors != null) {
              Object.keys(controlErrors).forEach(keyError => {
               console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
              });
            }
          });

        let firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector('.mat-form-field-invalid')?.querySelector('.mat-input-element');

        if (!firstInvalidControl) {
            firstInvalidControl = this.el.nativeElement.querySelector('.mat-form-field-invalid')?.querySelector('.mat-select');
            if (!firstInvalidControl) {
                firstInvalidControl = this.el.nativeElement.querySelector('.mat-error');
            }
            if (!firstInvalidControl) {
                firstInvalidControl = this.el.nativeElement.querySelector('.error');
            }
        }

        firstInvalidControl.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        })

    }
}



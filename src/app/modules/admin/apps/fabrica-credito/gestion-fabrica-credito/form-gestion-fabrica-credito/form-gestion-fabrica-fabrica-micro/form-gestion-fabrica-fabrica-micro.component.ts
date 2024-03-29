import { Component, ElementRef, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { FormularioCreditoMicro, geoCodingAddress } from 'app/core/interfaces/formulario-fabrica-credito.interface';
import { DepartamentosCiudadesService } from 'app/core/services/departamentos-ciudades.service';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { PermisosService } from 'app/core/services/permisos.service';
import { UtilityService } from 'app/resources/services/utility.service';
import moment from 'moment';
import { Subject, Observable, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormularioCreditoService } from 'app/core/services/formulario-credito.service';
import { FuseValidators } from '@fuse/validators';
import { GenericasService } from 'app/core/services/genericas.service';
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css';

@Component({
    selector: 'form-gestion-fabrica-fabrica-micro',
    templateUrl: './form-gestion-fabrica-fabrica-micro.component.html',
    styleUrls: ['./form-gestion-fabrica-fabrica-micro.component.scss']
})
export class FormGestionFabricaFabricaMicroComponent implements OnInit, OnDestroy {
    //variables iniciales
    public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
    public identificacion: string = this.route.snapshot.paramMap.get('id');
    //cancelar subsicripciones
    public unSubscribe$: Subject<any> = new Subject<any>();
    public form: FormGroup;
    public subscription$: Subscription;
    public salarioBasico: number;
    public fabricaDatos;
    public unidadNegocio: any;
    public dataGeneralIncial: any;
    public permisoEditar: boolean = false;
    public permisoExcepcion: boolean = false;
    public dataInicial: any;
    public antiBucle: any;
    public ciudades: any;
    public ciudadesNacimiento$: Observable<any>;
    public ciudadesNegocio: any;
    public barrios: any;
    public barriosNegocio: any;
    public ciudadesExpedicion: any;
    public plazosCredito: any;
    public actividadEconomica: any;
    public salarioMinimo: number = 0;
    public diccionarioValidarCampo: any = {};
    public score: any;
    public descripcionScore: any;
    public decisionFiltrosDuros: any;
    public agendaActual: string;
    public creditoExcepcion: boolean = false;
    public currentScoreColor: 'red' | 'orange' | 'yellow' | 'light-green' | 'green';

    markers: any[] = [];

    fechaActual: any = moment().locale("co");
    map: L.map;
    iconUrl = 'data:image/svg+xml,' +
        encodeURIComponent(
            '<svg height="240px" width="240px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-30.74 -30.74 573.81 573.81" xml:space="preserve" fill="#000000" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)" stroke="#000000" stroke-width="0.00512332"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#fbf9f9" stroke-width="51.2332"> <path style="fill:#1e293b;" d="M125.6,55.063L125.6,55.063c-65.324,64.441-72.386,165.076-21.186,236.579l75.917,106.814 l75.917,113.876l78.566-117.407l70.621-99.752c53.848-72.386,47.669-175.669-18.538-240.993l0,0 C314.51-18.206,197.986-18.206,125.6,55.063"></path> <path style="fill:#ffffff;" d="M397.49,185.711c0-77.683-63.559-141.241-141.241-141.241s-141.241,63.559-141.241,141.241 s63.559,141.241,141.241,141.241S397.49,263.394,397.49,185.711"></path> <g> <polygon style="fill:#1e293b;" points="256.248,88.607 159.145,185.711 185.628,212.194 256.248,141.573 256.248,141.573 256.248,141.573 326.869,212.194 353.352,185.711 "></polygon> <polygon style="fill:#1e293b;" points="256.248,141.573 203.283,194.538 203.283,256.332 309.214,256.332 309.214,194.538 "></polygon> </g> </g><g id="SVGRepo_iconCarrier"> <path style="fill:#1e293b;" d="M125.6,55.063L125.6,55.063c-65.324,64.441-72.386,165.076-21.186,236.579l75.917,106.814 l75.917,113.876l78.566-117.407l70.621-99.752c53.848-72.386,47.669-175.669-18.538-240.993l0,0 C314.51-18.206,197.986-18.206,125.6,55.063"></path> <path style="fill:#ffffff;" d="M397.49,185.711c0-77.683-63.559-141.241-141.241-141.241s-141.241,63.559-141.241,141.241 s63.559,141.241,141.241,141.241S397.49,263.394,397.49,185.711"></path> <g> <polygon style="fill:#1e293b;" points="256.248,88.607 159.145,185.711 185.628,212.194 256.248,141.573 256.248,141.573 256.248,141.573 326.869,212.194 353.352,185.711 "></polygon> <polygon style="fill:#1e293b;" points="256.248,141.573 203.283,194.538 203.283,256.332 309.214,256.332 309.214,194.538 "></polygon> </g> </g></svg>'
        );

    currentScoreElement: HTMLElement;

    radius: number = 140;
    circumference: number = 2 * Math.PI * this.radius; // 879.2
    customCircumference: number = this.circumference * 0.85; // 747.32
    arcLength: number = this.customCircumference / 5; // 149.46
    offset: number = this.arcLength * 5;
    mostrarMapaPreview: boolean = false;

    /* Saved minimum, maximum values and length for all 5 Arc's */
    redArc = {
        min: 0.00,
        max: 573.00,
        length: 573.00
    };
    orangeArc = {
        min: 574.00,
        max: 615.00,
        length: 41.00
    };
    yellowArc = {
        min: 616.00,
        max: 690.00,
        length: 74.00
    };
    lightGreenArc = {
        min: 691.00,
        max: 800.00,
        length: 109.00
    };
    greenArc = {
        min: 801.00,
        max: 950.00,
        length: 149.00
    };
    scoreBandLabel: string = "";

    constructor(
        private fabricaCreditoService: FabricaCreditoService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private departamentosCiudadesService: DepartamentosCiudadesService,
        public utility: UtilityService,
        public _permisosService: PermisosService,
        private _formularioCreditoService: FormularioCreditoService,
        private el: ElementRef,
        private genericaServices: GenericasService,
    ) {
        this.createFormulario();

    }

    get tipoDocumentoConyuge(): AbstractControl {
        return this.form.controls.tipoDocumentoConyuge;
    }

    get tipoIdentificacionExpuesta(): AbstractControl {
        return this.form.controls.tipoIdentificacionExpuesta;
    }

    ngOnInit(): void {
        this.cargueInicial();
        this.getFabricaCreditoAgenda(this.numeroSolicitud, this.identificacion);
        this.permisoEditar = this._permisosService.permisoPorModuleTrazabilidad()
        if (this.permisoEditar) {
            this.form.disable();
        }
        this.permisoExcepcion = this._permisosService.permisoExcepcionCredito()
        this.getSalarioMinimo();

    }




    updatePointer(score, minScore, maxScore) {
        let porcentaje = 0;
        const maxRotate = 335
        const minRotate = 35;
        const maxTranslate = -100;

        if (this.currentScoreColor === 'red') {
            let porcentajeLocal = ((score - this.redArc.min) / this.redArc.length)
            // se divide entre la cantidad de porcentajes que serian 20% cada uno
            porcentaje = porcentajeLocal * 0.2
        }
        if (this.currentScoreColor === 'orange') {
            let porcentajeLocal = ((score - this.orangeArc.min) / this.orangeArc.length)
            // se divide entre la cantidad de porcentajes que serian 20% cada uno
            porcentaje = porcentajeLocal * 0.2 + 0.2
        }
        if (this.currentScoreColor === 'yellow') {
            let porcentajeLocal = ((score - this.yellowArc.min) / this.yellowArc.length)
            // se divide entre la cantidad de porcentajes que serian 20% cada uno
            porcentaje = porcentajeLocal * 0.2 + 0.4
        }
        if (this.currentScoreColor === 'light-green') {
            let porcentajeLocal = ((score - this.lightGreenArc.min) / this.lightGreenArc.length)
            // se divide entre la cantidad de porcentajes que serian 20% cada uno
            porcentaje = porcentajeLocal * 0.2 + 0.6
        }
        if (this.currentScoreColor === 'green') {
            let porcentajeLocal = ((score - this.greenArc.min) / this.greenArc.length)
            // se divide entre la cantidad de porcentajes que serian 20% cada uno
            porcentaje = porcentajeLocal * 0.2 + 0.8
        }


        const amplitud = maxRotate - minRotate;
        const rotate = porcentaje * amplitud + minRotate;

        const polygon = this.el.nativeElement.querySelector('.punteroPo');
        const polygonGrande = this.el.nativeElement.querySelector('.punteroPoGrande');
        const polygonGrandeSegundo = this.el.nativeElement.querySelector('.punteroPoGrandeSegundo');

        polygon.style.transform = `rotate(${rotate}deg) translateY(140px) rotate(-${rotate}deg)`
        polygonGrande.style.transform = `rotate(${rotate}deg) translateY(140px) rotate(-${rotate}deg)`
        polygonGrandeSegundo.style.transform = `rotate(${rotate}deg) translateY(140px) rotate(-${rotate}deg)`
    }

    updateScore(score: number): void {

        if (score >= this.redArc.min) {
            const greyRed = this.el.nativeElement.querySelector(".greyRed");
            greyRed.setAttribute("stroke-dasharray",
                `${this.arcLength},${this.customCircumference + ((this.arcLength * (score - this.redArc.min)) / this.redArc.length)}`);
            this.currentScoreColor = 'red'
        }

        if (score >= this.orangeArc.min) {
            const greyOrange = this.el.nativeElement.querySelector(".greyOrange");
            greyOrange.setAttribute("stroke-dasharray",
                `${this.arcLength},${this.customCircumference + ((this.arcLength * (score - this.orangeArc.min)) / this.orangeArc.length)}`);
            this.currentScoreColor = 'orange'
        }

        if (score >= this.yellowArc.min) {
            const greyYellow = this.el.nativeElement.querySelector(".greyYellow");
            greyYellow.setAttribute("stroke-dasharray",
                `${this.arcLength},${this.customCircumference + ((this.arcLength * (score - this.yellowArc.min)) / this.yellowArc.length)}`);

            this.currentScoreColor = 'yellow'
        }

        if (score >= this.lightGreenArc.min) {
            const greyLightGreen = this.el.nativeElement.querySelector(".greyLightGreen");
            greyLightGreen.setAttribute("stroke-dasharray",
                `${this.arcLength},${this.customCircumference + ((this.arcLength * (score - this.lightGreenArc.min)) / this.lightGreenArc.length)}`);

            this.currentScoreColor = 'light-green'
        }

        const greyGreen = this.el.nativeElement.querySelector(".greyGreen");
        let greenArchCalc = ((this.arcLength * (score - this.greenArc.min)) / this.greenArc.length);
        greyGreen.setAttribute("stroke-dasharray", `${this.arcLength - greenArchCalc},${this.customCircumference}`);
        greyGreen.setAttribute("stroke-dashoffset", -greenArchCalc);

        if (score >= this.greenArc.min) {
            this.currentScoreColor = 'green'
        }

        // Llamar a la función con el ángulo deseado
        const minScore = 0;
        const maxScore = 950;
        this.updatePointer(score, minScore, maxScore);
    }


    private cargueInicial() {
        let data = {
            entidad: "CONFIG-MICRO",
            unidadNegocio: 1
        };
        this._formularioCreditoService.cargueInicial(data).pipe(takeUntil(this.unSubscribe$)).subscribe((resp: any) => {
            if (resp) {
                this.dataInicial = resp.data
                console.log('data inicial', this.dataInicial)
                this.antiBucle = resp.data
                this.subscribeInput();
            }
        })
    }

    private subscribeInput() {
        this.form.get('destinoCredito')?.valueChanges.subscribe(data => {
            if (!this.diccionarioValidarCampo.destinoCredito) {
                if (data !== this.antiBucle['destinoCredito']) {
                    this.validacionCampos(
                        'Destino del crédito',
                        'Este campo modifica el motor de decisión y políticas SARC',
                        'destinoCredito',
                        'STRING'
                    )
                }
            }
        })

        this.form.get('plazo')?.valueChanges.subscribe(data => {
            if (!this.diccionarioValidarCampo.plazo) {
                if (data !== this.antiBucle['plazo']) {
                    this.validacionCampos(
                        'Plazo',
                        'Este campo actualiza la capacidad de pago del cliente',
                        'plazo',
                        'INTEGER'
                    )
                }
            }
        })


        this.form.get('valorSolicitado')?.valueChanges.subscribe(data => {
            if (!this.diccionarioValidarCampo.valorSolicitado) {
                if (data !== this.antiBucle['valorSolicitado']) {
                    this.validacionCampos(
                        'Monto crédito',
                        'Este campo actualiza la capacidad de pago del cliente',
                        'valorSolicitado',
                        'INTEGER'
                    );

                }
            }
            this.getPlazosCredito(this.form.controls.valorSolicitado.value)
        })

        this.form.get('antiguedadNegocio')?.valueChanges.subscribe(data => {
            if (!this.diccionarioValidarCampo.antiguedadNegocio) {
                if (data !== this.antiBucle['antiguedadNegocio']) {
                    this.validacionCampos(
                        '¿Cuánto tiempo en (meses)tiene tu negocio?',
                        'Este campo modifica el motor de decisión y políticas SARC',
                        'antiguedadNegocio',
                        'INTEGER'
                    )
                }
            }
        })

        this.form.get('antiguedadLocal')?.valueChanges.subscribe(data => {
            if (!this.diccionarioValidarCampo.antiguedadLocal) {
                if (data !== this.antiBucle['antiguedadLocal']) {
                    this.validacionCampos(
                        'Antigüedad en el local actual',
                        'Este campo modifica el motor de decisión y políticas SARC',
                        'antiguedadLocal',
                        'INTEGER'
                    )
                }
            }
        })
    }

    public validationPost(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            setTimeout(() => {
                this.scrollToFirstInvalidControl();
            }, 200);
        } else {
            this.onPostDatos();
        }
    }

    marginTopInputDynamic() {
        if (window.innerWidth < 600) {

            setTimeout(() => {
                let elementToMargin = this.el.nativeElement.querySelectorAll('.mat-form-field-flex');

                elementToMargin.forEach((element: HTMLElement) => {

                    let titleSpan: HTMLElement = element?.querySelector('.mat-form-field-infix').querySelector('.mat-form-field-label-wrapper');
                    titleSpan = titleSpan ? titleSpan : element?.querySelector('.mat-form-field-infix')?.querySelector('.mat-form-field-infix')

                    let titleSpanHeigth = titleSpan?.clientHeight
                    element.style.width = '20px' + ' !important';
                    element.style.setProperty('margin-top', (titleSpanHeigth ? (titleSpanHeigth + 'px') : '30px'), 'important')
                    titleSpan.style.top = '-' + (titleSpanHeigth + 6) + 'px'
                });
            }, 1000);
        }
    }

    /**
     * @description:
     */
    public onPostDatos(): void {

        this._formularioCreditoService
        this.setConyugueNombreCompleto()
        const datos: FormularioCreditoMicro = this.form.getRawValue();
        const { numeroHijos, antiguedadLocal, autorizacionBanco, autoricacionDatosPersonalClaracionAuto, clausulaAnticurrupcionClaracionAuto, telefonoNegocio, barrioResidencia, antiguedadActividad, valorSolicitado, plazo, personasACargo, fechaDesvinculacionExpuesta, fechaDesvinculacionPublico, fechaNacimiento, fechaExpedicion, estrato, ...data } = datos;
        const fechaNacimientoFormato = moment(fechaNacimiento.toString()).format('YYYY-MM-DD');
        const fechaExpedicionFormato = moment(fechaExpedicion.toString()).format('YYYY-MM-DD');
        const fechaDesvinculacionPublicoFormato = fechaDesvinculacionPublico ? moment(fechaDesvinculacionPublico.toString()).format('YYYY-MM-DD') : "0099-01-01";
        const fechaDesvinculacionExpuestaFormato = fechaDesvinculacionExpuesta ? moment(fechaDesvinculacionExpuesta.toString()).format('YYYY-MM-DD') : "0099-01-01";
        const numeroHijosFormato = Number(numeroHijos);
        const barrioResidenciaFormato = Number(barrioResidencia);
        const antiguedadActividadFormato = Number(antiguedadActividad);
        const personasACargoFormato = Number(personasACargo);
        const estratoFormato = Number(estrato)
        const valorSolicitadoFormato = Number(valorSolicitado)
        const plazoFormato = Number(plazo);
        const autorizacionBancoFormato = autorizacionBanco ? 'S' : 'N';
        const modificadaSolicitudFormato = valorSolicitadoFormato;
        const telefonoNegocioFormato = telefonoNegocio.toString();
        // delete data.otrosIngresos; modificadaSolicitud
        const datosFormularios: FormularioCreditoMicro = {
            fechaNacimiento: fechaNacimientoFormato,
            fechaExpedicion: fechaExpedicionFormato,
            fechaDesvinculacionPublico: fechaDesvinculacionPublicoFormato,
            fechaDesvinculacionExpuesta: fechaDesvinculacionExpuestaFormato,
            numeroHijos: numeroHijosFormato,
            barrioResidencia: barrioResidenciaFormato,
            antiguedadActividad: antiguedadActividadFormato,
            personasACargo: personasACargoFormato,
            estrato: estratoFormato,
            valorSolicitado: valorSolicitadoFormato,
            autorizacionBanco: autorizacionBancoFormato,
            plazo: plazoFormato,
            modificadaSolicitud: 'N',
            telefonoNegocio: telefonoNegocioFormato,
            autoricacionDatosPersonalClaracionAuto: 'S',
            clausulaAnticurrupcionClaracionAuto: 'S',
            antiguedadLocal: antiguedadLocal ? antiguedadLocal : 0,
            ...data
        };



        // const postDataLL: geoCodingAddress = {
        //     departamento: this.dataInicial.deparamentosGenerales.find(departamento => departamento.codigo === datosFormularios.codigoDepartamentoNegocio).nombre,
        //     ciudad: this.ciudadesNegocio.data.find(ciudad => ciudad.codigo === datosFormularios.codigoCiudad).nombre,
        //     direccion: datosFormularios.direccionNegocio
        // };

        // this._formularioCreditoService.getLatitudLongitud(postDataLL).pipe(takeUntil(this.unSubscribe$)).subscribe(rep => {
        //     datosFormularios.latitudNegocio = rep.data?.latitud ? rep.data.latitud : ''
        //     datosFormularios.longitudNegocio = rep.data?.longitud ? rep.data.longitud : ''

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
                    this.postFormularioFabrica(datosFormularios);
                }
            });
        // })


    }

    /**
     * @description: Obtiene la data para cargar al formulario
     */
    private getFabricaCreditoAgenda(numeroSolicitud: string, identificacion: string): void {


        this.fabricaCreditoService.getInformacionTipoTercero(numeroSolicitud, 'T').pipe(takeUntil(this.unSubscribe$))
            .subscribe(({ data }) => {
                this.dataGeneralIncial = data;
                this.form.patchValue(data);


                if (this.permisoEditar) {
                    this.form.disable();
                }

                this.setConyugueNombreCompleto()

                this.formatearDataInicial();
                console.log("controls", this.form.controls)
                this.form.controls.fechaPrimerPago.setValue(data?.fechaPrimeraCuota === "0099-01-01" ? "NO REGISTRA" : data?.fechaPrimeraCuota);
                this.form.controls.valorCuotaAprox.setValue(data?.valorCuota === 0 ? "NO REGISTRA" : data?.valorCuota);
                this.form.controls.tipoVereda.setValue(data.tipoVereda === '' ? '2' : data.tipoVereda);
                this.form.controls['legalCargoPublico'].setValue(data.legalCargoPublico ? data.legalCargoPublico : 'N')
                this.form.controls['legalPersonalExpuesta'].setValue(data.legalPersonalExpuesta ? data.legalPersonalExpuesta : 'N')
                this.form.controls['legalCargoPartidoPolitico'].setValue(data.legalCargoPartidoPolitico ? data.legalCargoPartidoPolitico : 'N')
                this.form.controls['legalOperacionExtranjera'].setValue(data.legalOperacionExtranjera ? data.legalOperacionExtranjera : 'N')
                this.form.controls['legalOperacionCriptomoneda'].setValue(data.legalOperacionCriptomoneda ? data.legalOperacionCriptomoneda : 'N')
                this.form.controls['legalDesarrollaActividadApnfd'].setValue(data.legalDesarrollaActividadApnfd ? data.legalDesarrollaActividadApnfd : 'N')
                this.form.controls['declaraRenta'].setValue(data.declaraRenta ? data.declaraRenta : 'N')



                this.getPlazosCredito(this.form.controls.valorSolicitado.value)
                this.form.controls.autoricacionDatosPersonalClaracionAuto.setValue(data.autoricacionDatosPersonalClaracionAuto === 'S')
                this.form.controls.clausulaAnticurrupcionClaracionAuto.setValue(data.autoricacionDatosPersonalClaracionAuto === 'S')

                if (data.codigoDepartamento) {
                    this.getCiudades(data.codigoDepartamento);
                }
                if (data.codigoDepartamentoNacimiento) {
                    this.getCiudadesNacimiento(data.codigoDepartamentoNacimiento);
                }
                if (data.codigoDepartamentoNegocio) {
                    this.getCiudadesNegocio(data.codigoDepartamentoNegocio);
                }
                if (data.codigoCiudad) {
                    this.getBarrios(data.codigoCiudad);
                }
                if (data.codigoCiudadNegocio) {
                    this.getBarriosNegocio(data.codigoCiudadNegocio);
                }
                if (data.estrato) {
                    this.form.controls.estrato.setValue(data.estrato.toString());
                }
                if (data.codigoDepartamentoExpedicion) {
                    this.getCiudadesExpedicion(data.codigoDepartamentoExpedicion);
                }
                if (data.tipoActividad) {
                    this.getActividadEconomica();
                }
                this.marginTopInputDynamic();
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
                    score: data.score,
                });

                this.creditoExcepcion = data.creditoExcepcion;
                this.agendaActual = data.agenda
                this.descripcionScore = data.descripcionScore;
                this.score = data.score;

                this.setCurrentScoreUI()
                this.decisionFiltrosDuros = data.decisionFiltrosDuros
                this.unidadNegocio = data.unidadNegocio;
                this.fabricaDatos = data;

                if (this.verScorePermiso()) {
                    setTimeout(() => {
                        this.updateScore(this.score)
                    }, 2000);
                }


            });
    }

    ngAfterViewInit(): void {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        console.log('view inizializada');

        this.addValidation()
        this.marginTopInputDynamic();
    }

    cargarMap() {
        // this.mostrarMapaPreview = !this.mostrarMapaPreview

        // const postDataLL: geoCodingAddress = {
        //     departamento: this.dataInicial.deparamentosGenerales.find(departamento => departamento.codigo === this.form.get('codigoDepartamentoNegocio').value).nombre,
        //     ciudad: this.ciudadesNegocio.data.find(ciudad => ciudad.codigo === this.form.get('codigoCiudadNegocio').value).nombre,
        //     direccion: this.form.get('direccionNegocio').value
        // };


        // if (!this.map) {
        //     const GoogleMaps = L.tileLayer(
        //         'https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}',
        //         {
        //             maxZoom: 20,
        //             minZoom: 3,
        //             subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        //         }
        //     );

        //     this.map = L.map('map', {
        //         zoomAnimation: true,
        //         layers: GoogleMaps,
        //         inertia: true,
        //         worldCopyJump: true,
        //         center: [11.004313, -74.808137],
        //         zoom: 20,
        //         attributionControl: false,
        //         zoomControl: false
        //     });

        //     setTimeout(() => {
        //         this.map.invalidateSize();
        //     }, 500);
        // }

        // if(this.mostrarMapaPreview){
        //     this._formularioCreditoService.getLatitudLongitud(postDataLL).pipe(takeUntil(this.unSubscribe$)).subscribe(rep => {
        //         const latitudNegocio = rep.data?.latitud ? rep.data.latitud : ''
        //         const longitudNegocio = rep.data?.longitud ? rep.data.longitud : ''

        //         this.markers.forEach((marker) =>{
        //             this.map.removeLayer(marker)
        //         })


        //         this.markers = []

        //         const marker = L.marker([latitudNegocio, longitudNegocio], {
        //             icon: L.icon({
        //                 iconUrl: this.iconUrl,
        //                 iconSize: [40, 40],
        //                 iconAnchor: [20, 20],
        //             })
        //         }).addTo(this.map)



        //         // const popup = L.popup()
        //         //     .setLatLng([latitudNegocio, longitudNegocio])
        //         //     .setContent("<div class='text-black text-lg'> Usted esta aquí. </div>")
        //         //     .openOn(this.map);

        //         let tooltip = L.tooltip([latitudNegocio, longitudNegocio], {
        //             content: "<div class='text-white font-bold flex flex-col w-full justify-center items-center'> <div class='text-xl'>"+ this.form.get('nombreNegocio').value + "</div> <div>"
        //             +
        //             this.form.get('direccionNegocio').value
        //             +  "</div> <div class='text-sm'>" + this.barriosNegocio.data.find(barrio => barrio.codigo == this.form.get('codigoBarrioNegocio').value).nombre +"</div>" +
        //             " </div>",
        //             className: "bg-accent-700 text-white border-none",
        //             permanent: false,
        //             id: 23232333,
        //             offset: L.point(14,-5)
        //           }).addTo(this.map);

        //           this.markers.push(tooltip)
        //         this.map.fitBounds([tooltip.getLatLng()]);
        //     })
        // }


    }

    reSize() {
        this.map.invalidateSize();
    }

    public setCurrentScoreUI() {
        setTimeout(() => {
            let currenScoreUI: HTMLElement = this.el.nativeElement.querySelector('.currentScore')

            if (currenScoreUI) {
                currenScoreUI.style.left = this.score / 950 * 100 + '%'

            }
        }, 2000);

    }

    public formatearDataInicial(): void {
        this.form.controls.autorizacionBanco.setValue(this.form.controls.autorizacionBanco.value === 'S');

        //fechas

        this.form.controls.fechaDesvinculacionExpuesta.value === '0099-01-01' && this.form.controls.fechaDesvinculacionExpuesta.setValue('');
        this.form.controls.fechaDesvinculacionPublico.value === '0099-01-01' && this.form.controls.fechaDesvinculacionPublico.setValue('');
        this.form.controls.fechaNacimiento.value === '0099-01-01' && this.form.controls.fechaNacimiento.setValue('');
        this.form.controls.fechaExpedicion.value === '0099-01-01' && this.form.controls.fechaExpedicion.setValue('');

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
     * @description: Departamento de negocio
     */
    public seleccionDepartamentoNegocio(event: MatSelectChange): void {
        const codigo: string = event.value;
        this.getCiudadesNegocio(codigo);
        // eliminar la ciudad y barrio anterior
        this.form.get('codigoCiudadNegocio').setValue('')
        this.form.get('codigoBarrioNegocio').setValue('')
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
     * @description: Selecciona el codigo para cargar el api barrios
     */
    public seleccionCiudadNegocio(event: MatSelectChange): void {
        const codigo: string = event.value;
        this.getBarriosNegocio(codigo);
        this.form.get('codigoBarrioNegocio').setValue('')
    }

    /**
     * @description: Obtiene el listado de ciudades
     */
    private getCiudades(codigo: string): void {
        this.departamentosCiudadesService.getCiudades(codigo).subscribe(rep => {
            this.ciudades = rep
            this.marginTopInputDynamic()
        })
    }

    /**
     * @description: Obtiene listado de ciudades nacimiento
     */
    private getCiudadesNacimiento(codigo: string): void {
        this.ciudadesNacimiento$ = this.departamentosCiudadesService.getCiudades(codigo);
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
     * @description: Obtener limite de plazos por el valor de credito
     */
    private getPlazosCredito(valorCredito: number) {
        this._formularioCreditoService.validationPlazoMicro({ valorCredito }).subscribe(rep => {
            this.plazosCredito = rep
        })
    }

    private getActividadEconomica(): void {
        const tipoActividad = this.form.controls.tipoActividad.value;
        const nivelEstudio = this.form.controls.nivelEstudio.value;
        const camaraComercio = this.form.controls.camaraComercio.value;

        if (tipoActividad && nivelEstudio && camaraComercio) {
            this._formularioCreditoService.cargueActividadEconomica(nivelEstudio, tipoActividad, camaraComercio).pipe(takeUntil(this.unSubscribe$)).subscribe(res => {
                this.actividadEconomica = res.data
            });
        }


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
     * @description: Guardado de datos fabrica
     */
    private postFormularioFabrica(datos: FormularioCreditoMicro): void {

        Swal.fire('Cargando', 'Guardando información'); Swal.showLoading();
        setTimeout(() => {
            this.subscription$ = this.fabricaCreditoService.postDatosFabricaCredita(datos).pipe(takeUntil(this.unSubscribe$))
                .subscribe(() => {
                    Swal.fire(
                        'Completado',
                        'Información guardada con éxito',
                        'success',
                    ).then(rep => {
                        location.reload()
                    });
                    //   this.router.navigate(['/credit-factory/agenda-completion']);
                }, (error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ha ocurrido un error',
                        text: error.error.msg,
                    });
                });
        }, 1);

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
            let asingnar = this.form.get(variable).value
            if (result.isConfirmed) {
                this.form.get('modificadaSolicitud').setValue('S')
                this.diccionarioValidarCampo[variable] = true;
            } else {
                if (type === "INTEGER") {
                    asingnar = Number(this.dataGeneralIncial[variable])
                    this.antiBucle[variable] = asingnar;
                    this.form.controls[variable].setValue(asingnar);
                }
                if (type === "STRING") {
                    asingnar = this.dataGeneralIncial[variable].toString()
                    this.antiBucle[variable] = asingnar;
                    this.form.controls[variable].setValue(asingnar);
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
            if (!firstInvalidControl) {
                firstInvalidControl = this.el.nativeElement.querySelector('.error');
            }
        }

        firstInvalidControl.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        })

    }

    /**
     * @description :creando el formulario
     */
    private createFormulario(): void {
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
            score: [''],

            valorCuotaAprox: [''],
            fechaPrimerPago: ['']

            // tipoCliente: [''],
            // categoriaSisben: ['', Validators.required]
        },
        );
    }


    public validacion(tipo: string) {
        if (this.form.controls['aplicaIngresos']?.value == 'N') {
            this.form.controls['otrosIngresos'].setValue("0");
            this.form.controls['ingresos'].setValue("0");
            this.form.controls['descripcionOtrosIngresos'].setValue("");
        }
        let mensaje = "¿Estás seguro de editar el campo de "
        switch (tipo) {
            case 'S':
                mensaje += ' <b> salario</b>';
                break;
            case 'D':
                mensaje += '<b> descuento de nómina</b>';
                break;
            case 'C':
                mensaje += ' <b> comisiones por horas extras</b>';
                break;
            case 'AI':
                mensaje += ' <b> ingresos adicionales</b>';
                break;
            case 'IA':
                mensaje += ' <b> valor de los ingresos adicionales</b>';
                break;
            case 'PL':
                mensaje += ' <b> plazo del crédito</b>';
                break;
            case 'MO':
                mensaje += ' <b> valor del monto solicitado</b>';
                break;
            case 'PA':
                mensaje += ' <b> empresa en la que trabaja</b>';
                break;
            case 'TC':
                mensaje += ' <b> tipo de contrato</b>';
                break;
            case 'FV':
                mensaje += ' <b> fecha de vinculación</b>';
                break;
            case 'GEN':
                mensaje += ' <b> género </b>';
                break;
            case 'FEN':
                mensaje += ' <b> fecha de nacimiento</b>';
                break;
            default:
                break;
        }

        if ((tipo == 'PA') || (tipo == 'TC') || (tipo == 'FV') || (tipo == 'GEN') || (tipo == 'FEN')) {
            mensaje += "?, Este campo modifica el motor de decisión y políticas SARC.";
        } else {
            mensaje += "?, Este campo actualiza la capacidad de pago del cliente.";
        }
        if (tipo != 'AI' && tipo != 'IA') {
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
                    let salarioBasicoForm = Number(this.utility.enviarNumero(this.form.value.salarioBasico));
                    if (this.salarioBasico > salarioBasicoForm) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Validación de campo',
                            text: "El salario ingresado no puede ser menor al SLMV.",
                        });
                        this.form.controls['salarioBasico'].setValue(this.utility.formatearNumero(String(this.fabricaDatos.salarioBasico)));
                        return
                    }
                    let sum =
                        Number(this.utility.enviarNumero(this.form.value.salarioBasico))
                        +
                        // Number(this.utility.enviarNumero(this.form.value.descuentoNomina))
                        // +
                        Number(this.utility.enviarNumero(this.form.value.comisionesHorasExtras))
                        +
                        Number(this.utility.enviarNumero(this.form.value.otrosIngresos))
                        ;
                    this.form.controls['ingresos'].setValue(this.utility.formatearNumero(String(sum)));

                } else {
                    switch (tipo) {
                        case 'S':
                            this.form.controls['salarioBasico'].setValue(this.utility.formatearNumero(String(this.fabricaDatos.salarioBasico)));
                            break;
                        case 'D':
                            this.form.controls['descuentoNomina'].setValue(this.utility.formatearNumero(String(this.fabricaDatos.descuentoNomina)));
                            break;
                        case 'C':
                            this.form.controls['comisionesHorasExtras'].setValue(this.utility.formatearNumero(String(this.fabricaDatos.comisionesHorasExtras)));
                            break;
                        case 'AI':
                            this.form.controls['aplicaIngresos'].setValue(this.fabricaDatos.aplicaIngresos);
                            break;
                        case 'IA':
                            this.form.controls['otrosIngresos'].setValue(this.utility.formatearNumero(String(this.fabricaDatos.otrosIngresos)));
                            break;
                        case 'PL':
                            this.form.controls['plazo'].setValue(this.utility.formatearNumero(String(this.fabricaDatos.plazo)));
                            break;
                        case 'MO':
                            this.form.controls['monto']?.setValue(this.utility.formatearNumero(String(this.fabricaDatos.monto)));
                            break;
                        case 'PA':
                            this.form.controls['pagaduria'].setValue(String(this.fabricaDatos.pagaduria));
                            break;
                        case 'TC':
                            this.form.controls['tipoContrato'].setValue(String(this.fabricaDatos.tipoContrato));
                            break;
                        case 'FV':
                            this.form.controls['fechaVinculacion'].setValue(String(this.fabricaDatos.fechaVinculacion));
                            break;
                        case 'GEN':
                            this.form.controls['genero'].setValue(String(this.fabricaDatos.genero));
                            break;
                        case 'FEN':
                            this.form.controls['fechaNacimiento'].setValue(String(this.fabricaDatos.fechaNacimiento));
                            break;
                        default:
                            break;
                    }
                }
            });
        }

        let sum =
            Number(this.utility.enviarNumero(this.form.value.salarioBasico))
            +
            // Number(this.utility.enviarNumero(this.form.value.descuentoNomina))
            // +
            Number(this.utility.enviarNumero(this.form.value.comisionesHorasExtras))
            +
            Number(this.utility.enviarNumero(this.form.value.otrosIngresos))
            ;
        this.form.controls['ingresos']?.setValue(this.utility.formatearNumero(String(sum)));

    }

    private getSalarioMinimo() {
        this.genericaServices.getSalarioBasico().subscribe(({ data }) => {

            this.salarioMinimo = data.salarioMinimo;


            this.form.get('valorSolicitado').setValidators([Validators.required, Validators.min(data.salarioMinimo), Validators.max(100000000)])
        })
    }

    // validaciones dinamicas
    public addValidation() {
        // Camara de comercio form
        this.form.get('camaraComercio').valueChanges.subscribe((e: string) => {
            this.marginTopInputDynamic()
            if (e === 'S') {
                this.form.get('tieneRut')?.setValidators([Validators.required])
                this.form.get('tieneRut')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('nitNegocio')?.setValidators([Validators.required, Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/), Validators.minLength(5)])
                this.form.get('nitNegocio')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.form.get('tieneRut')?.setValidators(null)
                this.form.get('tieneRut')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('nitNegocio')?.setValidators(null)
                this.form.get('nitNegocio')?.disable({ emitEvent: true, onlySelf: true })
            }
        })
        // Arriendo local form
        this.form.get('tipoLocal').valueChanges.subscribe((e: number) => {
            this.marginTopInputDynamic()
            if (Number(e) === 2) {
                this.form.get('nombreArrendador')?.setValidators([Validators.required, Validators.maxLength(30)])
                this.form.get('nombreArrendador')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('celularArrendador')?.setValidators([Validators.required, Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/)])
                this.form.get('celularArrendador')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.form.get('nombreArrendador')?.setValidators(null)
                this.form.get('nombreArrendador')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('celularArrendador')?.setValidators(null)
                this.form.get('celularArrendador')?.disable({ emitEvent: true, onlySelf: true })
            }

            if (Number(e) !== 6) {
                this.form.get('antiguedadLocal')?.setValidators([Validators.required, Validators.maxLength(30)])
                this.form.get('antiguedadLocal')?.enable({ emitEvent: true, onlySelf: true })
            } else {
                this.form.get('antiguedadLocal')?.setValidators(null)
                this.form.get('antiguedadLocal')?.disable({ emitEvent: true, onlySelf: true })
            }
        })
        // Empleo conyuge empleado form
        this.form.get('tipoEmpleoConyuge').valueChanges.subscribe((e: string) => {
            this.marginTopInputDynamic()
            if (e === 'EPLDO') {
                this.form.get('nombreEmpresaConyuge')?.setValidators([Validators.required])
                this.form.get('nombreEmpresaConyuge')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('cargoConyuge')?.setValidators([Validators.required])
                this.form.get('cargoConyuge')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('salarioConyuge')?.setValidators([Validators.required, Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/)])
                this.form.get('salarioConyuge')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('telefonoEmpresaConyuge')?.setValidators([Validators.required])
                this.form.get('telefonoEmpresaConyuge')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.form.get('nombreEmpresaConyuge')?.setValidators(null)
                this.form.get('nombreEmpresaConyuge')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('cargoConyuge')?.setValidators(null)
                this.form.get('cargoConyuge')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('salarioConyuge')?.setValidators(null)
                this.form.get('salarioConyuge')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('telefonoEmpresaConyuge')?.setValidators(null)
                this.form.get('telefonoEmpresaConyuge')?.disable({ emitEvent: true, onlySelf: true })
            }
        })

        // posee cuenta bancaria
        this.form.get('poseeCuentaBancaria').valueChanges.subscribe((e: string) => {
            this.marginTopInputDynamic()
            if (e === 'S') {
                this.form.get('entidadBancaria')?.setValidators([Validators.required])
                this.form.get('entidadBancaria')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('tipoCuentaBancaria')?.setValidators([Validators.required])
                this.form.get('tipoCuentaBancaria')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('numeroCuentaBancaria')?.setValidators([Validators.required, Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/), Validators.min(0)])
                this.form.get('numeroCuentaBancaria')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.form.get('entidadBancaria')?.setValidators(null)
                this.form.get('entidadBancaria')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('tipoCuentaBancaria')?.setValidators(null)
                this.form.get('tipoCuentaBancaria')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('numeroCuentaBancaria')?.setValidators(null)
                this.form.get('numeroCuentaBancaria')?.disable({ emitEvent: true, onlySelf: true })
            }

            if (e === 'N') {
                this.form.get('autorizacionBanco')?.setValidators([Validators.requiredTrue])
                this.form.get('autorizacionBanco')?.enable({ emitEvent: true, onlySelf: true })
            } else {
                this.form.get('autorizacionBanco')?.setValidators(null)
                this.form.get('autorizacionBanco')?.disable({ emitEvent: true, onlySelf: true })
            }
        })

        // operacion Extranjera moneda Form
        this.form.get('legalOperacionExtranjera').valueChanges.subscribe((e: string) => {
            this.marginTopInputDynamic()
            if (e === 'S') {
                this.form.get('tipoOperacionExtranjera')?.setValidators([Validators.required])
                this.form.get('tipoOperacionExtranjera')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.form.get('tipoOperacionExtranjera')?.setValidators(null)
                this.form.get('tipoOperacionExtranjera')?.disable({ emitEvent: true, onlySelf: true })
            }
        })

        // operacion cripto moneda Form
        this.form.get('legalOperacionCriptomoneda').valueChanges.subscribe((e: string) => {
            this.marginTopInputDynamic()
            if (e === 'S') {
                this.form.get('tipoOperacionCriptomoneda')?.setValidators([Validators.required])
                this.form.get('tipoOperacionCriptomoneda')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.form.get('tipoOperacionCriptomoneda')?.setValidators(null)
                this.form.get('tipoOperacionCriptomoneda')?.disable({ emitEvent: true, onlySelf: true })
            }
        })

        // cargo publico
        this.form.get('legalCargoPublico').valueChanges.subscribe((e: string) => {
            this.marginTopInputDynamic()
            if (e === 'S') {
                this.form.get('cargoPublico')?.setValidators([Validators.required, Validators.maxLength(80)])
                this.form.get('cargoPublico')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('entidadPublico')?.setValidators([Validators.required, Validators.maxLength(150)])
                this.form.get('entidadPublico')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('vinculadoActualPublico')?.setValidators([Validators.required])
                this.form.get('vinculadoActualPublico')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.form.get('cargoPublico')?.setValidators(null)
                this.form.get('cargoPublico')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('entidadPublico')?.setValidators(null)
                this.form.get('entidadPublico')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('vinculadoActualPublico')?.setValidators(null)
                this.form.get('vinculadoActualPublico')?.disable({ emitEvent: true, onlySelf: true })
            }
        })
        this.form.get('vinculadoActualPublico').valueChanges.subscribe((e: string) => {
            this.marginTopInputDynamic()
            if (e === 'N') {
                this.form.get('fechaDesvinculacionPublico')?.setValidators([Validators.required, this.validatedDate.bind(this)])
                this.form.get('fechaDesvinculacionPublico')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.form.get('fechaDesvinculacionPublico')?.setValidators(null)
                this.form.get('fechaDesvinculacionPublico')?.disable({ emitEvent: true, onlySelf: true })
            }
        })

        // Datos cargo publico familiar
        this.form.get('legalPersonalExpuesta').valueChanges.subscribe((e: string) => {
            this.marginTopInputDynamic()
            if (e === 'S') {
                this.form.get('vinculacionExpuesta')?.setValidators([Validators.required, Validators.max(50)])
                this.form.get('vinculacionExpuesta')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('nombreExpuesta')?.setValidators([Validators.required, Validators.maxLength(100)])
                this.form.get('nombreExpuesta')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('tipoIdentificacionExpuesta')?.setValidators([Validators.required])
                this.form.get('tipoIdentificacionExpuesta')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('identificacionExpuesta')?.setValidators([Validators.required])
                this.form.get('identificacionExpuesta')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('nacionalidadExpuesta')?.setValidators([Validators.required])
                this.form.get('nacionalidadExpuesta')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('entidadExpuesta')?.setValidators([Validators.required, Validators.maxLength(150)])
                this.form.get('entidadExpuesta')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('cargoExpuesta')?.setValidators([Validators.required, Validators.maxLength(80)])
                this.form.get('cargoExpuesta')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('vinculadoActualExpuesta')?.setValidators([Validators.required])
                this.form.get('vinculadoActualExpuesta')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.form.get('vinculacionExpuesta')?.setValidators(null)
                this.form.get('vinculacionExpuesta')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('nombreExpuesta')?.setValidators(null)
                this.form.get('nombreExpuesta')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('tipoIdentificacionExpuesta')?.setValidators(null)
                this.form.get('tipoIdentificacionExpuesta')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('identificacionExpuesta')?.setValidators(null)
                this.form.get('identificacionExpuesta')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('nacionalidadExpuesta')?.setValidators(null)
                this.form.get('nacionalidadExpuesta')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('entidadExpuesta')?.setValidators(null)
                this.form.get('entidadExpuesta')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('cargoExpuesta')?.setValidators(null)
                this.form.get('cargoExpuesta')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('vinculadoActualExpuesta')?.setValidators(null)
                this.form.get('vinculadoActualExpuesta')?.disable({ emitEvent: true, onlySelf: true })
            }
        })
        this.form.get('vinculadoActualExpuesta').valueChanges.subscribe((e: string) => {
            this.marginTopInputDynamic()
            if (e === 'N') {
                this.form.get('fechaDesvinculacionExpuesta')?.setValidators([Validators.required, this.validatedDate.bind(this)])
                this.form.get('fechaDesvinculacionExpuesta')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.form.get('fechaDesvinculacionExpuesta')?.setValidators(null)
                this.form.get('fechaDesvinculacionExpuesta')?.disable({ emitEvent: true, onlySelf: true })
            }
        })

        // declaro ingresos Otros declaroIngresoDeclaracionAuto
        this.form.get('declaroIngresoDeclaracionAuto').valueChanges.subscribe((e: string) => {
            this.marginTopInputDynamic()
            if (e === 'OT') {
                this.form.get('otroIngresoDeclaracionAuto')?.setValidators([Validators.required])
                this.form.get('otroIngresoDeclaracionAuto')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.form.get('otroIngresoDeclaracionAuto')?.setValidators(null)
                this.form.get('otroIngresoDeclaracionAuto')?.disable({ emitEvent: true, onlySelf: true })
            }
        })

        // conyuge form si aplica Casado o union libre
        this.form.get('estadoCivil').valueChanges.subscribe((e: string) => {
            this.marginTopInputDynamic()
            if (e === 'CA' || e === 'UL') {
                this.form.get('primerNombreConyuge')?.setValidators([Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/)])
                this.form.get('primerNombreConyuge')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('primerApellidoConyuge')?.setValidators([Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/)])
                this.form.get('primerApellidoConyuge')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('tipoDocumentoConyuge')?.setValidators([Validators.required])
                this.form.get('tipoDocumentoConyuge')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('identificacionConyuge')?.setValidators([Validators.minLength(5), Validators.maxLength(10)])
                this.form.get('identificacionConyuge')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('celularConyuge')?.setValidators([Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/)])
                this.form.get('celularConyuge')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('tipoEmpleoConyuge')?.setValidators([Validators.required])
                this.form.get('tipoEmpleoConyuge')?.enable({ emitEvent: true, onlySelf: true })
            }
            else {
                this.form.get('primerNombreConyuge')?.setValidators(null)
                this.form.get('primerNombreConyuge')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('primerApellidoConyuge')?.setValidators(null)
                this.form.get('primerApellidoConyuge')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('tipoDocumentoConyuge')?.setValidators(null)
                this.form.get('tipoDocumentoConyuge')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('identificacionConyuge')?.setValidators(null)
                this.form.get('identificacionConyuge')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('celularConyuge')?.setValidators(null)
                this.form.get('celularConyuge')?.disable({ emitEvent: true, onlySelf: true })
                this.form.get('tipoEmpleoConyuge')?.setValidators(null)
                this.form.get('tipoEmpleoConyuge')?.disable({ emitEvent: true, onlySelf: true })
            }
        })


        this.form.get('tipoLocal').valueChanges.subscribe((e: string) => {
            // Local comercial propio
            this.marginTopInputDynamic()
            if (e === '1') {
                this.form.controls.tipoLocalCalulado.setValue('Propio')
                this.form.controls.ubicacionNegocioCalculado.setValue('Local aparte')
            }
            else if (e === '2') {
                this.form.controls.tipoLocalCalulado.setValue('Arrendado')
                this.form.controls.ubicacionNegocioCalculado.setValue('Local aparte')
            } else if (e === '3') {
                this.form.controls.tipoLocalCalulado.setValue('Arrendado')
                this.form.controls.ubicacionNegocioCalculado.setValue('Vivienda')
            }
            else if (e === '4') {
                this.form.controls.tipoLocalCalulado.setValue('Familiar')
                this.form.controls.ubicacionNegocioCalculado.setValue('Vivienda')
            }
            else if (e === '5') {
                this.form.controls.tipoLocalCalulado.setValue('Propio')
                this.form.controls.ubicacionNegocioCalculado.setValue('Vivienda')
            }
            else if (e === '6') {
                this.form.controls.tipoLocalCalulado.setValue('No tiene')
                this.form.controls.ubicacionNegocioCalculado.setValue('Vivienda')
            }
        })

        // veredas
        this.form.get('tipoVereda').valueChanges.subscribe((e: string) => {
            this.marginTopInputDynamic()
            if (e === '1') {
                this.form.get('descripcionVereda')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('descripcionVereda')?.setValidators([Validators.required])
            } else {
                this.form.get('descripcionVereda')?.setValidators(null)
                this.form.get('descripcionVereda')?.disable({ emitEvent: true, onlySelf: true })
            }
        })
        this.form.get('tipoVeredaNegocio').valueChanges.subscribe((e: string) => {
            this.marginTopInputDynamic()
            if (e === '1') {
                this.form.get('descripcionVeredaNegocio')?.enable({ emitEvent: true, onlySelf: true })
                this.form.get('descripcionVeredaNegocio')?.setValidators([Validators.required])
            } else {
                this.form.get('descripcionVeredaNegocio')?.setValidators(null)
                this.form.get('descripcionVeredaNegocio')?.disable({ emitEvent: true, onlySelf: true })
            }
        })

        // // fintra mujer
        // this.form.get('tipoCredito').valueChanges.subscribe((e: string) => {
        //     if(e === 'FM'){
        //         this.form.get('valorSolicitado').setValidators([Validators.required,
        //             Validators.min(this.dataInicial.parametriaFintraMujer.montoMinimo),
        //             Validators.max(this.dataInicial.parametriaFintraMujer.montoMaximo)])
        //     }else{
        //         this.form.get('valorSolicitado').setValidators([Validators.required, Validators.min(this.salarioMinimo), Validators.max(100000000)])
        //     }

        // })

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



    get primerNombre(): ValidatorFn {
        return this.form.controls.primerNombre.errors?.required ||
            (this.form.controls.primerNombre.dirty ||
                this.form.controls.primerNombre.touched);
    }

    get primerApellido(): ValidatorFn {
        return this.form.controls.primerApellido.errors?.required ||
            (this.form.controls.primerApellido.dirty ||
                this.form.controls.primerApellido.touched);
    }

    setConyugueNombreCompleto() {
        let strings: string[] = []

        strings.push(
            this.form.controls['primerNombreConyuge'].value,
            this.form.controls['segundoNombreConyuge'].value,
            this.form.controls['primerApellidoConyuge'].value,
            this.form.controls['segundoApellidoConyuge'].value,
        )

        strings = strings.filter(item => item !== '')

        this.form.controls['nombreCompletoConyuge'].setValue(strings.join(' '))
    }

    ngOnDestroy(): void {
        this.unSubscribe$.next(null);
        this.unSubscribe$.complete();
    }

    public verScorePermiso():boolean{
        if(this.fabricaDatos.observaScoreTrazabilidad === 'S'){
            return true;
        }else{
            return this.agendaActual === 'RE' || this.agendaActual === 'DE' || this.agendaActual === 'CO'
        }
    }
}

import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { GenericasService } from 'app/core/services/genericas.service';
import { UtilityService } from 'app/resources/services/utility.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
    selector: 'form-generico-referenciacion',
    templateUrl: './form-generico.component.html',
    styleUrls: ['./form-generico.component.scss']
})
export class FormGenericoComponent implements OnInit {

    @Input() currentStep: number;
    @Input() tipoDocumento: string = "CC"
    public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
    public identificacion: string = this.route.snapshot.paramMap.get('id');
    public referencia: string = this.route.snapshot.paramMap.get('referencia');
    public tipoReferenciacion: string = this.route.snapshot.paramMap.get('tipoReferenciacion');
    public tipoPersona: string = this.route.snapshot.paramMap.get('tipoPersona');
    public CodUnidadNegocio: string = this.route.snapshot.paramMap.get('unidadNegocio');
    public tipoDocPersona: string = this.route.snapshot.paramMap.get('tipoDocPersona');
    @ViewChild('editor') editor;
    // dataNecesaria = new BehaviorSubject<datalocal[]>([]);
    datos = []
    dataNecesaria;
    public data$: Observable<any>;

    quillModules: any = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
            ['clean'],
        ],
    };
    constructor(
        private fabricaCreditoService: FabricaCreditoService,
        private _utilityService: UtilityService,
        private genericaServices: GenericasService,
        private route: ActivatedRoute,
        private router: Router,
        public dialogRef: MatDialogRef<FormGenericoComponent>,
        @Inject(MAT_DIALOG_DATA) public data,

    ) {
        if (data) {
            this.currentStep = data.currentStep
            this.tipoDocumento = data.tipoDocumento
            this.numeroSolicitud = data.numeroSolicitud
            this.identificacion = data.identificacion
            this.referencia = data.referencia
            this.tipoReferenciacion = data.tipoReferenciacion
            this.tipoPersona = data.tipoPersona
            this.CodUnidadNegocio = data.CodUnidadNegocio
            this.tipoDocPersona = data.tipoDocPersona
        }

    }

    ngOnInit(): void {
        this.getFabricaCreditoAgenda();
    }

    /**
      * @description: Obtiene la data para cargar al formulario
    */
    private getFabricaCreditoAgenda(): void {
        Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
        const datosSolicitud: any = {
            "numeroSolicitud": Number(this.numeroSolicitud),
            "unidadNegocio": Number(this.CodUnidadNegocio),
            "tipoTercero": this.tipoPersona,
            "tipoReferencia": this.tipoReferenciacion,
            "tipoDocumento": this.tipoDocPersona
        };
        const datosSolicitudUsuario: any = {
            "numeroSolicitud": Number(this.numeroSolicitud),
            "unidadNegocio": Number(this.CodUnidadNegocio),
            "tipoTercero": this.tipoPersona,
            "identificacion": this.identificacion,
            "tipoReferencia": this.tipoReferenciacion,
            "tipoDocumento": this.tipoDocPersona
        };
        this.fabricaCreditoService.obtenerPreguntaAgendaReferenciacion(datosSolicitud)
            .subscribe(({ data }) => {
                let info = data.sort((a, b) => Number(a.orden) - Number(b.orden));

                this.fabricaCreditoService.obtenerDatoAgendaReferenciacion(datosSolicitudUsuario)
                    .subscribe(({ data }) => {
                        Swal.close();
                        this.dataNecesaria =
                        {
                            session: [

                                {
                                    id: 0,
                                    titulo: 'Datos de la llamada'
                                },
                                {
                                    id: 1,
                                    titulo: 'Información del titular'
                                },
                                {
                                    id: 2,
                                    titulo: 'Preguntas a la referencia'
                                },
                                {
                                    id: 3,
                                    titulo: 'Aprobación de la referenciación'
                                }

                            ],
                            datosUsuario: data,
                            preguntas: info
                        }
                        // cargar preguntas luego de recibir info
                        this.recorrerPregunta();
                    });
            });
    }

    public mostrarPregunta(idPregunta) {



        // condicion si mostrar
        let hijo = this.dataNecesaria.preguntas.filter(obj => obj.idPregunta == idPregunta)[0];



        // si aparece hide buscar el papa, pero el papa tiene que ser diferente a si mismo
        if (hijo.idPadre == hijo.idPregunta) {
            return true
        }

        let padre = this.dataNecesaria.preguntas.filter(obj => obj.idPregunta == hijo.idPadre)[0];

        // el papa tiene que ser tipo booleano si es otro tipo queda eliminado
        if (padre.tipoDato != 'boolean') {
            return false
        }

        // validamos si tienen  abuelo
        if (padre.idPadre != padre.idPregunta) {
            // validamos si tiene que mostrar el hijo
            if (padre.hide == false) {
                return false;
            }
        }

        //valor de la variable
        let valor = padre.objHtml.switch.value
        let encontrado = false


        //pasar array a hijos
        let objetoSi = JSON.parse(padre.objHtml.switch.s)
        let objetoNo = JSON.parse(padre.objHtml.switch.n)


        // el papa buscamos el resultado
        if (valor == 'S') {
            // el papa buscamos los hijos en si
            objetoSi.forEach(element => {

                if (element == hijo.idPregunta) {
                    encontrado = true;
                }
            });
        } else if (valor == 'N') {
            // el papa buscamos los hijos en no
            objetoNo.forEach(element => {
                if (element == hijo.idPregunta) {
                    encontrado = true;
                }
            });
        } else {
            //si el valor es igual a neutro es que no huvo cambio en el valor se queda igual
            return hijo.hide
        }


        return encontrado;

    }

    public recorrerPregunta() {

        for (let index = 0; index < this.dataNecesaria.preguntas.length; index++) {
            let data = this.mostrarPregunta(this.dataNecesaria.preguntas[index].idPregunta);
            this.dataNecesaria.preguntas[index].hide = data
        }
    }


    public onPostDatos() {
        let data = this.dataNecesaria.preguntas;
        let dataEnviada = {
            "details": []
        }
        let detener = false;
        let switchValor = "", valorRespuesta = "";
        data.forEach(element => {

            //busco el tipo de objeto de html segun eso capto el valor
            switch (element.tipoObjHtml) {
                case 'switch':
                    switchValor = element.objHtml.switch.value
                    valorRespuesta = element.objHtml.switch.value
                    if (element.hide == true) {
                        if (switchValor == 'NEUTRO') {
                            Swal.fire({
                                title: 'Error',
                                html: '<p> No se puede guardar los datos sin antes revisar. validar pregunta: </p>' + element.pregunta,
                                icon: 'error',
                                confirmButtonText: 'Cerrar',
                            }).then();
                            // break;
                            detener = true;
                            return;

                        }
                    }

                    break;
                case 'select':
                    switchValor = element.objHtml.select.value
                    valorRespuesta = element.objHtml.select.value
                    break;

                case 'textarea':
                    switchValor = element.objHtml.textarea.value
                    valorRespuesta = element.objHtml.textarea.value
                    break;

                default:
                    switchValor = element.objHtml.input.value
                    valorRespuesta = element.objHtml.input.value
                    break;
            }

            //si el tipo de dato es numerico
            if (element.tipoDato == "numeric") {
                switchValor = Number(switchValor) + "";
                valorRespuesta = Number(switchValor) + "";
            }
            dataEnviada.details.push(
                {
                    "numeroSolicitud": Number(this.numeroSolicitud),
                    "unidadNegocio": Number(this.CodUnidadNegocio),
                    "tipoReferencia": this.tipoReferenciacion,
                    "idPregunta": element.idPregunta,
                    "idDBColumna": element.idDBColumna,
                    "switchValor": switchValor,
                    "valorRespuesta": valorRespuesta
                }
            )
        });

        //validaciones
        //ninguno se puede NEUTRO

        if (detener == false) {
            //guarda la info
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

                    Swal.fire({ title: 'Cargando', html: 'Guardando información...', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
                    this.fabricaCreditoService.GuardarPreguntaAgendaReferenciacion(dataEnviada)
                        .subscribe(({ data }) => {
                            if (data.resultado) {
                                Swal.close();
                                Swal.fire(
                                    'Completado',
                                    'Información guardada con éxito',
                                    'success'
                                );
                                setTimeout(() => {
                                    this.dialogRef.close();
                                }, 1000);
                            } else {
                                Swal.close();
                                Swal.fire(
                                    'Error',
                                    'Información no se guardo, favor intentar nuevamente',
                                    'warning'
                                );
                            }
                        })


                }
            });
        }

    }


    public mostrarData(item) {
        let recurso = item.objHtml.select.selectResource;
        let valor = "ATL"
        this.getTiposDocumentos(`${recurso}/${valor}`)
    }

    /**
   * @description: Obtiene los tipos de documentos
   */
    public getTiposDocumentos(recurso): void {
        this.data$ = this.genericaServices.getSelectDinamico(recurso);
    }



}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from 'app/resources/services/utility.service';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import moment from 'moment';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-busqueda',
    templateUrl: './busqueda.component.html',
    styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {
    listadoCount = 0;
    /* eslint-disable */
    listados = [];
    pagadurias = [];
    unidades = [];
    agendas = [];
    estados = [];
    subestados = [];
    seleccionado: boolean = false;
    tarjetaTitular: boolean;
    tarjetaNegocios: boolean;
    tarjetaPagaduria: boolean;

    titularForm: FormGroup;
    negocioForm: FormGroup;
    pagaduriaForm: FormGroup;

    documento: string='';
    verDocumento: string='';
    nombreCliente: string='';
    verNombreCliente: string='';
    unidad: string='';
    verUnidad: string='';
    agenda: string='';
    verAgenda: string='';
    estado: string='';
    verEstado: string='';
    subestado: string='';
    verSubestado: string='';
    solicitud: string='';
    verSolicitud: string='';
    codigoNeg: string='';
    verCodigoNeg: string='';
    nombrePagaduria: string='';
    verNombrePagaduria: string='';

    dataFiltro: any = {"details":[]};
    dataTitular: any = {"details":[]};
    dataNegocios: any = {"details":[]};
    dataPagaduria: any = {"details":[]};

    constructor(private _utility: UtilityService, private router: Router, private fb: FormBuilder) {
        this.titularForm = this.fb.group({
            documento: [''],
            nombre: ['']
        })

        this.negocioForm = this.fb.group({
            agenda: [''],
            estado: [''],
            subestado: [''],
            // fechaInicial: [''],
            // fechaFinal: [''],
            unidad: [''],
            solicitud:[''],
            codigoNeg:[''],
        })

        this.pagaduriaForm = this.fb.group({
            codigoPag: ['']
        })
    }

    ngOnInit(): void {
        this.consulta('');
        this.consultaUnidades('')
        this.consultaPagaduria('')
        this.consultaEstados('')
        this.consultaAgendas('')
    }

    eliminarFiltro(){
        this.borrarTitular()
        this.borrarEstado()
        this.borrarPagaduria()
        this.dataFiltro.details = [];
        this.consulta('');
    }

    filtroTitular(){
        this.dataTitular.details = [];
        this.tarjetaTitular = false;
        this.seleccionado = false;
        if (this.titularForm.value.documento!='' && this.titularForm.value.documento!=null) {
            let data = {
                "tipo": "IDENTIFICACION",
                "buscar": this.titularForm.value.documento
            }
            this.dataTitular.details.push(data)
            this.verDocumento = this.documento;
        }

        if (this.titularForm.value.nombre!='' && this.titularForm.value.nombre!=null) {
            let data = {
                "tipo": "NOMBRE",
                "buscar": this.titularForm.value.nombre
            }
            this.dataTitular.details.push(data)
            this.verNombreCliente = this.nombreCliente;
        }
    }

    filtroNegocio(){
        this.dataNegocios.details = [];
        this.tarjetaNegocios = false;
        this.seleccionado = false;
        if (this.negocioForm.value.unidad!='' && this.negocioForm.value.unidad!=null) {
            let data = {
                "tipo": "UNIDAD",
                "buscar": this.negocioForm.value.unidad
            }
            this.dataNegocios.details.push(data)
            this.verUnidad = this.unidad;
        }

        if (this.negocioForm.value.agenda!='' && this.negocioForm.value.agenda!=null) {
            let data = {
                "tipo": "AGENDA",
                "buscar": this.negocioForm.value.agenda
            }
            this.dataNegocios.details.push(data)
            this.verAgenda = this.agenda;
        }

        if (this.negocioForm.value.estado!='' && this.negocioForm.value.estado!=null) {
            let data = {
                "tipo": "ESTADO",
                "buscar": this.negocioForm.value.estado
            }
            this.dataNegocios.details.push(data)
            this.verEstado = this.estado;
        }

        if (this.negocioForm.value.subestado!='' && this.negocioForm.value.subestado!=null) {
            let data = {
                "tipo": "SUBESTADO",
                "buscar": this.negocioForm.value.subestado
            }
            this.dataNegocios.details.push(data)
            this.verSubestado = this.subestado;
        }

        if (this.negocioForm.value.solicitud!='' && this.negocioForm.value.solicitud!=null) {
            let data = {
                "tipo": "SOLICITUD",
                "buscar": this.negocioForm.value.solicitud
            }
            this.dataNegocios.details.push(data)
            this.verSolicitud = this.solicitud;
        }

        if (this.negocioForm.value.codigoNeg!='' && this.negocioForm.value.codigoNeg!=null) {
            let data = {
                "tipo": "NEGOCIO",
                "buscar": this.negocioForm.value.codigoNeg
            }
            this.dataNegocios.details.push(data)
            this.verCodigoNeg = this.codigoNeg;
        }
    }

    filtroPagaduria(){
        this.dataPagaduria.details = [];
        this.tarjetaPagaduria = false;
        this.seleccionado = false;
        if (this.pagaduriaForm.value.codigoPag!='' && this.pagaduriaForm.value.codigoPag!=null) {
            let data = {
                "tipo": "PAGADURIA",
                "buscar": this.pagaduriaForm.value.codigoPag
            }
            this.dataPagaduria.details.push(data)
            this.verNombrePagaduria = this.nombrePagaduria;
        }
    }

    filtrar(){
        this.dataFiltro.details = [];
        this.tarjetaTitular = false;
        this.tarjetaNegocios = false;
        this.tarjetaPagaduria = false;
        this.seleccionado = false;
        if (this.dataTitular.details.length>0) {
            for (let index = 0; index < this.dataTitular.details.length; index++) {
                const element = this.dataTitular.details[index];
                this.dataFiltro.details.push(element)
            }
        }
        if (this.dataNegocios.details.length>0) {
            for (let index = 0; index < this.dataNegocios.details.length; index++) {
                const element = this.dataNegocios.details[index];
                this.dataFiltro.details.push(element)
            }
        }
        if (this.dataPagaduria.details.length>0) {
            for (let index = 0; index < this.dataPagaduria.details.length; index++) {
                const element = this.dataPagaduria.details[index];
                this.dataFiltro.details.push(element)
            }
        }
        console.log(this.dataFiltro.details)
        this._utility.postQuery('/cre-consulta-comentarios-v2', this.dataFiltro).subscribe((response: any) => {
            if (response) {
                this.listados = response.data;
            } else {
                this.listados = [];
            }
        });
    }

    consultaPagaduria(data){
        this._utility.getQuery('tk/pagadurias', data).subscribe((response: any) => {
            if (response) {
                this.pagadurias = response.data;
            } else {
                this.pagadurias = [];
            }
        });
    }

    consultaUnidades(data){
        this._utility.getQuery('consulta-lista-generica/UNIDAD-NEGOCIO', data).subscribe((response: any) => {
            if (response) {
                this.unidades = response.data;
            } else {
                this.unidades = [];
            }
        });
    }

    consultaAgendas(data){
        this._utility.getQuery('consulta-lista-generica/TIPOS-AGENDA', data).subscribe((response: any) => {
            if (response) {
                this.agendas = response.data;
            } else {
                this.agendas = [];
            }
        });
    }

    consultaEstados(data){
        this._utility.getQuery('tk/estados-creditos', data).subscribe((response: any) => {
            if (response) {
                this.estados = response.data;
            } else {
                this.estados = [];
            }
        });
    }

    consultaSubestados(data){
        let info = {
            codigo: data
        };
        this._utility.postQueryServer1('/generic/tk/subestados-creditos', info).subscribe((response: any) => {
            if (response) {
                this.subestados = response.data;
            } else {
                this.subestados = [];
            }
        });
    }

    borrarTitular(){
        this.documento = '';
        this.verDocumento = '';
        this.nombreCliente = '';
        this.verNombreCliente = '';
        this.dataTitular.details = [];
        this.titularForm.reset();
    }

    borrarEstado(){
        this.unidad = '';
        this.verUnidad = '';
        this.estado = '';
        this.verEstado = '';
        this.agenda = '';
        this.verAgenda = '';
        this.subestado = '';
        this.verSubestado = '';
        this.solicitud = '';
        this.verSolicitud = '';
        this.codigoNeg = '';
        this.verCodigoNeg = '';
        this.dataNegocios.details = [];
        this.negocioForm.reset();
    }

    borrarPagaduria(){
        this.nombrePagaduria = '';
        this.verNombrePagaduria = '';
        this.dataPagaduria.details = [];
        this.pagaduriaForm.reset();
    }

    mostrarDocumento(event: Event){
        this.documento = (<HTMLInputElement>event.target).value
    }

    mostrarNombreTitular(event: Event){
        this.nombreCliente = (<HTMLInputElement>event.target).value
    }

    mostrarUnidad(value){
        this.unidad = value;
    }

    mostrarAgenda(value){
        this.agenda = value;
    }

    mostrarEstado(value){
        this.estado = value
    }

    mostrarSubestado(value){
        this.subestado = value
    }

    mostrarSolicitud(event: Event){
        this.solicitud = (<HTMLInputElement>event.target).value
    }

    mostrarCodNeg(event: Event){
        this.codigoNeg = (<HTMLInputElement>event.target).value
    }

    mostrarPagaduria(value){
        this.nombrePagaduria = value
    }

    abrirTitular(){
        if ( this.tarjetaTitular) {
            this.tarjetaTitular=false;
            this.seleccionado=false;
        } else {
            this.tarjetaTitular=true;
            this.seleccionado=true;
        }
        this.tarjetaNegocios=false;
        this.tarjetaPagaduria=false;
    }

    abrirNegocios(){
        if ( this.tarjetaNegocios) {
            this.tarjetaNegocios=false;
            this.seleccionado=false;
        } else {
            this.tarjetaNegocios=true;
            this.seleccionado=true;
        }
        this.tarjetaTitular=false;
        this.tarjetaPagaduria=false;
    }

    abrirPagaduria(){
        if ( this.tarjetaPagaduria) {
            this.tarjetaPagaduria=false;
            this.seleccionado=false;
        } else {
            this.tarjetaPagaduria=true;
            this.seleccionado=true;
        }
        this.tarjetaTitular=false;
        this.tarjetaNegocios=false;
    }

    consulta(dato) {
        let data = {
            busqueda: dato
        };
        Swal.fire({ title: 'Cargando', html: 'Buscando información', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
        this._utility.postQueryServer1('/generic/agendas-credito-trazabilidad', data).subscribe((response: any) => {
            Swal.close();
            if (response) {
                this.listados = response.data;
                this.listadoCount = this.listados.length;
            } else {
                this.listados = [];
                this.listadoCount = this.listados.length;
            }
        });
    }

    onKeyUp(event) {
        let data = event.target.value;
        if (data.length > 5) {
            this.consulta(data);
        }
        if (data.length === 0) {
            this.consulta('');
        }

    }

    /**
* @description: abre el resumen
*/
    public goResumen(data: any): void {
        //this.agendaCompletacionService.seleccionAgenda.next({selected: data, show: true});
        const { numeroSolicitud, identificacion } = data;
        this.router.navigate(['/credit-factory/trazabilidad/detalle-trazabilidad/', numeroSolicitud, identificacion]);
    }

    cambiarFecha(date){
        moment.locale('es');
        return moment(date).format('MMMM D YYYY')
    }
    
    cambiarHora(date){
        moment.locale('es');
        return moment(date).format('h:mm a')
    }
}

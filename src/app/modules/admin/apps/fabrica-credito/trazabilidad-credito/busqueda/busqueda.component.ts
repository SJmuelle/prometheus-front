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
    tarjetaFiltro: boolean;

    filtroForm: FormGroup;
    negocioForm: FormGroup;
    pagaduriaForm: FormGroup;

    documento: string='';
    nombreCliente: string='';
    unidad: string='';
    agenda: string='';
    estado: string='';
    subestado: string='';
    solicitud: string='';
    codigoNeg: string='';
    nombrePagaduria: string='';

    dataFiltro: any = {"details":[]};
    dataMuestra:any = [];

    constructor(private _utility: UtilityService, private router: Router, private fb: FormBuilder) {
        this.filtroForm = this.fb.group({
            documento: [''],
            nombre: [''],
            agenda: [''],
            estado: [''],
            subestado: [''],
            // fechaInicial: [''],
            // fechaFinal: [''],
            unidad: [''],
            solicitud:[''],
            codigoNeg:[''],
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
        this.filtroForm.value.documento='';
        this.filtroForm.value.nombre='';
        this.filtroForm.value.unidad='';
        this.filtroForm.value.agenda='';
        this.filtroForm.value.estado='';
        this.filtroForm.value.subestado='';
        this.filtroForm.value.solicitud='';
        this.filtroForm.value.codigoNeg='';
        this.filtroForm.value.codigoPag='';
        this.dataFiltro.details = [];
    }

    abrirFiltro(){
        if (this.tarjetaFiltro) {
            this.tarjetaFiltro = false;
        }else{
            this.tarjetaFiltro = true;
        }
    }

    mostrarDocumento(){
        let data = {
            "tipo": "IDENTIFICACION",
            "buscar": this.filtroForm.value.documento
        }
        let muestra = {
            "tipo": "Identificación",
            "descripcion": this.filtroForm.value.documento
        }
        const dataBuscar = this.dataFiltro.details.filter(docu => docu.buscar != this.filtroForm.value.documento);
        let idx = this.dataFiltro.details.indexOf(dataBuscar[0]);
        this.dataFiltro.details.splice(idx, 1);
        this.dataFiltro.details.push(data)
        this.filtrar(this.dataFiltro)
        this.dataMuestra.push(muestra);
    }

    mostrarNombre(){
        let data = {
            "tipo": "NOMBRE",
            "buscar": this.filtroForm.value.nombre
        }
        let muestra = {
            "tipo": "Nombre",
            "descripcion": this.filtroForm.value.nombre
        }
        const dataBuscar = this.dataFiltro.details.filter(nom => nom.buscar != this.filtroForm.value.nombre);
        let idx = this.dataFiltro.details.indexOf(dataBuscar[0]);
        this.dataFiltro.details.splice(idx, 1);
        this.dataFiltro.details.push(data)
        this.filtrar(this.dataFiltro)
        this.dataMuestra.push(muestra);
    }

    mostrarUnidad(value){
        let data = {
            "tipo": "UNIDAD",
            "buscar": this.filtroForm.value.unidad
        }
        let muestra = {
            "tipo": "Unidad",
            "descripcion": value
        }
        const dataBuscar = this.dataFiltro.details.filter(uni => uni.buscar != this.filtroForm.value.unidad);
        let idx = this.dataFiltro.details.indexOf(dataBuscar[0]);
        this.dataFiltro.details.splice(idx, 1);
        this.dataFiltro.details.push(data)
        this.filtrar(this.dataFiltro)
        this.dataMuestra.push(muestra);
    }

    mostrarAgenda(value){
        let data = {
            "tipo": "AGENDA",
            "buscar": this.filtroForm.value.agenda
        }
        let muestra = {
            "tipo": "Agenda",
            "descripcion": value
        }
        const dataBuscar = this.dataFiltro.details.filter(age => age.buscar != this.filtroForm.value.agenda);
        let idx = this.dataFiltro.details.indexOf(dataBuscar[0]);
        this.dataFiltro.details.splice(idx, 1);
        this.dataFiltro.details.push(data)
        this.filtrar(this.dataFiltro)
        this.dataMuestra.push(muestra);
    }

    mostrarEstado(value){
        let data = {
            "tipo": "ESTADO",
            "buscar": this.filtroForm.value.estado
        }
        let muestra = {
            "tipo": "Estado",
            "descripcion": value
        }
        const dataBuscar = this.dataFiltro.details.filter(est => est.buscar != this.filtroForm.value.estado);
        let idx = this.dataFiltro.details.indexOf(dataBuscar[0]);
        this.dataFiltro.details.splice(idx, 1);
        this.dataFiltro.details.push(data)
        this.filtrar(this.dataFiltro)
        this.dataMuestra.push(muestra);
    }

    mostrarSubestado(value){
        let data = {
            "tipo": "SUBESTADO",
            "buscar": this.filtroForm.value.subestado
        }
        let muestra = {
            "tipo": "Subestado",
            "descripcion": value
        }
        const dataBuscar = this.dataFiltro.details.filter(sub => sub.buscar != this.filtroForm.value.subestado);
        let idx = this.dataFiltro.details.indexOf(dataBuscar[0]);
        this.dataFiltro.details.splice(idx, 1);
        this.dataFiltro.details.push(data)
        this.filtrar(this.dataFiltro)
        this.dataMuestra.push(muestra);
    }

    mostrarSolicitud(){
        let data = {
            "tipo": "SOLICITUD",
            "buscar": this.filtroForm.value.solicitud
        }
        let muestra = {
            "tipo": "Solicitud",
            "descripcion": this.filtroForm.value.solicitud
        }
        const dataBuscar = this.dataFiltro.details.filter(sol => sol.buscar != this.filtroForm.value.solicitud);
        let idx = this.dataFiltro.details.indexOf(dataBuscar[0]);
        this.dataFiltro.details.splice(idx, 1);
        this.dataFiltro.details.push(data)
        this.filtrar(this.dataFiltro)
        this.dataMuestra.push(muestra);
    }

    mostrarNegocio(){
        let data = {
            "tipo": "NEGOCIO",
            "buscar": this.filtroForm.value.codigoNeg
        }
        let muestra = {
            "tipo": "Negocio",
            "descripcion": this.filtroForm.value.codigoNeg
        }
        const dataBuscar = this.dataFiltro.details.filter(neg => neg.buscar != this.filtroForm.value.codigoNeg);
        let idx = this.dataFiltro.details.indexOf(dataBuscar[0]);
        this.dataFiltro.details.splice(idx, 1);
        this.dataFiltro.details.push(data)
        this.filtrar(this.dataFiltro)
        this.dataMuestra.push(muestra);
    }

    mostrarPagaduria(value){
        let data = {
            "tipo": "PAGADURIA",
            "buscar": this.filtroForm.value.codigoPag
        }
        let muestra = {
            "tipo": "Pagaduria",
            "descripcion": value
        }
        const dataBuscar = this.dataFiltro.details.filter(pag => pag.buscar != this.filtroForm.value.codigoPag);
        let idx = this.dataFiltro.details.indexOf(dataBuscar[0]);
        this.dataFiltro.details.splice(idx, 1);
        this.dataFiltro.details.push(data)
        this.filtrar(this.dataFiltro)
        this.dataMuestra.push(muestra);
    }

    filtrar(value){
        console.log(value)
        // Swal.fire({ 
        //     title: 'Cargando', 
        //     html: 'Filtrando la información', 
        //     timer: 500000,
        //     allowOutsideClick: false, 
        //     didOpen: () => { 
        //         Swal.showLoading() 
        //     }, 
        // }).then((result) => { })
        // this._utility.postQuery('/cre-consulta-comentarios-v2', value).subscribe((response: any) => {
        //     if (response) {
        //         Swal.close();
        //         this.listados = response.data;
        //     } else {
        //         this.listados = [];
        //     }
        // });
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

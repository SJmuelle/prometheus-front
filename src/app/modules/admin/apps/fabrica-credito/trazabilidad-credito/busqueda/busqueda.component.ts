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
    nombreCliente: string='';
    unidad: string='';
    agenda: string='';
    estado: string='';
    subestado: string='';
    solicitud: string='';
    codigoNeg: string='';
    nombrePagaduria: string='';

    dataFiltro: any = {"details":[]};
    dataTitular: any = {"details":[]};
    dataNegocios: any = {"details":[]};
    dataPagaduria: any = {"details":[]};

    constructor(private _utility: UtilityService, private router: Router, private fb: FormBuilder) {
        this.titularForm = this.fb.group({
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
        this.titularForm.value.documento='';
        this.titularForm.value.nombre='';
        this.titularForm.value.unidad='';
        this.titularForm.value.agenda='';
        this.titularForm.value.estado='';
        this.titularForm.value.subestado='';
        this.titularForm.value.solicitud='';
        this.titularForm.value.codigoNeg='';
        this.titularForm.value.codigoPag='';
        this.dataFiltro.details = [];
    }

    abrirFiltro(){
        if (this.tarjetaTitular) {
            this.tarjetaTitular = false;
        }else{
            this.tarjetaTitular = true;
        }
    }

    mostrarDocumento(){
        let data = {
            "tipo": "IDENTIFICACION",
            "buscar": this.titularForm.value.documento
        }
        const dataBuscar = this.dataFiltro.details.filter(docu => docu.buscar != this.titularForm.value.documento);
        let idx = this.dataFiltro.details.indexOf(dataBuscar[0]);
        this.dataFiltro.details.splice(idx, 1);
        this.dataFiltro.details.push(data)
        this.filtrar(this.dataFiltro)
    }

    mostrarNombre(){
        let data = {
            "tipo": "NOMBRE",
            "buscar": this.titularForm.value.nombre
        }
        const dataBuscar = this.dataFiltro.details.filter(nom => nom.buscar != this.titularForm.value.nombre);
        let idx = this.dataFiltro.details.indexOf(dataBuscar[0]);
        this.dataFiltro.details.splice(idx, 1);
        this.dataFiltro.details.push(data)
        this.filtrar(this.dataFiltro)
    }

    mostrarUnidad(){
        let data = {
            "tipo": "UNIDAD",
            "buscar": this.titularForm.value.unidad
        }
        const dataBuscar = this.dataFiltro.details.filter(uni => uni.buscar != this.titularForm.value.unidad);
        let idx = this.dataFiltro.details.indexOf(dataBuscar[0]);
        this.dataFiltro.details.splice(idx, 1);
        this.dataFiltro.details.push(data)
        this.filtrar(this.dataFiltro)
    }

    mostrarAgenda(){
        let data = {
            "tipo": "AGENDA",
            "buscar": this.titularForm.value.agenda
        }
        const dataBuscar = this.dataFiltro.details.filter(age => age.buscar != this.titularForm.value.agenda);
        let idx = this.dataFiltro.details.indexOf(dataBuscar[0]);
        this.dataFiltro.details.splice(idx, 1);
        this.dataFiltro.details.push(data)
        this.filtrar(this.dataFiltro)
    }

    mostrarEstado(){
        let data = {
            "tipo": "ESTADO",
            "buscar": this.titularForm.value.estado
        }
        const dataBuscar = this.dataFiltro.details.filter(est => est.buscar != this.titularForm.value.estado);
        let idx = this.dataFiltro.details.indexOf(dataBuscar[0]);
        this.dataFiltro.details.splice(idx, 1);
        this.dataFiltro.details.push(data)
        this.filtrar(this.dataFiltro)
    }

    mostrarSubestado(){
        let data = {
            "tipo": "SUBESTADO",
            "buscar": this.titularForm.value.subestado
        }
        const dataBuscar = this.dataFiltro.details.filter(sub => sub.buscar != this.titularForm.value.subestado);
        let idx = this.dataFiltro.details.indexOf(dataBuscar[0]);
        this.dataFiltro.details.splice(idx, 1);
        this.dataFiltro.details.push(data)
        this.filtrar(this.dataFiltro)
    }

    mostrarSolicitud(){
        let data = {
            "tipo": "SOLICITUD",
            "buscar": this.titularForm.value.solicitud
        }
        const dataBuscar = this.dataFiltro.details.filter(sol => sol.buscar != this.titularForm.value.solicitud);
        let idx = this.dataFiltro.details.indexOf(dataBuscar[0]);
        this.dataFiltro.details.splice(idx, 1);
        this.dataFiltro.details.push(data)
        this.filtrar(this.dataFiltro)
    }

    mostrarNegocio(){
        let data = {
            "tipo": "NEGOCIO",
            "buscar": this.titularForm.value.codigoNeg
        }
        const dataBuscar = this.dataFiltro.details.filter(neg => neg.buscar != this.titularForm.value.codigoNeg);
        let idx = this.dataFiltro.details.indexOf(dataBuscar[0]);
        this.dataFiltro.details.splice(idx, 1);
        this.dataFiltro.details.push(data)
        this.filtrar(this.dataFiltro)
    }

    mostrarPagaduria(){
        let data = {
            "tipo": "PAGADURIA",
            "buscar": this.titularForm.value.codigoPag
        }
        const dataBuscar = this.dataFiltro.details.filter(pag => pag.buscar != this.titularForm.value.codigoPag);
        let idx = this.dataFiltro.details.indexOf(dataBuscar[0]);
        this.dataFiltro.details.splice(idx, 1);
        this.dataFiltro.details.push(data)
        this.filtrar(this.dataFiltro)
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

    abrirTitular(){
        if (this.tarjetaTitular) {
            this.tarjetaTitular=false;
        } else {
            this.tarjetaTitular=true;
        }
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

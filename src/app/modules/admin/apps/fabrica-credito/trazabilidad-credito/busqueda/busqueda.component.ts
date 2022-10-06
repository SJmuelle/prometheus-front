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
    agendas = [];
    estados = [];
    subestados = [];
    seleccionado: boolean = false;
    tarjetaTitular: boolean;
    tarjetaNegocios: boolean;
    tarjetaPagaduria: boolean;
    filtrarForm: FormGroup;

    titularForm: FormGroup;
    negocioForm: FormGroup;
    pagaduriaForm: FormGroup;

    documento: string='';
    estado: string='';
    nombrePagaduria: string='';

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
            codigoNeg:[''],
            solicitud:['']
        })

        this.pagaduriaForm = this.fb.group({
            codigoPag: ['']
        })
    }

    ngOnInit(): void {
        this.consulta('');
        this.consultaPagaduria('')
        this.consultaEstados('')
        this.consultaAgendas('')
    }

    filtrar(){
        let data = {
            "details": [
                {
                    "tipo": "AGENDA",
                    "buscar": this.negocioForm.value.agenda
                }
            ]
        }
        console.log(data)
        this.tarjetaTitular = false;
        this.tarjetaNegocios = false;
        this.tarjetaPagaduria = false;
        this.seleccionado = false;
        this._utility.postQuery('/cre-consulta-comentarios-v2', data).subscribe((response: any) => {
            console.log(response)
            if (response) {
                this.listados = response.data;
                console.log(this.listados);
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

    consultaAgendas(data){
        this._utility.getQuery('consulta-lista-generica/TIPOS-AGENDA', data).subscribe((response: any) => {
            if (response) {
                this.agendas = response.data;
                console.log(this.agendas);
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

    borrarDocumento(){
        this.documento = '';
        this.titularForm.reset();
    }

    borrarEstado(){
        this.estado = '';
        this.negocioForm.reset();
    }

    borrarPagaduria(){
        this.nombrePagaduria = '';
        this.pagaduriaForm.reset();
    }

    mostrarDocumento(event: Event){
        this.documento = (<HTMLInputElement>event.target).value
    }

    mostrarEstado(value){
        this.estado = value
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
                console.log(this.listados);
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

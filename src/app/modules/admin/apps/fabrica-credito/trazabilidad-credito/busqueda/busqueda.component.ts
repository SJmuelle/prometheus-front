import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from 'app/resources/services/utility.service';
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


    constructor(private _utility: UtilityService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.consulta('');
    }

    consulta(dato) {
        let data = {
            busqueda: dato
        };
        Swal.fire({ title: 'Cargando', html: 'Buscando información', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
        this._utility
            .postQueryServer1('/generic/agendas-credito-trazabilidad', data)
            .subscribe((response: any) => {
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

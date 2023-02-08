import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertaService } from 'app/core/services/oferta.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import moment from "moment";
import 'moment/locale/es';
import { PermisosService } from 'app/core/services/permisos.service';
@Component({
  selector: 'app-grid-oferta-libranza',
  templateUrl: './grid-oferta-libranza.component.html',
  styleUrls: ['./grid-oferta-libranza.component.scss']
})
export class GridOfertaLibranzaComponent implements OnInit {
  public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
  public listadoOferta$: Observable<any>;
  public capacidadPago$: Observable<any>;
  capacidadOferta: boolean = true;
  public permisoEditar:boolean=false;
  
  constructor(
    private route: ActivatedRoute,
    private ofertaService: OfertaService,
    public _permisosService: PermisosService

  ) { }

  ngOnInit() {
    this.getListadoOferta(Number(this.numeroSolicitud));
    this.getCapacidadPago(Number(this.numeroSolicitud));
    this.permisoEditar = this._permisosService.permisoPorModuleTrazabilidad()

  }


  private getListadoOferta(numeroSolicitud: number): void {
    this.listadoOferta$ = this.ofertaService.getListadoOferta(numeroSolicitud);
  }
  private getCapacidadPago(numeroSolicitud: number): void {
    this.capacidadPago$ = this.ofertaService.getCapacidadPago(numeroSolicitud);
  }
  public SelectOferta(item: any): void {
    let data = {
      numeroSolicitud: Number(this.numeroSolicitud),
      identificacion: item.identificacion,
      idRegistro: item.idOpcion
    }

    Swal.fire({
      title: 'Cargando',
      html: 'Guardando información',
      timer: 500000,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => { });

    this.ofertaService
      .SelectOferta(data)
      .subscribe((res) => {
        Swal.close();
        if (res.data.respuesta == 'OK') {
          this.getListadoOferta(Number(this.numeroSolicitud));
        } else {
          Swal.fire('Error', res.data.resultado, 'error');
        }
      });
  }
  
  cambiarFecha(date) {
    moment.locale('es');
    return moment(date).format('MMMM D YYYY')
  }

}

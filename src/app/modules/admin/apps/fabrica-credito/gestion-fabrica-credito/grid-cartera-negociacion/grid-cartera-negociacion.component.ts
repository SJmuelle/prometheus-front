import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { ListadoCarteraService } from 'app/core/services/listadoCartera.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { FormDialogCarteraComponent } from '../form-dialog-cartera/form-dialog-cartera.component';

@Component({
  selector: 'app-grid-cartera-negociacion',
  templateUrl: './grid-cartera-negociacion.component.html',
  styleUrls: ['./grid-cartera-negociacion.component.scss']
})
export class GridCarteraNegociacionComponent implements OnInit {
  public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
  public identificacion: string = this.route.snapshot.paramMap.get('id');

  public listadoCartera$: Observable<any>;
  agenda_fabrica: any;

  constructor(private route: ActivatedRoute,
    private _dialog: MatDialog,
    private fabricaCreditoService: FabricaCreditoService,
    private _listadoCarteraService: ListadoCarteraService,
  ) {
    this.getFabricaCreditoAgenda(this.numeroSolicitud, this.identificacion)

  }

  ngOnInit() {
    this.getListadoCartera(Number(this.numeroSolicitud));
  }


  private getListadoCartera(numeroSolicitud: number): void {
    this.listadoCartera$ = this._listadoCarteraService.getListadoCarteraNegociacion(numeroSolicitud);
    // console.table( this.listadoCartera$)
  }

  public cambioEstado(event, item) {
    console.log(event)
    console.log(item)
    let data = {
      id: item.id,
      numeroSolicitud: Number(this.numeroSolicitud),
      gestionCartera: event
    }
    // debugger;
    Swal.fire({
      title: 'Cargando',
      html: 'Guardando información',
      timer: 500000,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => { });
    this._listadoCarteraService
      .updateCartera(data)
      .subscribe((res) => {
        Swal.close();

        if (res.data.respuesta == 'OK') {
          // Swal.fire('Completado', 'A', 'success');
          this.getListadoCartera(Number(this.numeroSolicitud));
        } else {
          Swal.fire('Error', res.data.resultado, 'error');
        }
      });

  }

  /**
 * @description: Obtiene la data para cargar al formulario
 */
  private getFabricaCreditoAgenda(numeroSolicitud: string, identificacion: string): void {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    const datosSolicitud: any = {
      numeroSolicitud: numeroSolicitud,
      identificacion: identificacion
    };
    this.fabricaCreditoService.getDatosFabricaAgenda(datosSolicitud).pipe()
      .subscribe(({ data }) => {
        Swal.close();
        this.agenda_fabrica = data;
      })
  }
  public createCartera(tipo): void {
    const dialogRef = this._dialog.open(FormDialogCarteraComponent, {
      minWidth: '30%',
      minHeight: '30%',
      data: {
        numeroSolicitud: Number(this.numeroSolicitud),
        identificacion: Number(this.identificacion),
        tipo: tipo
      }
    });
    dialogRef.afterClosed().toPromise().then((res) => {
      this.getListadoCartera(Number(this.numeroSolicitud));
    });
  }

  public pasar_negociar() {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    const datosSolicitud: any = {
      numeroSolicitud: Number(this.numeroSolicitud),
    };
    this._listadoCarteraService.pasarAgenda(datosSolicitud).pipe()
      .subscribe(({ data }) => {
        Swal.close();
        if (data.verificacion == "OK") {
          Swal.fire('Completado', 'Registro actualizado con exito', 'success');
          setTimeout(() => {
            location.reload();
          }, 1000);
        }else{
          Swal.fire('Error', data.verificacion, 'error');
        }
      })
  }



}

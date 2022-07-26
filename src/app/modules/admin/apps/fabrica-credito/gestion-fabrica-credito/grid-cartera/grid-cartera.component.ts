import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ListadoCarteraService } from 'app/core/services/listadoCartera.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { FormDialogCarteraComponent } from '../form-dialog-cartera/form-dialog-cartera.component';
import { FormDialogComentariosComponent } from '../form-dialog-comentarios/form-dialog-comentarios.component';

@Component({
  selector: 'app-grid-cartera',
  templateUrl: './grid-cartera.component.html',
  styleUrls: ['./grid-cartera.component.scss']
})
export class GridCarteraComponent implements OnInit {
  public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
  public identificacion: string = this.route.snapshot.paramMap.get('id');

  public listadoCartera$: Observable<any>;

  constructor(private route: ActivatedRoute,
    private _dialog: MatDialog,
    private _listadoCarteraService: ListadoCarteraService,
  ) { }

  ngOnInit() {

    this.getListadoCartera(Number(this.numeroSolicitud));
  }


  private getListadoCartera(numeroSolicitud: number): void {
    this.listadoCartera$ = this._listadoCarteraService.getListadoCartera(numeroSolicitud);
    // console.table( this.listadoCartera$)
  }

  public cambioEstado(event, item) {
    console.log(event)
    console.log(item)
    let data = {
      id:item.id,
      numeroSolicitud:Number(this.numeroSolicitud),
      gestionCartera:event
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

  public createCartera(tipo): void {
    const dialogRef = this._dialog.open(FormDialogCarteraComponent, {
        minWidth: '30%',
        minHeight: '30%',
        data: { 
          numeroSolicitud: Number(this.numeroSolicitud),
          identificacion: Number(this.identificacion),
          tipo:tipo
         }
    });
    dialogRef.afterClosed().toPromise().then((res) => {
      this.getListadoCartera(Number(this.numeroSolicitud));
    });
}



}

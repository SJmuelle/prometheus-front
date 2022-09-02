import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListadoTiposComentariosComponent } from '../listado-tipos-comentarios.component';
import { UtilityService } from 'app/resources/services/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-tipos-comentarios-form',
  templateUrl: './listado-tipos-comentarios-form.component.html',
  styleUrls: ['./listado-tipos-comentarios-form.component.scss']
})
export class ListadoTiposComentariosFormComponent implements OnInit {

  datos: any = {};
  constructor(
    public matDialogRef: MatDialogRef<ListadoTiposComentariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _utility: UtilityService
  ) { }

  ngOnInit(): void {
    this.datos = this.data;
  }
  guardar() {
    let data, url;
    if (this.datos.titulo == 'N') {
      //post
      // idAgenda,unidadNegocio,nombre,tipoIdentificacion

      url = 'agregar-nuevo-tipo-de-comentario';
      data = {
        visualizacion:this.datos.visualizacion,
        descripcion:this.datos.descripcion
      };
    } else {
      url = 'actualizar-tipo-de-comentario';
      data = {
        id: parseInt(this.datos.id),
        visualizacion:this.datos.visualizacion,
        descripcion:this.datos.descripcion,
        estado: this.datos.estado == 'A' ? '' : 'A',
        // user:'smuelle'
      };
    }
    Swal.fire({
      title: 'Cargando',
      html: 'Guardando...',
      timer: 500000,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => { });
    this._utility.postQuery(url, data).subscribe((response: any) => {
      Swal.close();
      if (response) {
        if (response.status == 200) {
          if (!response.data.respuesta.includes('OK')) {
            Swal.fire(
              'Información',
              response.data.respuesta,
              'error'
            );
            return;
          }
          Swal.fire(
            '¡Información!',
            `Se guardó el registro con éxito`,
            'success'
          ).then((resultado) => {
            if (resultado) {
              this.matDialogRef.close();
            }
          });
        } else {
          Swal.fire(
            '¡Información!',
            `Hubo un error en los datos enviados, favor evaluar`,
            'success'
          );
        }
      } else {
        Swal.fire(
          '¡Advertencia!',
          'Para este tipo de búsqueda, mínimo es necesario la cédula del cliente',
          'error'
        );
      }
    });
  }


}

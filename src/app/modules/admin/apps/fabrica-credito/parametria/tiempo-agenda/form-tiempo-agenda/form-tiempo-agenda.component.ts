import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormCausalesComponent } from 'app/modules/admin/apps/pqr/causales-pqrs/form-causales/form-causales.component';
import { UtilityService } from 'app/resources/services/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-tiempo-agenda',
  templateUrl: './form-tiempo-agenda.component.html',
  styleUrls: ['./form-tiempo-agenda.component.scss']
})
export class FormTiempoAgendaComponent implements OnInit {

  listadoAgenda: any=[]=[];
  listadoUnidad:any[]=[]
  datos: any = {};
  constructor(
    public matDialogRef: MatDialogRef<FormTiempoAgendaComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _utility: UtilityService

  ) { }

  ngOnInit(): void {
    // debugger;
    this.datos = this.data;
    if (this.datos.titulo != 'N') {
      this.datos.tipoIdentificacion = this.datos.tipoIdentificacion == 'CC' ? 'Persona natural' : 'Persona juridica'
    }
    this.consulta();
  }
  consulta() {

    this._utility
      .getFile('/generic/qry/consulta-lista-generica/TIPOS-AGENDA')
      .subscribe((response: any) => {

        if (response) {
          this.listadoAgenda = response.data;
        } else {
          this.listadoAgenda = [];
        }
      });
      this._utility
      .getFile('/generic/qry/consulta-lista-generica/UNIDAD-NEGOCIO')
      .subscribe((response: any) => {

        if (response) {
          this.listadoUnidad = response.data;
        } else {
          this.listadoUnidad = [];
        }
      });

  }


  guardar() {
    let data, url;
    if (this.datos.titulo == 'N') {
      //post
      // idAgenda,unidadNegocio,nombre,tipoIdentificacion

      url = 'agregar-item-de-chequeo';
      data = {
        idAgenda:this.datos.idAgenda,
        unidadNegocio:this.datos.unidadNegocio,
        nombre:this.datos.nombre,
        tipoIdentificacion:this.datos.tipoIdentificacion
      };
    } else {
      url = 'actualizar-item-chequeo';
      data = {
        id: parseInt(this.datos.id),
        nombre: this.datos.nombre,
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
    // this._utility.postQuery(url, data).subscribe((response: any) => {
    //   Swal.close();
    //   if (response) {
    //     if (response.status == 200) {
    //       if (!response.data.respuesta.includes('OK')) {
    //         Swal.fire(
    //             '¡Información!',
    //             `Se guardó el registro con éxito`,
    //             'success'
    //         );
    //         return;
    //       }
    //       Swal.fire(
    //         '¡Información!',
    //         `Se guardó el registro con éxito`,
    //         'success'
    //       ).then((resultado) => {
    //         if (resultado) {
    //           this.matDialogRef.close();
    //         }
    //       });
    //     } else {
    //       Swal.fire(
    //         '¡Información!',
    //         `Se guardó el registro con éxito`,
    //         'success'
    //       );
    //     }
    //   } else {
    //     Swal.fire(
    //         '¡Información!',
    //         `Se89 guardó el registro con éxito`,
    //         'success'
    //     );
    //   }
    // });
    setTimeout(() => {
        Swal.close();
         Swal.fire(
        '¡Información!',
            `Se guardó el registro con éxito`,
            'success'
        );
        setTimeout(() => {
            location.reload()
        }, 5000);
    }, 10000);

}

}


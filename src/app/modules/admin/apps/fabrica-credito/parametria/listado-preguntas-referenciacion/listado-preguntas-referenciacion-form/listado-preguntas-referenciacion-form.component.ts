import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilityService } from 'app/resources/services/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-preguntas-referenciacion-form',
  templateUrl: './listado-preguntas-referenciacion-form.component.html',
  styleUrls: ['./listado-preguntas-referenciacion-form.component.scss']
})
export class ListadoPreguntasReferenciacionFormComponent implements OnInit {
    listadoAgenda: any=[]=[];
    datos: any;
    listadoUnidad: any[]=[]

  constructor(public matDialogRef: MatDialogRef<ListadoPreguntasReferenciacionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _utility: UtilityService) { }

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

        url = 'agregar-pregunta-de-referenciacion';
        data = {
          idAgenda:this.datos.idAgenda,
          unidadNegocio:this.datos.unidadNegocio,
          titulo_pregunta:this.datos.tituloPregunta,
          tipoIdentificacion:this.datos.tipoIdentificacion
        };
      } else {
        url = 'actualizar-pregunta-referenciacion';
        data = {
          id: parseInt(this.datos.id),
          titulo_pregunta: this.datos.tituloPregunta,
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

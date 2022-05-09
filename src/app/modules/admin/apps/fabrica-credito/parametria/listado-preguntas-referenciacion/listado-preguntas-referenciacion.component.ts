import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UtilityService } from 'app/resources/services/utility.service';
import Swal from 'sweetalert2';
import { ListadoPreguntasReferenciacionFormComponent } from './listado-preguntas-referenciacion-form/listado-preguntas-referenciacion-form.component';

@Component({
  selector: 'app-listado-preguntas-referenciacion',
  templateUrl: './listado-preguntas-referenciacion.component.html',
  styleUrls: ['./listado-preguntas-referenciacion.component.scss']
})
export class ListadoPreguntasReferenciacionComponent implements OnInit {


    listado: any = [];
    page: number = 1;
    tamanoTabl: number = 10;
    filtrarTabla: string = '';
    mostrar_form: boolean = true;
    mostrar_colId: boolean = false;
    datos: any = {};

    constructor(
      public dialog: MatDialog,
      private _utility: UtilityService) { }

    ngOnInit(): void {
      this.consulta();
    }
    consulta() {
      Swal.fire({ title: 'Cargando', html: 'Buscando informacion', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
      this._utility
        .getFile('/generic/qry/obtener-listado-preguntas-referenciacion')
        .subscribe((response: any) => {
          Swal.close();
          if (response) {
            this.listado = response.data;
          } else {
            this.listado = [];
          }
        });
    }
    abrirModal(datos, titulo) {
      if (titulo == 'N') {
        this.datos = {
          idTipo: null,
          estado: "",
          tituloPregunta: "",
          titulo: "N"
        }
      } else {
        this.datos=datos
        this.datos.titulo='A'
        this.datos.estado= datos.estado == 'Activo' ? 'A' : 'I'
      }

      const dialogRef = this.dialog.open(ListadoPreguntasReferenciacionFormComponent, {
        // width: '1080px',
        // maxHeight: '550px',
        data: this.datos,
      });

      dialogRef.afterClosed().subscribe((result) => {
        // console.log('The dialog was closed');
        // console.log(result);

        this.consulta();

      });

    }
}

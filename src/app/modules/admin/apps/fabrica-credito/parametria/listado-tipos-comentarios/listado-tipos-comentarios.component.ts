import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UtilityService } from 'app/resources/services/utility.service';
import Swal from 'sweetalert2';
import { ListadoTiposComentariosFormComponent } from './listado-tipos-comentarios-form/listado-tipos-comentarios-form.component';

@Component({
  selector: 'app-listado-tipos-comentarios',
  templateUrl: './listado-tipos-comentarios.component.html',
  styleUrls: ['./listado-tipos-comentarios.component.scss']
})
export class ListadoTiposComentariosComponent implements OnInit {

    listado: any = [];
    page: number = 1;
    tamanoTabl: number = 10;
    filtrarTabla: string = '';
    mostrar_form: boolean = true;
    datos: any = {};
    listadoTiposdeComentario: any=[]=[];

  constructor(
    public dialog: MatDialog,
    private _utility: UtilityService)
  { }

  ngOnInit(): void {
    this.consulta();
  }
  consulta() {
    Swal.fire({ title: 'Cargando', html: 'Buscando informacion', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._utility
      .getFile('/generic/qry/obtener-listado-tipos-comentarios')
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
        estado: "",
        titulo: "N"
      }
    } else {
      this.datos=datos
      this.datos.titulo='A'
      this.datos.estado= datos.estado == 'Activo' ? 'A' : 'I'
    }
    const dialogRef = this.dialog.open(ListadoTiposComentariosFormComponent, {
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



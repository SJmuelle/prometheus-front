import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UtilityService } from 'app/resources/services/utility.service';
import Swal from 'sweetalert2';
import { ListadoTiposComentariosFormComponent } from '../listado-tipos-comentarios/listado-tipos-comentarios-form/listado-tipos-comentarios-form.component';

@Component({
  selector: 'app-tipo-combustible',
  templateUrl: './tipo-combustible.component.html',
  styleUrls: ['./tipo-combustible.component.scss']
})
export class TipoCombustibleComponent implements OnInit {
  listado: any = [];
  page: number = 1;
  tamanoTabl: number = 10;
  filtrarTabla: string = '';
  mostrar_form: boolean = true;
  datos: any = {};
  listadoTiposdeComentario: any = [] = [];

  constructor(
    public dialog: MatDialog,
    private _utility: UtilityService) { }

  ngOnInit(): void {
    this.consulta();
  }
  consulta() {
    Swal.fire({ title: 'Cargando', html: 'Buscando información', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
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
      this.datos = datos
      this.datos.titulo = 'A'
      this.datos.estado = datos.estado == 'Activo' ? 'A' : 'I'
    }
    const dialogRef = this.dialog.open(ListadoTiposComentariosFormComponent, {
      // width: '1080px',
      // maxHeight: '550px',
      data: this.datos,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.consulta();

    });

  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UtilityService } from 'app/resources/services/utility.service';
import Swal from 'sweetalert2';
import { ListadoChequeoFormComponent } from './listado-chequeo-form/listado-chequeo-form.component';

@Component({
  selector: 'app-listado-chequeo',
  templateUrl: './listado-chequeo.component.html',
  styleUrls: ['./listado-chequeo.component.scss']
})
export class ListadoChequeoComponent implements OnInit {


  listado: any = [];
  page: number = 1;
  tamanoTabl: number = 10;
  filtrarTabla: string = '';
  mostrar_form: boolean = true;
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
      .getFile('/generic/qry/obtener-listado-items-chequeos')
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
        nombre: "",
        titulo: "N"
      }
    } else {
      this.datos=datos
      this.datos.titulo='A'
      this.datos.estado= datos.estado == 'Activo' ? 'A' : 'I'
    }

    const dialogRef = this.dialog.open(ListadoChequeoFormComponent, {
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

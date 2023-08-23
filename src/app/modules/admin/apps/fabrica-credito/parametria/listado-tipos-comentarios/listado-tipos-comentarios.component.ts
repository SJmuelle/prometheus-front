import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UtilityService } from 'app/resources/services/utility.service';
import Swal from 'sweetalert2';
import { ListadoTiposComentariosFormComponent } from './listado-tipos-comentarios-form/listado-tipos-comentarios-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-listado-tipos-comentarios',
  templateUrl: './listado-tipos-comentarios.component.html',
  styleUrls: ['./listado-tipos-comentarios.component.scss'],
})
export class ListadoTiposComentariosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listado: any = [];
  page: number = 1;
  tamanoTabl: number = 10;
  filtrarTabla: string = '';
  mostrar_form: boolean = true;
  datos: any = {};
  listadoTiposdeComentario: any = [] = [];

  public dataOptionTable: any[] = [
    {
      name: 'editar',
      text: 'Editar',
      typeField: 'button',
    },
    {
      name: 'id',
      text: 'ID',
      typeField: 'text',
    },
    {
      name: 'visualizacion',
      text: 'Tipo de visibilidad',
      typeField: 'text',
    },
    {
      name: 'descripcion',
      text: 'Descripción',
      typeField: 'text',
    },
    {
      name: 'estado',
      text: 'Estado',
      typeField: 'estado',
    },
  ];

  public dataSource: MatTableDataSource<any>;
  public dataColumn: string[] = [...this.dataOptionTable.map(({ name }) => name),];
  public dataRow: any[] = []
  public whitEspace: boolean = false

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
          this.dataSource = new MatTableDataSource(this.listado)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.listado = [];
        }
      });
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      // console.log(`Sorted ${sortState.direction}ending`);
    } else {
      // console.log('Sorting cleared');
    }
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

  filtrar() {
    this.dataSource.filter = this.filtrarTabla.trim().toUpperCase()
  }
}



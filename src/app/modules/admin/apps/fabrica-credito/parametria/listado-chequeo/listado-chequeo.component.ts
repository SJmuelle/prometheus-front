import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UtilityService } from 'app/resources/services/utility.service';
import Swal from 'sweetalert2';
import { ListadoChequeoFormComponent } from './listado-chequeo-form/listado-chequeo-form.component';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort,Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-listado-chequeo',
  templateUrl: './listado-chequeo.component.html',
  styleUrls: ['./listado-chequeo.component.scss']
})
export class ListadoChequeoComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listado: any = [];
  page: number = 1;
  tamanoTabl: number = 10;
  filtrarTabla: string = '';
  mostrar_form: boolean = true;
  datos: any = {};

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
      name: 'agenda',
      text: 'Agenda',
      typeField: 'text',
    },
    {
      name: 'tipoIdentificacion',
      text: 'Tipo de persona',
      typeField: 'text',
    },
    {
      name: 'unidadNegocio',
      text: 'Unidad negocio',
      typeField: 'text',
    },
    {
      name: 'nombre',
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
      .getFile('/generic/qry/obtener-listado-items-chequeos')
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

      this.consulta();

    });

  }

  filtrar(){
    this.dataSource.filter = this.filtrarTabla.trim().toUpperCase()
  }

}

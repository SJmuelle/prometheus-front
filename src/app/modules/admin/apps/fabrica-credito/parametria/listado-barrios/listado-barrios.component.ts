import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UtilityService } from 'app/resources/services/utility.service';
import Swal from 'sweetalert2';
import { ListadoBarriosFormComponent } from './listado-barrios-form/listado-barrios-form.component';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-listado-barrios',
  templateUrl: './listado-barrios.component.html',
  styleUrls: ['./listado-barrios.component.scss']
})
export class ListadoBarriosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listado: any = [];
  page: number = 1;
  tamanoTabl: number = 10;
  filtrarTabla: string = '';
  mostrar_form: boolean = true;
  datos: any = {};
  listadoDepartamento: any[];
  listadoCiudades: any[];

  public dataOptionTable: any[] = [
    {
      name: 'editar',
      text: 'Editar',
      typeField: 'button',
    },
    {
      name: 'id',
      text: 'Código',
      typeField: 'text',
    },
    {
      name: 'barrio',
      text: 'Nombre del barrio',
      typeField: 'text',
    },
    {
      name: 'tipoIdentificacion',
      text: 'Estado',
      typeField: 'estado',
    },

  ];

  public dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  public dataColumn: string[] = [...this.dataOptionTable.map(({ name }) => name),];
  public dataRow: any[] = []
  public whitEspace: boolean = false

  constructor(
    public dialog: MatDialog,
    private _Service: UtilityService,
    private _utility: UtilityService) { }

  ngOnInit(): void {
    this.consultaDepartamento();

  }

  consultaDepartamento() {
    Swal.fire({
      title: 'Cargando',
      html: 'Buscando información...',
      timer: 500000,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => { });
    this._Service
      .getQuery(`tk/listar-departamentos`, true)
      .subscribe((response: any) => {
        Swal.close();
        if (response) {
          this.listadoDepartamento = response.data;
        } else {
          this.listadoDepartamento = [];
        }
      });
  }

  consultaMunicipio(data) {
    Swal.fire({
      title: 'Cargando',
      html: 'Buscando información...',
      timer: 500000,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => { });
    this._Service
      .getQuery(`listar-ciudades/${data}`, true)
      .subscribe((response: any) => {
        Swal.close();
        if (response) {
          this.listadoCiudades = response.data;
        } else {
          this.listadoCiudades = [];
        }
      });
  }

  listarBarrios(data) {
    Swal.fire({
      title: 'Cargando',
      html: 'Buscando información...',
      timer: 500000,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => { });
    this._Service
      .getQuery(`listar-barrios/${data}`, true)
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
    let envio
    if (titulo == 'N') {
     envio = {
        id:null,
        codigoDepartamento:this.datos.departamento,
        codigoCiudad:this.datos.municipio,
        nombreBarrio: "",
        estado: "",
        titulo: "N"
      }
    } else {
      ;

      envio = {
        id:datos.id,
        codigoDepartamento:this.datos.departamento,
        codigoCiudad:this.datos.municipio,
        nombreBarrio: datos.barrio,
        estado: datos.estado=='Activo'?'':'A',
        titulo: "A"
      }
    }

    const dialogRef = this.dialog.open(ListadoBarriosFormComponent, {
      // width: '1080px',
      // maxHeight: '550px',
      data: envio,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.listarBarrios(this.datos.municipio)

    });

  }

  filtrar(){
    this.dataSource.filter = this.filtrarTabla.trim().toUpperCase()
  }
}

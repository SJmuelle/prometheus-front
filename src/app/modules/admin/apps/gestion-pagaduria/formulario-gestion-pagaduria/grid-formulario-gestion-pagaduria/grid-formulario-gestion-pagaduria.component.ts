import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UtilityService } from 'app/resources/services/utility.service';
import Swal from 'sweetalert2';
import { FormularioGestionPagaduriaComponent } from '../formulario-gestion-pagaduria.component';

@Component({
  selector: 'app-grid-formulario-gestion-pagaduria',
  templateUrl: './grid-formulario-gestion-pagaduria.component.html',
  styleUrls: ['./grid-formulario-gestion-pagaduria.component.scss']
})
export class GridFormularioGestionPagaduriaComponent implements OnInit {

  listado: any = [];
  page: number = 1;
  tamanoTabl: number = 10;
  filtrarTabla: string = '';
  mostrar_form: boolean = true;
  datos: any = {};
  listadoDepartamento: any[];
  listadoCiudades: any[];

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
      debugger;
      
      envio = {
        id:datos.id,
        codigoDepartamento:this.datos.departamento,
        codigoCiudad:this.datos.municipio,
        nombreBarrio: datos.barrio,
        estado: datos.estado=='Activo'?'':'A',
        titulo: "A"
      }
    }

    const dialogRef = this.dialog.open(FormularioGestionPagaduriaComponent, {
      // width: '1080px',
      // maxHeight: '550px',
      data: envio,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed');
      // console.log(result);

      this.listarBarrios(this.datos.municipio)

    });

  }

}


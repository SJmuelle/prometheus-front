import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilityService } from 'app/resources/services/utility.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-barrios-form',
  templateUrl: './listado-barrios-form.component.html',
  styleUrls: ['./listado-barrios-form.component.scss']
})
export class ListadoBarriosFormComponent implements OnInit {
  myControl = new FormControl('');
  listadoDepartamento: any[];
  listadoCiudades: any[];
  datos: any = {};
  barrios: any[];
  filtrarTabla="";
  filteredOptions: Observable<string[]>;
  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public matDialogRef: MatDialogRef<ListadoBarriosFormComponent>,
    private _Service: UtilityService,) {
  }

  ngOnInit(): void {
    console.log(this.data)
    this.consultaDepartamento();

    if (this.data.codigoDepartamento) {
      this.datos.codigoDepartamento = this.data.codigoDepartamento
      this.consultaMunicipio(this.data.codigoDepartamento);
      if (this.data.codigoCiudad) {
        this.datos.codigoCiudad = this.data.codigoCiudad
        this.listarBarrios(this.datos.codigoCiudad)
      }
      if (this.data.nombreBarrio) {
        this.datos.nombreBarrio = this.data.nombreBarrio
      }
    }
    this.datos.estado = this.data.estado
    if(this.data.titulo=="N"){
      this.datos.id = 0
      this.listarBarrios(this.datos.codigoCiudad)
      // this.filteredOptions = this.myControl.valueChanges.pipe(
      //   startWith(''),
      //   map(value => this._filter(value || '')),
      // );
    }else{
      this.datos.id = this.data.id
    }
  

  }

  alv(data){
    this.data.titulo='A';
    this.datos.id = data.id
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
          this.barrios = response.data;
        } else {
          this.barrios = [];
        }
      });
  }





  guardar() {

    let url = '/agregar-barrio';
    let data = {...this.datos};
    delete  data.codigoDepartamento


    Swal.fire({
      title: 'Cargando',
      html: 'Guardando...',
      timer: 500000,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => { });
    this._Service.postQuery(url, data).subscribe((response: any) => {
      Swal.close();
      if (response) {
        if (response.status == 200) {
          if (!response.data.sp_agregar_barrio.includes('OK')) {
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

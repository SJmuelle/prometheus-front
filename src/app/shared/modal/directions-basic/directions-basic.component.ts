import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilityService } from 'app/resources/services/utility.service';
import Swal from 'sweetalert2';
import { DirectionsComponent } from '../directions/directions.component';

@Component({
  selector: 'app-directions-basic',
  templateUrl: './directions-basic.component.html',
  styleUrls: ['./directions-basic.component.scss']
})
export class DirectionsBasicComponent implements OnInit {

  datos: any = {};
  listadoDepartamento: any[];
  listadoCiudades: any[];
  listadoTipoVia: any[];
  listadoBarrio: any;

  constructor(
      public matDialogRef: MatDialogRef<DirectionsComponent>,
      @Inject(MAT_DIALOG_DATA) public data,
      private _Service: UtilityService
  ) {}

  ngOnInit(): void {
      this.datos = this.data;
      this.datos.nada = '#';
      this.consultaTipoVia();
  }


  consultaTipoVia() {
      Swal.fire({
          title: 'Cargando',
          html: 'Buscando información...',
          timer: 500000,
          didOpen: () => {
              Swal.showLoading();
          },
      }).then((result) => {});
      this._Service
          .getQuery(`nomenclarturas`, true)
          .subscribe((response: any) => {
              Swal.close();
              if (response) {
                  this.listadoTipoVia = response.data;
              } else {
                  this.listadoTipoVia = [];
              }
          });
  }

  nombreVia(dato) {
      let index = this.listadoTipoVia.findIndex((data) => data.id == dato);
      let retu;
      if (index != -1) {
          retu = this.listadoTipoVia[index].nombre;
      } else {
          retu = '';
      }
      this.datos.viaNombre = retu;
  }

}

import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilityService } from 'app/resources/services/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-directions',
  templateUrl: './directions.component.html',
  styleUrls: ['./directions.component.scss']
})
export class DirectionsComponent implements OnInit {
  datos: any = {};
  listadoDepartamento: any[];
  listadoCiudades: any[];
  listadoTipoVia: any[];
  listadoBarrio: any;

  constructor(
    public matDialogRef: MatDialogRef<DirectionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private _Service: UtilityService) { }

  ngOnInit(): void {
    this.datos = this.data;
    this.datos.nada='#';
    this.consultaDepartamento()
  }

  consultaDepartamento() {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._Service
      .getQuery(`/tk/listar-departamentos`, true)
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
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._Service
      .getQuery(`/listar-ciudades/${data}`, true)
      .subscribe((response: any) => {
        Swal.close();
        if (response) {
          this.listadoCiudades = response.data;
        } else {
          this.listadoCiudades = [];
        }
      });
  }
  consultaTipoVia(data) {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._Service
      .getQuery(`/nomenclarturas-direcciones/${data}`, true)
      .subscribe((response: any) => {
        Swal.close();
        if (response) {
          this.listadoTipoVia = response.data;
        } else {
          this.listadoTipoVia = [];
        }
      });
      this.nombreMunicipio(data)
      this.listarBarrios(data)
      
  }

  listarBarrios(data) {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._Service
      .getQuery(`/listar-barrios/${data}`, true)
      .subscribe((response: any) => {
        Swal.close();
        if (response) {
          this.listadoBarrio= response.data;
        } else {
          this.listadoBarrio= [];
        }
      });
      this.nombreMunicipio(data)
  }
  nombreDepartamento(dato) {
    let index = this.listadoDepartamento.findIndex(data => data.codigo == dato);
    let retu
    if (index != -1) {
    retu = this.listadoDepartamento[index].nombre;
  
    } else {
      retu = '';
    }
    this.datos.departamentoNombre= retu;
  }
  nombreMunicipio(dato) {
   
    let index = this.listadoCiudades.findIndex(data => data.codigo == dato);
    let retu
    if (index != -1) {
    retu = this.listadoCiudades[index].nombre;
  
    } else {
      retu = '';
    }
    this.datos.municipioNombre= retu;
  }
  nombreVia(dato) {
    let index = this.listadoTipoVia.findIndex(data => data.id == dato);
    let retu
    if (index != -1) {
    retu = this.listadoTipoVia[index].nombre;
  
    } else {
      retu = '';
    }
    this.datos.viaNombre= retu;
  }
  



}

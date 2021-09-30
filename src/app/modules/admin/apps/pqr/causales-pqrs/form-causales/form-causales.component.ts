import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PqrService } from '../../pqr.service';

@Component({
  selector: 'app-form-causales',
  templateUrl: './form-causales.component.html',
  styleUrls: ['./form-causales.component.scss']
})
export class FormCausalesComponent implements OnInit {

  datos: { id:number, tipo: string; tiempo: number; legal: string; estado: string; titulo: string ,clase:string};
  listadoTipo: any;

  constructor(
    public matDialogRef: MatDialogRef<FormCausalesComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private _pqrService: PqrService) { }

  ngOnInit(): void {
    this.datos = this.data
    this.consultaListadoTipo()
  }
  consultaListadoTipo(){
    Swal.fire({ title: 'Cargando', html: 'Buscando información de Tipos de PQRS', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
        this._pqrService
          .setTipo()
          .subscribe((response: any) => {
            Swal.close();
            if (response) {
              this.listadoTipo = response;
            } else {
              this.listadoTipo = [];
            }
          });
  }
  guardar() {
    let data,url;
    if (this.datos.titulo == 'N') {
      //post
      url="/agregar-pqrs-tipo";
      data = {
        "estado": "",
        "descripcion": this.datos.tipo,
        "legal": this.datos.legal=='S'?true:false,
        "diasSolucion": this.datos.tiempo,
        "clase": this.datos.clase,
      }

    } else {
      url="/actualizar-pqrs-tipo";
      data = {
        "id": this.datos.id,
        "estado":this.datos.estado=='A'?'':'A',
        "legal": this.datos.legal=='S'?true:false,
        "diasSolucion":this.datos.tiempo,
      }
    }
    Swal.fire({ title: 'Cargando', html: 'Guardando información de PQRS', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._pqrService
      .Create(url,data)
      .subscribe((response: any) => {
        Swal.close();
        if (response) {
          if(response.status==200){
            Swal.fire(
              '¡Información!',
              `Se guardo el registro con exito`,
              'success'
            );
            setTimeout(() => {
              this.matDialogRef.close();
            }, 1000);
          }else{
            Swal.fire(
              '¡Información!',
              `Hubo un error en los datos enviados, favor evaluar`,
              'success'
            );
          }
        }else{
          Swal.fire(
            '¡Advertencia!',
            'Para este tipo de búsqueda, mínimo es necesario la cédula del cliente',
            'error'
          );
        }
       
      });
  }

}

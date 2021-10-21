import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PqrService } from '../../pqr.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  datos: { id:number, tipo: string; tiempo: any; legal: string; estado: string; titulo: string ,clase:string};

  constructor(
    public matDialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private _pqrService: PqrService) { }

  ngOnInit(): void {
    this.datos = this.data
  }
  guardar() {
    debugger
    let data,url;
    if (this.datos.titulo == 'N') {
      //post
      url="/agregar-pqrs-tipo";
      data = {
        "estado": "",
        "descripcion": this.datos.tipo,
        "legal": this.datos.legal=='S'?true:false,
        "diasSolucion":this.datos.legal=='S'?(this.datos.tiempo==''?0:this.datos.tiempo):0,
        "clase": this.datos.clase,
      }

    } else {
      url="/actualizar-pqrs-tipo";
      data = {
        "id": this.datos.id,
        "estado":this.datos.estado=='A'?'':'A',
        "legal": this.datos.legal=='S'?true:false,
        "diasSolucion":this.datos.legal=='S'?(this.datos.tiempo==''?0:this.datos.tiempo):0,
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
            'Error en la respuesta del servicio, favor intente nuevamente',
            'error'
          );
        }
       
      });
  }

}

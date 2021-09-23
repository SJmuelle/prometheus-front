import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PqrService } from '../../pqr.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  datos: { tipo: string; tiempo: number; legal: string; estado: string; titulo: string };

  constructor(@Inject(MAT_DIALOG_DATA) public data, private _pqrService: PqrService) { }

  ngOnInit(): void {
    this.datos = this.data
  }
  guardar() {
    let data,url;
    if (this.datos.titulo == 'N') {
      //post
      url="/agregar-pqrs-tipo";
      data = {
        "estado": "A",
        "descripcion": this.datos.tipo,
        "legal": this.datos.legal=='S'?true:false,
        "diasSolucion": this.datos.tiempo,
        "clase": "PETICION"
      }

    } else {
      url="/agregar-pqrs-tipo";
      data = {
        "id": 18,
        "estado":this.datos.estado=='A'?'a':'i',
        "legal": this.datos.legal=='S'?true:false,
        "diasSolucion":this.datos.tiempo,
      }
    }
    Swal.fire({ title: 'Cargando', html: 'Guardando información de Tipos de PQRS', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._pqrService
      .Create(url,data)
      .subscribe((response: any) => {
        Swal.close();
        if (response) {
         console.log(response);
        }
      });
  }

}

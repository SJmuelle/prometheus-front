import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PqrService } from '../../pqr.service';


@Component({
  selector: 'app-detalle-historial',
  templateUrl: './detalle-historial.component.html',
  styleUrls: ['./detalle-historial.component.scss']
})
export class DetalleHistorialComponent implements OnInit {

  origen:string ='';
  datos: any =[];

  constructor(public dialogRef: MatDialogRef<DetalleHistorialComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private _pqrService: PqrService
  ) { }

  ngOnInit(): void {
    this.consulta();
  }

  consulta(){
    Swal.fire({ title: 'Cargando', html: 'Buscando de la PQRS', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._pqrService.setHistorialId(this.data).subscribe((response: any) => {
      Swal.close();
      if (response) {
        this.datos = response
      } else {
        // this.datos = '';
      }
    });
  }

}

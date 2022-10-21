import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PqrService } from '../pqr.service';
import { DetalleHistorialComponent } from './detalle-historial/detalle-historial.component';

@Component({
  selector: 'app-historial-pqr',
  templateUrl: './historial-pqr.component.html',
  styleUrls: ['./historial-pqr.component.scss']
})
export class HistorialPqrComponent implements OnInit {
  listado: any=[];
  datos: any=[];
  page:number=1;
  tamanoTabl:number=5;
  filtrarTabla:string='';
  id:number=0;

  constructor(public dialog: MatDialog, private _pqrService: PqrService) { }

  ngOnInit(): void {
    this.consulta()
  }

  consulta(){
    Swal.fire({ title: 'Cargando', html: 'Buscando el historial de PQRS', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._pqrService.setHistorial().subscribe((response: any) => {
      Swal.close();
      if (response) {
        this.listado = response;
      } else {
        this.listado = [];
      }
    });
  }

  abrirDetalle(id){
    const dialogRef = this.dialog.open(DetalleHistorialComponent, {
      width: '60%',
      data: id,
    });
    dialogRef.afterClosed().subscribe((result) => {});
    
  }

}

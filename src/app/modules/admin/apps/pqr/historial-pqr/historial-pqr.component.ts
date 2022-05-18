import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetalleHistorialComponent } from './detalle-historial/detalle-historial.component';

@Component({
  selector: 'app-historial-pqr',
  templateUrl: './historial-pqr.component.html',
  styleUrls: ['./historial-pqr.component.scss']
})
export class HistorialPqrComponent implements OnInit {
  listado: any=[];
  page:number=1;
  tamanoTabl:number=5;
  filtrarTabla:string='';

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  abrirDetalle(){
    const dialogRef = this.dialog.open(DetalleHistorialComponent, {width: '60%'});
    dialogRef.afterClosed().subscribe((result) => {});
  }

}

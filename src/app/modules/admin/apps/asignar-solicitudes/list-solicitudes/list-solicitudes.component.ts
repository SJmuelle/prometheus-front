import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AsignarComponent } from './asignar/asignar.component';
import { ReasignarComponent } from './reasignar/reasignar.component';

@Component({
  selector: 'app-list-solicitudes',
  templateUrl: './list-solicitudes.component.html',
  styleUrls: ['./list-solicitudes.component.scss']
})
export class ListSolicitudesComponent implements OnInit {

  asignados: any[] = []
  angenda: any = {}

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.asignados = [
      this.angenda = {
        "cantidad":1,
        "agenda":"Completacion"
      },
      this.angenda = {
        "cantidad":2,
        "agenda":"Comercial"
      },
      this.angenda = {
        "cantidad":3,
        "agenda":"Cartera"
      },
      this.angenda = {
        "cantidad":4,
        "agenda":"Referenciacion"
      },
      this.angenda = {
        "cantidad":5,
        "agenda":"Decision"
      },
      this.angenda = {
        "cantidad":6,
        "agenda":"Formalizacion"
      },
      this.angenda = {
        "cantidad":7,
        "agenda":"Trazabilidad"
      }
    ]
  }

  asignar() {
    const dialogRef = this.dialog.open(AsignarComponent, {
      width: '20%'
    });
    dialogRef.afterClosed().subscribe(result => {});
  }

  reasignar() {
    const dialogRef = this.dialog.open(ReasignarComponent, {
      width: '20%'
    });
    dialogRef.afterClosed().subscribe(result => {});
  }

}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-credito',
  templateUrl: './credito.component.html',
  styleUrls: ['./credito.component.scss']
})
export class CreditoComponent implements OnInit, AfterViewInit {
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  
  displayedColumns: string[] = ['tipo_cliente', 'tipo_credito', 'agencia', 'unidad', 'negocio', 'fecha_solicitud', 'fecha_aprobacion', 'state', 'subestado',  'valor', 'disponible', 'detalle'];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {}
}

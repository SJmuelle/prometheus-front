import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ModalcreditoComponent } from '../modalcredito/modalcredito.component';

@Component({
  selector: 'app-credito',
  templateUrl: './credito.component.html',
  styleUrls: ['./credito.component.scss']
})
export class CreditoComponent implements OnInit, AfterViewInit {


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  displayedColumns: string[] = [
    'tipo_cliente', 'tipo_credito',
    'agencia',
    'unidad',
    'negocio',
    'fecha_solicitud',
    'fecha_aprobacion', 'state',
    'subestado',
    'valor',
    'disponible',
    'detalle'];

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalcreditoComponent, {
      width: '1080px',
      maxHeight: '550px',
      data: { name: 'this.name', animal: 'this.animal' }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() { }
}

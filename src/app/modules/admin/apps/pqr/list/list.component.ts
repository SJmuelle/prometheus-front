import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PqrService } from '../pqr.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RangoComponent } from './rango/rango.component';
import { isObject } from 'lodash';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  listado: any=[];
  page:number=1;
  tamanoTabl:number=5;
  filtrarTabla:string='';
  mostrar_form:boolean=true;
  rangoFecha: any;
  maxRegistros: number = 0;
  filRegistros: number = 0;

  constructor(private router: Router, private _pqrService: PqrService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.consulta();
  }

  exportAsXLSX():void {
    this._pqrService.exportAsExcelFile(this.listado, 'listado');
  }

  consulta(){
    Swal.fire({ title: 'Cargando', html: 'Buscando información de PQRS', timer: 500000, allowOutsideClick:false, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._pqrService.getListados('listar-pqrs-gestion').subscribe((response: any) => {
      Swal.close();
      if (response) {
        this.listado = response;
        this.maxRegistros = this.listado.length;
        this.filRegistros = this.listado.length;
      } else {
        this.listado = [];
      }
    });
  }

  filtrarPQRS(data){
    Swal.fire({ title: 'Cargando', html: 'Buscando información de PQRS', timer: 500000, allowOutsideClick:false, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._pqrService.postFiltro('/credito/tk/property/busqueda-historial-pqrs', data).subscribe((response:any)=>{
      Swal.close();
      if (response) {
        this.listado = response.data.historicoPqrs;
        this.filRegistros = this.listado.length;
      } else {
        this.listado = [];
      }
    })
  }

  gestion(x){
    let url=`pqr/gestion/${x}`;
    this.router.navigateByUrl(url);
  }

  filtrarFecha(){
    const dialogRef = this.dialog.open(RangoComponent, {
      width: '35%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (isObject(result)) {
        this.filtrarPQRS(result) 
      }
    });
  }

}

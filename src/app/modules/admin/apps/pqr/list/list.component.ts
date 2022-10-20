import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PqrService } from '../pqr.service';

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


  constructor(
   private router: Router,
    private _pqrService: PqrService) { }

  ngOnInit(): void {
    this.consulta();
  }

  exportAsXLSX():void {
    this._pqrService.exportAsExcelFile(this.listado, 'listado');
  }

  consulta(){

    Swal.fire({ title: 'Cargando', html: 'Buscando información de PQRS', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
        this._pqrService
          .getListados('listar-pqrs-gestion')
          .subscribe((response: any) => {
            Swal.close();
            if (response) {
              this.listado = response;
            } else {
              this.listado = [];
            }
          });
  }
  gestion(x){
    let url=`pqr/gestion/${x}`;
    this.router.navigateByUrl(url);
  }

}

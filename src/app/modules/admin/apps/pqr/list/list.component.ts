import { Component, OnInit } from '@angular/core';
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
    private _pqrService: PqrService) { }

  ngOnInit(): void {
    this.consulta();
  }
  consulta(){

    Swal.fire({ title: 'Cargando', html: 'Buscando Informacion de PQRS', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
        this._pqrService
          .getListados('/listar-pqrs-gestion')
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

  }

}

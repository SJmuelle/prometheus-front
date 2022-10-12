import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'app/resources/services/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grid-enlaces',
  templateUrl: './grid-enlaces.component.html',
  styleUrls: ['./grid-enlaces.component.scss']
})
export class GridEnlacesComponent implements OnInit {
  listado: any[];

  constructor( private _utility: UtilityService) { }

  ngOnInit(): void {
    this.consulta()
  }
  consulta() {
    Swal.fire({ title: 'Cargando', html: 'Buscando información', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._utility
      .getFile('/generic/qry/tk/listado-unidad-negocio-referidos')
      .subscribe((response: any) => {
        Swal.close();
        if (response) {
          this.listado = response.data;
        } else {
          this.listado = [];
        }
      });
  }
  nuevaPages(url){
    window.open(url, '_blank');
  }
}

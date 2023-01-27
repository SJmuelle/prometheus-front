import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PqrService } from '../../pqr.service';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.scss']
})
export class ListUsuarioComponent implements OnInit {

  constructor(private _pqrService: PqrService) { }
  listado: any = [];
  filtrarTabla: string = '';
  ngOnInit(): void {

  }
  buscarUsuario() {
    if(this.filtrarTabla.length>3){
      let url = `cargar-usuarios/${this.filtrarTabla}`;
      Swal.fire({ title: 'Cargando', html: 'Buscando información de PQRS', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
      this._pqrService
        .getListados(url)
        .subscribe((data: any) => {
          Swal.close();
          this.listado = data
        });
    }

  }
}

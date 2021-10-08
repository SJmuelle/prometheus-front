import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PqrService } from '../pqr.service';
import { FormResponsablesComponent } from './form-responsables/form-responsables.component';

@Component({
  selector: 'app-responsables-pqrs',
  templateUrl: './responsables-pqrs.component.html',
  styleUrls: ['./responsables-pqrs.component.scss']
})
export class ResponsablesPQRSComponent implements OnInit {

  listado: any = [];
  page: number = 1;
  tamanoTabl: number = 5;
  filtrarTabla: string = '';
  mostrar_form: boolean = true;
  datos: { responsable: string; escalado: string; estado: string; cerrarPqrs: boolean; titulo: string; };
  // datos: { responsable: string; escalado: string; estado: string; cerrarPqrs: boolean; };


  constructor(
    public dialog: MatDialog,
    private _pqrService: PqrService) { }

  ngOnInit(): void {
    this.consulta();
  }
  consulta() {
    Swal.fire({ title: 'Cargando', html: 'Buscando información responsables de PQRS', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._pqrService
      .setResponsables()
      .subscribe((response: any) => {
        Swal.close();
        if (response) {
          this.listado = response;
        } else {
          this.listado = [];
        }
      });
  }
  abrirModal(datos, titulo) {
    if (titulo == 'N') {
      this.datos = {
        responsable: "",
        escalado: "",
        estado: "",
        cerrarPqrs: false,
        titulo:'N'
      }
    } else {
      this.datos = {
        responsable: "1043843706",
        escalado: "22586672",
        estado: "",
        cerrarPqrs: false,
        titulo:'A'
      }
    }

    const dialogRef = this.dialog.open(FormResponsablesComponent, {
      // width: '1080px',
      // maxHeight: '550px',
      data: this.datos,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      this.consulta();
    });

  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PqrService } from '../pqr.service';
import Swal from 'sweetalert2';
import { FormMotivosComponent } from './form/form.component';

@Component({
  selector: 'app-motivos-pqr',
  templateUrl: './motivos-pqr.component.html',
  styleUrls: ['./motivos-pqr.component.scss']
})
export class MotivosPqrComponent implements OnInit {
  listado: any = [];
  page: number = 1;
  tamanoTabl: number = 5;
  filtrarTabla: string = '';
  mostrar_form: boolean = true;
  datos: {
    id: number,
    motivo: string,
    aplica_subm: any,
    submotivo1: string,
    submotivo2: string,
    submotivo3: string,
    estado: string,
    details: [],
    titulo: string
  };

  constructor(
    public dialog: MatDialog,
    private _pqrService: PqrService
  ) { }

  ngOnInit(): void {
    this.consulta();
  }

  consulta() {
    Swal.fire({ title: 'Cargando', html: 'Buscando información de Motivos de PQRS', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._pqrService
      .setMotivos()
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
        id: null,
        motivo: '',
        aplica_subm: '',
        submotivo1: '',
        submotivo2: '',
        submotivo3: '',
        estado: 'A',
        details: [],
        titulo: titulo,
      }
    } else if (titulo == 'A') {
      this.datos = {
        id: datos.id,
        motivo: datos.motivo,
        aplica_subm: datos.aplica_subm ? "S" : "N",
        submotivo1: datos.submotivo1,
        submotivo2: datos.submotivo2,
        submotivo3: datos.submotivo3,
        estado: datos.estado == '' ? 'A' : 'I',
        details: datos.details,
        titulo: titulo,
      }
    } else {
      this.datos = {
        id: datos.id,
        motivo: datos.motivo,
        aplica_subm: datos.aplica_subm ? "S" : "N",
        submotivo1: datos.submotivo1,
        submotivo2: datos.submotivo2,
        submotivo3: datos.submotivo3,
        estado: datos.estado == '' ? 'A' : 'I',
        details: datos.details,
        titulo: titulo,
      }
    }

    const dialogRef = this.dialog.open(FormMotivosComponent, {
      data: this.datos,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.consulta();
    });
  }

}

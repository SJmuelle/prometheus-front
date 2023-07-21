import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UtilityService } from 'app/resources/services/utility.service';
import Swal from 'sweetalert2';
import { ListadoPreguntasReferenciacionFormComponent } from '../listado-preguntas-referenciacion/listado-preguntas-referenciacion-form/listado-preguntas-referenciacion-form.component';
import { FormTiempoAgendaComponent } from './form-tiempo-agenda/form-tiempo-agenda.component';

@Component({
  selector: 'app-tiempo-agenda',
  templateUrl: './tiempo-agenda.component.html',
  styleUrls: ['./tiempo-agenda.component.scss']
})
export class TiempoAgendaComponent implements OnInit {

 
  listado: any = [];
  page: number = 1;
  tamanoTabl: number = 10;
  filtrarTabla: string = '';
  mostrar_form: boolean = true;
  datos: any = {};

  constructor(
    public dialog: MatDialog,
    private _utility: UtilityService) { }

  ngOnInit(): void {
    this.consulta();
  }
  consulta() {
  let data=null;
    Swal.fire({ title: 'Cargando', html: 'Buscando información', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._utility
      .postQueryServer1('/generic/select-parametria-semaforo', data)
      .subscribe((response: any) => {
        Swal.close();
        if (response) {
          this.listado = response.data;
        } else {
          this.listado = [];
        }
      });
  }
  abrirModal(datos, titulo) {
    if (titulo == 'N') {
      this.datos = {
        idTipo: null,
        estado: "",
        tituloPregunta: "",
        titulo: "N"
      } }else if (titulo == 'NH') {
          this.datos = {
            titulo: "NH",
            id: datos.id,
            datos:datos
          }
    } else {
      this.datos=datos
      this.datos.titulo='A'
      this.datos.estado= datos.estado == 'Activo' ? 'A' : 'I'
    }

    const dialogRef = this.dialog.open(FormTiempoAgendaComponent, {
      // width: '1080px',
      // maxHeight: '550px',
      data: this.datos,
    });

    dialogRef.afterClosed().subscribe((result) => {

      this.consulta();

    });

  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PqrService } from '../../pqr.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormMotivosComponent implements OnInit {
  datos: {
    id: number,
    motivo: string,
    aplica_subm: any,
    submotivo1: string,
    submotivo2: string,
    submotivo3: string,
    estado: string,
    details: [],
    titulo: string,
    clase: string
  };
  causales: any[];
  constructor(
    public matDialogRef: MatDialogRef<FormMotivosComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private _pqrService: PqrService) { }

  ngOnInit(): void {
    this.datos = this.data;
    this.getCausales();
    if (this.datos.id) {
      this.getCausalesMotivos();
    }
  }

  getCausales() {
    this._pqrService
      .setCausalesMotivos()
      .subscribe((response: any) => {
        Swal.close();
        if (response) {
          this.causales = response;
        } else {
          this.causales = [];
        }
      });
  }

  getCausalesMotivos() {
    this._pqrService
      .setCausalesMotivosId(this.datos.id)
      .subscribe((response: any) => {
        Swal.close();
        this.datos.details = response.map((value) => value.id_causal);
      });
  }

  cargarNombre(id: number) {
    if (this.causales != undefined) {
      let causal = this.causales.filter(causal => causal.id === id);
      return causal[0].causalPqrs;
    }
  }

  guardar() {
    let data, url;

    if (this.datos.motivo === '') {
      Swal.fire(
        '¡Información!',
        'El nombre es obligatorio.',
        'error'
      );
      return;
    }

    if (this.datos.aplica_subm === 'S' && this.datos.submotivo1 === '') {
      Swal.fire(
        '¡Información!',
        'El submotivo1 es obligatorio.',
        'error'
      );
      return;
    }

    if (!this.datos.details.length) {
      Swal.fire(
        '¡Información!',
        'Se requiere asociar una causal al motivo.',
        'error'
      );
      return;
    }

    if (this.datos.titulo == 'N') {
      //post
      url = "/insertar-pqrs-motivo";
      data = {
        "motivo": this.datos.motivo,
        "submotivo": this.datos.aplica_subm == 'S' ? true : false,
        "submotivo1": this.datos.submotivo1,
        "submotivo2": this.datos.submotivo2,
        "submotivo3": this.datos.submotivo3,
        "estado": this.datos.estado == 'A' ? '' : 'A',
        "details": this.datos.details.map(value => ({ "id_causal": value }))
      }

    } else {
      url = "/actualizar-pqrs-motivo";
      data = {
        "id": this.datos.id,
        "motivo": this.datos.motivo,
        "submotivo": this.datos.aplica_subm == 'S' ? true : false,
        "submotivo1": this.datos.submotivo1,
        "submotivo2": this.datos.submotivo2,
        "submotivo3": this.datos.submotivo3,
        "estado": this.datos.estado == 'A' ? '' : 'A',
        "details": this.datos.details.map(value => ({ "id_causal": value }))
      }
    }

    Swal.fire({ title: 'Cargando', html: 'Guardando información de PQRS', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._pqrService
      .Create(url, data)
      .subscribe((response: any) => {
        Swal.close();
        if (response) {
          if (response.status == 200) {
            if (!response.data.respuesta.includes('OK')) {
              Swal.fire(
                '¡Información!',
                response.data.respuesta,
                'error'
              );
              return;
            }
            Swal.fire(
              'Información',
              `Se guardó el registro con éxito`,
              'success'
            ).then(resultado => {
              if (resultado) {
                this.matDialogRef.close();
              }
            });
          } else {
            Swal.fire(
              'Información',
              `Hubo un error en los datos enviados, favor evaluar`,
              'success'
            );
          }
        } else {
          Swal.fire(
            'Advertencia',
            'Error en la respuesta del servicio, favor intente nuevamente',
            'error'
          );
        }

      });
  }
}

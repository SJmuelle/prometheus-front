import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { GridListadoGestionPlazosComponent } from './grid-listado-gestion-plazos/grid-listado-gestion-plazos.component';
import { GestionPagaduriaService } from 'app/core/services/gestion-pagaduria.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-listado-gestion-plazos',
  templateUrl: './listado-gestion-plazos.component.html',
  styleUrls: ['./listado-gestion-plazos.component.scss']
})
export class ListadoGestionPlazosComponent implements OnInit {

  listadoTipo: any;
  data: any = {};
  tiposContrato = [{ value: 'I', viewValue: 'Contrato Indefinido' }, { value: 'F', viewValue: 'Contrato Fijo' }, { value: 'O', viewValue: 'Contrato Obra labor' }];
  dialog: any;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,

    public matDialogRef: MatDialogRef<ListadoGestionPlazosComponent>,
    private _gestionPagaduriaService: GestionPagaduriaService,
    @Inject(MAT_DIALOG_DATA) public dato,

  ) {
    this.data = { idPlazo: null, ...this.dato };
  }

  ngOnInit(): void {
    // debugger;
    this.data = this.dato
    if (this.data == null) {
      this.form = this.fb.group({
        tipoContrato: [''],
        antiguedadMaxima: [''],
        antiguedadMinima: [''],
        plazoMaximo: [''],
        plazoMinimo: ['']
      });
    } else {
      this.form = this.fb.group({
        tipoContrato: [this.dato.tipoContrato],
        antiguedadMaxima: [this.dato.antiguedadMaxima],
        antiguedadMinima: [this.dato.antiguedadMinima],
        plazoMaximo: [this.dato.plazoMaximo],
        plazoMinimo: [this.dato.plazoMinimo]
      });
    }


  }

  guardar() {
    console.log("mostrar", this.form.getRawValue());
    // var id = JSON.parse(localStorage.getItem("id"));
    Swal.fire({
      title: 'Cargando',
      html: 'Guardando configuracion de pagadurias',
      timer: 500000,
      didOpen: () => {
        // Swal.showLoading();
      },
    }).then((result) => {
      if (this.data == null) {
        let data = {
          tipoContrato: this.form.getRawValue().tipoContrato,
          antiguedadMinima: this.form.getRawValue().antiguedadMinima,
          antiguedadMaxima: this.form.getRawValue().antiguedadMaxima,
          plazoMinimo: this.form.getRawValue().plazoMinimo,
          plazoMaximo: this.form.getRawValue().plazoMaximo,
          // idPlazo: this.data.idPlazo

        }
        console.log(this.data)

        this._gestionPagaduriaService.postGuardar(data).subscribe(rep => {
          console.log(rep)
        })

      } else {

        let data = {
          tipoContrato: this.form.getRawValue().tipoContrato,
          antiguedadMinima: this.form.getRawValue().antiguedadMinima,
          antiguedadMaxima: this.form.getRawValue().antiguedadMaxima,
          plazoMinimo: this.form.getRawValue().plazoMinimo,
          plazoMaximo: this.form.getRawValue().plazoMaximo,
          idPlazo: this.data.idPlazo

        }

        console.log(this.data);
        this._gestionPagaduriaService.postEditar(data).subscribe(rep => {
          console.log(rep)
        })


      }

    });

  }


}




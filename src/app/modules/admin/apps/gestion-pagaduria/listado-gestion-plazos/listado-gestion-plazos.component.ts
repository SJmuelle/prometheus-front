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
  tiposContrato = [  {value: 'I', viewValue: 'Contrato Indefinido'},  {value: 'F', viewValue: 'Contrato Fijo'},  {value: 'O', viewValue: 'Contrato Obra labor'}];

    dialog: any;
    form: FormGroup;
  constructor(
    private fb: FormBuilder,
      public matDialogRef: MatDialogRef<ListadoGestionPlazosComponent  >,
      private _gestionPagaduriaService: GestionPagaduriaService,
      @Inject(MAT_DIALOG_DATA) public dato,
      
  ) {}

  ngOnInit(): void {
    debugger;
    this.data=this.dato
    if (this.data == null) {
      this.form = this.fb.group({
        tipoContrato: [''],
        antiguedadMaxima: [''],
        antiguedadMinima: [''],
        plazoMaximo: [''],
        plazoMinimo: [''],
        usuarioCreacion: ['']
      });
    } else {
      this.form = this.fb.group({
        tipoContrato: [this.dato.tipoContrato],
        antiguedadMaxima: [this.dato.antiguedadMaxima],
        antiguedadMinima: [this.dato.antiguedadMinima],
        plazoMaximo: [this.dato.plazoMaximo],
        plazoMinimo: [this.dato.plazoMinimo],
        usuarioCreacion: [this.dato.usuarioCreacion]
      });
    }
    
    this.consultaListadoTipo();
  }
  
  consultaListadoTipo() {
      Swal.fire({
          title: 'Cargando',
          html: 'Buscando información de las pagadurias',
          timer: 500000,
          didOpen: () => {
             Swal.showLoading();
          },
      }).then((result) => {});
    //   this._gestionPagaduriaService.
          
  }
  guardar() {
    console.log("mostrar", this.form.getRawValue());

      let data, url;

      Swal.fire({
          title: 'Cargando',
          html: 'Guardando configuracion de pagadurias',
          timer: 500000,
          didOpen: () => {
              // Swal.showLoading();
          },
      }).then((result) => {});
       this._gestionPagaduriaService.postGuardar(this.form.getRawValue()).subscribe(rep =>{
        console.log(rep)
       })
    //       Swal.close();
    //       if (response) {
    //           if (response.status == 200) {
    //               if (!response.data.respuesta.includes('OK')) {
    //                   Swal.fire(
    //                       'Información',
    //                       response.data.respuesta,
    //                       'error'
    //                   );
    //                   return;
    //               }
    //               Swal.fire(
    //                   '¡Información!',
    //                   `Se guardó el registro con éxito`,
    //                   'success'
    //               ).then((resultado) => {
    //                   if (resultado) {
    //                       this.matDialogRef.close();
    //                   }
    //               });
    //           } else {
    //               Swal.fire(
    //                   '¡Información!',
    //                   `Hubo un error en los datos enviados, favor evaluar`,
    //                   'success'
    //               );
    //           }
    //       } else {
    //           Swal.fire(
    //               '¡Advertencia!',
    //               'Para este tipo de búsqueda, mínimo es necesario la cédula del cliente',
    //               'error'
    //           );
    //       }
    //   });
  }
}


  

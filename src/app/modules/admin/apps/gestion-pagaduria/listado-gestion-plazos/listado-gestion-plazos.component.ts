import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { GridListadoGestionPlazosComponent } from './grid-listado-gestion-plazos/grid-listado-gestion-plazos.component';

@Component({
  selector: 'app-listado-gestion-plazos',
  templateUrl: './listado-gestion-plazos.component.html',
  styleUrls: ['./listado-gestion-plazos.component.scss']
})
export class ListadoGestionPlazosComponent implements OnInit {

  listadoTipo: any;
  data: any = {};
  private _gestionPagaduriaService: any;
    dialog: any;
  constructor(
      public matDialogRef: MatDialogRef<ListadoGestionPlazosComponent  >,
      @Inject(MAT_DIALOG_DATA) public dato,
      
  ) {}

  ngOnInit(): void {
      this.data = this.data;
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
      this._gestionPagaduriaService
          .getListados(`/generic/qry/cre-lib-pagadurias`)
          .subscribe((response: any) => {
              Swal.close();
              if (response) {
                  this.listadoTipo = response;
              } else {
                  this.listadoTipo = [];
              }
          });
  }
  guardar() {
      let data, url;
      if (this.data.tipoContrato == 'N') {
          //post
          url = '/generic/cre-lib-guardar-plazo';
          data = {
              idTipo: parseInt(this.data.tipoContrato),
              estado: '',
              
          };
     
      }
      Swal.fire({
          title: 'Cargando',
          html: 'Guardando configuracion de pagadurias',
          timer: 500000,
          didOpen: () => {
              // Swal.showLoading();
          },
      }).then((result) => {});
      this._gestionPagaduriaService.getContactos(url, data).subscribe((response: any) => {
          Swal.close();
          if (response) {
              if (response.status == 200) {
                  if (!response.data.respuesta.includes('OK')) {
                      Swal.fire(
                          'Información',
                          response.data.respuesta,
                          'error'
                      );
                      return;
                  }
                  Swal.fire(
                      '¡Información!',
                      `Se guardó el registro con éxito`,
                      'success'
                  ).then((resultado) => {
                      if (resultado) {
                          this.matDialogRef.close();
                      }
                  });
              } else {
                  Swal.fire(
                      '¡Información!',
                      `Hubo un error en los datos enviados, favor evaluar`,
                      'success'
                  );
              }
          } else {
              Swal.fire(
                  '¡Advertencia!',
                  'Para este tipo de búsqueda, mínimo es necesario la cédula del cliente',
                  'error'
              );
          }
      });
  }
}


  

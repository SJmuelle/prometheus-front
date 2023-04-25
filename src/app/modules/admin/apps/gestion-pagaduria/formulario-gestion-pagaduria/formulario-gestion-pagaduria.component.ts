import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, } from '@angular/material/dialog';
import { UtilityService } from 'app/resources/services/utility.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { GridFormularioGestionPagaduriaComponent } from './grid-formulario-gestion-pagaduria/grid-formulario-gestion-pagaduria.component';
import { GestionPagaduriaService } from 'app/core/services/gestion-pagaduria.service';

@Component({
  selector: 'app-formulario-gestion-pagaduria',
  templateUrl: './formulario-gestion-pagaduria.component.html',
  styleUrls: ['./formulario-gestion-pagaduria.component.scss']
})
export class FormularioGestionPagaduriaComponent implements OnInit {

  listadoTipo: any;
  data: any = {};
  tiposContrato = [  {value: 'I', viewValue: 'Contrato Indefinido'},  {value: 'F', viewValue: 'Contrato Fijo'},  {value: 'O', viewValue: 'Contrato Obra labor'}];

    dialog: any;
    form: FormGroup;
    dato: any;
 constructor(
    private fb: FormBuilder,
      public matDialogRef: MatDialogRef<FormularioGestionPagaduriaComponent >,
      private _gestionPagaduriaService: GestionPagaduriaService,
    
      
  ) {}

  ngOnInit(): void {
 
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
      var usuarioCreacion= JSON.parse(localStorage.getItem ("usuarioCreacion")); 
      console.log(usuarioCreacion);
       this._gestionPagaduriaService.postGuardar(this.form.getRawValue()).subscribe(rep =>{
        console.log(rep)
       })
   
  }
}


import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog,} from '@angular/material/dialog';
import { UtilityService } from 'app/resources/services/utility.service';
import Swal from 'sweetalert2';
import { FormularioGestionPagaduriaComponent } from '../formulario-gestion-pagaduria.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { GestionPagaduriaService } from 'app/core/services/gestion-pagaduria.service';

@Component({
  selector: 'app-grid-formulario-gestion-pagaduria',
  templateUrl: './grid-formulario-gestion-pagaduria.component.html',
  styleUrls: ['./grid-formulario-gestion-pagaduria.component.scss']
})
export class GridFormularioGestionPagaduriaComponent implements OnInit {

  listado: any = [];
  page: number = 1;
  tamanoTabl: number = 8;
  filtrarTabla: string = '';
  mostrar_form: boolean = true;
  datos: any = {};
  router: any;
  form: FormGroup;
  private _gestionPagaduriaService: any;


  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dato,
    public dialog: MatDialog,
    private _GestionPagaduriaService: GestionPagaduriaService,
  ) { }

  ngOnInit(): void {
    this.consulta();
  }
  consulta() {
    // Swal.fire({ title: 'Cargando', html: 'Buscando información de las pagadurias', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    var usuario= JSON.parse(localStorage.getItem ("usuario")); 
    console.log(usuario);
    this._GestionPagaduriaService.getPlazos(usuario.user).subscribe((response: any) => {
        Swal.close();
        // debugger
        console.log(response)
        if (response) {
          this.listado = response.data;
        } else {
          this.listado = [];
        }
      });


  }
  abrirModal(dato, titulo) {
 
        const dialogRef = this.dialog.open(FormularioGestionPagaduriaComponent, {
      data:dato,
    });

    dialogRef.afterClosed().subscribe((result) => {
        this.consulta();
    });
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
}
}


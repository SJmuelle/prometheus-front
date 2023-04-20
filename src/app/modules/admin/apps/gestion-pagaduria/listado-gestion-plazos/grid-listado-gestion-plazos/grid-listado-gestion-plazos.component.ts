import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { GestionPagaduriaService } from 'app/core/services/gestion-pagaduria.service';
import { ListadoGestionPlazosComponent } from '../listado-gestion-plazos.component';

@Component({
  selector: 'app-grid-listado-gestion-plazos',
  templateUrl: './grid-listado-gestion-plazos.component.html',
  styleUrls: ['./grid-listado-gestion-plazos.component.scss']
})
export class GridListadoGestionPlazosComponent implements OnInit {


  listado: any = [];
  page: number = 1;
  tamanoTabl: number = 8;
  filtrarTabla: string = '';
  mostrar_form: boolean = true;
  datos: any = {};
  router: any;

  constructor(
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
  abrirModal(datos, titulo) {
    console.log("modal");
    

    const dialogRef = this.dialog.open(ListadoGestionPlazosComponent, {
      data: datos,
    });

    dialogRef.afterClosed().subscribe((result) => {
        this.consulta();
    });
  }

}



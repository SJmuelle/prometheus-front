import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PqrService } from '../../pqr.service';

@Component({
  selector: 'app-ver-comentario',
  templateUrl: './ver-comentario.component.html',
  styleUrls: ['./ver-comentario.component.scss']
})
export class VerComentarioComponent implements OnInit {

  descripcion: string = '';

  constructor(
    private _pqrService: PqrService,
    public dialogRef: MatDialogRef<VerComentarioComponent>, 
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    console.log(this.data)
    this.buscarDescripcion();
  }

  buscarDescripcion(){
    let url = `/select_comentario_seguimiento_id/${this.data}`;
    this._pqrService.getListados(url).subscribe((response: any) => {
      if (response) {
          this.descripcion = response[0].descripcion;
          console.log('Aqui estoy: ', this.descripcion)
      } else {
          this.descripcion = '';
      }
  });
  }

}

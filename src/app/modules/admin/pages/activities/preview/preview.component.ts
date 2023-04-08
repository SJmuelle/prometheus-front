import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  constructor(private dialog: MatDialogRef<PreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  public oncCerrarDialog(): void {
    this.dialog.close();
  }

  downloadFile(){

    Swal.fire({ title: 'Cargando', html: 'Descarga en proceso...', timer: 500000, didOpen: () => { 
    Swal.showLoading() }, }).then((result) => { });   

    const archivo = this.data.base64.split(',')[1];
    const extension = this.data.extension

    const link = document.createElement('a');
    document.body.appendChild(link);
    link.href = `data:application/${extension};base64,${archivo}`;
    link.target = '_self';
    link.download = this.data.nombre;
    link.click();
    Swal.close();
  }

  ngAfterViewInit(): void {

  }

}

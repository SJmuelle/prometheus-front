import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-infofile',
  templateUrl: './infofile.component.html',
  styleUrls: ['./infofile.component.scss']
})
export class InfofileComponent implements OnInit {

  constructor(private dialog: MatDialogRef<InfofileComponent>,
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
    const extension = this.data.type

    console.log(extension);
    console.log(archivo);
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.href = `data:application/${extension};base64,${archivo}`;
    link.target = '_self';
    link.download = this.data.name;
    link.click();
    Swal.close();
  }

  ngAfterViewInit(): void {

  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-insertar-adjuntos',
  templateUrl: './insertar-adjuntos.component.html',
  styleUrls: ['./insertar-adjuntos.component.scss']
})
export class InsertarAdjuntosComponent implements OnInit {
  evidencia: { file: any; filename: string; ext: string; nombre: string; descripcion: string; };

  constructor(  public matDialogRef: MatDialogRef<InsertarAdjuntosComponent>) { }

  ngOnInit(): void {
    this.evidencia={
      file:null,
      filename:'',
      ext:'',
      nombre:'',
      descripcion:'',
    }
  }

  public onCharge(input: HTMLInputElement, ind): void {
    // this.showButtonSave = false;
    // this.showButtonRecord = true;
    // this.nameFile = 'masivo.cvs';

    const files = input.files;
    console.log(files);
    if (files && files.length) {
      const fileToRead = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(fileToRead);
      reader.onloadend = () => {
        const file: string | ArrayBuffer = reader.result;
        this.evidencia.file = file;
        this.evidencia.filename = fileToRead.name;
        let nombre = this.evidencia.filename.split('.');
        this.evidencia.ext = nombre[1];
        this.evidencia.nombre = nombre[0];
        console.log(this.evidencia.file);

      };
    }
  }

}

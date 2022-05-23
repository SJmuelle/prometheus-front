import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PqrService } from '../../pqr.service';

@Component({
  selector: 'app-adjuntos',
  templateUrl: './adjuntos.component.html',
  styleUrls: ['./adjuntos.component.scss']
})
export class AdjuntosComponent implements OnInit {

  evidencia: {
    file: any;
    filename: string;
    ext: string;
    nombre: string;
    descripcion: string;
    peso: number;
  };

  constructor(private _pqrService: PqrService, public matDialogRef: MatDialogRef<AdjuntosComponent>, 
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    console.log(this.data.id)
    this.evidencia = {
      file: null,
      filename: '',
      ext: '',
      nombre: '',
      descripcion: '',
      peso: 0,
    };
  }

  guardar(){
    let url = '/file/cargar-archivo-pqrs';

    

    let data = {
      idComentario: 0,
      fuente: 'registro-pqrs',
      identificador: 'pqrs' + this.data.id,
      file:this.evidencia
    };
    console.log(data)
    // this._pqrService.postFile(url, this.evidencia).subscribe((response: any) => {
    //   if (response) {
    //     // console.log(response)
    //   }
    // });
  }

  onCharge(input: HTMLInputElement, ind): void {
    const files = input.files;
    if (files && files.length) {
      const fileToRead = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(fileToRead);
      reader.onloadend = () => {
        const file: string | ArrayBuffer = reader.result;
        this.evidencia.file = file;
        this.evidencia.filename = fileToRead.name;
        let nombre = this.evidencia.filename.split('.');
        this.evidencia.ext = nombre[1].toLowerCase();
        this.evidencia.nombre = nombre[0];
        this.evidencia.peso = fileToRead.size / 1024;
        
        if (this.evidencia.peso <= 10000) {
            if (this.evidencia.ext == 'pdf' || 
            this.evidencia.ext == 'jpg' || 
            this.evidencia.ext == 'png' || 
            this.evidencia.ext == 'docx' || 
            this.evidencia.ext == 'xlsx') {
              return;
            }
            console.log(this.evidencia)
        }

        Swal.fire(
          'Información',
          `Verificar las condiciones antes de subir un archivo.`,
          'error'
        );
        this.evidencia.file = '';
        this.evidencia.filename = '';

        this.evidencia.ext = '';
        this.evidencia.nombre = '';
      };
    }
  }

}

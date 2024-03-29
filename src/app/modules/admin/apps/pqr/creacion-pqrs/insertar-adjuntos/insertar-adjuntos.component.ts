import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-insertar-adjuntos',
    templateUrl: './insertar-adjuntos.component.html',
    styleUrls: ['./insertar-adjuntos.component.scss'],
})
export class InsertarAdjuntosComponent implements OnInit {
    evidencia: {
        file: any;
        filename: string;
        ext: string;
        nombre: string;
        descripcion: string;
        peso: number;
    };

    constructor(public matDialogRef: MatDialogRef<InsertarAdjuntosComponent>) {}

    ngOnInit(): void {
        this.evidencia = {
            file: null,
            filename: '',
            ext: '',
            nombre: '',
            descripcion: '',
            peso: 0,
        };
    }

    public onCharge(input: HTMLInputElement, ind): void {
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
                    if (
                        this.evidencia.ext == 'pdf' ||
                        this.evidencia.ext == 'jpg' ||
                        this.evidencia.ext == 'png' ||
                        this.evidencia.ext == 'docx' ||
                        this.evidencia.ext == 'xlsx'
                    ) {
                        return;
                    }
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PqrService } from '../../pqr/pqr.service';

@Component({
  selector: 'app-certificaciones',
  templateUrl: './certificaciones.component.html',
  styleUrls: ['./certificaciones.component.scss']
})
export class CertificacionesComponent implements OnInit {
  public mostrar: boolean = false;
  form: FormGroup;
  listado: any[];

  constructor(private fb: FormBuilder, private _pqrService: PqrService,) {
    this.form = this.fb.group({
      typeDocumento: ['', [Validators.required]],
      documento: ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
  }

  filtrarDatos() {
    this.mostrar = true;
    Swal.fire({
      title: 'Cargando',
      html: 'Buscando información de crédito',
      timer: 500000,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => { });

    this.listado = [];
    let url = `obtener-no-vinculo-comercial/${this.form.value.typeDocumento}/${this.form.value.documento}`;
    this._pqrService.getListados(url).subscribe((resp) => {
      Swal.close();
      this.listado = resp;
    });
  }

  generarCertificado() {
    let url = `/generar-certificado-info`;
    let data = {
      "negocio": '',
      "cedula": this.form.value.documento,
      "tipoCertificado":9,
      "tipoCliente": 1,
      "titulo": 1,
      "fecha":'',
      "valor":0
    }
    this._pqrService.generarCertificados(url, data).subscribe((resp) => {
      const downloadLink = document.createElement('a');
      document.body.appendChild(downloadLink);
      downloadLink.href = 'data:application/pdf;base64,' + resp.data.base64;
      downloadLink.target = '_self';
      downloadLink.download = 'Certificado no vinculo comercial.pdf';
      downloadLink.click();
    });
  }
}

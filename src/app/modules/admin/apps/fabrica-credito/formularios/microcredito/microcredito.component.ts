import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormularioCreditoService } from 'app/core/services/formulario-credito.service';
@Component({
  selector: 'app-microcredito',
  templateUrl: './microcredito.component.html',
  styleUrls: ['./microcredito.component.scss']
})
export class MicrocreditoComponent implements OnInit {
  form: FormGroup;
  dataInicial;
  constructor(
    private fb: FormBuilder,
    private _formularioCreditoService: FormularioCreditoService,
  ) { }

  ngOnInit(): void {
    this.cargueInicial();

    this.form = this.fb.group({
      tipoDocumento: ['', [Validators.required]],
      identificacion: ['', [Validators.required, Validators.pattern('^[0-9]{5,10}$')]],
      primerNombre: ['', [Validators.required, Validators.pattern('^[a-zA-zÀ-úA-Z \u00f1\u00d1]+$')]],
      primerApellido: ['', [Validators.required, Validators.pattern('^[a-zA-zÀ-úA-Z \u00f1\u00d1]+$')]],
      fechaNacimiento: ['', [Validators.required]],
      nivelEstudio: ['', [Validators.required]],
      estrato: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      tipoActividad: ['', [Validators.required]],
      camaraComercio: ['', [Validators.required]],
      tipoLocal: ['', [Validators.required]],
      actividadEconomica: ['', [Validators.required]],
      actividadEspecifica: ['', [Validators.required]],
      antiguedadActividad: ['', [Validators.required]],
      antiguedadNegocio: ['', [Validators.required]],
      departamentoNegocio: ['', [Validators.required]],
      ciudadNegocio: ['', [Validators.required]],
      barrioNegocio: ['', [Validators.required]],
      valorCredito: ['', [Validators.required]],
      plazoCredito: ['', [Validators.required]],
      codigoAsesor: ['', [Validators.required]],
      autorizacionCentrales: ['', [Validators.required]],
      terminosCondiciones: ['', [Validators.required]],
      clausulaVeracidad: ['', [Validators.required]],
      unidadNegocio: ['', [Validators.required]],
      tipoTercero: ['', [Validators.required]],
    });
  }

  private cargueInicial() {
    let data = {
      entidad: "CONFIG-MICRO",
      unidadNegocio: 1
    };
    this._formularioCreditoService.cargueInicial(data).subscribe((resp: any) => {
      if (resp) {
        console.log('resp', resp);

        this.dataInicial = resp.data
      }
    })
  }
  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    let data = this.form.value;
    this._formularioCreditoService.postDatos(data).subscribe((resp: Response) => {
      if (resp) {

      }
    })

  }


}

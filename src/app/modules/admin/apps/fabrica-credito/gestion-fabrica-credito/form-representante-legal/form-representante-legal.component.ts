import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FabricaCreditoService} from "../../../../../../core/services/fabrica-credito.service";

@Component({
  selector: 'app-form-representante-legal',
  templateUrl: './form-representante-legal.component.html',
  styleUrls: ['./form-representante-legal.component.scss']
})
export class FormRepresentanteLegalComponent implements OnInit {
  public form: FormGroup;
  constructor(
      private fb: FormBuilder,
      private fabricaCreditoService: FabricaCreditoService,
  ) { }

  ngOnInit(): void {
      this.createFormulario();
      this.listenObservable();
  }

  private listenObservable(): void {
      this.fabricaCreditoService.seleccionDatos.subscribe(({data, show}) => {
          if (show) {
            console.log(data);
            this.form.patchValue(data);
          }
      });
  }

  private createFormulario(): void {
      this.form = this.fb.group({
          tipo:                              [''],
          tipoDocumento:                     [''],
          identificacion:                    [''],
          nombreCompleto:                    [''],
          primerNombre:                      [''],
          segundoNombre:                     [''],
          primerApellido:                    [''],
          segundoApellido:                   [''],
          telefono:                          [''],
          celular:                           [''],
          email:                             [''],
          genero:                            [''],
          descripcionGenero:                 [''],
          nacionalidad:                      [''],
          fechaMatricula:                    [''],

      });
  }

}

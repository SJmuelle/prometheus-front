import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FabricaCreditoService} from '../../../../../../core/services/fabrica-credito.service';
import {Observable} from "rxjs";
import {DepartamentosCiudadesService} from "../../../../../../core/services/departamentos-ciudades.service";
import {MatSelectChange} from "@angular/material/select";
import {ActivatedRoute} from "@angular/router";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-form-representante-legal',
  templateUrl: './form-representante-legal.component.html',
  styleUrls: ['./form-representante-legal.component.scss']
})
export class FormRepresentanteLegalComponent implements OnInit {
  public form: FormGroup;
  public departamentos$: Observable<any>;
  public ciudades$: Observable<any>;
  public barrios$: Observable<any>;
  constructor(
      private fb: FormBuilder,
      private fabricaCreditoService: FabricaCreditoService,
      private departamentosCiudadesService: DepartamentosCiudadesService,
      private route: ActivatedRoute,
  ) {
      const numeroSolicitud: string =  this.route.snapshot.paramMap.get('num');
      console.log(numeroSolicitud);
      if (numeroSolicitud) {
          this.fabricaCreditoService.getDatosTitularFabrica(numeroSolicitud).pipe(
              take(1)
          )
          .subscribe(console.log);
      }
  }

  ngOnInit(): void {
      this.createFormulario();
      this.listenObservable();
      this.getDepartamentos();
  }

  public onPostDatos(): void {

  }

  public seleccionDepartamento(event: MatSelectChange): void {
      const codigo: string = event.value;
      this.getCiudades(codigo);
  }
    /**
     * @description: Selecciona el codigo para cargar el api barrios
     *
     */
  public seleccionCiudad(event: MatSelectChange): void {
      const codigo: string = event.value;
      this.getBarrios(codigo);
  }

  private listenObservable(): void {
      this.fabricaCreditoService.seleccionDatos.subscribe(({data, show}) => {
          if (show) {
            console.log(data);
            this.form.patchValue(data);
              if (data.codigoDepartamento) {
                  this.getCiudades(data.codigoDepartamento);
              }
              if (data.codigoCiudad) {
                  this.getBarrios(data.codigoCiudad);
              }
          }
      });
  }

  private createFormulario(): void {
      this.form = this.fb.group({
          id:                           undefined,
          tipo:                          [''],
          tipoDocumento:                 [''],
          identificacion:                [''],
          nombreCompleto:                [''],
          fechaMatricula:                [''],
          primerNombre:                  [''],
          segundoNombre:                 [''],
          primerApellido:                [''],
          segundoApellido:               [''],
          celular:                       [''],
          email:                         [''],
          genero:                        [''],
          nacionalidad:                  [''],
          fechaNacimiento:               [''],
          codigoDepartamentoNacimiento:  [''],
          codigoCiudadNacimiento:        [''],
          tipoVivienda:                  [''],
          codigoDepartamento:            [''],
          codigoCiudad:                  [''],
          codigoBarrio:                  [''],
          direccionResidencial:          [''],
          nivelEstudio:                  [''],
          viveEnNegocio:                 [''],
      });
  }

    /**
     * @description: Obtiene el listado de departamento
     */
    private getDepartamentos(): void {
        this.departamentos$ = this.departamentosCiudadesService.getDepartamentos();
    }
    /**
     * @description: Obtiene el listado de ciudades
     */
    private getCiudades(codigo: string): void {
        this.ciudades$ = this.departamentosCiudadesService.getCiudades(codigo);
    }
    /**
     * @description: Obtiene el listado de barrios
     */
    private getBarrios(codigo: string): void {
        this.barrios$ = this.departamentosCiudadesService.getBarrios(codigo);
    }

}

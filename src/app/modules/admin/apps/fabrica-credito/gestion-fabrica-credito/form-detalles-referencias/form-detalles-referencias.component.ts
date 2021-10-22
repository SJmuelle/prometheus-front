import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ReferenciasService} from "../../../../../../core/services/referencias.service";
import {GenericasService} from "../../../../../../core/services/genericas.service";
import {Observable} from "rxjs";
import {DepartamentosCiudadesService} from "../../../../../../core/services/departamentos-ciudades.service";
import {MatSelectChange} from "@angular/material/select";
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-detalles-referencias',
  templateUrl: './form-detalles-referencias.component.html',
  styleUrls: ['./form-detalles-referencias.component.scss']
})
export class FormDetallesReferenciasComponent implements OnInit {
  public form: FormGroup;
  public datosReferencia: any = this.referenciasService.seleccionDatosReferencia.getValue();
  public estadoReferencia$: Observable<any>;
  public departamentos$: Observable<any>;
  public ciudades$: Observable<any>;
  constructor(
      private fb: FormBuilder,
      private referenciasService: ReferenciasService,
      private genericaService: GenericasService,
      private departamentosCiudadService: DepartamentosCiudadesService
  ) { }

  ngOnInit(): void {
      this.crearFormulario();
      this.getDetalleReferencia();
      this.getEstadosReferencias();
      this.getDepartamentos();
  }

  private crearFormulario(): void {
      this.form = this.fb.group({
          idReferencias:             [''],
          primerNombre:              [''],
          segundoNombre:             [''],
          primerApellido:            [''],
          segundoApellido:           [''],
          nombreCompleto:            [''],
          telefono:                  [''],
          celular:                   [''],
          codigoDepartamento:        [''],
          descripcionDepartamento:   [''],
          codigoCiudad:              [''],
          descripcionCiudad:         [''],
          descripcionTipoReferencia: [''],
          estado:                    [''],
          descripcionEstado:         [''],
          antiguedad:                [''],
          tipo:                      ['']
      });
  }

  public seleccionDepartamento(event: MatSelectChange): void {
      const codigo: string = event.value;
      this.getCiudades(codigo);
  }

  private getEstadosReferencias(): void {
      this.estadoReferencia$ = this.genericaService.getEstadoReferencias();
  }
  /**
   * @description:
   */
  private getDepartamentos(): void {
      this.departamentos$ = this.departamentosCiudadService.getDepartamentos();
  }
  /**
   * @description
   */
  private getCiudades(codigo: string): void {
      this.ciudades$ = this.departamentosCiudadService.getCiudades(codigo);
  }
  /**
   * @description:
   */
  private getDetalleReferencia(): void {
      Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
      const {numeroSolicitud, idReferencias, identificacion} = this.datosReferencia.value;
      const datos: any = {
          numeroSolicitud: numeroSolicitud,
          idReferencias: idReferencias,
          identificacion: identificacion
      };
      this.referenciasService.getDetalleReferencia(datos).subscribe(({data}) => {
          Swal.close();
          console.log(data);
          this.form.patchValue(data);
      });
  }

}

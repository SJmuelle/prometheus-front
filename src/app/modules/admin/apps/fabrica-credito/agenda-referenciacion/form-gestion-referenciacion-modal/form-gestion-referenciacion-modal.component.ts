import {Component, Inject, OnInit} from '@angular/core';
import {ReferenciacionClienteService} from "../../../../../../core/services/referenciacion-cliente.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-form-gestion-referenciacion-modal',
  templateUrl: './form-gestion-referenciacion-modal.component.html',
  styleUrls: ['./form-gestion-referenciacion-modal.component.scss']
})
export class FormGestionReferenciacionModalComponent implements OnInit {
  public form: FormGroup;
  constructor(
      private referenciacionCliente: ReferenciacionClienteService,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private fb: FormBuilder
  ) { }

  ngOnInit(): void {
      const numeroSolicitud: string = this.data.numeroSolicitud;
      this.getReferencia(numeroSolicitud);
      this.crearFormulario();
  }

  private getReferencia(numeroSolicitud: string): void {
      this.referenciacionCliente.getReferenciaCliente(numeroSolicitud).subscribe((res) => {
          if (res.data){
              this.form.patchValue(res.data);
          }
      });

  }
  /**
   * @description: Crea el formulario
   */
  private crearFormulario(): void {
      this.form = this.fb.group({
          tipoDocumento: [''],
          identificacion: [''],
          primerNombre: [''],
          segundoNombre: [''],
          primerApellido: [''],
          segundoApellido: [''],
          nombreCompleto: [''],
          telefono: [''],
          celular: [''],
          email: [''],
          codigoDepartamento: [''],
          departamento: [''],
          codigoCiudad: [''],
          ciudad: [''],
          codigoBarrio: [''],
          barrio: [''],
          direccionResidencial: [''],
          codigoDepartamentoNegocio: [''],
          departamentoNegocio: [''],
          codigoCiudadNegocio: [''],
          ciudadNegocio: [''],
          codigoBarrioNegocio: [''],
          barrioNegocio: [''],
          direccionNegocio: [''],
          telefonoNegocio: [''],
          camaraComercio: [''],
          camaraComercioRespuesta: [''],
          nitNegocio: [''],
          activos: [''],
          ventasMensuales: ['']
      });
  }

}

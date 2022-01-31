import {Component, Inject, OnInit} from '@angular/core';
import {ReferenciacionClienteService} from "../../../../../../core/services/referenciacion-cliente.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DirectionsComponent} from "../../../../../../shared/modal/directions/directions.component";
import {UtilityService} from "../../../../../../resources/services/utility.service";
import Swal from "sweetalert2";
import {FormDialogReprogramarComponent} from "../form-dialog-reprogramar/form-dialog-reprogramar.component";

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
      private fb: FormBuilder,
      private _matDialog: MatDialog,
      private _matDialogRef: MatDialogRef<FormGestionReferenciacionModalComponent>,
      public utility: UtilityService,
  ) { }

  ngOnInit(): void {
      const numeroSolicitud: string = this.data.numeroSolicitud;
      this.getReferencia(numeroSolicitud);
      this.crearFormulario();
  }

  public onCerrar(): void {
      this._matDialogRef.close();
  }

  public onReferenciar(): void {
      const data: any = {
          numeroSolicitud: this.data.numeroSolicitud
      };
      Swal.fire({
          title: 'Guardar información',
          text: '¿Está seguro de guardar información?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#a3a0a0',
          confirmButtonText: 'Guardar',
          cancelButtonText: 'Cancelar'
      }).then((result) => {
          if (result.isConfirmed) {
              this.postReferenciar(data);
          }
      });
  }

  public onReprogramar(): void {
      const dialogRef = this._matDialog.open(FormDialogReprogramarComponent, {
          width: '30%',
          data: {
              numeroSolicitud: this.data.numeroSolicitud
          }
      });

      dialogRef.afterClosed().subscribe((res) => {
          console.log('CERRAR');
      });

  }

  public openModalDirection(): void {
      const dialoRef = this._matDialog.open(DirectionsComponent, {
         width: '60%',
         data: {
             departamento: '',
             municipio: '',
             barrio: '',
             direccion: '',
         },
         disableClose: false
      });

      dialoRef.afterClosed().subscribe((res) => {
          const dataModal: any = res;
          console.log(dataModal);
          if (dataModal.departamento != undefined) {
              this.form.controls.codigoDepartamento.setValue(dataModal.departamento);
              this.form.controls.departamento.setValue(dataModal.departamentoNombre);
              this.form.controls.codigoCiudad.setValue(dataModal.municipio);
              this.form.controls.ciudad.setValue(dataModal.municipioNombre);
              this.form.controls.codigoBarrio.setValue(Number(dataModal.codigoBarrio));
              this.form.controls.barrio.setValue(dataModal.barrio);
              this.form.controls.direccionResidencial.setValue(
                  (dataModal.viaNombre == undefined
                      ? ''
                      : `${dataModal.viaNombre}`) +
                  (dataModal.callePrincipal == undefined
                      ? ''
                      : ` ${dataModal.callePrincipal}`) +
                  (dataModal.numero == undefined
                      ? ''
                      : ` # ${dataModal.numero}`) +
                  (dataModal.numero2 == undefined
                      ? ''
                      : ` - ${dataModal.numero2}`) +
                  (dataModal.complemento == undefined
                      ? ''
                      : ` ${dataModal.complemento}`));
          }
      });
  }
  public openModalDirectionNegocio(): void {
      const dialoRef = this._matDialog.open(DirectionsComponent, {
         width: '60%',
         data: {
             departamento: '',
             municipio: '',
             barrio: '',
             direccion: '',
         },
         disableClose: false
      });

      dialoRef.afterClosed().subscribe((res) => {
          const dataModal: any = res;
          console.log(dataModal);
          if (dataModal.departamento != undefined) {
              this.form.controls.codigoDepartamentoNegocio.setValue(dataModal.departamento);
              this.form.controls.departamentoNegocio.setValue(dataModal.departamentoNombre);
              this.form.controls.codigoCiudadNegocio.setValue(dataModal.municipio);
              this.form.controls.ciudadNegocio.setValue(dataModal.municipioNombre);
              this.form.controls.codigoBarrioNegocio.setValue(Number(dataModal.codigoBarrio));
              this.form.controls.barrioNegocio.setValue(dataModal.barrio);
              this.form.controls.direccionNegocio.setValue(
                  (dataModal.viaNombre == undefined
                      ? ''
                      : `${dataModal.viaNombre}`) +
                  (dataModal.callePrincipal == undefined
                      ? ''
                      : ` ${dataModal.callePrincipal}`) +
                  (dataModal.numero == undefined
                      ? ''
                      : ` # ${dataModal.numero}`) +
                  (dataModal.numero2 == undefined
                      ? ''
                      : ` - ${dataModal.numero2}`) +
                  (dataModal.complemento == undefined
                      ? ''
                      : ` ${dataModal.complemento}`));
          }
      });
  }

  private getReferencia(numeroSolicitud: string): void {
      this.referenciacionCliente.getReferenciaCliente(numeroSolicitud).subscribe((res) => {
          if (res.data){
              this.form.patchValue(res.data);
              this.data.ver = true;
              this.data.tipoDocumento = res.data.tipoDocumento;
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

  private postReferenciar(data: any): void {
      this.referenciacionCliente.postReferenciacion(data).subscribe((res) => {
          console.log(res);
      });
  }

}

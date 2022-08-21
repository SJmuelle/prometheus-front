import {Component, Inject, OnInit} from '@angular/core';
import {ReferenciacionClienteService} from '../../../../../../core/services/referenciacion-cliente.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DirectionsComponent} from '../../../../../../shared/modal/directions/directions.component';
import {UtilityService} from '../../../../../../resources/services/utility.service';
import Swal from 'sweetalert2';
import {FormDialogReprogramarComponent} from '../form-dialog-reprogramar/form-dialog-reprogramar.component';
import {AgendaReferenciacionService} from '../../../../../../core/services/agenda-referenciacion.service';
import {combineLatest} from 'rxjs';
import {
    FormDialogComentarioReferenciaComponent
} from '../form-dialog-comentario-referencia/form-dialog-comentario-referencia.component';
import { FormDialogDecisionComponent } from '../../gestion-fabrica-credito/form-dialog-decision/form-dialog-decision.component';


@Component({
  selector: 'app-form-gestion-referenciacion-modal',
  templateUrl: './form-gestion-referenciacion-modal.component.html',
  styleUrls: ['./form-gestion-referenciacion-modal.component.scss']
})
export class FormGestionReferenciacionModalComponent implements OnInit {
  public form: FormGroup;
    mostrarDecision: boolean=false;
  constructor(
      private referenciacionCliente: ReferenciacionClienteService,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private fb: FormBuilder,
      private _matDialog: MatDialog,
      private _matDialogRef: MatDialogRef<FormGestionReferenciacionModalComponent>,
      public utility: UtilityService,
      private agendaReferenciaService: AgendaReferenciacionService,
  ) { }

  ngOnInit(): void {
      const numeroSolicitud: string = this.data.numeroSolicitud;
      this.getReferencia(numeroSolicitud);
      this.crearFormulario();
  }

  public onCerrar(): void {
      this._matDialogRef.close(true);
  }

  public onGuardar(): void {
      const data: any = this.form.getRawValue();
      const datosCliente: any = {
          tipoIdentificacion: data.tipoDocumento,
          numeroSolicitud: this.data.numeroSolicitud,
          identificacion: data.identificacion,
          celular: data.celular,
          telefono: data.telefono,
          email: data.email,
          departamento: data.codigoDepartamento,
          ciudad: data.codigoCiudad,
          barrio: data.codigoBarrio,
          direccion: data.direccionResidencial,
          activos: data.activos,
          ventasMensuales: data.ventasMensuales
      };
      const datosNegocio: any = {
          numeroSolicitud: this.data.numeroSolicitud,
          identificacion: data.identificacion,
          departamento: data.codigoDepartamentoNegocio,
          ciudad: data.codigoCiudadNegocio,
          barrio: data.codigoBarrioNegocio,
          direccion: data.direccionNegocio,
          telefono: data.telefonoNegocio,
          nitNegocio: data.nitNegocio,
          activos: data.activos,
          ventasMensuales: data.ventasMensuales
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
              combineLatest([
                  this.referenciacionCliente.putCliente(datosCliente),
                  this.referenciacionCliente.putNegocio(datosNegocio)
              ]).subscribe((res) => {
                  if (res) {
                      Swal.fire(
                          'Completado',
                          'Información guardada con éxito',
                          'success'
                      );
                      this.onCerrar();
                  }
              });
          }
      });
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
  /**
   * @description: Guarda la reprogramacion
   */
  public onReprogramar(): void {
      const dialogRef = this._matDialog.open(FormDialogReprogramarComponent, {
          width: '30%',
          data: {
              numeroSolicitud: this.data.numeroSolicitud
          },
          disableClose: true
      });

      dialogRef.afterClosed().subscribe((res) => {
          if (res) {
              console.log(res);
              this.agendaReferenciaService.refrescarListado$.next({estado: true});
              this.onCerrar();
          }{
            
            this.onCerrar();
          }
      });
  }
  /**
   * @description: Guarda el comentario
   */
  public onComentarios(): void {
      const dialogRef = this._matDialog.open(FormDialogComentarioReferenciaComponent, {
          width: '30%',
          data: {
              numeroSolicitud: this.data.numeroSolicitud
          },
          disableClose: true
      });

      dialogRef.afterClosed().subscribe((res) => {
          if (res) {
              this.agendaReferenciaService.refrescarListado$.next({estado: true});
              this.onCerrar();
          }
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
          // console.log(dataModal);
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
          telefono: ['', [Validators.pattern(/^[0-9]*$/), Validators.minLength(7), Validators.maxLength(11)]],
          celular: ['',  [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(7), Validators.maxLength(11)]],
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
          telefonoNegocio: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(7), Validators.maxLength(11)]],
          camaraComercio: [''],
          camaraComercioRespuesta: [''],
          nitNegocio: [''],
          activos: [''],
          ventasMensuales: ['']
      });
  }
  private postReferenciar(data: any): void {
      this.referenciacionCliente.postReferenciacion(data).subscribe((res) => {
          if (res) {
              if(res.data.respuesta=='OK'){
                  this.mostrarDecision=true;
                Swal.fire(
                    'Mensaje',
                    `Solicitud lista para decisión`,
                    'warning'
                );
              }else{
                Swal.fire(
                    'Mensaje',
                    `${res.data.respuesta}`,
                    'warning'
                );
              }
             
          }
      });
  }

  cambioEstado(){
    const dialogRef = this._matDialog.open(FormDialogDecisionComponent, {
        minWidth: '30%',
        minHeight: '30%',
        data: { 
            numeroSolicitud: this.data.numeroSolicitud, 
            etapa: 2, 
            idAgenda:'RE',   
          },
        disableClose: false,
    });
    dialogRef.afterClosed().toPromise().then(() => {
        
    });
  }
  decision(){
    const dialogRef = this._matDialog.open(FormDialogDecisionComponent, {
        minWidth: '30%',
        minHeight: '30%',
        // data: {numeroSolicitud:this.data.numeroSolicitud, etapa:6},
        data: { 
            numeroSolicitud: this.data.numeroSolicitud, 
            etapa: 6, 
            idAgenda:'RE',   
          },
        disableClose: false,
    });
    dialogRef.afterClosed().toPromise().then(() => {
        
    }); 
  }
}

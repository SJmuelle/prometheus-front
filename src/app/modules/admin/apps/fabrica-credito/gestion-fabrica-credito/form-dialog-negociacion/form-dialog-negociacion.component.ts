import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComentariosService } from 'app/core/services/comentarios.service';
import { ListadoCarteraService } from 'app/core/services/listadoCartera.service';
import { UtilityService } from 'app/resources/services/utility.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormDialogComentariosComponent } from '../form-dialog-comentarios/form-dialog-comentarios.component';

@Component({
  selector: 'app-form-dialog-negociacion',
  templateUrl: './form-dialog-negociacion.component.html',
  styleUrls: ['./form-dialog-negociacion.component.scss']
})
export class FormDialogNegociacionComponent implements OnInit {

  public form: FormGroup;
  public unsubscribe$: Subject<any> = new Subject<any>();
  listadoTipo: any;
  constructor(
    private fb: FormBuilder,
    private _dialog: MatDialogRef<FormDialogComentariosComponent>,
    private _listadoCarteraService: ListadoCarteraService,
    public utility: UtilityService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private comentariosService: ComentariosService,
    
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.crearFormulario();
    this.form.controls.numeroSolicitud.setValue(Number(this.data.numeroSolicitud));
    this.form.controls.identificacion.setValue(this.data.identificacion);
    this.form.controls.idRegistro.setValue(this.data.item.id);
    this.form.controls.resultadoNegociacion.setValue(this.data.evento);
    this.form.controls.valorAComprarNoEditable.setValue(this.utility.formatearNumero(this.data.item.saldoActual)) 

  }
  /**
   * @description: Cierra el dialogo
   */
  public onCerrar(): void {
    this._dialog.close();
  }

  public onGuardar(): void {
    if (this.form.valid) {
      const data: any = this.form.getRawValue();
      const valorAComprar = Number(this.utility.enviarNumero((this.form.value.valorAComprar)));
      const valorDescuento = Number(this.utility.enviarNumero((this.form.value.valorDescuento)));
      const valorConsultores = Number(this.utility.enviarNumero((this.form.value.valorConsultores)));

      console.log(data);
      delete data.valorAComprar;
      delete data.valorDescuento;
      delete data.valorConsultores;
      delete data.valorAComprarNoEditable;
      const datosFormularios: any = {
        valorAComprar:valorAComprar,
        valorDescuento:valorDescuento,
        valorConsultores:valorConsultores,
        ...data
      }
      console.log(datosFormularios);
      let mensaje = '¿Esta seguro de guardar el resultado de la negociación?';
      Swal.fire({
        title: 'Guardar información',
        text: mensaje,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#a3a0a0',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.postGuardado(datosFormularios);
        }
      });
    } else {
      this.form.markAllAsTouched();
    }

  }

  private crearFormulario(): void {
    if (this.data.evento == 'NO EXITOSA') {
      this.form = this.fb.group({
        numeroSolicitud: [''],
        identificacion: [''],
        idRegistro: [''],
        resultadoNegociacion: [''],
        valorAComprar: [''],
        valorDescuento: [''],
        valorConsultores: [''],
        nombreNegociador: ['', [Validators.required]],
        celularNegociador: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(11)]],
        fechaLimitePago: ['0099-01-01'],
        valorAComprarNoEditable:[''],
        comentarioNegociacion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(800)]],
      });
    } else {
      this.form = this.fb.group({
        numeroSolicitud: [''],
        identificacion: [''],
        idRegistro: [''],
        resultadoNegociacion: [''],
        valorAComprarNoEditable:[''],
        valorAComprar: ['', [Validators.required]],
        valorDescuento: ['', [Validators.required]],
        valorConsultores: ['', [Validators.required]],
        nombreNegociador: ['', [Validators.required]],
        celularNegociador: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(11)]],
        fechaLimitePago: ['', [Validators.required]],
        comentarioNegociacion: [''],
      });
    }

  }

  private postGuardado(data: any): void {
    Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    this._listadoCarteraService.gestionCartera(data).pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {

        Swal.fire('Completado', 'Se guardo con exito el resultado de la negociacion', 'success').then((resultado) => {
          if (resultado) {
            this.onCerrar();
            Swal.close();
          }
        });
        ;
        setTimeout(() => {
          this.onCerrar();
          Swal.close();
        }, 1000);
      });
  }

  get requeridoComentario(): any {
    return (this.form.controls.comentarioNegociacion.dirty || this.form.controls.comentarioNegociacion.touched);
  }
  get minimoComentario(): any {
    return (this.form.controls.comentarioNegociacion.errors?.minlength);
  }



  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

}

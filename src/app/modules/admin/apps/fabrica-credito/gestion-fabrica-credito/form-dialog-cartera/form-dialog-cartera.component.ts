import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComentariosService } from 'app/core/services/comentarios.service';
import { GenericasService } from 'app/core/services/genericas.service';
import { ListadoCarteraService } from 'app/core/services/listadoCartera.service';
import { UtilityService } from 'app/resources/services/utility.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormDialogComentariosComponent } from '../form-dialog-comentarios/form-dialog-comentarios.component';

@Component({
  selector: 'app-form-dialog-cartera',
  templateUrl: './form-dialog-cartera.component.html',
  styleUrls: ['./form-dialog-cartera.component.scss']
})
export class FormDialogCarteraComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public unsubscribe$: Subject<any> = new Subject<any>();
  listadoTipo: any;
  tipo: string;
  
  public entidadBancaria$: Observable<any>;
  public tipoCuentaBancaria$: Observable<any>;
  constructor(
    private fb: FormBuilder,
    private _dialog: MatDialogRef<FormDialogComentariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private genericaServices: GenericasService,
    private _listadoCarteraService: ListadoCarteraService,
    public utility: UtilityService,

  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.getEntidadBancaria();
    this.getTipoCuentaBancaria();
    this.form.controls.numeroSolicitud.setValue(Number(this.data.numeroSolicitud));
    this.form.controls.identificacion.setValue(this.data.identificacion.toString());
    this.form.controls.estadoCuenta.setValue( this.data.tipo=='D'?'DEUDA':'AL DIA');
    this.tipo = this.data.tipo;
  }

  /**
   * @description: Cierra el dialogo
   */
  public onCerrar(): void {
    this._dialog.close();
  }


  /**
   * @description: Obtiene los tipos de estados civiles
   */
  private getTipoCuentaBancaria(): void {
    this.tipoCuentaBancaria$ = this.genericaServices.getTipoCuentaBancaria();
  }

  /**
* @description: Obtiene los tipos de estados civiles
*/
  private getEntidadBancaria(): void {
    this.entidadBancaria$ = this.genericaServices.getEntidadBancaria();
  }
  public onGuardar(): void {
    if (this.form.valid) {
      // const data: any = this.form.getRawValue();
      const datos: any = this.form.getRawValue();
      const {  saldoActual,...data } = datos;
      const saldoActualFormato = this.utility.enviarNumero(this.form.value.saldoActual);
      const saldoMoraFormato = this.utility.enviarNumero(this.form.value.saldoMora);
      delete data.saldoActual;
      delete data.saldoMora;
      const datosFormularios: any = {
        saldoActual:saldoActualFormato,
        saldoMora:saldoMoraFormato,
        ...data
      }
      console.log(data);
      let mensaje = data.tipoComentario == 'D' ? '¿Desea agregar una nueva obligaciones al dia?' : '¿Desea agregar una nueva obligaciones de mora?';
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
          this.guardadoCambio(datosFormularios);
        }
        // setTimeout(() => {
        //   this.onCerrar();
        // }, 1000);
      });
    } else {
      this.form.markAllAsTouched();
    }

  }

  public guardadoCambio(data) {
    Swal.fire({
      title: 'Cargando',
      html: 'Guardando información',
      timer: 500000,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => { });
    this._listadoCarteraService
      .createCartera(data)
      .subscribe((res) => {
        Swal.close();
        if (res.data.respuesta == 'OK') {
          this.onCerrar();
        } else {
          Swal.fire('Error', res.data.resultado, 'error');
        }
      });

  }

  private crearFormulario(): void {
    this.form = this.fb.group({
      numeroSolicitud:[''],
      identificacion:[''],
      entidad:[''],
      sector:[''],
      tipoCuenta:[''],
      numeroCuenta:[''],
      estadoCuenta:[''],
      maximaMora:[''],
      saldoActual:[''],
      saldoMora:[''],
      agregadaManualmente:true,
    });
  }


  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

}

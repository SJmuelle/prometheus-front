import {Component, Inject, OnDestroy, OnInit,} from '@angular/core';
import moment from 'moment';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import {ReferenciacionClienteService} from '../../../../../../core/services/referenciacion-cliente.service';
import {Subject, Subscription} from 'rxjs';
import Swal from 'sweetalert2';
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-form-dialog-reprogramar',
  templateUrl: './form-dialog-reprogramar.component.html',
  styleUrls: ['./form-dialog-reprogramar.component.scss']
})
export class FormDialogReprogramarComponent implements OnInit, OnDestroy {
  public myDatePicker: FormControl = new FormControl(['']);
  public unsubscribe$: Subject<any> = new Subject<any>();
  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private _matDialog: MatDialogRef<FormDialogReprogramarComponent>,
      private referenciacionClienteServices: ReferenciacionClienteService,
  ) { }

  ngOnInit(): void {
  }
  /**
   * @description: Genera la reprogramacion
   */
  public onReprogramar(): void {
      const numeroSolicitud: string = this.data.numeroSolicitud;
      const data: any = {
          numeroSolicitud,
          fechaReprogramacion: moment(this.myDatePicker.value).format('YYYY-MM-DD HH:mm:ss')
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
              this.postReprogramar(data);
          }
      });
  }
  /**
   * @description: Cierra el modal activo
   */
  public onCerrar(): void {
      this._matDialog.close(true);
  }
  /**
   * @description: Guarda los datos a reprogramar
   */
  private postReprogramar(data: any): void {
       this.referenciacionClienteServices.postReprogramarSolicitud(data).pipe(
           takeUntil(this.unsubscribe$)
       ).subscribe((res) => {
          if (res.data.respuesta == 'OK') {
              console.log(res);
              Swal.fire(
                  'Completado',
                  'Información guardada con éxito',
                  'success'
              );
              this.onCerrar();
          }
      });
  }
    ngOnDestroy(): void {
      this.unsubscribe$.unsubscribe();
    }
}

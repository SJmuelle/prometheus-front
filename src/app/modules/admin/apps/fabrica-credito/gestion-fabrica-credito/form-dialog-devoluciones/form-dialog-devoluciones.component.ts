import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import Swal from "sweetalert2";
import { DevolucionesService } from "../../../../../../core/services/devoluciones.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-form-dialog-devoluciones',
  templateUrl: './form-dialog-devoluciones.component.html',
  styleUrls: ['./form-dialog-devoluciones.component.scss']
})
export class FormDialogDevolucionesComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public unsubscribe$: Subject<any> = new Subject<any>();
  public listCausales$: Observable<any>;
  public agendaFabrica: string = '';
  constructor(
    private fb: FormBuilder,
    private _dialog: MatDialogRef<FormDialogDevolucionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private devolucionesService: DevolucionesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.agendaFabrica = this.data.agenda;
    this.form.controls.numeroSolicitud.setValue(this.data.numeroSolicitud);
    this.form.controls.agenda.setValue(this.data.agenda);
    // console.log('sdsdsdsds->'+this.data.agenda)
    if (this.data.idDevolucion) {
      this.form.controls.observacion.setValue(this.data.descripcionDevolucion);
      this.form.controls.descripcionCausal.setValue(this.data.descripcionCausal);
    } else {
      this.getCausales();
    }
  }
  /**
    * @description: Cierra el dialogo
    */
  public onCerrar(): void {
    this._dialog.close();
    this.redireccionar();

  }

  public onGuardar(): void {
    if (this.form.valid) {
      const data: any = this.form.getRawValue();
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
          this.postDevolucion(data);
        }
      });
    } else {
      this.form.markAllAsTouched();
    }

  }

  private crearFormulario(): void {
    this.form = this.fb.group({
      recurso: ['ingresar-devolucion-agenda'],
      numeroSolicitud: [''],
      agenda: [''],
      descripcionCausal: [],
      idCausal: ['', [Validators.required]],
      observacion: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  private postDevolucion(data: any): void {
    Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    this.devolucionesService.postDevoluciones(data).pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {

        Swal.close();

        this.onCerrar();
      });
  }

  get requeridoObservacion(): any {
    return (this.form.controls.observacion.dirty || this.form.controls.observacion.touched);
  }

  get minimoObservacion(): any {
    return (this.form.controls.observacion.errors?.minlength);
  }

  get requeridoCausal(): any {
    return (this.form.controls.idCausal.dirty || this.form.controls.idCausal.touched);
  }

  /**
   * @description: Obtiene los comentarios
   */
  private getCausales(): void {
    this.listCausales$ = this.devolucionesService.getCausalesDevoluciones(this.agendaFabrica,this.data.numeroSolicitud);
  }

  /**
   * @description: redireciona a la grilla de la agenda correspondiente
   */
  private redireccionar() {
    let agenda = '';
    
    switch (this.data.agenda) {
      case 'CO':
        agenda = 'agenda-completion';
        break;
      case 'CM':
        agenda = 'agenda-comercial';
        break;
      case 'RE':
        agenda = 'agenda-referencing';
        break;
      case 'DE':
        agenda = 'agenda-decision';
        break;
      case 'GC':
        agenda = 'agenda-cartera';
        break;
      case 'CC':
        agenda = 'agenda-comite-comercial'
        break;
      default:
        agenda = 'trazabilidad';
        break;
    }
    this.router.navigate([`/credit-factory/${agenda}`]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

}

import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import { DecisionesService } from 'app/core/services/decisiones.service';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { UtilityService } from 'app/resources/services/utility.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-decision',
  templateUrl: './form-decision.component.html',
  styleUrls: ['./form-decision.component.scss']
})
export class FormDecisionComponent implements OnInit, OnDestroy {
  public unSubscribe$: Subject<any> = new Subject<any>();
  DecisionForm: FormGroup;//formulario para hacer las validaciones requeridas
  numPattern: any = /(0|[1-9][0-9]*)$/; // expresion regular para validar que solo se digitan numeros.
  porcenPattern: any = /^((100(\.0{1,2})?)|(\d{1,2}(\.\d{1,2})?))$/; // expresion regular para escribir valores porcentuales.
  visible: boolean = false; // esconder o mostrar el input causal
  valorNum: number; // almacenar el valor digitado en el input de valor
  listadoDeciones: any = [];// listado de decisiones
  listadoCausales: any = [];// listado de causales

  /**
   * @description: control del formulario creado.
   */
  get frm() {
    return this.DecisionForm.controls;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public fabricaDatos: any,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialogRef<FormDecisionComponent>,
    public utility: UtilityService,
    public _decisionesService: DecisionesService) {
    this.DecisionForm = this.fb.group({
      decision: ['', [Validators.required]],
      causal: [''],
      cupo:[''],
      comentario: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(500)]]
    })
  }

  ngOnInit() {
    this.consultaDecisiones();
    debugger;
    this.DecisionForm.controls['cupo'].setValue(this.utility.formatearNumero(String(this.fabricaDatos.cupoTotal)));
  }


  consultaDecisiones() {
    this._decisionesService.getOpciones().subscribe((response: any) => {
      console.log(response);
      if (response) {
        this.listadoDeciones = response.data;
      }
    })
  }

  private consultaCausalesRechazo() {
    this._decisionesService.getCausalesRechazo(this.fabricaDatos.numeroSolicitud).subscribe((response: any) => {
      console.log(response);
      if (response) {
        this.listadoCausales = response.data;
      }
    })
  }
  private consultaCausalesAprobacion() {
    this._decisionesService.getCausalesAprobacion(this.fabricaDatos.numeroSolicitud, this.DecisionForm.value.decision).subscribe((response: any) => {
      console.log(response);
      if (response) {
        this.listadoCausales = response.data;
      }
    })
  }

  public getlistadoCausales() {
    if (this.DecisionForm.value.decision == 'R') {
      this.consultaCausalesRechazo();
    }else{
      this.consultaCausalesAprobacion();
    }
  }




  guardar() {
    Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    let datos={
      numeroSolicitud:this.fabricaDatos.numeroSolicitud,
      concepto:this.DecisionForm.value.decision,
      cupo:Number( this.utility.enviarNumero(String(this.DecisionForm.value.cupo))),
      comentario:this.DecisionForm.value.comentario,
      causal:Number(this.DecisionForm.value.causal),
      unidadNegocio:this.fabricaDatos.unidadNegocio,
    }
    this._decisionesService.postGuardado(datos).subscribe((response: any)=>{
      Swal.close()
      if (response) {
        Swal.fire(
          '¡Correcto!',
          'Decisión guardada con éxito.',
          'success'
        ).then((result)=>{
          if(result){
            this.dialog.close();
          }
        })
        setTimeout(() => {
          this.dialog.close();
          this.router.navigate(['/credit-factory/agenda-referencing']);
        }, 10000);
      }
    })
  }

  ngOnDestroy(): void {
    this.unSubscribe$.unsubscribe();
  }

}

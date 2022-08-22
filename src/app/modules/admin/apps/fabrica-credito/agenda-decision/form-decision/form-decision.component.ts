import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import { DecisionesService } from 'app/core/services/decisiones.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-decision',
  templateUrl: './form-decision.component.html',
  styleUrls: ['./form-decision.component.scss']
})
export class FormDecisionComponent implements OnInit {

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
    private fb: FormBuilder,
    private dialog: MatDialogRef<FormDecisionComponent>,
    public decision: DecisionesService) {
    this.DecisionForm = this.fb.group({
      decision: ['', [Validators.required]],
      causal: [''],
      monto: ['', [Validators.required, Validators.pattern(this.numPattern), Validators.min(1)]],
      plazo: ['', [Validators.required, Validators.pattern(this.numPattern), Validators.min(1)]],
      tasa: ['', [Validators.required, Validators.pattern(this.porcenPattern), Validators.min(1)]],
      comentario: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(500)]]
    })
  }

  ngOnInit() {
    this.consultaDecisiones();
    this.consultaCausales();
  }

  consultaDecisiones() {
    this.decision.getOpciones().subscribe((response: any) => {
      console.log(response);
      if (response) {
        this.listadoDeciones = response.data;
      }
    })
  }

  consultaCausales() {
    this.decision.getCausales().subscribe((response: any) => {
      console.log(response);
      if (response) {
        this.listadoCausales = response.data;
      }
    })
  }

  /**
   * @description: convertir a numero el texto que se va digitando
   */
  convText(valor) {
    const { monto } = this.DecisionForm.getRawValue();
    valor = Number(this.decision.enviarNumero(monto))
    this.valorNum = valor
  }

  ocultarCausal(valor) {
    console.log(valor)
    if (valor == 'A') {
      this.visible = false;
    } else {
      this.visible = true;
    }

  }

  guardar() {
    Swal.fire(
      '¡Correcto!',
      'Se ha gardado exitosamente la decisión.',
      'success'
    ).then((result) => {
      if (result) {
        this.dialog.close();
      }
    })
    // setTimeout(() => {
    //   this.dialog.close();
    // }, 10000);
    const form = this.DecisionForm.value
    console.log(form)
    // causal: "1"
    // comentario: "Comentario Comentario Comentario"
    // decision: "R"
    // monto: "9,000"
    // plazo: "89"
    // tasa: "89"
    // let datos = {
    //   "numeroSolicitud": 216661,
    //   "concepto": "A",
    //   "cupo": 500000000,
    //   "comentario": "Se aprueba credito",
    //   "causal": 1
    // }
    // this.decision.postGuardado(datos).subscribe((response: any)=>{
    //   if (response) {
    //     Swal.fire(
    //       '¡Correcto!',
    //       'Se ha aprobado exitosamente la solicitud.',
    //       'success'
    //     ).then((result)=>{
    //       if(result){
    //         this.dialog.close();
    //       }
    //     })
    //     setTimeout(() => {
    //       this.dialog.close();
    //     }, 10000);
    //   }
    // })
  }

}

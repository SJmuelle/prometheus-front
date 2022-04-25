import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PagaduriaService } from 'app/core/services/pagaduria.service';

@Component({
  selector: 'app-rechazar-referencia-laboral',
  templateUrl: './rechazar-referencia-laboral.component.html',
  styleUrls: ['./rechazar-referencia-laboral.component.scss']
})
export class RechazarReferenciaLaboralComponent implements OnInit {

  RechazarForm: FormGroup; //formulario para hacer las validaciones requeridas
  contador = 0; //contar los caracteres restantes en el textarea
  id: any = this.data.id; // almacenar el codigo de solicitud
  tipo: any = this.data.tipo; // almacenar el tipo de la solicitud
  estado:any = 'R'; // almacenar estado de aprobado
  actualizacion:any = {}; // almacenar toda la data que sera enviada a la api

  /**
   * @description: control del formulario creado.
   */
   get frm() {
    return this.RechazarForm.controls;
  }

  constructor(private fb: FormBuilder, private pagaduria: PagaduriaService, private dialog: MatDialogRef<RechazarReferenciaLaboralComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.RechazarForm = this.fb.group({
      detalle: ['', [Validators.required, Validators.maxLength(500)]]
    })
  }

  @ViewChild('autosize') autosize: CdkTextareaAutosize; //controlar el tamaño del textarea a medida que se escribe.

  ngOnInit(): void {
  }

  /**
   * @description: realiza el proceso de actualizar enviando los datos requeridos
   */
  actualizarSolicitud(codigoNegocio, tipo, estado){
    codigoNegocio = this.id
    tipo = this.tipo
    estado = this.estado
    const { detalle } = this.RechazarForm.getRawValue();
    this.actualizacion={codigoNegocio, estado, detalle, tipo}
    this.pagaduria.UpdateSolicitud(this.actualizacion).subscribe((response: any)=>{
      // console.log("Aqui tus datos: ", response)
    })
    // console.log("Aqui tus datos: ", this.actualizacion)
  }

  /**
   * @description: contar los caracteres restantes.
   */
  contarCaracteres(event){
    this.contador = event.target.value.length
   }

}

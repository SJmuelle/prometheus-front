import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProntoPagoService } from 'app/core/services/pronto-pago.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-porcentaje',
  templateUrl: './porcentaje.component.html',
  styleUrls: ['./porcentaje.component.scss']
})
export class PorcentajeComponent implements OnInit {

  valor:number = 0;

  constructor(public pago: ProntoPagoService, public dialogRef: MatDialogRef<PorcentajeComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {dialogRef.disableClose = true}

  ngOnInit(): void {}

  formatLabel(value: number) {
    return value + '%';
  }

  actualizar(){
    let data = {
      "porcentajeNegociacion": this.valor.toString(),
      "details": this.data.planilla
    }
    Swal.fire({
      title: 'Cargando',
      html: 'Actualizando información',
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 500000,
      didOpen: () => {
        Swal.showLoading();
        this.pago.postActualizar(data).subscribe((res: any)=>{
          Swal.close();
          if(res){
            if (this.data.planilla.length > 1) {
              Swal.fire(
                '¡Correcto!',
                'Los porcentajes de las planillas han sido actualizados.',
                'success'
              )
            } else {
              Swal.fire(
                '¡Correcto!',
                'El porcentaje de la planilla ha sido actualizado.',
                'success'
              )
            }
            this.dialogRef.close(true);
          } else {
            if (this.data.planilla.length > 1) {
              Swal.fire(
                '¡Error!',
                'Los porcentajes de las planillas NO han podido ser actualizados, por favor intente mas tarde.',
                'error'
              )
            } else {
              Swal.fire(
                '¡Error!',
                'El porcentaje de la planilla no ha podido ser actualizado, por favor intente mas tarde.',
                'error'
              )
            }
            this.dialogRef.close(true);
          }
        }, error => {
          Swal.fire(
            'Error!',
            'El proceso no ha podido llevarse a cabo, por favor intente mas tarde.',
            'error'
          )
          this.dialogRef.close(true);
        })
      }})
    
  }

}

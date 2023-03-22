import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PagoMasivoService } from 'app/core/services/pago-masivo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-tasa',
  templateUrl: './actualizar-tasa.component.html',
  styleUrls: ['./actualizar-tasa.component.scss']
})
export class ActualizarTasaComponent implements OnInit {

  actualizarForm: FormGroup;

  constructor(private pago: PagoMasivoService, public dialogRef: MatDialogRef<ActualizarTasaComponent>, public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    console.log(this.data)
    this.actualizarForm = this.fb.group({
      tasa: ['', [Validators.required, Validators.pattern('^[0-9]{1,2}\.[0-9]{1,2}$')]],
    });
  }

  actualizar(){
    let data = {
      "tasaInteres": this.actualizarForm.value.tasa.toString(),
      "idConvenio": this.data.idConvenio.toString()
    }
    this.pago.postTasaConvenios(data).subscribe((res:any)=>{
      if (res) {
        Swal.fire({
          title: '¡Correcto!',
          text: 'La tasa ha sido actualizada',
          icon: 'success',
          allowOutsideClick: false
        }).then((result)=>{
          this.dialogRef.close(true)
        })
      }else{
        Swal.fire({
          title: 'Error!',
          text: 'Ha habido un error al momento de actualizar la tasa, por favor intente mas tarde.',
          icon: 'error',
          allowOutsideClick: false
        }).then((result)=>{
          this.dialogRef.close(false)
        })
      }
    })
  }

  numberValid(control: FormControl): { [s: string]: boolean } {
    const mayuscula = new RegExp('.*[0-9].*');
    if (control.value !== '' && !control.value.match(mayuscula)) {
      return { notNumber: true };
    }
    return null;
  }

}

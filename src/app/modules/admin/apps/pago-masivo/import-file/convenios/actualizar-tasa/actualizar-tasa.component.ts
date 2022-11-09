import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-actualizar-tasa',
  templateUrl: './actualizar-tasa.component.html',
  styleUrls: ['./actualizar-tasa.component.scss']
})
export class ActualizarTasaComponent implements OnInit {

  actualizarForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<ActualizarTasaComponent>, public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    console.log(this.data)
    this.actualizarForm = this.fb.group({
      tasa: ['', [Validators.required, this.numberValid, this.decimal]]
    });
  }

  actualizar(){
    let data = {
      "tasaUsura": this.actualizarForm.value.tasa.toString(),
      "idConvenio": this.data.idConvenio.toString()
    }
    console.log(data)
  }

  decimal(control: FormControl): { [s: string]: boolean }{
    const numero = new RegExp('.*[0-9]{1,2}\.[0-9]{1,2}.*');
    if (control.value !== '' && !control.value.match(numero)) {
      return { notDecimal: true };
    }
    return null;
  }

  numberValid(control: FormControl): { [s: string]: boolean } {
    const mayuscula = new RegExp('.*[0-9].*');
    if (control.value !== '' && !control.value.match(mayuscula)) {
      return { notNumber: true };
    }
    return null;
  }

}

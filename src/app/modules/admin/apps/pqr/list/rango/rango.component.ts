import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import moment from 'moment';

@Component({
  selector: 'app-rango',
  templateUrl: './rango.component.html',
  styleUrls: ['./rango.component.scss']
})
export class RangoComponent implements OnInit {

  rangeForm: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<RangoComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.rangeForm = this.fb.group({
        minimo: ['', [Validators.required]],
        maximo: ['', [Validators.required]],
      })
    }

  ngOnInit(): void {
  }

  enviaRango(): void {
    let data = {
      "fechaInicial": moment(this.rangeForm.value.minimo).format("YYYY-MM-DD"),
      "fechaFinal": moment(this.rangeForm.value.maximo).format("YYYY-MM-DD")
    }
    this.dialogRef.close(data);
  }

}

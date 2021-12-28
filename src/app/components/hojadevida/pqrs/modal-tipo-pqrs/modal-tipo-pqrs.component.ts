import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-tipo-pqrs',
  templateUrl: './modal-tipo-pqrs.component.html',
  styleUrls: ['./modal-tipo-pqrs.component.scss']
})
export class ModalTipoPqrsComponent implements OnInit {

  formTipoPqrs: FormGroup;
  editar: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalTipoPqrsComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {

    this.formTipoPqrs = this.fb.group({
      tipo_pqrs: ['', Validators.required],
      legal: ['', Validators.required],
      tiempo_Solucion: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.editar = true;
      this.formTipoPqrs.patchValue(this.data);
    }
  }
  compareObjects(o1: any, o2: any) {
    if (o1 === o2) {
      return true;
    } else {
      return false;
    }
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modalresponsablespqrs',
  templateUrl: './modalresponsablespqrs.component.html',
  styleUrls: ['./modalresponsablespqrs.component.scss']
})
export class ModalresponsablespqrsComponent implements OnInit {

  formTipoPqrs: FormGroup;
  editar: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalresponsablespqrsComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {

    this.formTipoPqrs = this.fb.group({
      responsable: ['', Validators.required],
      emailr: ['', Validators.required],
      escalara: ['', Validators.required],
      emaile: ['', Validators.required],
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

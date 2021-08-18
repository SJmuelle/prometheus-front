import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modaldiasnohabiles',
  templateUrl: './modaldiasnohabiles.component.html',
  styleUrls: ['./modaldiasnohabiles.component.scss']
})
export class ModaldiasnohabilesComponent implements OnInit {

  formDiasNoHabiles: FormGroup;
  editar: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModaldiasnohabilesComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {

    this.formDiasNoHabiles = this.fb.group({
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.editar = true;
      this.formDiasNoHabiles.patchValue(this.data);
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

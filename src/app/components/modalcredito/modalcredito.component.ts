import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-modalcredito',
  templateUrl: './modalcredito.component.html',
  styleUrls: ['./modalcredito.component.scss']
})
export class ModalcreditoComponent implements OnInit {

  infoInfoPerLab: FormGroup;
  infoRefePer: FormGroup;
  infoRefFam: FormGroup;
  infoCodeu: FormGroup;
  infoNegocio: FormGroup;
  infoConyugue: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalcreditoComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder
  ) {
    this.infoInfoPerLab = this.fb.group({
      afiliado: [{ value: '', disabled: true }, Validators.required],
      asesor_de_colocacion: [{ value: '', disabled: true }, Validators.required],
      valor_cuota: [{ value: '', disabled: true }, Validators.required],
      plazo: [{ value: '', disabled: true }, Validators.required],
      ocupacion: [{ value: '', disabled: true }, Validators.required],
      actividad_economica: [{ value: '', disabled: true }, Validators.required],
    });
    this.infoRefePer = this.fb.group({
      primer_nombre: [{ value: '', disabled: true }, Validators.required],
      primer_apellido: [{ value: '', disabled: true }, Validators.required],
      celular: [{ value: '', disabled: true }, Validators.required],
      departamento: [{ value: '', disabled: true }, Validators.required],
      ciudad: [{ value: '', disabled: true }, Validators.required],
      direccion: [{ value: '', disabled: true }, Validators.required],
    });
    this.infoRefFam = this.fb.group({
      primer_nombre: [{ value: '', disabled: true }, Validators.required],
      primer_apellido: [{ value: '', disabled: true }, Validators.required],
      parentesco: [{ value: '', disabled: true }, Validators.required],
      celular: [{ value: '', disabled: true }, Validators.required],
      departamento: [{ value: '', disabled: true }, Validators.required],
      ciudad: [{ value: '', disabled: true }, Validators.required],
      direccion: [{ value: '', disabled: true }, Validators.required],
    });
    this.infoCodeu = this.fb.group({
      primer_nombre: [{ value: '', disabled: true }, Validators.required],
      primer_apellido: [{ value: '', disabled: true }, Validators.required],
      identificacion: [{ value: '', disabled: true }, Validators.required],
      profesion: [{ value: '', disabled: true }, Validators.required],
      departamento: [{ value: '', disabled: true }, Validators.required],
      ciudad: [{ value: '', disabled: true }, Validators.required],
      barrio: [{ value: '', disabled: true }, Validators.required],
      direccion: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, Validators.required],
      celular: [{ value: '', disabled: true }, Validators.required],
    });
    this.infoNegocio = this.fb.group({
      empresa: [{ value: '', disabled: true }, Validators.required],
      nit_rut: [{ value: '', disabled: true }, Validators.required],
      celular: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, Validators.required],
      departamento: [{ value: '', disabled: true }, Validators.required],
      ciudad: [{ value: '', disabled: true }, Validators.required],
      barrio: [{ value: '', disabled: true }, Validators.required],
      direccion: [{ value: '', disabled: true }, Validators.required]
    });
    this.infoConyugue = this.fb.group({
      primer_nombre: [{ value: '', disabled: true }, Validators.required],
      primer_apellido: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, Validators.required],
      celular: [{ value: '', disabled: true }, Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log(this.data);

  }

}

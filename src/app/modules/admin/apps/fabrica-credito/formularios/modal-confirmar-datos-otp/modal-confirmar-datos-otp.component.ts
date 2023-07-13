import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibranzaPublicaService } from 'app/core/services/libranza-publica.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirmar-datos-otp',
  templateUrl: './modal-confirmar-datos-otp.component.html',
  styleUrls: ['./modal-confirmar-datos-otp.component.scss']
})
export class ModalConfirmarDatosOTPComponent implements OnInit {

    datosBasicos: FormGroup;
    datosRetorno: any;

  constructor(private fb: FormBuilder,private _libranzaService: LibranzaPublicaService,
    @Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<ModalConfirmarDatosOTPComponent>) { }

  ngOnInit(): void {
    this.datosBasicos = this.fb.group({
        celular: ['', [Validators.required, Validators.pattern('^[3][0-9]{9}$')]],
        email: ['',[Validators.required, Validators.email]],
    });

    this.datosBasicos.patchValue(this.data);
  }

  atualizarDatosOTP(){
      this.datosRetorno = {...this.data,...this.datosBasicos.getRawValue()}
      console.log('datos a enviar', this.datosRetorno);

      this._libranzaService.actualizarDatosBasicosOTP(this.datosRetorno).subscribe(rep => {
        console.log('respuesta', rep);
        this.dialogRef.close(this.datosRetorno)
      })
  }
}

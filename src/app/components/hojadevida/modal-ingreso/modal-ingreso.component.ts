import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarteraService } from 'app/resources/services/hojadevida/cartera/cartera.service';

@Component({
  selector: 'app-modal-ingreso',
  templateUrl: './modal-ingreso.component.html',
  styleUrls: ['./modal-ingreso.component.scss']
})
export class ModalIngresoComponent implements OnInit {
  listadoIngreso: any[];

  constructor(public dialogRef: MatDialogRef<ModalIngresoComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private _cartera_service: CarteraService) { }

  ngOnInit(): void {
    console.log(this.data.codigoNegocio);
    this.getIngreso(this.data.codigoNegocio);
    this.listadoIngreso=[];
  }

  getIngreso(data: string) {
    return this._cartera_service
      .getIngreso(data)
      .subscribe((response: any) => {
        if (response.data) {
          this.listadoIngreso=response.data;
          console.log(this.listadoIngreso);
          
        }
      });
  }

}

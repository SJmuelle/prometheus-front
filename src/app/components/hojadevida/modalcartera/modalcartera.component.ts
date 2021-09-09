import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarteraService } from 'app/resources/services/hojadevida/cartera/cartera.service';
import { DetalleCreditoService } from 'app/resources/services/hojadevida/credito/detalle-credito.service';

@Component({
  selector: 'app-modalcartera',
  templateUrl: './modalcartera.component.html',
  styleUrls: ['./modalcartera.component.scss']
})
export class ModalcarteraComponent implements OnInit {
  datos: any;

  constructor(public dialogRef: MatDialogRef<ModalcarteraComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private _cartera_service: CarteraService) { }




  ngOnInit(): void {
    console.log(this.data.codigoNegocio);
    this.getDetalle(this.data.codigoNegocio);
  }

  getDetalle(data: string) {
    return this._cartera_service
      .getDetalleCartera(data)
      .subscribe((response: any) => {
        if (response.data) {
          this.datos=response.data;
          console.log(this.datos);
        }
      });
  }


}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProntoPagoService } from 'app/core/services/pronto-pago.service';

@Component({
  selector: 'app-porcentaje',
  templateUrl: './porcentaje.component.html',
  styleUrls: ['./porcentaje.component.scss']
})
export class PorcentajeComponent implements OnInit {

  constructor(public pago: ProntoPagoService, public dialogRef: MatDialogRef<PorcentajeComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {dialogRef.disableClose = true}

  ngOnInit(): void {
    console.log(this.data)
  }

}

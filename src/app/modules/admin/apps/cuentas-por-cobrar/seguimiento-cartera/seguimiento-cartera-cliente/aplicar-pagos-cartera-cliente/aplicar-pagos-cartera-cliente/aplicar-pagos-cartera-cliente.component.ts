import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-aplicar-pagos-cartera-cliente',
  templateUrl: './aplicar-pagos-cartera-cliente.component.html',
  styleUrls: ['./aplicar-pagos-cartera-cliente.component.scss']
})
export class AplicarPagosCarteraClienteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log('data', this.data)
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-detalle-firma-digital',
  templateUrl: './modal-detalle-firma-digital.component.html',
  styleUrls: ['./modal-detalle-firma-digital.component.scss']
})
export class ModalDetalleFirmaDigitalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    console.log(this.data)
  }

}

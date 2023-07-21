import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-details-cartera-cliente',
  templateUrl: './modal-details-cartera-cliente.component.html',
  styleUrls: ['./modal-details-cartera-cliente.component.scss']
})
export class ModalDetailsCarteraClienteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log('modal', this.data)
  }

}

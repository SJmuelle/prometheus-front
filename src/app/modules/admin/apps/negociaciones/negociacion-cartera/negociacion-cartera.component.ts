import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-negociacion-cartera',
  templateUrl: './negociacion-cartera.component.html',
  styleUrls: ['./negociacion-cartera.component.scss']
})
export class NegociacionCarteraComponent implements OnInit {

  public seacrhType: 'Cedula' | 'Negocio' = 'Cedula'
  public valueSearch: string = ''


  constructor() { }

  ngOnInit(): void {
  }

  public changeDocumentType(): void {

  }

}

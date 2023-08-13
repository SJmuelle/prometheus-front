import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-vista-detalle-cliente',
  templateUrl: './vista-detalle-cliente.component.html',
  styleUrls: ['./vista-detalle-cliente.component.scss']
})
export class VistaDetalleClienteComponent implements OnInit {

  @Input() infoCliente: any = null;
  @Output() public closePage: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }



}

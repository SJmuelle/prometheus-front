import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-deuda',
  templateUrl: './detalle-deuda.component.html',
  styleUrls: ['./detalle-deuda.component.scss']
})
export class DetalleDeudaComponent implements OnInit {

  listado: any[] = [
    {
      "nombre":"Gustavo Salas",
      "correo":"tavosalas270@gmail.com",
      "monto":5000000,
    },
    {
      "nombre":"Edgar Gonzalez",
      "correo":"egonzales@gmail.com",
      "monto":5000000,
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

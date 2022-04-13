import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagaduria',
  templateUrl: './pagaduria.component.html',
  styleUrls: ['./pagaduria.component.scss']
})
export class PagaduriaComponent implements OnInit {

  pendiente:boolean = false;
  aprobada:boolean = false;
  rechazada:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  cpendiente(){
    if (this.pendiente==true) {
      this.pendiente=false
    } else {
      this.pendiente=true
      this.aprobada=false
      this.rechazada=false
    }
  }

  caprobada(){
    if (this.aprobada==true) {
      this.aprobada=false
    } else {
      this.aprobada=true
      this.pendiente=false
      this.rechazada=false
    }
  }

  crechazada(){
    if (this.rechazada==true) {
      this.rechazada=false
    } else {
      this.rechazada=true
      this.pendiente=false
      this.aprobada=false
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { PagaduriaService } from 'app/core/services/pagaduria.service';

@Component({
  selector: 'app-obligaciones',
  templateUrl: './obligaciones.component.html',
  styleUrls: ['./obligaciones.component.scss']
})
export class ObligacionesComponent implements OnInit {

  obligaciones:any =[];//array para almacenar las obligaciones consultadas.

  constructor(public pagaduria: PagaduriaService) { }

  ngOnInit(): void {
    this.consultaObligaciones()
  }

  /**
   * @description: metodo para cargar todas las obligaciones
   */
   consultaObligaciones(){
    this.pagaduria.getObligaciones().subscribe((response: any) => {
      // console.log(response)
      if (response) {
        this.obligaciones = response.data;
        console.log(this.obligaciones)
      }
    });
  }

}

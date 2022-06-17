import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PagaduriaService } from 'app/core/services/pagaduria.service';

@Component({
  selector: 'app-obligaciones',
  templateUrl: './obligaciones.component.html',
  styleUrls: ['./obligaciones.component.scss']
})
export class ObligacionesComponent implements OnInit {

  obligaciones:any =[];//array para almacenar las obligaciones consultadas.
  total:number; // calcular el total de la columna valor a recoger

  constructor(public pagaduria: PagaduriaService, private dialog: MatDialogRef<ObligacionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
) { }

  ngOnInit(): void {
    this.consultaObligaciones()
    console.log(this.data.numero)
  }

  /**
   * @description: metodo para cargar todas las obligaciones
   */
   consultaObligaciones(){
    this.pagaduria.getObligaciones(this.data.numero).subscribe((response: any) => {
      console.log(response)
      if (response) {
        this.obligaciones = response.data;
        console.log(this.obligaciones)
      }
      this.total = response.data.reduce((acc, obj) => acc + (1 * obj.valor_recoger), 0);
    });
  }

}

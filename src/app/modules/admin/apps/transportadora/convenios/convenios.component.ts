import { Component, OnInit } from '@angular/core';
import { PagoMasivoService } from 'app/core/services/pago-masivo.service';
import { ActualizarTasaComponent } from './actualizar-tasa/actualizar-tasa.component';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-convenios',
  templateUrl: './convenios.component.html',
  styleUrls: ['./convenios.component.scss']
})
export class ConveniosComponent implements OnInit {

  listConvenios:any = [];
  filtrarTabla:string=''; // filtrar la tabla

  constructor(private pago: PagoMasivoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.convenios()
  }

  convenios(){
    this.pago.getConvenios().subscribe((res:any)=>{
      if(res){
        this.listConvenios = res.data
      }else{
        this.listConvenios = [];
      }
    })
  }

  abrirActualizar(item){
    const dialogRef = this.dialog.open(ActualizarTasaComponent,{
      maxWidth: '30%',
      data: {
        nombreConvenio: item.nombreConvenio,
        idConvenio: item.idConvenio
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result==true) {
        this.convenios()
      }
    });
  }

}

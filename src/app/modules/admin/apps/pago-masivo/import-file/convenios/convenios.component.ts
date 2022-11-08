import { Component, OnInit } from '@angular/core';
import { PagoMasivoService } from 'app/core/services/pago-masivo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-convenios',
  templateUrl: './convenios.component.html',
  styleUrls: ['./convenios.component.scss']
})
export class ConveniosComponent implements OnInit {

  listConvenios:any = [];

  constructor(private pago: PagoMasivoService) { }

  ngOnInit(): void {
    this.convenios()
  }

  convenios(){
    this.pago.getConvenios().subscribe((res:any)=>{
      console.log(res)
      if(res){
        this.listConvenios = res.data
      }else{
        this.listConvenios = [];
      }
    })
  }

}

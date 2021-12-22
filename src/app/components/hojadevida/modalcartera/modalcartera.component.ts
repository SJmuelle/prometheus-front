import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarteraService } from 'app/resources/services/hojadevida/cartera/cartera.service';
import { DetalleCreditoService } from 'app/resources/services/hojadevida/credito/detalle-credito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modalcartera',
  templateUrl: './modalcartera.component.html',
  styleUrls: ['./modalcartera.component.scss']
})
export class ModalcarteraComponent implements OnInit {
  // datos: any;
  listadoDetalleCartera: any;
  totales: any;
  totalSeleccionado:any=0;
  item:any[];
  constructor(public dialogRef: MatDialogRef<ModalcarteraComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private _cartera_service: CarteraService) { }




  ngOnInit(): void {
    // console.log(this.data.codigoNegocio);
    this.getDetalle(this.data.codigoNegocio,this.data.ideNegocio);
    this.listadoDetalleCartera=[];
  }

  getDetalle(data: string,id) {
    Swal.fire({ title: 'Cargando', html: 'Buscando información de detalles de la cartera', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    return this._cartera_service
      .getDetalleCartera(data)
      .subscribe((response: any) => {
        Swal.close();
        if (response.data) {
          this.listadoDetalleCartera=response.data;
          // // console.log(this.listadoDetalleCartera);
          this.getTotal(data,id);
        }
      });
  }


  getTotal(data: string,id) {
    return this._cartera_service
      .getDetalleCarteraTotal(data,id)
      .subscribe((response: any) => {
        if (response.data) {
          this.totales=response.data;
          // // console.log(this.totales);
        }
      });
  }
  sumar(valor:any,estado:boolean){

    if(estado==true){
      this.totalSeleccionado=this.totalSeleccionado+valor;
    }else{
      this.totalSeleccionado=this.totalSeleccionado-valor;
    }

  }


}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarteraService } from 'app/resources/services/hojadevida/cartera/cartera.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-ingreso',
  templateUrl: './modal-ingreso.component.html',
  styleUrls: ['./modal-ingreso.component.scss']
})
export class ModalIngresoComponent implements OnInit {
  listadoIngreso: any=[];
  page:number=1;
  pageDetalle:number=1;
  filtrar:any='';
  listadoDetalleIngreso: any;
  mostrar_infor: boolean=false;
  elegido: any;
  constructor(public dialogRef: MatDialogRef<ModalIngresoComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private _cartera_service: CarteraService) { }

  ngOnInit(): void {
    console.log(this.data.codigoNegocio);
    this.getIngreso(this.data.codigoNegocio);
    this.listadoIngreso=[];
  }

  getIngreso(data: string) {
    Swal.fire({ title: 'Cargando!', html: 'Buscando información de Credito', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    return this._cartera_service
      .getIngreso(data)
      .subscribe((response: any) => {
        if (response.data) {
          this.listadoIngreso=response.data;
          console.log(this.listadoIngreso);
          Swal.close();
        }
      });
  }
  mostrarDetalleIngreso(data){
    // .numeroIngreso,  item.tipoDocumento,  item.dstrct

    Swal.fire({ title: 'Cargando!', html: 'Buscando información de Credito', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    return this._cartera_service
      .getDetalleIngreso(data.numeroIngreso,data.tipoDocumento,data.dstrct)
      .subscribe((response: any) => {
        if (response.data) {
          this.listadoDetalleIngreso=response.data;
          this.mostrar_infor=true;
          this.elegido=data;
          console.log(this.listadoDetalleIngreso);
          Swal.close();
        }
      });
  }

  cerrar_detalle(){
    this.mostrar_infor=false;
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PqrService } from '../pqr.service';

@Component({
  selector: 'app-soluciones-pqrs',
  templateUrl: './soluciones-pqrs.component.html',
  styleUrls: ['./soluciones-pqrs.component.scss']
})
export class SolucionesPQRSComponent implements OnInit {

  listado: any=[];
  page:number=1;
  tamanoTabl:number=5;
  filtrarTabla:string='';
  mostrar_form:boolean=true;
  datos: { tipo: any; tiempo: any; legal: string; estado: string; titulo: any; };


  constructor(
    public dialog: MatDialog,
    private _pqrService: PqrService) { }

  ngOnInit(): void {
    this.consulta();
  }
  consulta(){
    Swal.fire({ title: 'Cargando!', html: 'Buscando Informacion de Soluciones de PQRS', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
        this._pqrService
          .setSoluciones()
          .subscribe((response: any) => {
            Swal.close();
            if (response) {
              this.listado = response;
            } else {
              this.listado = [];
            }
          });
  }
  abrirModal(datos,titulo){
    if(titulo=='N'){
      this.datos={
        tipo:'',
        tiempo:'',
        legal:'',
        estado:'A',
        titulo:titulo
      }
    }else{
      this.datos={
        tipo:datos.tipoPqrs,
        tiempo:datos.diasSolucion,
        legal:datos.legal=='SI'?'S':"N",
        estado:datos.estado=='ACTIVO'?'A':"I",
        titulo:titulo
      }
    }

    // const dialogRef = this.dialog.open(FormComponent, {
    //   // width: '1080px',
    //   // maxHeight: '550px',
    //   data: this.datos,
    // });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log('The dialog was closed');
    //   console.log(result);
    //   this.consulta();
    // });
   
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PqrService } from '../../pqr.service';

@Component({
  selector: 'app-insertar-causal-legal',
  templateUrl: './insertar-causal-legal.component.html',
  styleUrls: ['./insertar-causal-legal.component.scss']
})
export class InsertarCausalLegalComponent implements OnInit {
  listadoCasualPQRS: any[];
  listadoResponsablePQRS: any=[];
  listadoSolucionPQRS: any=[];
  datos: any={};



  constructor(
    public matDialogRef: MatDialogRef<InsertarCausalLegalComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private _pqrService: PqrService) { }

  ngOnInit(): void {
  
    this.datos={
      responsable:'',
      fechaParaSolucion:'',
      area:'',
      causal:{},
      solucion:{},
      tipo:this.data.tipo
    }
    this.buscarSelectDinamico('listado-causal-tipo',this.datos.tipo,'listadoCasualPQRS','causal')
  }

  buscarSelectDinamico(path, tipo, variable, titulo) {
    let url = `/${path}/${tipo}`;
    this._pqrService
      .getListados(url)
      .subscribe((response: any) => {
        if (response.length != 0) {
          this[variable] = response;
          if (variable == "listadoResponsablePQRS") {
            this.datos.responsable = this.listadoResponsablePQRS[0].login;
            this.datos.area = this.listadoResponsablePQRS[0].area;
            let index = this.listadoSolucionPQRS.findIndex(data => data.id == tipo);
            if (index != -1) {
              this.datos.fechaParaSolucion = this.listadoSolucionPQRS[index].diaSolucion;
            } else {
              this.datos.fechaParaSolucion = '';
            }
          }
        } else {
          Swal.fire(
            '¡Información!',
            `No tiene ${titulo} parametrizada`,
            'error'
          );
          this[variable] = [];
        }
      });
  }

  nombreSolucion(dato) {

    let index = this.listadoSolucionPQRS.findIndex(data => data.id == dato);
    let retu
    if (index != -1) {
      retu =this.listadoSolucionPQRS[index].descripcion;
    } else {
      retu ='';
    }
    return retu;
  }
  nombreCausal(dato) {


    let index = this.listadoCasualPQRS.findIndex(data => data.id == dato);
    let retu
    if (index != -1) {
    retu = this.listadoCasualPQRS[index].descripcion;
  
    } else {
      retu = '';
    }
    return retu;
  }

}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PagoMasivoService } from 'app/core/services/pago-masivo.service';
import {MatDialog} from '@angular/material/dialog'; 
import * as XLSX from 'xlsx';
import moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pago-masivo',
  templateUrl: './pago-masivo.component.html',
  styleUrls: ['./pago-masivo.component.scss']
})
export class PagoMasivoComponent implements OnInit {

  listRowsExcel: any = []; // filas del archivo convertido a JSON
  cabeceras: any = [];
  ejemplos: any = [];
  igual: boolean;
  listAsignados: any = {"details":[]};
  filtrarTabla:string=''; // filtrar la tabla
  chequeada: boolean = false;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private pago: PagoMasivoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.ejemplos = [
      "Identificacion",
      "Fecha Pago",
      "Banco",
      "Sucursal",
      "Valor Aplicar Neto",
      "Comision Recaudo"
    ]
  }

  subirArchivo(event) {
    this.listRowsExcel = [];
    this.cabeceras = [];
    const seleccionado = event.target.files[0];
    const lector = new FileReader();
    lector.readAsBinaryString(seleccionado);
    lector.onload = (event) => {
      let datoBinario = event.target.result;
      let workbook = XLSX.read(datoBinario, {type:'binary'})
      let hoja = workbook.SheetNames[0];
      const data = XLSX.utils.sheet_to_json(workbook.Sheets[hoja]);
      this.listRowsExcel = data;
      this.cabeceras=Object.keys(this.listRowsExcel[0])
      this.comparar(this.cabeceras, this.ejemplos)
      if (this.igual==true) {
        for (let index = 0; index < this.listRowsExcel.length; index++) {
          const element = this.listRowsExcel[index];
          element['nitTransportadora']=element['Identificacion'];
          delete element['Identificacion'];
          element['fechaPago']=element['Fecha Pago'];
          delete element['Fecha Pago'];
          element['banco']=element['Banco'];
          delete element['Banco'];
          element['sucursal']=element['Sucursal'];
          delete element['Sucursal'];
          element['valorAplicar']=element['Valor Aplicar Neto'];
          delete element['Valor Aplicar Neto'];
          element['comisionRecaudo']=element['Comision Recaudo'];
          delete element['Comision Recaudo'];
          element.chequeado = false;
        }
      } else {
        this.listRowsExcel = [];
        this.cabeceras = [];
        Swal.fire({
          title: 'Archivo incorrecto',
          icon: 'info',
          imageUrl: 'assets/images/estructuras.png',
          imageWidth: 400,
          html: '<p class="text-justify">Los archivos a importar deben cumplir con la estructura mostrada.</p>'
        })
      }
    }
    this.fileInput.nativeElement.value = '';
  }

  comparar(cabeceras:any[], ejemplo:any[]){
    if (cabeceras.length == ejemplo.length) {
      for (let i = 0; i < cabeceras.length; i++) {
        const elementoUno = cabeceras[i];
        const elementoDos = ejemplo[i]
        if(elementoUno[i] == elementoDos[i]){
          this.igual = true;
        }else{
          this.igual = false;
        }
      }
    }else{
      this.igual = false;
    }
  }

  updateAllComplete() {
    this.chequeada = this.listRowsExcel != null && this.listRowsExcel.every(t => (t.chequeado));
  }

  setAll(completed: boolean) {
    this.chequeada = completed;
    if (this.listRowsExcel == null) {
      return;
    }
    if (this.chequeada == true) {
      this.listAsignados.details=[];
      for (const item of this.listRowsExcel){
        this.listAsignados.details.push({
          "nitTransportadora": item.nitTransportadora.toString(),         
          "fechaPago": moment(item.fechaPago).format("YYYY-MM-DD"),
          "banco": item.banco,
          "sucursal": item.sucursal,
          "valorAplicar":item.valorAplicar.toString(),
          "comisionRecaudo":item.comisionRecaudo.toString()
        })
      }
    }else{
      this.listAsignados.details=[];
    }
    this.listRowsExcel.forEach(t => (t.chequeado = completed));
  }

  acumular(item, event){
    let data = {
      "nitTransportadora": item.nitTransportadora.toString(),         
      "fechaPago": moment(item.fechaPago).format("YYYY-MM-DD"),
      "banco": item.banco,
      "sucursal": item.sucursal,
      "valorAplicar":item.valorAplicar.toString(),
      "comisionRecaudo":item.comisionRecaudo.toString()
    }

    if (event.checked) {
      this.listAsignados.details.push(data)
    } else {
      const dataBuscar = this.listAsignados.details.filter(data => data.nitTransportadora == item.nitTransportadora);
      let idx = this.listAsignados.details.indexOf(dataBuscar[0]);
      this.listAsignados.details.splice(idx, 1);
    }

    if (this.listAsignados.details.length >= this.listRowsExcel.length) {
      this.chequeada = true;
    } else {
      this.chequeada = false;
    }

  }

  enviar(){
    Swal.fire({
      title: 'Cargando',
      html: 'Enviando informacion de pago',
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 500000,
      didOpen: () => {
        Swal.showLoading()
        this.pago.postPagoMasivo(this.listAsignados).subscribe(res =>{
          const dataBuscar = this.listRowsExcel.filter(data => data.chequeado == true);
          for (let index = 0; index < dataBuscar.length; index++) {
            let idx = this.listRowsExcel.indexOf(dataBuscar[index]);
            this.listRowsExcel.splice(idx, 1);
          }
          Swal.close();
          if (res) {
            Swal.fire(
              'Correcto',
              'Se ha realizado el pago exitosamente.',
              'success'
            )
          }else{
            Swal.fire(
              'Error',
              'No se ha podido realizar el pago, porfavor intente mas tarde.',
              'error'
            )
          }
        }, error => {
          Swal.fire(
            'Error',
            'No se ha podido realizar el pago, porfavor intente mas tarde.',
            'error'
          )
        })
      }
    })
  }

}

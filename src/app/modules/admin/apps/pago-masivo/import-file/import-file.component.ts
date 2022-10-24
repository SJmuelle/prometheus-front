import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import moment from 'moment';

@Component({
  selector: 'app-import-file',
  templateUrl: './import-file.component.html',
  styleUrls: ['./import-file.component.scss']
})
export class ImportFileComponent implements OnInit {

  listRowsExcel: any = []; // filas del archivo convertido a JSON
  cabeceras: any = [];
  listAsignados: any = {"details":[]};
  filtrarTabla:string=''; // filtrar la tabla
  chequeada: boolean = false;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor() { }

  ngOnInit() {
  }
  /*
    Convertir archivo excel a JSON.
  */
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
    }
    this.fileInput.nativeElement.value = '';
  }

  updateAllComplete() {
    this.chequeada = this.listRowsExcel != null && this.listRowsExcel.every(t => (t.chequeado));
  }

  setAll(completed: boolean) {
    this.chequeada = completed;
    if (this.listRowsExcel == null) {
      return;
    }
    this.listRowsExcel.forEach(t => (t.chequeado = completed));
  }

  acumular(item, event){
    let data = {
      "nitTransportadora": item.nitTransportadora,         
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

    if (this.listAsignados.length >= this.listRowsExcel.length) {
      this.chequeada = true;
    } else {
      this.chequeada = false;
    }

  }

  enviar(){

  }

}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PagoMasivoService } from 'app/core/services/pago-masivo.service';
import * as XLSX from 'xlsx';
import moment from 'moment';
import Swal from 'sweetalert2';

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

  constructor(private pago: PagoMasivoService) { }

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
    console.log(this.listRowsExcel)
    console.log(this.listAsignados)
    for (let index = 0; index < this.listAsignados.details.length; index++) {
      let search = {
        "nitTransportadora": parseInt(this.listAsignados.details[index].nitTransportadora),
        "fechaPago": this.listAsignados.details[index].fechaPago,
        "banco":this.listAsignados.details[index].banco,
        "sucursal":this.listAsignados.details[index].sucursal,
        "valorAplicar":parseInt(this.listAsignados.details[index].valorAplicar),
        "comisionRecaudo":parseInt(this.listAsignados.details[index].comisionRecaudo),
        "chequeado":true
      }
      console.log(search)
      const indice = this.listRowsExcel.indexOf(search)
      console.log(indice)
    }
    // Swal.fire({
    //   title: 'Cargando',
    //   html: 'Enviando informacion de pago',
    //   allowOutsideClick: false,
    //   showConfirmButton: false,
    //   timer: 500000
    // })
    // this.pago.postPagoMasivo(this.listAsignados).subscribe(res =>{
    //   Swal.close();
    //   if (res) {
    //     Swal.fire(
    //       'Correcto',
    //       'Se ha realizado el pago exitosament.',
    //       'success'
    //     )
    //   }else{
    //     Swal.fire(
    //       'Error',
    //       'No se ha podido realizar el pago, porfavor intente mas tarde.',
    //       'error'
    //     )
    //   }
    // }, error => {
    //   Swal.fire(
    //     'Error',
    //     'No se ha podido realizar el pago, porfavor intente mas tarde.',
    //     'error'
    //   )
    // })
  }

}

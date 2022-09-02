import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import-file',
  templateUrl: './import-file.component.html',
  styleUrls: ['./import-file.component.scss']
})
export class ImportFileComponent implements OnInit {

  listRowsExcel: any = []; // filas del archivo convertido a JSON
  cabeceras: any = []
  valores: any = []
  listValores: any = []
  filtrarTabla:string=''; // filtrar la tabla
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor() { }

  ngOnInit() {
  }
  /*
    Convertir archivo excel a JSON.
  */
  subirArchivo(event) {
    this.listRowsExcel = [];
    const seleccionado = event.target.files[0];
    const lector = new FileReader();
    lector.readAsBinaryString(seleccionado);
    lector.onload = (event) => {
      let datoBinario = event.target.result;
      let workbook = XLSX.read(datoBinario, {type:'binary'})
      let hoja = workbook.SheetNames[0];
      const data = XLSX.utils.sheet_to_json(workbook.Sheets[hoja]);
      this.listRowsExcel = data;
      // console.log(this.listRowsExcel)
      this.cabeceras=Object.keys(this.listRowsExcel[0])
      // console.log(this.cabeceras)

      for (let index = 0; index < this.listRowsExcel.length; index++) {
        const element = this.listRowsExcel[index];
        this.valores = Object.values(element)
        // console.log(this.valores)
        // const obj = Object.assign({}, this.valores);
        // console.log(obj)
        this.listValores.push(this.valores)
      }
      console.log(this.listValores)
      console.log(this.listValores[0])
      // workbook.SheetNames.forEach(sheet => {
      //   const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
      //   this.createdJson = JSON.stringify(data, undefined, 4);
      //   console.log(this.createdJson)
      // })
      // console.log(workbook.SheetNames[0])
    }
    this.fileInput.nativeElement.value = '';
  }

}

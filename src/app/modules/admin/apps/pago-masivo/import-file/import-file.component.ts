import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import-file',
  templateUrl: './import-file.component.html',
  styleUrls: ['./import-file.component.scss']
})
export class ImportFileComponent implements OnInit {

  listRowsExcel: any = []; // filas del archivo convertido a JSON
  filtrarTabla:string=''; // filtrar la tabla

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
      console.log(this.listRowsExcel)
      // workbook.SheetNames.forEach(sheet => {
      //   const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
      //   this.createdJson = JSON.stringify(data, undefined, 4);
      //   console.log(this.createdJson)
      // })
      // console.log(workbook.SheetNames[0])
    }
  }

}

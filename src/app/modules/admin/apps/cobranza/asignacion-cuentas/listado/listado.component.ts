import { Component, OnInit } from '@angular/core';
import { IOptionTable } from 'app/core/interfaces';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  dataRow=[];
  public optionsTable: IOptionTable[] = [
    {
      name: 'name',
      text: 'holaa',
      typeField: 'text',
    },
  ];
  public displayedColumns: string[] = [
    ...this.optionsTable.map(({ name }) => name),
  ];
  constructor() { }

  ngOnInit(): void {
    this.dataRow.push(
      {
        name:"hola",
        id:1,

      },
      {
        name:"hola",
        id:1,

      }
    )
  }
  selecAlarmTable(e) {
    console.log(e)
  }
}

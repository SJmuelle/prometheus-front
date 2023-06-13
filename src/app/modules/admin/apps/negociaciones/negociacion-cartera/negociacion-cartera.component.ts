import { Component, OnInit } from '@angular/core';
import { NegociacionCarteraService } from 'app/core/services/negociacion-cartera.service';
import { TableDataFilterService } from 'app/core/services/table-data-filter.service';

@Component({
  selector: 'app-negociacion-cartera',
  templateUrl: './negociacion-cartera.component.html',
  styleUrls: ['./negociacion-cartera.component.scss']
})
export class NegociacionCarteraComponent implements OnInit {

  public seacrhType: 'Cedula' | 'Negocio' = 'Cedula'
  public valueSearch: string = 'MC17223';
  public dataRow: any[] = []


  constructor(private _negociacionCarteraService: NegociacionCarteraService,
    private _tableFilter: TableDataFilterService) { }

  ngOnInit(): void {
  }

  public filtrar(text: string): void {
    const filterValue = text.trim().toUpperCase();
    this._tableFilter.sendFilterData(filterValue);


  }

  public search(): void {

    const data = `${this.valueSearch?.toUpperCase()}`

    this._negociacionCarteraService.ObtenerNegociacionCartera(data).subscribe({
      next: (resp) => {
        console.log(resp)
        this.dataRow = resp.data


      }, error: (err) => {
        console.log(err);
      }
    })


  }

}


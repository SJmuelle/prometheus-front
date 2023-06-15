import { Component, OnInit } from '@angular/core';
import { NegociacionCarteraService } from 'app/core/services/negociacion-cartera.service';
import { TableDataFilterService } from 'app/core/services/table-data-filter.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-negociacion-cartera',
  templateUrl: './negociacion-cartera.component.html',
  styleUrls: ['./negociacion-cartera.component.scss']
})
export class NegociacionCarteraComponent implements OnInit {

  public seacrhType: 'Cedula' | 'Negocio' = 'Cedula'
  public valueSearch: string = 'MC17223';
  public dataRow: any[] = [];
  public opened: boolean = false;
  public dataRowSelect: any = {};
  public ListadoNegociaciones: any[] = [];

  constructor(private _negociacionCarteraService: NegociacionCarteraService,
    private _tableFilter: TableDataFilterService) { }

  ngOnInit(): void {
  }

  public filtrar(text: string): void {
    const filterValue = text.trim().toUpperCase();
    this._tableFilter.sendFilterData(filterValue);


  }

  public dataSelect(dataRow: any): void {
    this.opened = true;
    this.dataRowSelect = { ...dataRow };

  }

  public ListaOpcionesDisponibles(listadoOpcionesDisponibles: any[]): void {
    this.opened = true;
    this.ListadoNegociaciones = listadoOpcionesDisponibles || []
  }

  public search(): void {
    Swal.fire({ title: 'Cargando', html: 'Por favor espere', allowOutsideClick: false, timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })

    this.opened = false;
    this.dataRow = []
    const data = `${this.valueSearch?.toUpperCase()}`

    this._negociacionCarteraService.ObtenerNegociacionCartera(data).subscribe({
      next: (resp) => {
        console.log(resp)
        this.dataRow = resp.data || []
        Swal.close();
      }, error: (err) => {
        console.log(err);
        Swal.close();

      }
    })


  }

}


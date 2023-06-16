import { Component, OnInit, OnDestroy } from '@angular/core';
import { NegociacionCarteraService } from 'app/core/services/negociacion-cartera.service';
import { TableDataFilterService } from 'app/core/services/table-data-filter.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-negociacion-cartera',
  templateUrl: './negociacion-cartera.component.html',
  styleUrls: ['./negociacion-cartera.component.scss']
})
export class NegociacionCarteraComponent implements OnInit, OnDestroy {

  public seacrhType: 'Cedula' | 'Negocio' = 'Cedula'
  public valueSearch: string = 'MC17223';
  public dataRow: any[] = [];
  public opened: boolean = false;
  public dataRowSelect: any = {};
  public ListadoNegociaciones: any[] = [];
  private subscripcion$: Subscription = new Subscription();

  constructor(private _negociacionCarteraService: NegociacionCarteraService,
    private _tableFilter: TableDataFilterService) { }

  ngOnDestroy(): void {
    this.subscripcion$.unsubscribe();
  }

  ngOnInit(): void {
    this.reloadData();
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

  public async search(): Promise<any> {

    return new Promise((resolve) => {
      if (this.valueSearch.length === 0) { return }
      Swal.fire({ title: 'Cargando', html: 'Por favor espere', allowOutsideClick: false, timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })

      this.opened = false;
      this.dataRow = []
      const data = `${this.valueSearch?.toUpperCase()}`

      this._negociacionCarteraService.ObtenerNegociacionCartera(data).subscribe({
        next: (resp) => {


          (resp.data || []).forEach((item) => {

            if (item?.tiene_negociacion === 'SI') {
              item.tiene_negociacion = 'Negociado'
            } else {

              item.tiene_negociacion = 'Por negociar'
            }

          })

          this.dataRow = resp.data || []
          Swal.close();
          resolve(this.dataRow);
        }, error: (err) => {
          console.log(err);
          Swal.close();

        }
      })
    })




  }

  private reloadData(): void {
    this.subscripcion$ = this._negociacionCarteraService.reloadData$.subscribe((resp) => {
      if (resp.reload === true) {
        this.search();
      }
    });
  }

}


import { Component, OnInit, OnDestroy } from '@angular/core';
import { NegociacionCarteraService } from 'app/core/services/negociacion-cartera.service';
import { TableDataFilterService } from 'app/core/services/table-data-filter.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs'
import { Sweetalert2Service } from 'app/core/services/sweetalert2.service';

@Component({
  selector: 'app-negociacion-cartera',
  templateUrl: './negociacion-cartera.component.html',
  styleUrls: ['./negociacion-cartera.component.scss']
})
export class NegociacionCarteraComponent implements OnInit, OnDestroy {

  public seacrhType: 'Cedula' | 'Negocio' = 'Cedula'
  public valueSearch: string = '';
  // public valueSearch: string = 'MC17223';
  public dataRow: any[] = [];
  public opened: boolean = false;
  public dataRowSelect: any = {};
  public ListadoNegociaciones: any[] = [];
  private subscripcion$: Subscription = new Subscription();

  constructor(private _negociacionCarteraService: NegociacionCarteraService,
    private _tableFilter: TableDataFilterService, private _sweetAlert: Sweetalert2Service) { }

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

    if (this.valueSearch.length === 0) { return }
    return new Promise((resolve) => {
      // this.dataRow = [
      //   {
      //     identificacion: '55235881',
      //     nombre: 'FLOREZ MIRANDA LEIDI VANESSA',
      //     cod_neg: 'MC17223',
      //     mora_actual_dias: '1356',
      //     mora_actual: '14- MAYOR A 1 ANIO',
      //     interes_mora: 13153659,
      //     gastos_cobranza: 0,
      //     saldo_total: 6276424,
      //     capital: 12689868,
      //     debido_cobrar: 25843527,
      //     tiene_negociacion: 'Negociado'
      //   },
      //   {
      //     identificacion: '123123',
      //     nombre: 'Leonardo Arape',
      //     cod_neg: 'MC17223',
      //     mora_actual_dias: '1356',
      //     mora_actual: '14- MAYOR A 1 ANIO',
      //     interes_mora: 13153659,
      //     gastos_cobranza: 6276424,
      //     saldo_total: 25843527,
      //     capital: 999999,
      //     debido_cobrar: 25843527,
      //     tiene_negociacion: 'Por negociar'
      //   },
      //   {
      //     identificacion: '1231213',
      //     nombre: 'Juancho perez',
      //     cod_neg: 'MC17223',
      //     mora_actual_dias: '1356',
      //     mora_actual: '14- MAYOR A 1 ANIO',
      //     interes_mora: 88888,
      //     gastos_cobranza: 88888,
      //     saldo_total: 88888,
      //     capital: 88888,
      //     debido_cobrar: 88888,
      //     tiene_negociacion: 'Por negociar'
      //   },

      // ]


      this.opened = false;
      this._negociacionCarteraService.reloadData$.next({ fullTable: true })
      this._sweetAlert.startLoading({});

      const data = `${this.valueSearch?.toUpperCase()}`
      this._negociacionCarteraService.ObtenerNegociacionCartera(data).subscribe({
        next: (resp) => {
          (resp?.data || []).forEach((item) => {
            if (item?.tiene_negociacion === 'SI') {
              item.tiene_negociacion = 'Negociado'
            } else {
              item.tiene_negociacion = 'Por negociar'
            }
          })
          this.dataRow = resp?.data || []
          this._sweetAlert.stopLoading();
          resolve(this.dataRow)
        }, error: (err) => {
          console.log(err);
          this._sweetAlert.alertError();
        }
      })
    })
  }

  private reloadData(): void {
    this.subscripcion$ = this._negociacionCarteraService.reloadData$.subscribe((resp) => {
      if (resp.reload === true) {
        this.search().then(() => {
          this._sweetAlert.alertSuccess();
        })
      }
    });
  }

}


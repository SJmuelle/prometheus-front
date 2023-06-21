import { Component, OnInit } from '@angular/core';
import { GenericasService } from 'app/core/services/genericas.service';
import { Sweetalert2Service } from 'app/core/services/sweetalert2.service';
import { TableDataFilterService } from 'app/core/services/table-data-filter.service';
import { PqrService } from '../../pqr/pqr.service';


@Component({
  selector: 'app-reporterd-mercadeo',
  templateUrl: './reporterd-mercadeo.component.html',
  styleUrls: ['./reporterd-mercadeo.component.scss']
})
export class ReporterdMercadeoComponent implements OnInit {
  public datos: any[] = [];
  public fechaActual = new Date();
  public page: number = 1;
  public selectLotes: any[] = []

  public dataOptionTable: any[] = [
    {
      name: 'identificacion',
      text: 'Identificación',
      typeField: 'text',
    },
    {
      name: 'nombre',
      text: 'Nombres',
      typeField: 'text',
    },
    {
      name: 'codigoNegocio',
      text: 'Código Negocio',
      typeField: 'text',
    },
    {
      name: 'fechaPago',
      text: 'Fecha Pago',
      typeField: 'text',
    },
    {
      name: 'valorCuota',
      text: 'Valor Cuota',
      typeField: 'text',
    },
    {
      name: 'referenciaPago',
      text: 'Referencia Pago',
      typeField: 'text',
    },
    {
      name: 'estado',
      text: 'Estado',
      typeField: 'text',
    },
    {
      name: 'fechaCreacion',
      text: 'Fecha',
      typeField: 'text',
    },
  ];
  public dataColumn: string[] = [...this.dataOptionTable.map((value) => { return value.name })];

  constructor(
    private _sweetAlert: Sweetalert2Service,
    private _datareporteService: GenericasService,
    private _pqrService: PqrService,
    private _tableDataFilterService: TableDataFilterService,
    private _genericasService: GenericasService
  ) { }

  ngOnInit(): void {

    this.obtenerinformacion();
    this.listSelect();
  }


  public listSelect(): void {
    this._genericasService.getLotes().subscribe({
      next: (resp) => {
        this.selectLotes = resp?.data || [];
      },
      error: () => { }
    })
  }

  obtenerinformacion(): void {
    this._sweetAlert.startLoading();
    this._datareporteService.getReporteRd().subscribe({

      next: (resp) => {
        this.datos = resp?.data || []
        this._sweetAlert.stopLoading();
      },
      error: (err) => { }

    })
  }
  exportAsXLSX(): void {
    this._pqrService.exportAsExcelFile(this.datos, 'listado');
  }

  public search(value): void {
    const filterValue = value.trim().toUpperCase();
    this._tableDataFilterService.sendFilterData(filterValue);
  }
}

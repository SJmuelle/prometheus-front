import { Component, OnInit } from '@angular/core';
import { ConsultaNegociacionesCarteraService } from 'app/core/services/consulta-negociaciones-cartera.service';
import { Sweetalert2Service } from 'app/core/services/sweetalert2.service';
import { IinfoTitulo } from 'app/shared/componentes/header/header.component';
import { IoptionTable } from 'app/shared/componentes/table/table.component';
import moment from 'moment';
import { PqrService } from '../../pqr/pqr.service';

@Component({
  selector: 'app-consulta-negociaciones',
  templateUrl: './consulta-negociaciones.component.html',
  styleUrls: ['./consulta-negociaciones.component.scss']
})
export class ConsultaNegociacionesComponent implements OnInit {

  public tableOptions: IoptionTable[] = [
    { name: 'codNeg', text: 'Negocio', typeField: 'text', },
    { name: 'identificacion', text: 'Documento', typeField: 'text' },
    { name: 'nombre', text: 'Cliente', typeField: 'text' },
    { name: 'tipoNegociacion', text: 'Tipo negociación', typeField: 'text' },
    { name: 'descripcionNegociacion', text: 'Descripción', typeField: 'text' },
    { name: 'debidoAlNegociar', text: 'Valor debido', typeField: 'text', pipeName: 'number', classTailwind: 'whitespace-pre' },
    { name: 'porcentajeDtoDebido', text: '% aplicado', typeField: 'text', pipeName: 'percentage' },
    { name: 'valorDtoDebdo', text: 'Valor descuento', typeField: 'text', pipeName: 'number', classTailwind: 'whitespace-pre' },
    { name: 'ixmAlNegociar', text: 'Interes por mora', typeField: 'text', pipeName: 'number', classTailwind: 'whitespace-pre' },
    { name: 'porcentajeDtoIxm', text: '% intereses', typeField: 'text', pipeName: 'percentage' },
    { name: 'valorDtoIxm', text: 'Valor descuento', typeField: 'text', pipeName: 'number', classTailwind: 'whitespace-pre' },
    { name: 'gacAlNegociar', text: 'Gasto cobranza', typeField: 'text', pipeName: 'number', classTailwind: 'whitespace-pre' },
    { name: 'porcentajeDtoGac', text: '% gasto cobranza', typeField: 'text', pipeName: 'percentage' },
    { name: 'valorDtoGac', text: 'Valor gasto cobranza', typeField: 'text', pipeName: 'number', classTailwind: 'whitespace-pre' },
    { name: 'usuarioNegociacion', text: 'Usuario negociación', typeField: 'text' },
    { name: 'fechaNegociacion', text: 'Fecha negociación', typeField: 'text', pipeName: 'date' },
  ]
  public tittle: IinfoTitulo = { titulo: 'Negociaciones de cartera', subtitulo: 'Aqui puede consultar las negociaciones realizadas' }
  public date: any = { dateInit: null, dateEnd: null }
  public dataNegociaciones: any[] = []

  constructor(private _consultaNegociaciones: ConsultaNegociacionesCarteraService,
    private _sweetAlertService: Sweetalert2Service,
    private _pqrService: PqrService
  ) { }

  ngOnInit(): void {
  }

  public exportAsXLSX(): void {
    this._pqrService.exportAsExcelFile(this.dataNegociaciones, 'listado_Negociaciones');
  }

  public searchNegociaciones(): void {


    if (!this.date.dateInit || !this.date.dateEnd) {
      return
    }

    const dates: any = {
      dateInit: moment(this.date.dateInit).format('YYYY-MM-DD'),
      dateEnd: moment(this.date.dateEnd).format('YYYY-MM-DD'),
    };
    this._sweetAlertService.startLoading({});
    this._consultaNegociaciones.obtenerNegociacionesCliente({ ...dates }).pipe().subscribe({
      next: (resp: any) => {

        if (!resp.data.length) {
          this._sweetAlertService.alertInfo({});
          this.dataNegociaciones = []
          return
        }

        this._sweetAlertService.stopLoading();
        this.dataNegociaciones = resp?.data || []

      },
      error: (e) => {
        this._sweetAlertService.alertError();

      }
    })
  }

}

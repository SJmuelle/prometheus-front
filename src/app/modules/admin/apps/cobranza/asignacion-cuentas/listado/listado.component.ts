import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOptionTable } from 'app/core/interfaces';
import { CajaVirtualService } from 'app/core/services/caja-virtual.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'listado-asignaciones',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  dataRow = [];
  public optionsTable: IOptionTable[] = [
    {
      name: 'numeroDocumentos',
      text: 'N°',
      typeField: 'number',
    },
    {
      name: 'numeroSolicitud',
      text: 'Número de negocio',
      typeField: 'text',
    },
    {
      name: 'cliente',
      text: 'Nombre del cliente',
      typeField: 'text',
    },
    {
      name: 'identificacion',
      text: 'CC del cliente',
      typeField: 'number',
    },
    {
      name: 'saldoCartera',
      text: 'Debito a cobrar',
      typeField: 'moneda',
    },
    {
      name: 'diasMora1',
      text: 'Tramo de mora actual',
      typeField: 'text',
    },
    {
      name: 'diasMora2',
      text: 'Cuotas vencidad',
      typeField: 'text',
    },
    {
      name: 'diasMora3',
      text: 'Cuotas pendientes',
      typeField: 'text',
    },
    {
      name: 'diasMora4',
      text: 'Cuotas pagadas',
      typeField: 'text',
    }
  ];
  public displayedColumns: string[] = [
    ...this.optionsTable.map(({ name }) => name),
  ];
  constructor(private _cajaVirtualService: CajaVirtualService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getInformacionNegocios();
  }
  selecAlarmTable(e) {
    console.log(e)
    this.router.navigate([`/cobranza/asignacion-cuentas/${e.numeroSolicitud}`]);
  }

  getInformacionNegocios() {

    this._cajaVirtualService.cuentasAsignadas$.subscribe((res) => {

      this.dataRow = res;
    });
  }
}

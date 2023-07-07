import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableDataFilterService } from 'app/core/services/table-data-filter.service';
import { IoptionTable } from 'app/shared/componentes/table/table.component';
import Swal from 'sweetalert2';
import { PqrService } from '../pqr.service';
import { DetalleHistorialComponent } from './detalle-historial/detalle-historial.component';

@Component({
  selector: 'app-historial-pqr',
  templateUrl: './historial-pqr.component.html',
  styleUrls: ['./historial-pqr.component.scss']
})
export class HistorialPqrComponent implements OnInit {
  listado: any = [];
  datos: any = [];
  page: number = 1;
  tamanoTabl: number = 5;
  filtrarTabla: string = '';
  id: number = 0;
  public dataOptionsTable: IoptionTable[] = [

    {
      name: 'Option',
      text: '',
      typeField: 'function',
      callback: (data) => {
        const { id } = data
        this.abrirDetalle(id)
      },
    },
    {
      name: 'identificacion',
      text: 'Cédula',
      typeField: 'text',
    },
    {
      name: 'nombres',
      text: 'Nombres',
      typeField: 'text',
      pipeName: 'titleCase'
    },
    {
      name: 'apellidos',
      text: 'Apellidos',
      typeField: 'text',
      pipeName: 'titleCase'
    },
    {
      name: 'linea_credito',
      text: 'Línea de crédito',
      typeField: 'text',
      pipeName: 'titleCase'
    },
    {
      name: 'negocio',
      text: 'Negocio',
      typeField: 'text',
      pipeName: 'titleCase'
    },
    {
      name: 'tipo_pqrs',
      text: 'Tipo de PQRS',
      typeField: 'text',
      pipeName: 'titleCase'
    },
    {
      name: 'causal_pqrs',
      text: 'Causal de PQRS',
      typeField: 'text',
      pipeName: 'titleCase'
    },
    {
      name: 'fecha_radicacion',
      text: 'Fecha de radicación',
      typeField: 'text',
      pipeName: 'date'
    },
    {
      name: 'responsable',
      text: 'Responsable',
      typeField: 'text',
      pipeName: 'titleCase'
    },
    {
      name: 'estado',
      text: 'Estado',
      typeField: 'statusStyle',
      pipeName: 'titleCase',
      styleCondition: (data) => {
        const { estado } = data
        const stateselect = {
          'POR TRAMITAR': 'bg-red-200',
          'EN TRAMITE': 'bg-blue-200',
          'RESUELTO': 'bg-green-200'
        }
        return stateselect[estado] || 'bg-yellow-200'
      }
    }
  ]

  constructor(public dialog: MatDialog, private _pqrService: PqrService, private _searchTableService: TableDataFilterService) { }

  ngOnInit(): void {
    this.consulta()
  }

  consulta() {
    Swal.fire({ title: 'Cargando', html: 'Buscando el historial de PQRS', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._pqrService.setHistorial().subscribe((response: any) => {
      Swal.close();
      if (response) {
        this.listado = response;
      } else {
        this.listado = [];
      }
    });
  }

  public search(): void {
    this._searchTableService.sendFilterData(this.filtrarTabla);
  }

  abrirDetalle(id) {
    const dialogRef = this.dialog.open(DetalleHistorialComponent, {
      width: '60%',
      data: id,
    });
    dialogRef.afterClosed().subscribe((result) => { });

  }

}

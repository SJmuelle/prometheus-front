import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PqrService } from '../pqr.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RangoComponent } from './rango/rango.component';
import { isObject } from 'lodash';
import { IoptionTable } from 'app/shared/componentes/table/table.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  listado: any[] = [];
  page: number = 1;
  tamanoTabl: number = 5;
  filtrarTabla: string = '';
  mostrar_form: boolean = true;
  rangoFecha: any;
  maxRegistros: number = 0;
  filRegistros: number = 0;
  dataOptionsTable: IoptionTable[] = [
    {
      name: 'Option',
      text: '',
      typeField: 'function',
      callback: (data) => {
        const { id } = data
        this.gestion(id)
      },
      iconSGV: 'heroicons_outline:pencil-alt',

    },
    {
      name: 'numeroPqrs',
      text: 'N°',
      typeField: 'text',
    },
    {
      name: 'identificacion',
      text: 'Identificación',
      typeField: 'text',
    },
    {
      name: 'nombreCliente',
      text: 'Nombre completo',
      typeField: 'text',
      pipeName: 'titleCase'
    },
    {
      name: 'lineaNegocio',
      text: 'Línea de negocio',
      typeField: 'text',
      pipeName: 'titleCase'
    },
    {
      name: 'tipoPqrs',
      text: 'Tipo',
      typeField: 'text',
      pipeName: 'titleCase'
    },
    {
      name: 'causalPqrs',
      text: 'Causal',
      typeField: 'text',
      pipeName: 'titleCase'
    },
    {
      name: 'responsable',
      text: 'Responsable',
      typeField: 'text',
      pipeName: 'titleCase'
    },
    {
      name: 'escalado',
      text: 'Escalado',
      typeField: 'text',
      pipeName: 'titleCase'
    },
    {
      name: 'diasxvencer',
      text: 'Días por vencer',
      typeField: 'text',
    },
    {
      name: 'estado',
      text: 'Estado',
      typeField: 'text',
      pipeName: 'titleCase'
    }, {
      name: 'fechaSolucion',
      text: 'Solución',
      typeField: 'text',
      pipeName: 'date'
    },
    {
      name: 'solucionPqrs',
      text: 'Solución',
      typeField: 'text',
    },
    {
      name: 'numeroRechazados',
      text: 'N° rechazos',
      typeField: 'text',
    },
    {
      name: 'fechaRechazo',
      text: 'Último rechazo',
      typeField: 'text',
      pipeName: 'date'
    },
    {
      name: 'usuario_creacion',
      text: 'Usuario Creación',
      typeField: 'text',
      pipeName: 'titleCase'
    }
  ]

  constructor(private router: Router, private _pqrService: PqrService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.consulta();
  }

  exportAsXLSX(): void {
    this._pqrService.exportAsExcelFile(this.listado, 'listado_gestion');
  }

  consulta() {
    Swal.fire({ title: 'Cargando', html: 'Buscando información de PQRS', timer: 500000, allowOutsideClick: false, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._pqrService.getListados('listar-pqrs-gestion').subscribe({
      next: (response) => {
        Swal.close();
        if (response) {
          this.listado = response || [];
          this.listado = [
            {
              numeroPqrs: '01',
              identificacion: '1047361882',
              nombreCliente: 'Leonardo',
              apellidosCliente: 'Arape',
              lineaNegocio: 'neg 01',
              tipoPqrs: 'pqrs1',
              causalPqrs: 'queja',
              responsable: 'leo',
              escalado: 'no',
              diasxvencer: '5',
              estado: 'por vencer',
              fechaSolucion: '20/04/2023',
              solucionPqrs: 'por solucion',
              numeroRechazados: '5',
              fechaRechazo: '05/04/2023',
              usuario_creacion: 'larape'
            }
          ]
          this.listado.forEach((item) => {
            item.nombreCliente = item.nombreCliente + ' ' + item.apellidosCliente
          })
          this.maxRegistros = this.listado.length;
          this.filRegistros = this.listado.length;
          console.log('listado', this.listado);
        }
      },
      error: () => { }
    });
  }

  filtrarPQRS(data) {
    Swal.fire({ title: 'Cargando', html: 'Buscando información de PQRS', timer: 500000, allowOutsideClick: false, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._pqrService.postFiltro('/credito/tk/property/busqueda-historial-pqrs', data).subscribe((response: any) => {
      Swal.close();
      if (response) {
        this.listado = response?.data?.historicoPqrs || [];
        this.listado.forEach((item) => {
          item.nombreCliente = item.nombreCliente + item.apellidosCliente
        })
        this.filRegistros = this.listado.length;
      }
    })
  }

  gestion(x) {
    let url = `pqr/gestion/${x}`;
    this.router.navigateByUrl(url);
  }

  filtrarFecha() {
    const dialogRef = this.dialog.open(RangoComponent, {
      width: '35%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (isObject(result)) {
        this.filtrarPQRS(result)
      }
    });
  }

}

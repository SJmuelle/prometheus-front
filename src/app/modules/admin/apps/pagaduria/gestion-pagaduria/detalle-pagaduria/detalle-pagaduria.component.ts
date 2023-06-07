import { Component, OnInit } from '@angular/core';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { ListadoPagaduriasComponent } from '../listado-pagadurias/listado-pagadurias.component';

@Component({
  selector: 'app-detalle-pagaduria',
  templateUrl: './detalle-pagaduria.component.html',
  styleUrls: ['./detalle-pagaduria.component.scss']
})
export class DetallePagaduriaComponent implements OnInit {

  constructor(
    private _listadoPagaduriasComponent: ListadoPagaduriasComponent,

  ) { }

  ngOnInit(): void {
  }

    /**
   * Close the drawer
   */
    closeDrawer(): Promise<MatDrawerToggleResult> {
      return this._listadoPagaduriasComponent.matDrawer.close();
    }

}

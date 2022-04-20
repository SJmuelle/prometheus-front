import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {AgendaReferenciacionService} from '../../../../../../core/services/agenda-referenciacion.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AgendaComercialService } from '../../../../../../core/services/agenda-comercial.service';
import {FormDialogReprogramarComponent} from '../../agenda-referenciacion/form-dialog-reprogramar/form-dialog-reprogramar.component';

@Component({
  selector: 'app-grid-agenda-comercial',
  templateUrl: './grid-agenda-comercial.component.html',
  styleUrls: ['./grid-agenda-comercial.component.scss']
})
export class GridAgendaComercialComponent implements OnInit, OnDestroy {
  public unsubscribe$: Subject<any> = new Subject();
  public mostrar: boolean = true;
  public datos: any[] = [];
  public page: number = 1;
  public tamanoTabl = new FormControl("5");
  public filtrarTabla = new FormControl('');
  constructor(
    private agendaComercialService: AgendaComercialService,
    private _matDialog: MatDialog,
    private agendaReferenciaService: AgendaReferenciacionService,
    private router: Router
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  ngOnInit(): void {
    this.getAgendaComercial();
  }

  /**
     * @description: Obtiene el listado de agenda de completacion
    */
  private getAgendaComercial(): void {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
    this.agendaComercialService.getAgendaComercial().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((res) => {
      if (res.status === 200) {
        this.datos = res.data;
        this.mostrar = false;
        Swal.close();
      } else {
        Swal.close();
      }
    });
  }

  /**
     * @description: Guarda la reprogramacion
     */
  public onReprogramar(): void {
    const dialogRef = this._matDialog.open(FormDialogReprogramarComponent, {
      width: '100%',
      data: {
         numeroSolicitud: '185445'
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        console.log(res);
        this.agendaReferenciaService.refrescarListado$.next({ estado: true });
        //  this.onCerrar();
      }
    });
  }
//    public onCerrar(): void {
//      this._matDialogRef.close(true);
//  }
}

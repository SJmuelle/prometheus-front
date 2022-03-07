import {Component, OnDestroy, OnInit} from '@angular/core';
import {AgendaCompletacionService} from '../../../../../../core/services/agenda-completacion.service';
import {Observable, Subject} from 'rxjs';
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import {delay, takeUntil} from "rxjs/operators";
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-grid-agenda-completacion',
  templateUrl: './grid-agenda-completacion.component.html',
  styleUrls: ['./grid-agenda-completacion.component.scss']
})
export class GridAgendaCompletacionComponent implements OnInit, OnDestroy {
  public unsubscribe$: Subject<any> = new Subject();
  public page:number=1;
  // public tamanoTabl:number=5;
  public filtrarTabla = new FormControl('');
  public tamanoTabl = new FormControl("5");
  public mostrar: boolean = true;
  public datos: any [] = [];
  constructor(
      private agendaCompletacionService: AgendaCompletacionService,
      private router: Router
  ) { }

  ngOnInit(): void {
      this.getAgendaCompletacion();
  }
  public onGetAgenda(data: any): void {
      //this.agendaCompletacionService.seleccionAgenda.next({selected: data, show: true});
      const {numeroSolicitud, identificacion} = data;
      this.router.navigate(['/credit-factory/credit-management', numeroSolicitud, identificacion]);
  }
  /**
   * @description: Obtiene el listado de agenda de completacion
  */
  private getAgendaCompletacion(): void {
      Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
      this.agendaCompletacionService.getAgendaCompletacion().pipe(
          takeUntil(this.unsubscribe$)
      ).subscribe((res) => {
          if (res.status === 200) {
              this.datos = res.data;
              this.mostrar = false;
              Swal.close();
          }else {
              Swal.close();
          }
      });
  }

    ngOnDestroy(): void {
      this.unsubscribe$.unsubscribe();
    }

}

import { Component, OnInit } from '@angular/core';
import {AgendaCompletacionService} from '../../../../../../core/services/agenda-completacion.service';
import {Observable} from 'rxjs';
import {Router} from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grid-agenda-completacion',
  templateUrl: './grid-agenda-completacion.component.html',
  styleUrls: ['./grid-agenda-completacion.component.scss']
})
export class GridAgendaCompletacionComponent implements OnInit {
  public agendaCompletacion$: Observable<any>;
  constructor(
      private agendaCompletacionService: AgendaCompletacionService,
      private router: Router
  ) { }

  ngOnInit(): void {
      this.getAgendaCompletacion();
  }
  public onGetAgenda(data: any): void {
      this.agendaCompletacionService.seleccionAgenda.next({selected: data, show: true});
      this.router.navigate(['/credit-factory/credit-management']);
  }
  /**
   * @description: Obtiene el listado de agenda de completacion
  */
  private getAgendaCompletacion(): void {
      Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
      this.agendaCompletacion$ = this.agendaCompletacionService.getAgendaCompletacion();
      Swal.close();
  }

}

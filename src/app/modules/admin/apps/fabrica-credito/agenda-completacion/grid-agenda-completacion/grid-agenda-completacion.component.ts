import { Component, OnInit } from '@angular/core';
import {AgendaCompletacionService} from '../../../../../../core/services/agenda-completacion.service';
import {Observable} from 'rxjs';
import {Router} from "@angular/router";

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
      this.agendaCompletacion$ = this.agendaCompletacionService.getAgendaCompletacion();
  }

}

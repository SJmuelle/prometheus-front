import { Component, OnInit } from '@angular/core';
import {AgendaCompletacionService} from '../../../../../../core/services/agenda-completacion.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-grid-agenda-completacion',
  templateUrl: './grid-agenda-completacion.component.html',
  styleUrls: ['./grid-agenda-completacion.component.scss']
})
export class GridAgendaCompletacionComponent implements OnInit {
  public agendaCompletacion$: Observable<any>;
  constructor(
      private agendaCompletacionService: AgendaCompletacionService
  ) { }

  ngOnInit(): void {
      this.getAgendaCompletacion();
  }

  private getAgendaCompletacion(): void {
      this.agendaCompletacion$ = this.agendaCompletacionService.getAgendaCompletacion();
  }

}

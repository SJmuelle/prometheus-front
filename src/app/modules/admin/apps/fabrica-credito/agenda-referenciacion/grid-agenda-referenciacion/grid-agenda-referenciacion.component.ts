import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {AgendaReferenciacionService} from '../../../../../../core/services/agenda-referenciacion.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-grid-agenda-referenciacion',
  templateUrl: './grid-agenda-referenciacion.component.html',
  styleUrls: ['./grid-agenda-referenciacion.component.scss']
})
export class GridAgendaReferenciacionComponent implements OnInit {
  public agendaReferencia$: Observable<any>;
  constructor(
      private agendaReferenciaService: AgendaReferenciacionService,
      private router: Router
  ) { }

  ngOnInit(): void {
      this.getAgendaReferenciacion();
  }

  public onGetAgenda(data: any): void {

  }

  private getAgendaReferenciacion(): void {
      this.agendaReferencia$ = this.agendaReferenciaService.getAgendaReferenciacion();
  }

}

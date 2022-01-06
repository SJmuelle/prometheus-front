import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {AgendaReferenciacionService} from '../../../../../../core/services/agenda-referenciacion.service';
import {Router} from '@angular/router';
import {FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {
    FormGestionReferenciacionModalComponent
} from "../form-gestion-referenciacion-modal/form-gestion-referenciacion-modal.component";

@Component({
  selector: 'app-grid-agenda-referenciacion',
  templateUrl: './grid-agenda-referenciacion.component.html',
  styleUrls: ['./grid-agenda-referenciacion.component.scss']
})
export class GridAgendaReferenciacionComponent implements OnInit {
  public agendaReferencia$: Observable<any>;
  public filtrarTabla = new FormControl('');
  public tamanoTabl = new FormControl('5');
  public page: number = 1;
  constructor(
      private agendaReferenciaService: AgendaReferenciacionService,
      private router: Router,
      private _matDialog: MatDialog
  ) { }

  ngOnInit(): void {
      this.getAgendaReferenciacion();
  }

  public onGetAgenda(data: any): void {

  }

  public onOpenDialog(): void {
      const dialogRef = this._matDialog.open(FormGestionReferenciacionModalComponent, {
          minWidth: '90%',
          minHeight: '80%'
      });
      dialogRef.afterClosed().subscribe((res) => {
          console.log('CLOSE');
      });
  }

  private getAgendaReferenciacion(): void {
      this.agendaReferencia$ = this.agendaReferenciaService.getAgendaReferenciacion();
  }

}

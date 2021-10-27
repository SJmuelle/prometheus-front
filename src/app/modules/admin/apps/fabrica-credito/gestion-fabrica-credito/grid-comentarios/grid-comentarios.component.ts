import {Component, Inject, OnInit} from '@angular/core';
import {ComentariosService} from "../../../../../../core/services/comentarios.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-grid-comentarios',
  templateUrl: './grid-comentarios.component.html',
  styleUrls: ['./grid-comentarios.component.scss']
})
export class GridComentariosComponent implements OnInit {
  public comentarios$: Observable<any>;
  public esVer: boolean = false;
  constructor(
      private comentariosServices: ComentariosService,
      private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
      this.getData();
  }

  private getData(): void {
      const numeroSolicitud: string = '';
      if (numeroSolicitud) {
          this.getComentarios(numeroSolicitud);
      }
  }
  /**
   * @description: Obtiene los comentarios
   */
  private getComentarios(codigo: string): void {
      this.comentarios$ = this.comentariosServices.getComentarios(codigo);
  }

}

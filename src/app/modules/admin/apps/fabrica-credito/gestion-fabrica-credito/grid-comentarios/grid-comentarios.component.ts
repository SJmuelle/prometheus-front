import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {ComentariosService} from "../../../../../../core/services/comentarios.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-grid-comentarios',
  templateUrl: './grid-comentarios.component.html',
  styleUrls: ['./grid-comentarios.component.scss']
})
export class GridComentariosComponent implements OnInit {
  public comentarios$: Observable<any>;
  public esVer: boolean = false;
  @Output() cerrarComponente: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
      private comentariosServices: ComentariosService,
      private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
      this.getData();
  }

  public onCerrar(): void {
      this.cerrarComponente.emit(false);
  }

  private getData(): void {
      const numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
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

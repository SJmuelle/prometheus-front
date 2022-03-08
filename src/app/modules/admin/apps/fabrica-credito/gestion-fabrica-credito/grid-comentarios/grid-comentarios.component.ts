import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {ComentariosService} from "../../../../../../core/services/comentarios.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {FormDialogComentariosComponent} from "../form-dialog-comentarios/form-dialog-comentarios.component";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-grid-comentarios',
  templateUrl: './grid-comentarios.component.html',
  styleUrls: ['./grid-comentarios.component.scss']
})
export class GridComentariosComponent implements OnInit {
  public comentarios$: Observable<any>;
  public esVer: boolean = false;
  @Output() cerrarComponente: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() minimizarComponente: EventEmitter<boolean> = new EventEmitter<boolean>();
  public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
  public page: number = 1;
  public tamanoTabl = new FormControl('5');
  constructor(
      private comentariosServices: ComentariosService,
      private route: ActivatedRoute,
      private _dialog: MatDialog,
  ) { }

  ngOnInit(): void {
      this.getData();
  }

  public onComentario(): void {
      const dialogRef = this._dialog.open(FormDialogComentariosComponent, {
          minWidth: '30%',
          minHeight: '30%',
          data: {numeroSolicitud: this.numeroSolicitud}
      });
      dialogRef.afterClosed().toPromise().then((res) => {
          this.getData();
      });
  }

  public onVerComentario(item): void {
      const dialogRef = this._dialog.open(FormDialogComentariosComponent, {
          minWidth: '30%',
          minHeight: '30%',
          data: item
      });
      dialogRef.afterClosed().toPromise();
  }

  public onCerrar(): void {
      this.cerrarComponente.emit(false);
  }

  public onMinimiza(): void {
      this.minimizarComponente.emit(false);
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

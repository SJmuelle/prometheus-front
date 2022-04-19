import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { DevolucionesService } from "../../../../../../core/services/devoluciones.service";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { FormDialogDevolucionesComponent } from "../form-dialog-devoluciones/form-dialog-devoluciones.component";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-grid-devoluciones',
  templateUrl: './grid-devoluciones.component.html',
  styleUrls: ['./grid-devoluciones.component.scss']
})
export class GridDevolucionesComponent implements OnInit {
  public devolucion$: Observable<any>;
  public esVer: boolean = false;
  @Output() cerrarComponente: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() minimizarComponente: EventEmitter<boolean> = new EventEmitter<boolean>();
  public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
  public page: number = 1;
  public tamanoTabl = new FormControl('5');
  @Input() agenda: string;
  constructor(
    private devolucionesService: DevolucionesService,
    private route: ActivatedRoute,
    private _dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getData();
  }

  public onDevolucion(): void {
    console.log('agenda->:'+this.agenda);
    const dialogRef = this._dialog.open(FormDialogDevolucionesComponent, {
      minWidth: '30%',
      minHeight: '30%',
      data: { numeroSolicitud: this.numeroSolicitud,agenda: this.agenda}
    });
    dialogRef.afterClosed().toPromise().then((res) => {
      this.getData();
    });
  }

  public onVerDevolucion(item): void {
    // item.agenda =this.agenda;
    const dialogRef = this._dialog.open(FormDialogDevolucionesComponent, {
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
      this.getDevolucion(numeroSolicitud);
    }
  }
  /**
   * @description: Obtiene los comentarios
   */
  private getDevolucion(codigo: string): void {
    this.devolucion$ = this.devolucionesService.getDevoluciones(this.agenda,codigo);
  }

}

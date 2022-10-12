import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { DevolucionesService } from "../../../../../../core/services/devoluciones.service";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { FormDialogDevolucionesComponent } from "../form-dialog-devoluciones/form-dialog-devoluciones.component";
import { FormControl } from "@angular/forms";
import moment from 'moment';
import { PermisosService } from 'app/core/services/permisos.service';

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
  permisoEditar:boolean
  @Input() agenda: string;
  constructor(
    private devolucionesService: DevolucionesService,
    private route: ActivatedRoute,
    private router: Router,
    public _permisosService:PermisosService,
    private _dialog: MatDialog,) { 

      router.events.subscribe((url: any) => console.log(url));
      this.permisoEditar = this._permisosService.permisoPorModuleTrazxabilidad(router.url)
    }

  ngOnInit(): void {
    this.getData();
  }

  public onDevolucion(): void {
    console.log('agenda->:' + this.agenda);
    const dialogRef = this._dialog.open(FormDialogDevolucionesComponent, {
      minWidth: '30%',
      minHeight: '30%',
      data: { numeroSolicitud: this.numeroSolicitud, agenda: this.agenda }
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
    this.devolucion$ = this.devolucionesService.getDevoluciones(this.agenda, codigo);
  }
  /**
  * Returns whether the given dates are different days
  *
  * @param current
  * @param compare
  */
  isSameDay(current: string, compare: string): boolean {
    return moment(current, moment.ISO_8601).isSame(moment(compare, moment.ISO_8601), 'day');
  }
  /**
   * Get the relative format of the given date
   *
   * @param date
   */
  getRelativeFormat(date: string): string {
    const today = moment().startOf('day');
    const yesterday = moment().subtract(1, 'day').startOf('day');

    // Is today?
    if (moment(date, moment.ISO_8601).isSame(today, 'day')) {
      return 'Hoy';
    }

    // Is yesterday? 
    if (moment(date, moment.ISO_8601).isSame(yesterday, 'day')) {
      return 'Ayer';
    }

    return moment(date, moment.ISO_8601).fromNow();
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.idComentario || index;
  }
}

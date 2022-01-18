import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ReferenciasService} from "../../../../../../core/services/referencias.service";
import {MatDialog} from "@angular/material/dialog";
import {FormDialogReferenciasComponent} from "../form-dialog-referencias/form-dialog-referencias.component";
import {FormDetallesReferenciasComponent} from "../form-detalles-referencias/form-detalles-referencias.component";


@Component({
  selector: 'app-grid-referencias',
  templateUrl: './grid-referencias.component.html',
  styleUrls: ['./grid-referencias.component.scss']
})
export class GridReferenciasComponent implements OnInit, OnDestroy, AfterViewInit {
  public referencias$: Observable<any>;
  public esVer: boolean = false;
  public subscription$: Subscription;
  @Input() datos: any;
  constructor(
      private route: ActivatedRoute,
      private referenciasService: ReferenciasService,
      private _dialog: MatDialog
  ) {


  }

  ngOnInit(): void {
      this.cargarReferencias();
      this.escuchaObservable();
  }
  /**
   * @description: Abre el dialogo de nueva referencia
   */
  public onDialogReferencia(): void {
      const numeroSolicitud: string =  this.route.snapshot.paramMap.get('num');
      const dialogRef = this._dialog.open(FormDialogReferenciasComponent, {
          data: {numeroSolicitud: numeroSolicitud},
          minWidth: '680px',
          minHeight: '420px',
          disableClose: true,
      });
      dialogRef.afterClosed().toPromise();
  }
  /**
   * @description: Cerrar formulario de detalles referencias
   */
  public onCerrarFormularioDetalle(event: boolean) {
      this.esVer = event;
  }
  /**
   * @description: carga las referencias desde el inicio
   */
  public cargarReferencias(): void {
      const codigo: string = this.route.snapshot.paramMap.get('num');
      if (codigo) {
          this.getReferencias(codigo);
      }
  }

  public onGetReferencia(datos: any): void {
      this.esVer = true;
      const dialogRef = this._dialog.open(FormDetallesReferenciasComponent, {
          minWidth: '480px',
          minHeight: '440px',
          disableClose: true,
          // data: datos
      });
      dialogRef.afterClosed().toPromise();
      this.referenciasService.seleccionDatosReferencia.next({value: datos, show: true});
  }

  /**
   * @description: Obtiene las referencias
   */
  private getReferencias(codigo: string): void {
      this.referencias$ = this.referenciasService.getReferencias(codigo);
  }
  /**
   * @description:  Escucha el observable evento
   */
  private escuchaObservable(): void {
      this.subscription$ = this.referenciasService.eventos$.subscribe((res) => {
          if (res) {
              this.cargarReferencias();
          }
      });
  }

    ngOnDestroy(): void {
      this.esVer = false;
      this.subscription$.unsubscribe();
    }

    ngAfterViewInit(): void {
        if (this.datos) {
            if (Object.keys(this.datos).length) {
                this.getReferencias(this.datos.numeroSolicitud);
            }
        }
    }


}

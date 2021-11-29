import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ReferenciasService} from "../../../../../../core/services/referencias.service";

@Component({
  selector: 'app-grid-referencias',
  templateUrl: './grid-referencias.component.html',
  styleUrls: ['./grid-referencias.component.scss']
})
export class GridReferenciasComponent implements OnInit, OnDestroy {
  public referencias$: Observable<any>;
  public esVer: boolean = false;
  public subscription$: Subscription;
  constructor(
      private route: ActivatedRoute,
      private referenciasService: ReferenciasService
  ) {

  }

  ngOnInit(): void {
      this.cargarReferencias();
      this.escuchaObservable();
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
      console.log(datos);
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
      console.log('Destruido');
      this.esVer = false;
      this.subscription$.unsubscribe();
    }


}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
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
  constructor(
      private route: ActivatedRoute,
      private referenciasService: ReferenciasService
  ) {
      const codigo: string = this.route.snapshot.paramMap.get('num');
      if (codigo) {
        this.getReferencias(codigo);
      }
  }

  ngOnInit(): void {
  }
  /**
   * @description: Cerrar formulario de detalles referencias
   */
  public onCerrarFormularioDetalle(event: boolean) {
      this.esVer = event;
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

    ngOnDestroy(): void {
      console.log('Destruido');
      this.esVer = false;
    }


}

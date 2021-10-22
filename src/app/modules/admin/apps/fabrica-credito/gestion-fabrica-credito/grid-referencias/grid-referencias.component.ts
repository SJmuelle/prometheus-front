import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ReferenciasService} from "../../../../../../core/services/referencias.service";

@Component({
  selector: 'app-grid-referencias',
  templateUrl: './grid-referencias.component.html',
  styleUrls: ['./grid-referencias.component.scss']
})
export class GridReferenciasComponent implements OnInit {
  public referencias$: Observable<any>;
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

  public onGetReferencia(datos: any): void {

  }

  /**
   * @description: Obtiene las referencias
   */
  private getReferencias(codigo: string): void {
      this.referencias$ = this.referenciasService.getReferencias(codigo);
  }


}

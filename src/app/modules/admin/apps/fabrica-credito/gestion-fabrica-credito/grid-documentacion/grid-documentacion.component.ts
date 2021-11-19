import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {DocumentosAdjuntosService} from "../../../../../../core/services/documentos-adjuntos.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-grid-documentacion',
  templateUrl: './grid-documentacion.component.html',
  styleUrls: ['./grid-documentacion.component.scss']
})
export class GridDocumentacionComponent implements OnInit {
  public documentos$: Observable<any>;
  constructor(
      private route: ActivatedRoute,
      private documentosServices: DocumentosAdjuntosService,
      @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
      const datos: any = {
          numeroSolicitud: data.numeroSolicitud,
          tipoDocumento: data.tipoDocumento
      };
      console.log(datos);
      this.getDocumentos(datos);


  }

  ngOnInit(): void {
  }

  private getDocumentos(datos: any): void {
      this.documentos$ = this.documentosServices.getDocumentos(datos);
  }

}

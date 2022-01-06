import { Component, OnInit } from '@angular/core';
import {PoliticasService} from "../../../../../../core/services/politicas.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-grid-politicas',
  templateUrl: './grid-politicas.component.html',
  styleUrls: ['./grid-politicas.component.scss']
})
export class GridPoliticasComponent implements OnInit {
  public politicas$: Observable<any>;
  public numeroSolicitud: string =  this.route.snapshot.paramMap.get('num');
  constructor(
      private politicasService: PoliticasService,
      private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
      this.getPoliticas(this.numeroSolicitud);
  }

  private getPoliticas(numeroSolicitud: string): void {
      this.politicas$ = this.politicasService.getPoliticas(numeroSolicitud);
  }

}

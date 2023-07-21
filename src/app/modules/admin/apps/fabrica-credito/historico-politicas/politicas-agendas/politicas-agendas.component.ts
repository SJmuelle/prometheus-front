import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-politicas-agendas',
  templateUrl: './politicas-agendas.component.html',
  styleUrls: ['./politicas-agendas.component.scss']
})
export class PoliticasAgendasComponent implements OnInit {

  public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
  public identificacion: string = this.route.snapshot.paramMap.get('id'); 

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}

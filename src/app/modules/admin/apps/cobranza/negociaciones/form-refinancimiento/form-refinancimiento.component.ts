import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CajaVirtualService } from 'app/core/services/caja-virtual.service';

@Component({
  selector: 'app-form-refinancimiento',
  templateUrl: './form-refinancimiento.component.html',
  styleUrls: ['./form-refinancimiento.component.scss']
})
export class FormRefinancimientoComponent implements OnInit {
  public tipoEstrategia: string = this.route.snapshot.paramMap.get('tipoEstrategia');
  public tipoID: string = this.route.snapshot.paramMap.get('tipoID');
  public id: string = this.route.snapshot.paramMap.get('id');
  public negocio: string = this.route.snapshot.paramMap.get('negocio');
  public fecha: string = this.route.snapshot.paramMap.get('fecha');

  constructor(
    private _cajaVirtualService: CajaVirtualService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
  }

}

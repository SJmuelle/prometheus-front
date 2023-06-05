import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CajaVirtualService } from 'app/core/services/caja-virtual.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {

  public listado = [];
  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _cajaVirtualService: CajaVirtualService,
  ) {
    this.form = fb.group({
      tipoEstrategia: [''],
      tipoID: [''],
      id: [''],
    });
  }

  ngOnInit(): void {
    this._cajaVirtualService.refinanciacionTipoEstrategia().subscribe((res) => {
      this.listado = res.data;
    });
  }



}

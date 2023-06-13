import { Component, OnInit } from '@angular/core';
import { NegociacionCarteraService } from 'app/core/services/negociacion-cartera.service';

@Component({
  selector: 'app-negociacion-cartera',
  templateUrl: './negociacion-cartera.component.html',
  styleUrls: ['./negociacion-cartera.component.scss']
})
export class NegociacionCarteraComponent implements OnInit {

  public seacrhType: 'Cedula' | 'Negocio' = 'Cedula'
  public valueSearch: string = '';
  public dataRow: any[] = []


  constructor(private _negociacionCarteraService: NegociacionCarteraService) { }

  ngOnInit(): void {
  }



  public search(): void {

    const data = `${this.valueSearch?.toUpperCase()}`

    this._negociacionCarteraService.ObtenerNegociacionCartera(data).subscribe({
      next: (resp) => {
        console.log(resp)
        this.dataRow = resp.data


      }, error: (err) => {
        console.log(err);
      }
    })


  }

}


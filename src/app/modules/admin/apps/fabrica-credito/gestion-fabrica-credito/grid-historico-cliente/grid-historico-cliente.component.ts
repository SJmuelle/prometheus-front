import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'grid-historico-cliente',
  templateUrl: './grid-historico-cliente.component.html',
  styleUrls: ['./grid-historico-cliente.component.scss']
})
export class GridHistoricoClienteComponent implements OnInit {
  datosGeneral:any[]=[]
  constructor(
    private route: ActivatedRoute,
    private _fabricaCreditoService: FabricaCreditoService,
    private router: Router
  ) { }

  public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
  public identificacion: string = this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.getResumen()
  }

  /**
* @description: Obtiene los datos del resumen
*/
  private getResumen(): void {

    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
    let data = {
      "numeroSolicitud": this.numeroSolicitud,
      "identificacion": this.identificacion
    }
    this._fabricaCreditoService.getHistoricoCliente(data).pipe(

    ).subscribe((res) => {
      Swal.close();
      if (res.status === 200) {
        this.datosGeneral=res.data;
      } else {
        this.datosGeneral = []
      }
    });
  }

}

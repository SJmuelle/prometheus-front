import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import Swal from 'sweetalert2';
import { FormDecisionComponent } from '../../agenda-decision/form-decision/form-decision.component';

@Component({
  selector: 'app-detalle-trazabilidad',
  templateUrl: './detalle-trazabilidad.component.html',
  styleUrls: ['./detalle-trazabilidad.component.scss']
})
export class DetalleTrazabilidadComponent implements OnInit {
  public animacionVer: boolean = true;
  public datos: any = [];
  public dataResumenTrazabilidad: any = [];
  public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
  public identificacion: string = this.route.snapshot.paramMap.get('id');
  dataPolicitasAdmin: any;
  datos2: any[];
  verComentarios: boolean = false;
  constructor(
    private _fabricaCreditoService: FabricaCreditoService,
    private route: ActivatedRoute,
    private router: Router,
    private _dialog: MatDialog,
  ) {
    this.getTrazabilidad();
    this.getResumen();
  }

  ngOnInit(): void {
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
    this._fabricaCreditoService.getResumenCredito(data).pipe(

    ).subscribe((res) => {
      if (res.status === 200) {
        console.log(res.data)
        this.dataResumenTrazabilidad = res.data.resumenTrazabilidad;

        // this.getDatos(res.data);
        Swal.close();
      } else {
        this.dataResumenTrazabilidad = [];

        Swal.close();
        // this.datos = []
      }
    });
  }
  /**
 * @description: Obtiene los datos del trazabilidad
 */
  private getTrazabilidad(): void {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
    let data = {
      "numeroSolicitud": this.numeroSolicitud,
    }
    this._fabricaCreditoService.getrazabilidad(data).pipe(
    ).subscribe((res) => {
      if (res.status === 200) {
        console.log(res.data)
        this.datos = data;
        Swal.close();
      } else {
        Swal.close();
        this.datos = []
      }
    });
  }

  private getDatos(data): void {

    // debugger;
    this.datos = data;


  }

  /**
 * @description: Direcciona al componente comentarios
 */
  public onComentarios(): void {
    this.verComentarios = true;
  }

  /**
 * @description:
 */
  public onCerrar(event): void {
    this.verComentarios = event;

  }

  /**
   * @description: Minimiza el componente comentarios
   */
  public onMinimiza(event): void {

    this.verComentarios = event;
  }

  public openModalNegocio(): void {
    const dialogRef = this._dialog.open(FormDecisionComponent, {
      width: '60%',
      data: {},
      disableClose: false
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.router.navigate(['/credit-factory/agenda-decision']);
    })

  }


}

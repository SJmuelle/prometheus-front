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
  datosGeneral:any[];
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
      Swal.close();
      if (res.status === 200) {
        debugger
        this.dataResumenTrazabilidad = res.data.resumenTrazabilidad;
        this.getDatos(res.data)
      } else {
        this.dataResumenTrazabilidad = [];
        this.datosGeneral=[];
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
        this.datos = res.data;
        Swal.close();
      } else {
        Swal.close();
        this.datos = []
      }
    });
  }

  private getDatos(data): void {

    //general
    let DatosCredito = [];
    DatosCredito.push(
      {
        titulo: "Información del cliente:",
        tipo: "campos",
        icono: "feather:user",
        color: "text-blue-600",
        descripcion: "Datos específicos del cliente:",
        campos: [
          {
            icono: "heroicons_outline:user-circle",
            color: "bg-blue-100 text-blue-800",
            label: "Cliente:",
            valor: data.resumenCredito.nombreCompleto.toLowerCase(),
            valor2: data.resumenCredito.tipoDocumento + '-' + data.resumenCredito.identificacion
          },
          {
            icono: "feather:dollar-sign",
            color: "bg-green-100 text-green-800",
            label: "Crédito: ",
            valor: "$" + data.resumenCredito.cupoTotal,
            valor2: "Plazo: " + data.resumenCredito.plazo + " meses" ,
            valor3: "Tasa: " + data.resumenCredito.tasa + "%"

          },
          {
            icono: "heroicons_outline:light-bulb",
            color: "bg-pink-100 text-pink-800",
            label: "Condiciones: ",
            valor: "Ren: " + data.resumenCredito.renovacion,
            valor2: "Seg: " + data.resumenCredito.segmento
          },
          {
            icono: "heroicons_outline:office-building",
            color: "bg-gray-100 text-gray-800",
            label: "Empresa",
            valor: data.resumenGeneral.agenda,
            valor2: data.resumenGeneral.asesorComercial
          },
          {
            icono: "mat_outline:location_on",
            color: "bg-purple-100 text-purple-800",
            label: "Ubicación: ",
            valor: data.resumenCredito.departamentoVivienda.toLowerCase() + ", " + data.resumenCredito.ciudadVivienda.toLowerCase()
          }
        ]
      },
    )
    this.datosGeneral = DatosCredito;
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

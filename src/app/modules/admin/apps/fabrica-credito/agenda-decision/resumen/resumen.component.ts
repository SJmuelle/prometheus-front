import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormDecisionComponent } from '../form-decision/form-decision.component';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss']
})
export class ResumenComponent implements OnInit {
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
        this.getDatos(res.data);
        Swal.close();
      } else {
        Swal.close();
        this.datos = []
      }
    });
  }

  private getDatos(data): void {

    //general
    let DatosCredito = [], DatosCredito2 = [];
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
            valor: "Renovación: " + data.resumenCredito.renovacion,
            valor2: "Segmento: " + data.resumenCredito.segmento
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
    DatosCredito.push(
      {
        titulo: "Información del negocio",
        tipo: "campos",
        icono: "heroicons_outline:briefcase",
        color: "text-gray-400",
        descripcion: "Actividad económica del titular",
        campos: [
          {
            icono: "heroicons_outline:briefcase",
            color: "bg-blue-100 text-blue-800",
            label: "",
            valor: "<span class='text-sm font-medium text-secondary'>Ocupación: </span> " +data.resumenCredito.ocupacion.toLowerCase(),
            valor2: "<span class='text-sm font-medium text-secondary'>Actividad económica: </span>" +data.resumenCredito.actividadEconomica.toLowerCase(),
            valor3: "<span class='text-sm font-medium text-secondary'>Actividad especifica: </span>" +data.resumenCredito.actividadEspecifica.toLowerCase()
          },
          {
            icono: "heroicons_outline:library",
            color: "bg-green-100 text-green-800",
            label: "Nombre del negocio:",
            valor: data.resumenCredito.nombreNegocio.toLowerCase()
          },

          {
            icono: "heroicons_outline:document-text",
            color: "bg-pink-100 text-pink-800",
            label: "Tiene cámara del comercio:",
            valor: data.resumenCredito.camaraNegocio == 'S' ? 'Si Tiene' : 'No Tiene'
          },
          {
            icono: "mat_outline:location_on",
            color: "bg-purple-100 text-purple-800",
            label: "Ubicación del negocio:",
            valor: data.resumenCredito.departamentoNegocio.toLowerCase() + ", " + data.resumenCredito.ciudadNegocio.toLowerCase()
          }
        ]
      },
    )
    DatosCredito2.push(
      {
        titulo: "Modelo + HDC",
        tipo: "campos",
        icono: "heroicons_outline:exclamation",
        color: "text-red-400",
        descripcion: "Información recopilada de la consulta de historia de crédito del cliente",
        campos: [
          {
            icono: "heroicons_outline:academic-cap",
            clase:"bg-red-100",
            color: "bg-red-100 text-red-800",
            label: "Cupo inicial",
            valor: "$" + data.resumenHdc.cupoInicial
          },
          {
            icono: "heroicons_outline:academic-cap",
            clase:"bg-red-100",
            color: "bg-red-100 text-red-800",
            label: "Saldo obligaciones",
            valor: "$" + data.resumenHdc.saldoObligaciones
          },
          {
            icono: "heroicons_outline:academic-cap",
            clase:"bg-red-100",
            color: "bg-red-100 text-red-800",
            label: "Peor calificación",
            valor: "A"
          },
          {
            icono: "heroicons_outline:academic-cap",
            clase:"bg-red-100",
            color: "bg-red-100 text-red-800",
            label: "Cuotas",
            valor: "$" + data.resumenHdc.cuota
          },
          {
            icono: "heroicons_outline:academic-cap",
            clase:"bg-red-100",
            color: "bg-red-100 text-red-800",
            label: "Máxima mora actual",
            valor: "$" + data.resumenHdc.maximaMoraActual
          }
        ]
      },
    )
    DatosCredito2.push(
      {
        titulo: "Indicadores",
        tipo: "campos",
        icono: "attach_money",
        color: "text-orange-400",
        descripcion: "Resultado de indicadores financieros y de análisis",
        campos: [
          {
            icono: "heroicons_outline:academic-cap",
            clase:"bg-orange-100",
            color: "bg-red-100 text-red-800",
            label: "Score",
            valor: data.resumenIndicadores.score
          },
          {
            icono: "heroicons_outline:academic-cap",
            clase:"bg-orange-100",
            color: "bg-red-100 text-red-800",
            label: "Razón corriente",
            valor: "$" + data.resumenIndicadores.razonCorriente
          },
          {
            icono: "heroicons_outline:academic-cap",
            clase:"bg-orange-100",
            color: "bg-red-100 text-red-800",
            label: "Capital de Trabajo",
            valor: "$" + data.resumenIndicadores.capitalTrabajo
          },
          {
            icono: "heroicons_outline:academic-cap",
            clase:"bg-orange-100",
            color: "bg-red-100 text-red-800",
            label: "Endeudamiento",
            valor: "$" + data.resumenIndicadores.endeudamiento
          },
          {
            icono: "heroicons_outline:academic-cap",
            clase:"bg-orange-100",
            color: "bg-red-100 text-red-800",
            label: "Nivel de riesgo",
            valor: data.resumenIndicadores.nivelRiesgo
          }
        ]
      },
    )
    this.datos = DatosCredito;
    this.datos2 = DatosCredito2;

    this.dataResumenTrazabilidad = data.resumenTrazabilidad;
    this.dataPolicitasAdmin = data.policitasAdmin;

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

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
  verComentarios:boolean=false;
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
        titulo: "Información del cliente",
        tipo: "campos",
        icono: "feather:user",
        color: "text-blue-600",
        descripcion: "Información del cliente",
        campos: [
          {
            icono: "heroicons_outline:user-circle",
            color: "bg-blue-100 text-blue-800",
            label: "Cliente",
            valor: data.resumenCredito[0].nombreCompleto.toLowerCase(),
            valor2: data.resumenCredito[0].tipoDocumento + '-' + data.resumenCredito[0].identificacion
          },
          {
            icono: "feather:dollar-sign",
            color: "bg-green-100 text-green-800",
            label: "Crédito",
            valor: "$" + data.resumenCredito[0].cupoTotal,
            valor2: "Plazo: " + data.resumenCredito[0].plazo + " meses  Tasa: " + data.resumenCredito[0].tasa + "%"

          },
          {
            icono: "heroicons_outline:light-bulb",
            color: "bg-pink-100 text-pink-800",
            label: "Condiciones",
            valor: "Renovación: " + data.resumenCredito[0].renovacion,
            valor2: "Segmento: " + data.resumenCredito[0].segmento
          },
          {
            icono: "mat_outline:location_on",
            color: "bg-purple-100 text-purple-800",
            label: "Ubicación",
            valor: data.resumenCredito[0].departamentoVivienda.toLowerCase() + ", " + data.resumenCredito[0].ciudadVivienda.toLowerCase()
          }
        ]
      },
    )
    DatosCredito.push(
      {
        titulo: "Información del negocio",
        tipo: "campos",
        icono: "feather:briefcase",
        color: "text-gray-400",
        descripcion: "Actividad económica del titular",
        campos: [
          {
            icono: "heroicons_outline:academic-cap",
            color: "bg-red-100 text-red-800",
            label: "Ocupación",
            valor: data.resumenCredito[0].ocupacion.toLowerCase()
          },
          {
            icono: "heroicons_outline:academic-cap",
            color: "bg-red-100 text-red-800",
            label: "Actividad económica",
            valor: data.resumenCredito[0].actividadEconomica.toLowerCase()
          },
          {
            icono: "heroicons_outline:academic-cap",
            color: "bg-red-100 text-red-800",
            label: "Actividad especifica",
            valor: data.resumenCredito[0].actividadEspecifica.toLowerCase()
          },
          {
            icono: "heroicons_outline:academic-cap",
            color: "bg-red-100 text-red-800",
            label: "Nombre del negocio",
            valor: data.resumenCredito[0].nombreNegocio.toLowerCase()
          },
          {
            icono: "heroicons_outline:academic-cap",
            color: "bg-red-100 text-red-800",
            label: "Ubicación del negocio",
            valor: data.resumenCredito[0].departamentoNegocio.toLowerCase() + ", " + data.resumenCredito[0].ciudadNegocio.toLowerCase()
          },
          {
            icono: "heroicons_outline:academic-cap",
            color: "bg-red-100 text-red-800",
            label: "Tiene camara del comercio",
            valor: data.resumenCredito[0].camaraNegocio == 'S' ? 'Si' : 'No'
          },
        ]
      },
    )
    DatosCredito2.push(
      {
        titulo: "Modelo + HDC",
        tipo: "campos",
        icono: "heroicons_outline:exclamation",
        color: "text-red-400",
        descripcion: "Historia de crédito y variable a nivel de modelo de riesgo",
        campos: [
          {
            icono: "heroicons_outline:academic-cap",
            color: "bg-red-100 text-red-800",
            label: "Cuota inicial",
            valor: "$" + data.resumenHdc[0].cupoInicial
          },
          {
            icono: "heroicons_outline:academic-cap",
            color: "bg-red-100 text-red-800",
            label: "Obligaciones",
            valor: "$" + data.resumenHdc[0].maximaMoraActual
          },
          {
            icono: "heroicons_outline:academic-cap",
            color: "bg-red-100 text-red-800",
            label: "Peor calificacion",
            valor: "$" + data.resumenHdc[0].saldoObligaciones
          },
          {
            icono: "heroicons_outline:academic-cap",
            color: "bg-red-100 text-red-800",
            label: "Cuotas",
            valor: "$" + data.resumenHdc[0].cuota
          },
          {
            icono: "heroicons_outline:academic-cap",
            color: "bg-red-100 text-red-800",
            label: "Máxima mora actual",
            valor: "$" + data.resumenHdc[0].maximaMoraActual
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
        descripcion: "Los indicadores financieros y de análisis por línea de producto",
        campos: [
          {
            icono: "heroicons_outline:academic-cap",
            color: "bg-red-100 text-red-800",
            label: "Score",
            valor: data.resumenIndicadores[0].score
          },
          {
            icono: "heroicons_outline:academic-cap",
            color: "bg-red-100 text-red-800",
            label: "Razón corriente",
            valor: "$" + data.resumenIndicadores[0].razonCorriente
          },
          {
            icono: "heroicons_outline:academic-cap",
            color: "bg-red-100 text-red-800",
            label: "Capital de Trabajo",
            valor: "$" + data.resumenIndicadores[0].capitalTrabajo
          },
          {
            icono: "heroicons_outline:academic-cap",
            color: "bg-red-100 text-red-800",
            label: "Nivel de endeudamaineto",
            valor: "$" + data.resumenIndicadores[0].endeudamiento
          },
          {
            icono: "heroicons_outline:academic-cap",
            color: "bg-red-100 text-red-800",
            label: "Nivel de riesgo",
            valor: data.resumenIndicadores[0].nivelRiesgo.toLowerCase()
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
    this.verComentarios=true;
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
          data: {  },
          disableClose: false
      });


  }

  
}

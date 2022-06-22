import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

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

  constructor(
                private _fabricaCreditoService: FabricaCreditoService,
                private route: ActivatedRoute,
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
      "identificacion":this.identificacion
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
    let DatosCredito = [];
    DatosCredito.push(
      {
        titulo: "Información del cliente",
        tipo: "campos",
        icono:"feather:user",
        color:"text-blue-600",
        descripcion: "En este cuadrante deberá visualizarse la información del cliente",
        campos: [
          {
            icono: "heroicons_outline:academic-cap",
            label: "Nombre Completo",
            valor: data.resumenCredito[0].nombreCompleto.toLowerCase()
          },
          {
            icono: "heroicons_outline:academic-cap",
            label: "Número identificación",
            valor: data.resumenCredito[0].tipoDocumento+'-'+data.resumenCredito[0].identificacion
          },
          {
            icono: "heroicons_outline:academic-cap",
            label: "Monto",
            valor: "$"+data.resumenCredito[0].cupoTotal
          },
          {
            icono: "heroicons_outline:academic-cap",
            label: "Plazo",
            valor: data.resumenCredito[0].plazo
          },
          {
            icono: "heroicons_outline:academic-cap",
            label: "Tasa",
            valor: data.resumenCredito[0].tasa +"%"
          },
          {
            icono: "heroicons_outline:academic-cap",
            label: "Renovación",
            valor: "No"
          },
          {
            icono: "heroicons_outline:academic-cap",
            label: "Segmento",
            valor: data.resumenCredito[0].segmento
          },
          {
            icono: "heroicons_outline:academic-cap",
            label: "Ubicación",
            valor: data.resumenCredito[0].departamentoVivienda +", "+data.resumenCredito[0].ciudadVivienda
          }
        ]
      },
    )
    DatosCredito.push(
      {
        titulo: "Información del Negocio",
        tipo: "campos",
        icono:"feather:briefcase",
        color:"text-gray-400",
        descripcion: "En este cuadrante deberá visualizarse la información de actividad económica del titular",
        campos: [
          {
            icono: "heroicons_outline:academic-cap",
            label: "Ocupación",
            valor: data.resumenCredito[0].ocupacion
          },
          {
            icono: "heroicons_outline:academic-cap",
            label: "Actividad económica",
            valor: data.resumenCredito[0].actividadEconomica
          },
          {
            icono: "heroicons_outline:academic-cap",
            label: "Actividad especifica",
            valor: data.resumenCredito[0].actividadEspecifica
          },
          {
            icono: "heroicons_outline:academic-cap",
            label: "Nombre del negocio",
            valor: data.resumenCredito[0].nombreNegocio
          },
          {
            icono: "heroicons_outline:academic-cap",
            label: "Departamento del negocio",
            valor: data.resumenCredito[0].departamentoNegocio+ ", "+ data.resumenCredito[0].ciudadNegocio
          },
          {
            icono: "heroicons_outline:academic-cap",
            label: "Tiene camara del comercio",
            valor: data.resumenCredito[0].camaraNegocio=='S'?'Si':'No'
          },
        ]
      },
    )
    DatosCredito.push(
      {
        titulo: "Modelo + HDC",
        tipo: "campos",
        icono:"heroicons_outline:exclamation",
        color:"text-red-400",
        descripcion: "Aquí se deberá visualizar toda información relevante de la consulta de historia de crédito y toda aquella variable a nivel de modelo de riesgo me permita poder tomar o soportar una decisión sobre el crédito en estudio",
        campos: [
          {
            icono: "heroicons_outline:academic-cap",
            label: "Cuota inicial",
            valor:  "$"+data.resumenHdc[0].cupoInicial
          },
          {
            icono: "heroicons_outline:academic-cap",
            label: "Obligaciones",
            valor:  "$"+data.resumenHdc[0].maximaMoraActual
          },
          {
            icono: "heroicons_outline:academic-cap",
            label: "Peor calificacion",
            valor:  "$"+data.resumenHdc[0].saldoObligaciones
          },
          {
            icono: "heroicons_outline:academic-cap",
            label: "Cuotas",
            valor:  "$"+data.resumenHdc[0].cuota
          },
          {
            icono: "heroicons_outline:academic-cap",
            label: "Máxima mora actual",
            valor:  "$"+data.resumenHdc[0].maximaMoraActual
          }
        ]
      },
    )
    DatosCredito.push(
      {
        titulo: "Indicadores",
        tipo: "campos",
        icono:"attach_money",
        color:"text-orange-400",
        descripcion: "Aquí se deberá visualizar el resultado de los indicadores financieros y de análisis que harán parte de cada línea de producto según aplique",
        campos: [
          {
            icono: "heroicons_outline:academic-cap",
            label: "Score",
            valor:  data.resumenIndicadores[0].score
          },
          {
            icono: "heroicons_outline:academic-cap",
            label: "Razón corriente",
            valor:  "$"+data.resumenIndicadores[0].razonCorriente
          },
          {
            icono: "heroicons_outline:academic-cap",
            label: "Capital de Trabajo",
            valor:  data.resumenIndicadores[0].capitalTrabajo
          },
          {
            icono: "heroicons_outline:academic-cap",
            label: "Nivel de endeudamaineto",
            valor:  "$"+data.resumenIndicadores[0].endeudamiento
          },
          {
            icono: "heroicons_outline:academic-cap",
            label: "Nivel de riesgo",
            valor:  data.resumenIndicadores[0].nivelRiesgo
          }
        ]
      },
    )
    this.datos = DatosCredito;
    this.dataResumenTrazabilidad=data.resumenTrazabilidad;
    this.dataPolicitasAdmin=data.policitasAdmin;

  }
}

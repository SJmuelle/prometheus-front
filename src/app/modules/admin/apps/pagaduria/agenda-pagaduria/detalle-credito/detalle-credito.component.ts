import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import Swal from 'sweetalert2';
import { FormDecisionComponent } from '../../../fabrica-credito/agenda-decision/form-decision/form-decision.component';
import { PagaduriaService } from 'app/core/services/pagaduria.service';

@Component({
  selector: 'app-detalle-credito',
  templateUrl: './detalle-credito.component.html',
  styleUrls: ['./detalle-credito.component.scss']
})
export class DetalleCreditoComponent implements OnInit {
  public animacionVer: boolean = true;
  public datos: any = [];
  public dataResumenTrazabilidad: any = [];
  public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
  public identificacion: string = this.route.snapshot.paramMap.get('id');
  dataPolicitasAdmin: any = {};
  datos2: any[];
  apiData: any;
  verComentarios: boolean = false;
  resumenCuentasMora: any[] = [];
  formaterMoneda = Intl.NumberFormat('es-co', { style: 'currency', currency: 'COP' })
  obligaciones: any;
  total: any;

  constructor(
    private _fabricaCreditoService: FabricaCreditoService,
    private route: ActivatedRoute,
    private router: Router,
    public _pagaduriaService: PagaduriaService,

    private _dialog: MatDialog,
  ) {
    this.getResumen();
  }

  ngOnInit(): void {
    // this.openModalNegocio()
    this.consultaObligaciones();
  }

  /**
 * @description: Obtiene los datos del resumen
 */
  private getResumen(): void {

    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
    let data = {
      "numeroSolicitud": Number(this.numeroSolicitud),
      "identificacion": this.identificacion
    }
    this._fabricaCreditoService.getResumenCreditoPagaduria(data).pipe(

    ).subscribe((res) => {
      if (res.status === 200) {
        this.getDatos(res.data);
        this.apiData = res.data;
        Swal.close();
      } else {
        Swal.close();
        this.datos = []
      }
    });
  }

  private getDatos(data): void {

    //general

    let DatosCredito = []
    switch (data.resumenGeneral.unidadNegocio) {

      case 22:
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
                valor: data.resumenCredito.nombreCompleto.toUpperCase(),
                valor2: data.resumenCredito.tipoDocumento + '-' + data.resumenCredito.identificacion
              },
              {
                icono: "mat_outline:email",
                color: "bg-pink-100 text-pink-800",
                label: "Correo: ",
                valor:  data.resumenCredito.renovacion,
              },
              {
                icono: "mat_outline:phone_iphone",
                color: "bg-purple-100 text-purple-800",
                label: "Celular: ",
                valor: data.resumenCredito.departamentoVivienda.toLowerCase() + ", " + data.resumenCredito.ciudadVivienda.toLowerCase()
              }
            ]
          },
        )
        break;
    }


    // resumenCredito
    switch (data.resumenGeneral.unidadNegocio) {
      case 22:
        DatosCredito.push(
          {
            titulo: "Información laboral",
            tipo: "campos",
            icono: "heroicons_outline:briefcase",
            color: "text-gray-400",
            descripcion: "Pagaduria",
            campos: [
              {
                icono: "heroicons_outline:briefcase",
                color: "bg-blue-100 text-blue-800",
                label: "Pagaduria",
                // valor: "<span class='text-sm font-medium text-secondary'>Pagaduria </span> " ,
                valor: data.resumenCredito.nombrePagaduria.toUpperCase(),
                valor3: "<span class='text-sm font-medium text-secondary'>Cargo </span>" + data.resumenCredito.cargo.toUpperCase(),
              },

              {
                icono: "heroicons_outline:document-text",
                color: "bg-purple-100 text-purple-800",
                label: "Tipo de contrato",
                valor: data.resumenCredito.descripcionTipoContrato.toUpperCase()
              },
              {
                icono: "heroicons_outline:calendar",
                color: "bg-pink-100 text-pink-800",
                label: "Fechas de contrato",
                valor2: "<span class='text-sm font-medium text-secondary'>Vinculación: </span>" + data.resumenCredito.fechaVinculacion,
                valor3: "<span class='text-sm font-medium text-secondary'>Finalización: </span>" + data.resumenCredito.fechaFinalizacionContrato
              },
              {
                icono: "feather:dollar-sign",
                color: "bg-yellow-100 text-yellow-800",
                valor2: "<span class='text-sm font-medium text-secondary'>Salario: </span>" + this.separatos(data.resumenCredito.salarioBasico),
                valor: "<span class='text-sm font-medium text-secondary'>Comision: </span>" + data.resumenCredito.comision,
                valor3: "<span class='text-sm font-medium text-secondary'>Descuentos: </span>" + data.resumenCredito.descuento
              },
              {
                icono: "mat_outline:download_for_offline",
                color: "bg-purple-100 text-purple-800",
                valor5: "Descargar Carta laboral"
              }
            ]
          },
        )
        break;
      default:
        break;
    }




    this.datos = DatosCredito;



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

  capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLocaleLowerCase();
  }

  capitalizeText(text: string) {
    text = text.toLowerCase()
    let chars = text.split(' ')

    chars = chars.map(char => {
      return this.capitalize(char)
    })

    return chars.join(' ')
  }

  separatos(numb) {
    let num = Math.trunc(numb)
    let str = num.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
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

  // Order by descending property key
  keyDescOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  }

  descargarArchivo(){
    this._pagaduriaService.descargarArchivos(this.numeroSolicitud).subscribe((response:any)=>{
      if(response) {
        if (response.status==202) {
          Swal.fire(
            '¡Error!',
            `No existen adjuntos pertenecientes a esta solicitud.`,
            'error'
          ).then();
        }else{

          const archivo = response.data[0].filepath.split(',');
          const extension = 'pdf'
          const link = document.createElement('a');
          document.body.appendChild(link);
          link.href = `${archivo}`;
          link.target = '_self';
          link.download = response.data[0].filename
          link.click();
          Swal.close();
          
        }
      }
    }) 
  }

    /**
   * @description: metodo para cargar todas las obligaciones
   */
    consultaObligaciones(){
      this._pagaduriaService.getObligaciones(this.numeroSolicitud).subscribe((response: any) => {
        if (response) {
          this.obligaciones = response.data;
        }
        this.total = response.data.reduce((acc, obj) => acc + (1 * obj.valor_recoger), 0);
      });
    }
}

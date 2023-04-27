import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { GenericasService } from 'app/core/services/genericas.service';
import { OfertaService } from 'app/core/services/oferta.service';
import { UtilityService } from 'app/resources/services/utility.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'recalcular-oferta-consumo-plexa',
  templateUrl: './recalcular-oferta-consumo-plexa.component.html',
  styleUrls: ['./recalcular-oferta-consumo-plexa.component.scss']
})
export class RecalcularOfertaConsumoPlexaComponent implements OnInit {

  @Input() numeroSolicitud: string;
  @Input() undadNegocio: string;
  @Input() identificacion: string;
  public tipoCombustible$: Observable<any>;

  public capacidadPago$: Observable<any>;
  public listadoOferta: any;
  plazoMaximo: number = 0;
  plazoMinimo: number = 0;
  datosCompletoSolicitud: any;
  public errorPlazo = false;
  public formOferta: FormGroup;

  constructor(
    private ofertaService: OfertaService,
    private route: ActivatedRoute,
    private fabricaCreditoService: FabricaCreditoService,
    private fb: FormBuilder,
    private genericaServices: GenericasService,
    public utility: UtilityService,

  ) { }

  ngOnInit(): void {
    this.createFormulario();
    this.getTipoCombustible();
    this.getCapacidadPago(Number(this.numeroSolicitud));
    this.getTodosFabricaCreditoAgenda(this.numeroSolicitud,this.identificacion);
  }

  /**
* * @description: Obtiene los tipos de estados civiles
*/
  private getTipoCombustible(): void {
    this.tipoCombustible$ = this.genericaServices.getTipoCombustibles();
  }


  // CAPCIDAD DE PAGO Y OFERTA

  private getCapacidadPago(numeroSolicitud: number): void {
    this.capacidadPago$ = this.ofertaService.getCapacidadPagoConsumo(numeroSolicitud);
  }

  public SelectOferta(item: any): void {
    let data = {
      numeroSolicitud: Number(this.numeroSolicitud),
      numeroCapacidadPago: item.numeroCapacidadPago,
    }

    Swal.fire({
      title: 'Cargando',
      html: 'Guardando información',
      timer: 500000,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => { });

    this.ofertaService
      .SelectOfertaConsumo(data)
      .subscribe((res) => {
        Swal.close();
        // 
        if (res.msg == 'OK') {
          this.listadoOferta = res.data;
          this.getCapacidadPago(Number(this.numeroSolicitud));
          // this.getListadoOferta(Number(this.numeroSolicitud));
        } else {
          Swal.fire('Error', res.data.resultado, 'error');
        }
      });
  }

  /**
 * Track by function for ngFor loops
 *
 * @param index
 * @param item
 */
  private getTodosFabricaCreditoAgenda(numeroSolicitud: string, identificacion: string): void {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    const datosSolicitud: any = {
      numeroSolicitud: numeroSolicitud,
      identificacion: identificacion
    };
    this.fabricaCreditoService.getDatosFabricaAgenda(datosSolicitud)
      .subscribe(({ data }) => {
        Swal.close();
        // 
        this.datosCompletoSolicitud = data;
        // this.getActividadEconomica(data.ocupacion);
        this.llenarDatosFormOferta(data)
        // buscar valores max y min
        if (this.datosCompletoSolicitud.tipoCredito) {
          this.genericaServices.getParametriaTipoCredito(this.datosCompletoSolicitud.tipoCredito)
            .subscribe(({ data }) => {
              // ;
              this.plazoMaximo = data.plazoMaximo;
              this.plazoMinimo = data.plazoMinimo;
              this.formOferta.controls['plazo'].setValidators([Validators.required, Validators.max(this.plazoMaximo), Validators.min(this.plazoMinimo)])
              this.formOferta.markAllAsTouched();
            })
        }

      });
  }

  public validacionPlazo(data: string) {
    // ;
    let plazo = Number(this.utility.enviarNumero(data));
    let cambiar = false;
    if ((plazo > this.plazoMaximo) || (plazo < this.plazoMinimo)) {
      cambiar = true;
    }
    this.errorPlazo = cambiar;

  }

  /**
 * @description :creando el formulario
 */
  private createFormulario(): void {


    this.formOferta = this.fb.group({
      valorSolicitado: ['', [Validators.required]],
      plazo: ['', [Validators.required]],
      compraDia: ['', [Validators.required]],
      tipoCombustible: ['', [Validators.required]],
      ingresosDiarios: ['', [Validators.required]],
      ingresos: ['', [Validators.required]],
      valorCuotaDiaria: ['', [Validators.required]],
      valorCuota: ['', [Validators.required]],
      numeroSolicitud: Number(this.numeroSolicitud),
    })
  }


  private llenarDatosFormOferta(data) {
    // ingresosDiarios
    if (data.valorSolicitado) {
      this.formOferta.controls['valorSolicitado'].setValue(this.utility.formatearNumero(String(data.valorSolicitado)));
    }
    if (data.ingresosDiarios) {
      this.formOferta.controls['ingresosDiarios'].setValue(this.utility.formatearNumero(String(data.ingresosDiarios)));
    }
    if (data.ingresos) {
      this.formOferta.controls['ingresos'].setValue(this.utility.formatearNumero(String(data.ingresos)));
    }
    if (data.plazo) {
      this.formOferta.controls['plazo'].setValue(this.utility.formatearNumero(String(data.plazo)));
    }
    if (data.compraDia) {
      this.formOferta.controls['compraDia'].setValue(this.utility.formatearNumero(String(data.compraDia)));
    }
    if (data.valorCuotaDiaria) {
      this.formOferta.controls['valorCuotaDiaria'].setValue(this.utility.formatearNumero(String(data.valorCuotaDiaria)));
    }
    if (data.valorCuota) {
      this.formOferta.controls['valorCuota'].setValue(this.utility.formatearNumero(String(data.valorCuota)));
    }
    this.formOferta.controls['tipoCombustible'].setValue(data.tipoCombustible);
  }

  public recalcularOferta(): void {
    let data = {
      numeroSolicitud: Number(this.numeroSolicitud),
      plazo: Number(this.utility.enviarNumero(this.formOferta.value.plazo)),
      monto: Number(this.utility.enviarNumero(this.formOferta.value.valorSolicitado)),
      tanqueoDiario: Number(this.utility.enviarNumero(this.formOferta.value.compraDia)),
      tipoCombustible: this.formOferta.value.tipoCombustible,
      ingresosDiarios: Number(this.utility.enviarNumero(this.formOferta.value.ingresosDiarios)),
    }

    Swal.fire({
      title: 'Cargando',
      html: 'Guardando información',
      timer: 500000,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => { });

    this.ofertaService
      .recalcularOfertaConsumo(data)
      .subscribe((res) => {
        Swal.close();
        if (res.data.cre_sp_calcular_capacidad_pago_consumo == 'OK') {

          this.getCapacidadPago(Number(this.numeroSolicitud));
          this.getTodosFabricaCreditoAgenda(this.numeroSolicitud, this.identificacion);

        } else {
          Swal.fire('Error', res.data.resultado, 'error');
        }
      });
  }

}

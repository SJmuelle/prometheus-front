import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { GenericasService } from 'app/core/services/genericas.service';
import { OfertaService } from 'app/core/services/oferta.service';
import { UtilityService } from 'app/resources/services/utility.service';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'recalcular-oferta-libranza',
  templateUrl: './recalcular-oferta-libranza.component.html',
  styleUrls: ['./recalcular-oferta-libranza.component.scss']
})
export class RecalcularOfertaLibranzaComponent implements OnInit {

  @Input() numeroSolicitud: string;
  @Input() identificacion: string;
  public tipoCombustible$: Observable<any>;

  public capacidadPago$: Observable<any>;
  public listadoOferta$: any;
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
    this.getListadoOferta(Number(this.numeroSolicitud));
    this.getCapacidadPago(Number(this.numeroSolicitud));
    this.getTodosFabricaCreditoAgenda(this.numeroSolicitud, this.identificacion);
  }

  /**
 * @description :creando el formulario
 */
  private createFormulario(): void {

    this.formOferta = this.fb.group({
      valorSolicitado: [''],
      plazo: [''],
      salarioBasico: [''],
      otrosIngresos: [''],
      comisionesHorasExtras: [''],
      descuentoNomina: [''],
      numeroSolicitud: Number(this.numeroSolicitud),
    })
  }
  private getListadoOferta(numeroSolicitud: number): void {
    this.listadoOferta$ = this.ofertaService.getListadoOferta(numeroSolicitud);
  }
  private getCapacidadPago(numeroSolicitud: number): void {
    this.capacidadPago$ = this.ofertaService.getCapacidadPago(numeroSolicitud);
  }
  public SelectOferta(item: any): void {
    let data = {
      numeroSolicitud: Number(this.numeroSolicitud),
      identificacion: item.identificacion,
      idRegistro: item.idOpcion
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
      .SelectOferta(data)
      .subscribe((res) => {
        Swal.close();
        if (res.data.respuesta == 'OK') {
          this.getListadoOferta(Number(this.numeroSolicitud));
        } else {
          Swal.fire('Error', res.data.resultado, 'error');
        }
      });
  }
  public recalcularOferta(): void {
    let data = {
      valorSolicitado: Number(this.utility.enviarNumero(this.formOferta.value.valorSolicitado)),
      plazo: Number(this.utility.enviarNumero(this.formOferta.value.plazo)),
      salarioBasico: Number(this.utility.enviarNumero(this.formOferta.value.salarioBasico)),
      otrosIngresos: Number(this.utility.enviarNumero(this.formOferta.value.otrosIngresos)),
      comisionesHorasExtras: Number(this.utility.enviarNumero(this.formOferta.value.comisionesHorasExtras)),
      descuentoNomina: Number(this.utility.enviarNumero(this.formOferta.value.descuentoNomina)),
      numeroSolicitud: Number(this.numeroSolicitud),
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
      .recalcularOferta(data)
      .subscribe((res) => {
        Swal.close();
        if (res.data.respuesta == 'OK') {
          this.getListadoOferta(Number(this.numeroSolicitud));
          this.getCapacidadPago(Number(this.numeroSolicitud));
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
        this.datosCompletoSolicitud = data;
        this.llenarDatosFormOferta(data);
      });
  }

  private llenarDatosFormOferta(data) {
    if (data.valorSolicitado) {
      this.formOferta.controls['valorSolicitado'].setValue(this.utility.formatearNumero(String(data.valorSolicitado)));
    }
    if (data.plazo) {
      this.formOferta.controls['plazo'].setValue(this.utility.formatearNumero(String(data.plazo)));
    }
    if (data.salarioBasico) {
      this.formOferta.controls['salarioBasico'].setValue(this.utility.formatearNumero(String(data.salarioBasico)));
    }
    if (data.otrosIngresos) {
      this.formOferta.controls['otrosIngresos'].setValue(this.utility.formatearNumero(String(data.otrosIngresos)));
    }
    if (data.comisionesHorasExtras) {
      this.formOferta.controls['comisionesHorasExtras'].setValue(this.utility.formatearNumero(String(data.comisionesHorasExtras)));
    }
    if (data.descuentoNomina) {
      this.formOferta.controls['descuentoNomina'].setValue(this.utility.formatearNumero(String(data.descuentoNomina)));
    }
  }

}

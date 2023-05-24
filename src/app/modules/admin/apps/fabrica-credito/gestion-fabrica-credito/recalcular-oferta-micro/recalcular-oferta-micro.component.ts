import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormularioCreditoService } from 'app/core/services/formulario-credito.service';
import { GenericasService } from 'app/core/services/genericas.service';
import Swal from 'sweetalert2';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recalcular-oferta-micro',
  templateUrl: './recalcular-oferta-micro.component.html',
  styleUrls: ['./recalcular-oferta-micro.component.scss']
})
export class RecalcularOfertaMicroComponent implements OnInit {


  @Input() numeroSolicitud: string;
  @Input() identificacion: string;


  form: FormGroup;
  public unsubscribe$: Subject<any> = new Subject<any>();
  public salarioMinimo: number;
  public plazosCredito: any;
  public datosCompletoSolicitud: any;
  

  constructor(
    private fb: FormBuilder,
    private genericaServices: GenericasService,
    private _formularioCreditoService: FormularioCreditoService,
    private fabricaCreditoService: FabricaCreditoService,
    private route: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      monto: ['', Validators.required],
      plazo: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.getSalarioMinimo()
    this.getTodosFabricaCreditoAgenda(this.numeroSolicitud,this.identificacion)
  }

  private getSalarioMinimo() {
    this.genericaServices.getSalarioBasico().subscribe(({ data }) => {
      this.salarioMinimo = data.salarioMinimo;

      this.form.get('monto').setValidators([Validators.required, Validators.min(data.salarioMinimo), Validators.max(100000000)])
    })
  }


  /**
   * @description: Obtener limite de plazos por el valor de credito
   */
  public getPlazosCredito(valorCredito: number) {

    this._formularioCreditoService.validationPlazoMicro({ valorCredito }).subscribe(rep => {
      this.plazosCredito = rep

    })

  }

  public reCalcularSolicitud(){
    let data = {
      numeroSolicitud: Number(this.numeroSolicitud),
      valorSolicitado: Number(this.form.controls['monto'].value),
      plazo: this.form.controls['plazo'].value
    }

    this.genericaServices.postReCalcularSolicitudMicro(data).pipe(takeUntil(this.unsubscribe$)).subscribe(rep => {
        const msg = rep.data.respuesta;
       if(msg !== 'OK'){
        Swal.fire({
          text: msg,
          icon: 'info'
        }).then(rep => {
          location.reload()
        })
       }else{
        Swal.fire({
          title: 'Recalculado',
          text: 'Se ha guardado con éxito',
          icon: 'success'
        })
       }
    })
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
        
        this.form.controls['monto'].setValue(data.valorSolicitado)
        this.form.controls['plazo'].setValue(data.plazo)
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}

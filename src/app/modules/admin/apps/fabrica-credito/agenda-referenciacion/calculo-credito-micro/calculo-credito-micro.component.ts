import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormularioCreditoService } from 'app/core/services/formulario-credito.service';
import { GenericasService } from 'app/core/services/genericas.service';
import Swal from 'sweetalert2';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-calculo-credito-micro',
  templateUrl: './calculo-credito-micro.component.html',
  styleUrls: ['./calculo-credito-micro.component.scss']
})
export class CalculoCreditoMicroComponent implements OnInit {

  @Input() data;
  @Input() numeroSolicitud;
  form: FormGroup;
  public unsubscribe$: Subject<any> = new Subject<any>();
  public salarioMinimo: number;
  public plazosCredito: any;
  

  constructor(
    private fb: FormBuilder,
    private genericaServices: GenericasService,
    private _formularioCreditoService: FormularioCreditoService,
  ) {
    this.form = this.fb.group({
      monto: ['', Validators.required],
      plazo: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.getSalarioMinimo()
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
        })
       }else{
        Swal.fire({
          title: 'Recalculado',
          text: 'Se ha guardado con éxito',
          icon: 'success'
        }).then(rep =>{
          location.reload()
        })
       }
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}

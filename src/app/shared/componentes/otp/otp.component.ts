import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormularioCreditoService } from 'app/core/services/formulario-credito.service';
import { Subject } from 'rxjs'
import moment from 'moment';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OTPComponent implements OnInit {

  @Input() contador: number;
  @Input() numeroSolicitud: number;

  @Input() datosBasicos: FormGroup
  @Input() actualizandoDatosOTP: boolean;
  @Input() validandoOTPLoading: boolean;
  @Input() otpValidado: boolean;
  @Input() changeTextOTP: boolean;
  @Input() otpNumber: string;

  destroyed = new Subject<void>();
  timerInterval: any;

  @ViewChild('input1') input1!: ElementRef<HTMLInputElement>;
  @ViewChild('input2') input2!: ElementRef<HTMLInputElement>;
  @ViewChild('input3') input3!: ElementRef<HTMLInputElement>;
  @ViewChild('input4') input4!: ElementRef<HTMLInputElement>;
  @ViewChild('input5') input5!: ElementRef<HTMLInputElement>;
  @ViewChild('input6') input6!: ElementRef<HTMLInputElement>;

  constructor(private _formularioCreditoService: FormularioCreditoService) { }

  ngOnInit(): void {
  }

  solicitarCodigo(): void {
    if (this.datosBasicos.valid) {
      const data = {
        numeroSolicitud: this.numeroSolicitud,
        tipo: 'T',
        tipoOTP: "AUTORIZACION"
      }
      this.validandoOTPLoading = true;
      //  this.solicitarOTP = true;
      this._formularioCreditoService.solicitarOTP(data).pipe(takeUntil(this.destroyed)).subscribe(rep => {
        if (rep.status === 200) {
        }
        this.startTimer();
        this.validandoOTPLoading = false;
      })
    }
  }

  startTimer() {
    this.contador = 0;
    this.changeTextOTP = true;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.timerInterval = setInterval(() => {
      if (this.contador < 180) {
        this.contador++;
      }
    }, 1000)
  }

  updateOTPInput() {
    const num1 = this.input1.nativeElement.value;
    const num2 = this.input2.nativeElement.value;
    const num3 = this.input3.nativeElement.value;
    const num4 = this.input4.nativeElement.value;
    const num5 = this.input5.nativeElement.value;
    const num6 = this.input6.nativeElement.value;


    this.otpNumber = num1 + num2 + num3 + num4 + num5 + num6;
}

}

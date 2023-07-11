import { Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormularioCreditoService } from 'app/core/services/formulario-credito.service';
import { Subject } from 'rxjs'
import moment from 'moment';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { fuseAnimations } from '@fuse/animations';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
  animations: fuseAnimations,
})
export class OTPComponent implements OnInit {

  @Input() numeroSolicitud: number;
  @Input() datosBasicos: FormGroup
  
  @Output() otpValidado = new EventEmitter<boolean>();
  
  contador: number = 180;
  actualizandoDatosOTP: boolean = false;
  otpNumber: string;
  changeTextOTP: boolean;
  validandoOTPLoading: boolean = false;
  destroyed = new Subject<void>();
  timerInterval: any;
  optValido: boolean = false;

  @ViewChild('input1') input1!: ElementRef<HTMLInputElement>;
  @ViewChild('input2') input2!: ElementRef<HTMLInputElement>;
  @ViewChild('input3') input3!: ElementRef<HTMLInputElement>;
  @ViewChild('input4') input4!: ElementRef<HTMLInputElement>;
  @ViewChild('input5') input5!: ElementRef<HTMLInputElement>;
  @ViewChild('input6') input6!: ElementRef<HTMLInputElement>;

  constructor(private _formularioCreditoService: FormularioCreditoService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.focusNextInput(this.input1.nativeElement, this.input2.nativeElement);
    this.focusNextInput(this.input2.nativeElement, this.input3.nativeElement);
    this.focusNextInput(this.input3.nativeElement, this.input4.nativeElement);
    this.focusNextInput(this.input4.nativeElement, this.input5.nativeElement);
    this.focusNextInput(this.input5.nativeElement, this.input6.nativeElement);

    this.focusPreviusInput(this.input2.nativeElement, this.input1.nativeElement);
    this.focusPreviusInput(this.input3.nativeElement, this.input2.nativeElement);
    this.focusPreviusInput(this.input4.nativeElement, this.input3.nativeElement);
    this.focusPreviusInput(this.input5.nativeElement, this.input4.nativeElement);
    this.focusPreviusInput(this.input6.nativeElement, this.input5.nativeElement);

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

    console.log('otpNumber', this.otpNumber, 'length: ' + this.otpNumber.length);
    
    if (this.otpNumber.length === 6 && !this.optValido) {
      const data = {
        numeroSolicitud: this.numeroSolicitud,
        tipoTercero: 'T',
        numeroOTP: this.otpNumber
      }

      this._formularioCreditoService.validatarOTP(data).pipe(takeUntil(this.destroyed)).subscribe(rep => {
        this.otpValidado.emit(rep.data.resultado === 'OK');
        this.optValido = rep.data.resultado === 'OK';
        this.validandoOTPLoading = false;
      }, err => {
        Swal.fire('Error',
          'Error al validar del OTP', 'error').then(() => {
            this.validandoOTPLoading = false;
            this.borrarOTPNumbers()
          })
      })
    }

  }

  borrarOTPNumbers(): void {
    this.input1.nativeElement.value = ''
    this.input2.nativeElement.value = ''
    this.input3.nativeElement.value = ''
    this.input4.nativeElement.value = ''
    this.input5.nativeElement.value = ''
    this.input6.nativeElement.value = ''

  }

  public focusNextInput(currentInput: HTMLInputElement, nextInput: HTMLInputElement): void {
    currentInput.addEventListener('input', ($e) => {
        if (currentInput.value.length === 1) {
            nextInput.focus();
        }
    });
}

public focusPreviusInput(currentInput: HTMLInputElement, previusInput: HTMLInputElement): void {
    currentInput.addEventListener('keydown', ($e) => {
        if ($e.key === 'Backspace') {
            // bug donde primero se hace el focus y luego se borra, entonces se borraba el anterior y no el actual
            setTimeout(() => {
                previusInput.focus();
            }, 100);
        }
    });
}

}

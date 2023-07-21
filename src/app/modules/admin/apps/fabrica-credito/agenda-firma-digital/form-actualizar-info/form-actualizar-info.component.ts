import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { AgendaFirmaService } from 'app/core/services/agenda-firma.service';
import { DocumentosAdjuntosService } from 'app/core/services/documentos-adjuntos.service';
import { Sweetalert2Service } from 'app/core/services/sweetalert2.service';
import moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-actualizar-info',
  templateUrl: './form-actualizar-info.component.html',
  styleUrls: ['./form-actualizar-info.component.scss'],
  animations: fuseAnimations
})
export class FormActualizarInfoComponent implements OnInit, OnDestroy {
  @Input() mode: string = ""
  @Input() dataDocuments: any = null
  public unsubscribe$: Subject<any> = new Subject();
  public selectedDocument: any = null
  form: FormGroup;
  mostrar = 1;
  numeroSolicitud
  public datosDocumentosHistorico: any = null
  fechaActual: any = moment().locale('co');
  info: any;

  constructor(
    private _agendaFirma: AgendaFirmaService,
    private fb: FormBuilder,
    private _documentosServices: DocumentosAdjuntosService,
    private _sweetalertService: Sweetalert2Service

  ) {
    this.form = fb.group({
      identificacionTitular: ['', [Validators.required]],
      primerNombreTitular: ['', [Validators.required]],
      segundoNombreTitular: [''],
      primerApellidoTitular: ['', [Validators.required]],
      segundoApellidoTitular: ['', [Validators.required]],
      nombreCompletoTitular: ['', [Validators.required]],
      celularTitular: ['', [Validators.required, Validators.pattern('^[3][0-9]{9}$')]],
      emailTitular: ['', [Validators.required, Validators.email]],
      fechaNacimientoTitular: ['', [Validators.required, this.validatedDate.bind(this), this.validateMayorEdad.bind(this)]],
      fechaExpedicionTitular: ['', [Validators.required, this.validatedDate.bind(this)]],

      identificacionCodeudor: [''],
      primerNombreCodeudor: [''],
      segundoNombreCodeudor: [''],
      primerApellidoCodeudor: [''],
      segundoApellidoCodeudor: [''],
      nombreCompletoCodeudor: [''],
      celularCodeudor: [''],
      emailCodeudor: ['', [Validators.email]],
      fechaNacimientoCodeudor: [''],
      fechaExpedicionCodeudor: [''],

      identificacionDeudor: [''],
      primerNombreDeudor: [''],
      segundoNombreDeudor: [''],
      primerApellidoDeudor: [''],
      segundoApellidoDeudor: [''],
      nombreCompletoDeudor: [''],
      celularDeudor: [''],
      emailDeudor: ['', [Validators.email]],
      fechaNacimientoDeudor: [''],
      fechaExpedicionDeudor: [''],
    });
  }

  ngOnInit(): void {
    this._agendaFirma.getNumeroSolicitud$.subscribe((numeroSolicitud) => {
      this.mostrar = 1;
      this.numeroSolicitud = numeroSolicitud;
      this.buscarInfor()
      this.selectedDocument = null
      this.datosDocumentosHistorico = null
    })
  }


  buscarInfor() {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then(() => { });
    this._agendaFirma.obtenerDatosBasicosFirma(this.numeroSolicitud).subscribe((res) => {
      Swal.close();
      this.form.patchValue(res.data);
      this.info=res.data
      this.form.controls['identificacionTitular'].disable();
      this.form.controls['fechaNacimientoTitular'].disable();
      this.form.controls['identificacionTitular'].updateValueAndValidity();
      this.form.controls['fechaNacimientoTitular'].updateValueAndValidity();
    })
  }

  private validatedDate(control: AbstractControl) {
    const valueControl = control?.value ?? '';
    const date = moment(valueControl).format('YYYY-MM-DD')
    const errors = { dateError: true };
    // Set the validation error on the matching control
    if (this.fechaActual.isBefore(date)) {

      return errors
    } else {
      return null
    }
  }

  private validateMayorEdad(control: AbstractControl) {
    const valueControl = control?.value ?? '';
    const date = moment(valueControl).format('YYYY-MM-DD')
    const errors = { dateMayor: true };

    const fechaMayor = moment().locale('co')
    fechaMayor.subtract(18, 'years');
    // Set the validation error on the matching control

    if (fechaMayor.isBefore(date)) {

      return errors
    } else {
      return null
    }
  }


  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    let data = this.form.value;
    data.identificacionTitular=this.info.identificacionTitular
    data.fechaNacimientoTitular=this.info.fechaNacimientoTitular
    data.nombreCompletoTitular = `${data.primerNombreTitular} ${data.segundoNombreTitular} ${data.primerApellidoTitular} ${data.segundoApellidoTitular}`
    this._agendaFirma.guardarDatosBasicosFirma(data).subscribe((resp) => {
      if (resp.data.respuesta == 'OK') {
        Swal.fire({
          title: 'Completado',
          html: `Se actualizó con exito`,
          icon: 'success'
        }).then(result => {
          if (result) {
            setTimeout(() => {
              this.cerrar();
            }, 500);

          }
        })

      }
    })
  }

  public selectDocument(event: any): void {
    this.datosDocumentosHistorico = null
    this._sweetalertService.startLoading({});

    const datosHistorico = {
      numeroSolicitud: this.numeroSolicitud?.toString(),
      idAdjunto: event.value?.toString(),
    };

    this._documentosServices.getDocumento(datosHistorico).subscribe({
      next: (resp) => {
        this._sweetalertService.stopLoading();
        this.datosDocumentosHistorico = resp?.data || null

      },
      error: (e) => {
        this._sweetalertService.alertError();
      }
    })



  }

  public getDownloadHistorico(): void {
    const archivo = this.datosDocumentosHistorico.base64.split(',')[1];
    const extension = this.datosDocumentosHistorico.nombreArchivo.split('.')[1];
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.href = `data:application/${extension};base64,${archivo}`;
    link.target = '_self';
    link.download = this.datosDocumentosHistorico.nombreArchivo + '.' + this.datosDocumentosHistorico.extension;
    link.click();
  }


  cerrar(): void {
    this._agendaFirma.openDrawner.next(false)
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

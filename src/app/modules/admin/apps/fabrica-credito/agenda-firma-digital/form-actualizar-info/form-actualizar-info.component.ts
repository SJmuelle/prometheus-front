import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { AgendaFirmaService } from 'app/core/services/agenda-firma.service';
import moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-actualizar-info',
  templateUrl: './form-actualizar-info.component.html',
  styleUrls: ['./form-actualizar-info.component.scss'],
  animations : fuseAnimations
})
export class FormActualizarInfoComponent implements OnInit , OnDestroy {
  public unsubscribe$: Subject<any> = new Subject();
  form: FormGroup;
  mostrar=1;
  numeroSolicitud
  constructor(
    private _agendaFirma: AgendaFirmaService,
    private fb: FormBuilder,

  ) { 
    this.form = fb.group({
      identificacionTitular:['', [Validators.required]],
      primerNombreTitular: ['', [Validators.required]],
      segundoNombreTitular: [''],
      primerApellidoTitular: ['', [Validators.required]],
      segundoApellidoTitular: ['', [Validators.required]],
      nombreCompletoTitular: ['', [Validators.required]],
      celularTitular: ['', [Validators.required, Validators.pattern('^[3][0-9]{9}$')]],
      emailTitular: ['', [Validators.required]],
      fechaNacimientoTitular: ['', [Validators.required]],
      fechaExpedicionTitular: ['', [Validators.required]],

      identificacionCodeudor:[''],
      primerNombreCodeudor: [''],
      segundoNombreCodeudor: [''],
      primerApellidoCodeudor: [''],
      segundoApellidoCodeudor: [''],
      nombreCompletoCodeudor: [''],
      celularCodeudor: [''],
      emailCodeudor: [''],
      fechaNacimientoCodeudor: [''],
      fechaExpedicionCodeudor: [''],
      
      identificacionDeudor:[''],
      primerNombreDeudor: [''],
      segundoNombreDeudor: [''],
      primerApellidoDeudor: [''],
      segundoApellidoDeudor: [''],
      nombreCompletoDeudor: [''],
      celularDeudor: [''],
      emailDeudor: [''],
      fechaNacimientoDeudor: [''],
      fechaExpedicionDeudor: [''],
    });
  }

  ngOnInit(): void {
    this._agendaFirma.getNumeroSolicitud$.subscribe((numeroSolicitud) => {
      this.numeroSolicitud = numeroSolicitud;
      this.buscarInfor()
    })
  }


  buscarInfor() {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then(() => { });
    this._agendaFirma.obtenerDatosBasicosFirma(this.numeroSolicitud).subscribe((res) => {
      Swal.close();
      this.form.patchValue(res.data);
    })
  }

  


  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    let data = this.form.value;
    data.nombreCompletoTitular=`${data.primerNombreTitular} ${data.segundoNombreTitular} ${data.primerApellidoTitular} ${data.segundoApellidoTitular}`
    this._agendaFirma.guardarDatosBasicosFirma(data).subscribe((resp) => {
      if(resp.data.respuesta=='OK'){
          Swal.fire({
            title: 'Completado',
            html: `Se actualizo con exito`,
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

  cerrar():void{
    this._agendaFirma.openDrawner.next(false)
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

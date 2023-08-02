import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComentariosService } from 'app/core/services/comentarios.service';
import { ListadoCarteraService } from 'app/core/services/listadoCartera.service';
import { UtilityService } from 'app/resources/services/utility.service';
import moment from 'moment';
import { Subject, Observable, of,  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map, startWith, takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormDialogComentariosComponent } from '../form-dialog-comentarios/form-dialog-comentarios.component';
import { PermisosService } from 'app/core/services/permisos.service';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
// import { format} from 'date-fns'
@Component({
  selector: 'app-form-dialog-negociacion',
  templateUrl: './form-dialog-negociacion.component.html',
  styleUrls: ['./form-dialog-negociacion.component.scss']
})
export class FormDialogNegociacionComponent implements OnInit {

  public form: FormGroup;
  public unsubscribe$: Subject<any> = new Subject<any>();
  listadoTipo: any;
  hoy = moment(new Date()).format("yyyy-MM-DD");
  manana: any;
  public trazabilidad:boolean=false;

  entidadOptionsNueva: any[] = [];

  constructor(
    private fb: FormBuilder,
    private _dialog: MatDialogRef<FormDialogComentariosComponent>,
    private _listadoCarteraService: ListadoCarteraService,
    public utility: UtilityService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private comentariosService: ComentariosService,
    private _permisosService: PermisosService,
    private _fabricaService: FabricaCreditoService
  ) { }

  ngOnInit(): void {
    this.manana = moment().add(1, 'days');
    this.manana = moment(this.manana).format("yyyy-MM-DD");
    this.crearFormulario();

    this.trazabilidad = this._permisosService.permisoPorModuleTrazabilidad()
    if(this.trazabilidad){
        this.form.disable()
    }

    this.form.controls.numeroSolicitud.setValue(Number(this.data.numeroSolicitud));
    this.form.controls.identificacion.setValue(this.data.identificacion);
    this.form.controls.idRegistro.setValue(this.data.item.id);
    this.form.controls.resultadoNegociacion.setValue(this.data.evento);
    this.form.controls.porcentajeConsultores.setValue(50);
    this.form.controls.valorAComprarNoEditable.setValue(this.utility.formatearNumero(this.data.item.saldoActual))
    this.form.controls.valorAComprar.setValue(this.utility.formatearNumero(0 + ''))
    this.form.controls.nombreNegociador.setValue(this.data.item.Detalle.nombreNegociador)
    this.form.controls.celularNegociador.setValue(this.data.item.Detalle.celularNegociador)
    this.form.controls.valorRealCartera.setValue(this.data.item.Detalle.valorRealCartera)
    this.form.controls.comentarioNegociacion.setValue(this.data.item.Detalle.comentarioNegociacion)
    this.form.controls.fechaLimitePago.setValue(this.data.item.Detalle.fechaLimitePago)


    this.calcularDescuento();


  }

  /**
   * @description:
   */
  public calcularDescuento() {
    let valorAComprarNoEditable = Number(this.utility.enviarNumero((this.form.value.valorRealCartera)))
    let valorAComprar = Number(this.utility.enviarNumero((this.form.value.valorAComprar)))
    let valor = valorAComprarNoEditable - valorAComprar
    if (valor < 0) {
      this.form.controls.valorAComprar.setValue(this.utility.formatearNumero(valorAComprarNoEditable + ''))
      this.form.controls.valorDescuento.setValue(this.utility.formatearNumero(0 + ''))
    } else {
      this.form.controls.valorDescuento.setValue(this.utility.formatearNumero(valor + ''))
    }
    this.calcularValorConsultores();
  }

  /**
 * @description:
 */
  public calcularValorConsultores() {
    let valorDescuento = Number(this.utility.enviarNumero((this.form.value.valorDescuento)));
    let porcentajeConsultores = Number((this.form.value.porcentajeConsultores));
    let valor = (valorDescuento * (porcentajeConsultores / 100));
    valor = Math.round(valor);
    this.form.controls.valorConsultores.setValue(this.utility.formatearNumero(valor + ''));
  }



  /**
   * @description: Cierra el dialogo
   */
  public onCerrar(): void {
    this._dialog.close();
  }

  public onGuardar(): void {

    if (this.form.valid) {
      const data: any = this.form.getRawValue();
      const valorAComprar = Number(this.utility.enviarNumero((this.form.value.valorAComprar)));
      const valorDescuento = Number(this.utility.enviarNumero((this.form.value.valorDescuento)));
      const valorConsultores = Number(this.utility.enviarNumero((this.form.value.valorConsultores)));
      const valorRealCartera = Number(this.utility.enviarNumero((this.form.value.valorRealCartera)));

      if (this.data.evento != 'NO EXITOSA') {
        if (valorAComprar == 0) {
          Swal.fire('Información', 'El  valor a comprar debe ser mayor a 0, para guardar la negociación.', 'warning').then((resultado) => {

          });
          return;
        }
      }

      delete data.valorAComprar;
      delete data.valorDescuento;
      delete data.valorConsultores;
      delete data.valorAComprarNoEditable;
      delete data.valorRealCartera;
      // delete data.porcentajeConsultores;
      const datosFormularios: any = {
        valorAComprar: valorAComprar,
        valorDescuento: valorDescuento,
        valorConsultores: valorConsultores,
        valorRealCartera: valorRealCartera,
        ...data
      }
      let mensaje = '¿Está seguro de guardar el resultado de la negociación?';
      Swal.fire({
        title: 'Guardar información',
        text: mensaje,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#a3a0a0',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.postGuardado(datosFormularios);
        }
      });
    } else {
      this.form.markAllAsTouched();
    }

  }

  private crearFormulario(): void {
    if (this.data.evento == 'NO EXITOSA') {
      this.form = this.fb.group({
        numeroSolicitud: [''],
        identificacion: [''],
        idRegistro: [''],
        resultadoNegociacion: [''],
        valorAComprar: [''],
        valorDescuento: [''],
        valorConsultores: [''],
        nombreNegociador: ['', [Validators.required]],
        celularNegociador: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(11)]],
        fechaLimitePago: ['0099-01-01'],
        valorAComprarNoEditable: [''],
        valorRealCartera: ['', [Validators.required]],
        porcentajeConsultores: [50],
        comentarioNegociacion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(800)]],
        nombreEntidadNueva: [''],
        nit: ['']
      });
    } else {
      this.form = this.fb.group({
        numeroSolicitud: [''],
        identificacion: [''],
        idRegistro: [''],
        resultadoNegociacion: [''],
        valorAComprarNoEditable: [''],
        porcentajeConsultores: [50],
        valorAComprar: ['', [Validators.required]],
        valorDescuento: ['', [Validators.required]],
        valorConsultores: ['', [Validators.required]],
        nombreNegociador: ['', [Validators.required]],
        celularNegociador: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(11)]],
        fechaLimitePago: ['', [Validators.required]],
        valorRealCartera: ['', [Validators.required]],
        comentarioNegociacion: [''],
        nombreEntidadNueva: ['', Validators.required],
        nit: ['',Validators.required]
      });

      this.form.get('nombreEntidadNueva').valueChanges.subscribe(entidad => {
        this.getEntidadesObservableNueva(entidad);
    })
    }

  }

  private postGuardado(data: any): void {
    Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    this.confirmarNit(data.nombreEntidadNueva, data.nit).pipe(takeUntil(this.unsubscribe$)).subscribe(guardar => {
        console.log('data', this.data);

        if(guardar || this.data.evento === 'NO EXITOSA'){
            this._listadoCarteraService.gestionCartera(data).pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => {
              Swal.fire('Completado', 'Se guardo con éxito el resultado de la negociación', 'success').then((resultado) => {
                if (resultado) {
                  this.onCerrar();
                  Swal.close();
                }
              });
              ;
              setTimeout(() => {
                this.onCerrar();
                Swal.close();
              }, 1000);
            }, err => {
              Swal.fire('Error', err.error.msg, 'error')
            });
        }else{
            Swal.fire('Error', 'El nit no concuerda con la entidad financiera', 'error');
        }
    })

  }

  get requeridoComentario(): any {
    return (this.form.controls.comentarioNegociacion.dirty || this.form.controls.comentarioNegociacion.touched);
  }
  get minimoComentario(): any {
    return (this.form.controls.comentarioNegociacion.errors?.minlength);
  }

  getEntidadesObservableNueva(entidad: string) {
    if(entidad.length > 0){
        this._fabricaService.carteraEntidadNombres({
            entidad
        }).subscribe(({ data }) => {
            this.entidadOptionsNueva = data
            this.getNitApi()
        })
    }
}

getNitApi(){
    console.log('length', this.entidadOptionsNueva.length);

    if(this.entidadOptionsNueva.length === 1){
        this.form.get('nit').setValue(this.entidadOptionsNueva[0].nitEntidad)
    }
}

confirmarNit(entidad: string, nit: string): Observable<boolean> {
    return this._fabricaService.carteraEntidadNombres({ entidad }).pipe(
      takeUntil(this.unsubscribe$),
      map(({ data }) => {
        if (data.length === 1) {
          return nit === data[0].nitEntidad && entidad === data[0].nombreEntidad;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

}

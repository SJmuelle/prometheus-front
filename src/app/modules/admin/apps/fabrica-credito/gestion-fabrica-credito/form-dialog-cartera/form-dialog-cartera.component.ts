import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComentariosService } from 'app/core/services/comentarios.service';
import { GenericasService } from 'app/core/services/genericas.service';
import { ListadoCarteraService } from 'app/core/services/listadoCartera.service';
import { UtilityService } from 'app/resources/services/utility.service';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormDialogComentariosComponent } from '../form-dialog-comentarios/form-dialog-comentarios.component';

@Component({
  selector: 'app-form-dialog-cartera',
  templateUrl: './form-dialog-cartera.component.html',
  styleUrls: ['./form-dialog-cartera.component.scss']
})
export class FormDialogCarteraComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public unsubscribe$: Subject<any> = new Subject<any>();
  listadoTipo: any;
  tipo: string;

  public entidadBancaria$: Observable<any>;
  public tipoCuentaBancaria$: Observable<any>;
  public estadoCuenta$: Observable<any>;

  //varibales d eprueba
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<any[]>;
  entidadFinanciera: any[]=[];
  nuevo: boolean=false;
  //fin prueba

  constructor(
    private fb: FormBuilder,
    private _dialog: MatDialogRef<FormDialogComentariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private genericaServices: GenericasService,
    private _listadoCarteraService: ListadoCarteraService,
    public utility: UtilityService,

  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.getEntidadBancaria();
    this.getTipoCuentaBancaria();
    this.form
    .get('entidad').valueChanges.subscribe(value => this.colocarNit(value));
    this.form.get('entidad').valueChanges.subscribe(value => this.postBusquedaEntidadFinanciera(value));

    this.form.controls.numeroSolicitud.setValue(Number(this.data.numeroSolicitud));
    this.form.controls.identificacion.setValue(this.data.identificacion.toString());
    
    // this.form.controls.estadoCuenta.setValue(this.data.tipo == 'D' ? 'DEUDA' : 'AL DIA');
    this.form.controls.alDia.setValue(this.data.tipo == 'D' ? false : true);
    this.tipo = this.data.tipo;
    this.postBusquedaEntidadFinanciera('');
    this.getEstadoCuenta(this.data.tipo != 'D' ? "AL DIA" : "EN MORA");
    this.filteredOptions = this.form.controls.entidad.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    if(this.data.item!=null){
      this.nuevo=true;
      this.form.controls.entidad.setValue(this.data.item.entidad);
      this.form.controls.nit.setValue(this.data.item.nit);
      this.form.controls.numeroCuenta.setValue(this.data.item.numeroCuenta);
      this.form.controls.maximaMora.setValue(this.data.item.maximaMora);
      this.form.controls.saldoActual.setValue(this.utility.formatearNumero(this.data.item.saldoActual));
      this.form.controls.estadoCuenta.setValue(this.data.item.estadoCuenta);
      this.form.controls.idObligacion.setValue(this.data.item.id.toString());
      this.form.controls.codigoEstado.setValue(this.data.item.codigoEstado);
    }
  }

  private _filter(value: string): any[]{
    const filterValue = value.toLowerCase();
      return this.entidadFinanciera.filter(option => option.nombre.toLowerCase().includes(filterValue));
    // return this.genericaServices.postBusquedaEntidadFinanciera(filterValue);
  }

  private postBusquedaEntidadFinanciera(nombre: string){
    this.genericaServices.postBusquedaEntidadFinanciera(nombre).subscribe((res) => {
      this.entidadFinanciera=res.data;
    });
  }

  /**
   * @description: Cierra el dialogo
   */
  public onCerrar(): void {
    this._dialog.close();
  }


  /**
   * @description: Obtiene los tipos de estados civiles
   */
  private getTipoCuentaBancaria(): void {
    this.tipoCuentaBancaria$ = this.genericaServices.getTipoCuentaBancaria();
  }

    /**
   * @description: Obtiene los tipos de estados civiles
   */
     private getEstadoCuenta(tipo): void {
      this.estadoCuenta$ = this.genericaServices.getEstadoCuenta(tipo);
    }
  

  /**
* @description: Obtiene los tipos de estados civiles
*/
  private getEntidadBancaria(): void {
    this.entidadBancaria$ = this.genericaServices.getEntidadBancaria();
  }
  public onGuardar(): void {
    if (this.form.valid) {
      const  datos: any = this.form.getRawValue();
      const  { saldoActual,estadoCuenta, entidad,...data } = datos;
      const  saldoActualFormato = this.utility.enviarNumero(this.form.value.saldoActual);
      const  saldoMoraFormato = this.utility.enviarNumero(this.form.value.saldoMora);
      delete data.saldoActual;
      delete data.saldoMora;
      delete data.estadoCuenta;
      delete data.entidad;
      let  datosFormularios: any 
      let mensaje;
      if(this.nuevo==false){
        mensaje = '¿Desea agregar una nueva obligación ?'
        datosFormularios = {
          saldoActual: saldoActualFormato,
          saldoMora: saldoMoraFormato,
          estadoCuenta:estadoCuenta.toUpperCase(),
          entidad:entidad.toUpperCase(),
          ...data
        }
      }else{
        mensaje = '¿Desea editar esta nueva obligación ?'
        datosFormularios = {
          saldoActual: saldoActualFormato,
          saldoMora: saldoMoraFormato,
          estadoCuenta:estadoCuenta.toUpperCase(),
          entidad:entidad.toUpperCase(),
          ...data
        }
      }
      // const data: any = this.form.getRawValue();
     
      // ;
      console.log(datosFormularios);
      
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
          if(this.nuevo==true){
            this.editarCambio(datosFormularios);
          }else{
            this.guardadoCambio(datosFormularios);
          

          }
        
        }
        // setTimeout(() => {
        //   this.onCerrar();
        // }, 1000);
      });
    } else {
      this.form.markAllAsTouched();
    }

  }

  public guardadoCambio(data) {
    Swal.fire({
      title: 'Cargando',
      html: 'Guardando información',
      timer: 500000,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => { });
    this._listadoCarteraService
      .createCartera(data)
      .subscribe((res) => {
        Swal.close();
        if (res.data.respuesta == 'OK') {
          this.onCerrar();
        } else {
          Swal.fire('Error', res.data.resultado, 'error');
        }
      });

  }
  public editarCambio(data) {
    Swal.fire({
      title: 'Cargando',
      html: 'Guardando información',
      timer: 500000,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => { });
    this._listadoCarteraService
      .editarCartera(data)
      .subscribe((res) => {
        Swal.close();
        if (res.data.respuesta == 'OK') {
          this.onCerrar();
        } else {
          Swal.fire('Error', res.data.resultado, 'error');
        }
      });

  }

  private crearFormulario(): void {
    this.form = this.fb.group({
      numeroSolicitud: [''],
      identificacion: [''],
      entidad: [''],
      sector: [''],
      tipoCuenta: [''],
      numeroCuenta: [''],
      estadoCuenta: [''],
      maximaMora: [''],
      saldoActual: [''],
      saldoMora: [''],
      nit: [''],
      idObligacion:[''],
      agregadaManualmente: true,
      codigoEstado:[''],
      alDia: Boolean,
    });
  }

  colocarNit(valor){
    if(valor){
      const result = this.entidadFinanciera.filter(entidadFinanciera => entidadFinanciera.nombre ==valor);
      if(result.length==1){
        this.form.controls.nit.setValue(result[0].nit);
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

}

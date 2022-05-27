import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartamentosCiudadesService } from 'app/core/services/departamentos-ciudades.service';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { GenericasService } from 'app/core/services/genericas.service';
import { UtilityService } from 'app/resources/services/utility.service';
import { DirectionsComponent } from 'app/shared/modal/directions/directions.component';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'ULTRACEM-NATURAL-TITULAR',
  templateUrl: './titular.component.html',
  styleUrls: ['./titular.component.scss']
})
export class TitularComponent implements OnInit {
  @Input() currentStep: number;

  // currentStep = 1;

  public form: FormGroup;
  public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
  public identificacion: string = this.route.snapshot.paramMap.get('id');


  public unSubscribe$: Subject<any> = new Subject<any>();
  public departamentos$: Observable<any>;
  public departamentosNacimiento$: Observable<any>;
  public departamentosNegocio$: Observable<any>;
  public ciudades$: Observable<any>;
  public ciudadesNacimiento$: Observable<any>;
  public ciudadesNegocio$: Observable<any>;
  public barrios$: Observable<any>;
  public barriosNegocio$: Observable<any>;
  public tipoDocumentos$: Observable<any>;
  public generos$: Observable<any>;
  public tipoVivienda$: Observable<any>;
  public nivelEstudio$: Observable<any>;
  public viveNegocio$: Observable<any>;
  public declarante$: Observable<any>;
  public camaraComercio$: Observable<any>;
  public fabricaDatos: any;
  public MostrarfabricaDatos: boolean = false;
  quillModules: any = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
    ],
  };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fabricaCreditoService: FabricaCreditoService,
    public utility: UtilityService,
    private fb: FormBuilder,
    private departamentosCiudadesService: DepartamentosCiudadesService,
    private genericaServices: GenericasService,
    private _dialog: MatDialog,

  ) {
    this.createFormulario();
    this.getFabricaCreditoAgenda(this.numeroSolicitud, this.identificacion);

  }

  ngOnInit(): void {
    // this.createFormulario();
    this.getDepartamentos();
    this.getDepartamentoNacimiento();
    this.getDepartamentoNegocio();
    this.getTiposDocumentos();
    this.getGeneros();
    this.getTiposVivienda();
    this.getNivelEstudio();
    this.getViveNegocio();
    this.getDeclarante();
    this.getCamaraComercio();

    // this.listenFormulario();
  }

  /**
 * @description: Valida que el campo solo sea numeros
 */
  public soloNumero(field: string) {
    return this.form.controls[field].hasError('pattern');
  }

  /**
 * @description :modal de direcion
 */
  public openModalDirection(): void {
    const dialogRef = this._dialog.open(DirectionsComponent, {
      width: '60%',
      data: {
        departamento: '',
        municipio: '',
        barrio: '',
        direccion: '',
      },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((res) => {
      const dataModal: any = res;
      if (dataModal.departamento != undefined) {
        this.form.controls.departamentoResidenciaCorregido.setValue(dataModal.departamento);
        this.form.controls.descripcionDepartamentoCorregido.setValue(dataModal.departamentoNombre);
        this.form.controls.ciudadResidenciaCorregido.setValue(dataModal.municipio);
        this.form.controls.descripcionCiudadCorregida.setValue(dataModal.municipioNombre);
        this.form.controls.barrioResidenciaCorregido.setValue(Number(dataModal.codigoBarrio));
        this.form.controls.descripcionBarrioCorregido.setValue(dataModal.barrio);
        this.form.controls.direccionResidenciaCorregido.setValue(
          (dataModal.viaNombre == undefined
            ? ''
            : `${dataModal.viaNombre}`) +
          (dataModal.callePrincipal == undefined
            ? ''
            : ` ${dataModal.callePrincipal}`) +
          (dataModal.numero == undefined
            ? ''
            : ` # ${dataModal.numero}`) +
          (dataModal.numero2 == undefined
            ? ''
            : ` - ${dataModal.numero2}`) +
          (dataModal.complemento == undefined
            ? ''
            : ` ${dataModal.complemento}`));
      }
    });
  }

    /**
 * @description :modal direcionn negocio
 */
  public openModalNegocio(): void {
    const dialogRef = this._dialog.open(DirectionsComponent, {
        width: '60%',
        data: {
            departamento: '',
            municipio: '',
            barrio: '',
            direccion: '',
        },
        disableClose: false
    });

    dialogRef.afterClosed().subscribe((res) => {
        const dataModal: any = res;
        if (dataModal.departamento != undefined) {
            this.form.controls.departamentoNegocioCorregido.setValue(dataModal.departamento);
            this.form.controls.descripcionDepartamentoNegocioCorregido.setValue(dataModal.departamentoNombre);
            this.form.controls.ciudadNegocioCorregido.setValue(dataModal.municipio);
            this.form.controls.descripcionCiudadNegocioCorregida.setValue(dataModal.municipioNombre);
            this.form.controls.barrioNegocioCorregido.setValue(dataModal.codigoBarrio);
            this.form.controls.descripcionBarrioNegocioCorregido.setValue(dataModal.barrio);
            this.form.controls.direccionNegocioCorregido.setValue(
                (dataModal.viaNombre == undefined
                    ? ''
                    : `${dataModal.viaNombre}`) +
                (dataModal.callePrincipal == undefined
                    ? ''
                    : ` ${dataModal.callePrincipal}`) +
                (dataModal.numero == undefined
                    ? ''
                    : ` # ${dataModal.numero}`) +
                (dataModal.numero2 == undefined
                    ? ''
                    : ` - ${dataModal.numero2}`) +
                (dataModal.complemento == undefined
                    ? ''
                    : ` ${dataModal.complemento}`));
        }
    });
}

  /**
 * @description :creando el formulario
 */
  private createFormulario(): void {
    this.form = this.fb.group({
      antiguedadNegocio:  ['', [Validators.pattern(/^[0-9]*$/)]],
      antiguedadNegocioCorregido:  ['', [Validators.pattern(/^[0-9]*$/)]],
      antiguedadNegocioValida: [''],
      antiguedadNegocioValida_bool: Boolean,
      barrioNegocio:  [''],
      barrioNegocioValida: [''],
      barrioNegocioValida_bool: Boolean,
      barrioNegocioCorregido: [''],
      barrioResidencia:  [''],
      barrioResidenciaCorregido: [''],
      barrioResidenciaValida: [''],
      barrioResidenciaValida_bool: Boolean,
      camaraComercio: [''],
      camaraComercio_bool: Boolean,
      camaraComercioCorregido: [''],
      camaraComercioValida: [''],
      camaraComercioValida_bool: Boolean,
      celular: [''],
      ciudadNegocio:  [''],
      ciudadNegocioCorregido: [''],
      ciudadNegocioValida: [''],
      ciudadNegocioValida_bool: Boolean,
      ciudadResidencia:  [''],
      ciudadResidenciaCorregido: [''],
      ciudadResidenciaValida: [''],
      ciudadResidenciaValida_bool: Boolean,
      comprasSemento:  ['', [Validators.pattern(/^[0-9]*$/)]],
      correoElectronico:  [''],
      correoElectronicoCorregido: [''],
      correoElectronicoValida: [''],
      correoElectronicoValida_bool: Boolean,
      departamentoNegocio:  [''],
      departamentoNegocioCorregido: [''],
      departamentoNegocioValida: [''],
      departamentoNegocioValida_bool: Boolean,
      departamentoResidencia:  [''],
      departamentoResidenciaCorregido: [''],
      departamentoResidenciaRalida: [''],
      departamentoResidenciaRalida_bool: Boolean,
      dineroAhorradoMensual:  ['', [Validators.pattern(/^[0-9]*$/)]],
      dineroAhorradoMensualValida: [''],
      dineroAhorradoMensualValida_bool: Boolean,
      dineroEfectivoActual:  ['', [Validators.pattern(/^[0-9]*$/)]],
      dineroPorCobrarActual:  ['', [Validators.pattern(/^[0-9]*$/)]],
      dineroProveedores:  ['', [Validators.pattern(/^[0-9]*$/)]],
      direccionNegocio:  [''],
      direccionNegocioCorregido: [''],
      direccionNegocioValida: [''],
      direccionNegocioValida_bool: Boolean,
      direccionResidencia:  [''],
      direccionResidenciaCorregido: [''],
      direccionResidenciaValida: [''],
      direccionResidenciaValida_bool: Boolean,
      idReferencia:  [''],
      inventarioActual:  ['', [Validators.pattern(/^[0-9]*$/)]],
      nitNegocio: [''],
      nitNegocioCorrido: [''],
      nitNegocioValida: [''],
      nitNegocioValida_bool: Boolean,
      nombreCompleto:  [''],
      nombreNegocio: [''],
      numeroSolicitud:  ['', [Validators.pattern(/^[0-9]*$/)]],
      pagoEmpleados:  ['', [Validators.pattern(/^[0-9]*$/)]],
      pagoEnArriendo:  ['', [Validators.pattern(/^[0-9]*$/)]],
      pagoServicioPublico:  ['', [Validators.pattern(/^[0-9]*$/)]],
      tieneEmpleado: [''],
      tipoLocal: [''],
      tipoReferencia:  [''],
      totalActivo:  ['', [Validators.pattern(/^[0-9]*$/)]],
      totalActivoValida: [''],
      totalActivoValida_bool: Boolean,
      unidadNegocio:  ['', [Validators.pattern(/^[0-9]*$/)]],
      validacionCentrales: [''],
      valorTotalCuotasCreditos:  ['', [Validators.pattern(/^[0-9]*$/)]],
      vendeCredito: [''],
      ventaMensual:  ['', [Validators.pattern(/^[0-9]*$/)]],
      ventaMensualCorregido:  ['', [Validators.pattern(/^[0-9]*$/)]],
      ventaMensualValida: [''],
      ventaMensualValida_bool: Boolean,
      viveEnNegocio:  [''],
      numeroFormularioValida:  [''],
      numeroFormularioValida_bool: Boolean,
      telefonoContactoValida:  [''],
      telefonoContactoValida_bool: Boolean,
      telefonoContacto:  [''],
      telefonoContactoCorregido:  [''],	
      telefonoContactoObservacio:  [''],
      descripcionBarrio: [''],
      descripcionBarrioCorregido: [''],
      descripcionBarrioNegocio: [''],
      descripcionBarrioNegocioCorregido: [''],
      descripcionCiudad: [''],
      descripcionCiudadCorregida: [''],
      descripcionCiudadNegocio: [''],
      descripcionCiudadNegocioCorregida: [''],
      descripcionDepartamento: [''],
      descripcionDepartamentoCorregido: [''],
      descripcionDepartamentoNegocio: [''],
      descripcionDepartamentoNegocioCorregido: [''],
      totalActivoCorregidos:[''],
      tieneEmpleadoValida_bool: Boolean,
      nombreNegocioValida_bool:Boolean,
    });
  }

  /**
   * {
    "numeroSolicitud":185376,
    "tipo":"T",
    "identificacion":"1110178226"
}
 * @description: Obtiene la data para cargar al formulario
 */
  private getFabricaCreditoAgenda(numeroSolicitud: string, identificacion: string): void {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    const datosSolicitud: any = {
      "numeroSolicitud": this.numeroSolicitud,
      "tipo": "T",
      "identificacion": this.identificacion
    };
    this.fabricaCreditoService.getDatosFabricaAgendaReferenciacion(datosSolicitud).pipe(takeUntil(this.unSubscribe$))
      .subscribe(({ data }) => {
        Swal.close();
        console.log(data);
        this.MostrarfabricaDatos = true;
        this.fabricaDatos = data
        this.form.patchValue(data);
        if (data.codigoDepartamento) {
          this.getCiudades(data.codigoDepartamento);
        }
        if (data.codigoDepartamentoNacimiento) {
          this.getCiudadesNacimiento(data.codigoDepartamentoNacimiento);
        }
        if (data.codigoDepartamentoNegocio) {
          this.getCiudadesNegocio(data.codigoDepartamentoNegocio);
        }
        if (data.codigoCiudad) {
          this.getBarrios(data.codigoCiudad);
        }
        if (data.codigoCiudadNegocio) {
          this.getBarriosNegocio(data.codigoCiudadNegocio);
        }
        if (data.antiguedadNegocio) {
          this.form.controls['antiguedadNegocio'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        if (data.antiguedadNegocioCorregido) {
          this.form.controls['antiguedadNegocioCorregido'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        if (data.comprasSemento) {
          this.form.controls['comprasSemento'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        if (data.dineroAhorradoMensual) {
          this.form.controls['dineroAhorradoMensual'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        if (data.dineroEfectivoActual) {
          this.form.controls['dineroEfectivoActual'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        if (data.dineroPorCobrarActual) {
          this.form.controls['dineroPorCobrarActual'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        if (data.dineroProveedores) {
          this.form.controls['dineroProveedores'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        if (data.inventarioActual) {
          this.form.controls['inventarioActual'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        if (data.numeroSolicitud) {
          this.form.controls['numeroSolicitud'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        if (data.pagoEmpleados) {
          this.form.controls['pagoEmpleados'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        if (data.pagoEnArriendo) {
          this.form.controls['pagoEnArriendo'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        if (data.pagoServicioPublico) {
          this.form.controls['pagoServicioPublico'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        if (data.totalActivo) {
          this.form.controls['totalActivo'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        if (data.unidadNegocio) {
          this.form.controls['unidadNegocio'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        if (data.valorTotalCuotasCreditos) {
          this.form.controls['valorTotalCuotasCreditos'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        if (data.ventaMensual) {
          this.form.controls['ventaMensual'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        if (data.ventaMensualCorregido) {
          this.form.controls['ventaMensualCorregido'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }

      });
  }

  public seleccionDepartamento(event: MatSelectChange): void {
    const codigo: string = event.value;
    this.getCiudades(codigo);
  }
  /**
   * @description: Departamento de nacimiento
   */
  public seleccionDepartamentoNacimiento(event: MatSelectChange): void {
    const codigo: string = event.value;
    this.getCiudadesNacimiento(codigo);
  }
  /**
   * @description: Departamento de negocio
   */
  public seleccionDepartamentoNegocio(event: MatSelectChange): void {
    const codigo: string = event.value;
    this.getCiudadesNegocio(codigo);
  }
  /**
   * @description: Selecciona el codigo para cargar el api barrios
   *
   */
  public seleccionCiudad(event: MatSelectChange): void {
    const codigo: string = event.value;
    this.getBarrios(codigo);
  }
  /**
   * @description: Selecciona el codigo para cargar el api barrios
   */
  public seleccionCiudadNegocio(event: MatSelectChange): void {
    const codigo: string = event.value;
    this.getBarriosNegocio(codigo);
  }
  /**
   * @description: Obtiene el listado de departamento
   */
  private getDepartamentos(): void {
    this.departamentos$ = this.departamentosCiudadesService.getDepartamentos();
  }
  /**
   * @description: Obtiene listado de departamento nacimiento
   */
  private getDepartamentoNacimiento(): void {
    this.departamentosNacimiento$ = this.departamentosCiudadesService.getDepartamentos();
  }
  /**
   * @description:
   */
  private getDepartamentoNegocio(): void {
    this.departamentosNegocio$ = this.departamentosCiudadesService.getDepartamentos();
  }
  /**
   * @description: Obtiene el listado de ciudades
   */
  private getCiudades(codigo: string): void {
    this.ciudades$ = this.departamentosCiudadesService.getCiudades(codigo);
  }
  /**
   * @description: Obtiene listado de ciudades nacimiento
   */
  private getCiudadesNacimiento(codigo: string): void {
    this.ciudadesNacimiento$ = this.departamentosCiudadesService.getCiudades(codigo);
  }
  /**
   * @description: Obtiene listado de ciudades negocio
   */
  private getCiudadesNegocio(codigo: string): void {
    this.ciudadesNegocio$ = this.departamentosCiudadesService.getCiudades(codigo);
  }
  /**
   * @description: Obtiene el listado de barrios
   */
  private getBarrios(codigo: string): void {
    this.barrios$ = this.departamentosCiudadesService.getBarrios(codigo);
  }
  /**
   * @description: Obtiene el listado de barrios del negocio
   */
  private getBarriosNegocio(codigo: string): void {
    this.barriosNegocio$ = this.departamentosCiudadesService.getBarrios(codigo);
  }
  /**
   * @description: Obtiene los tipos de documentos
   */
  private getTiposDocumentos(): void {
    this.tipoDocumentos$ = this.genericaServices.getTiposDocumentos();
  }
  /**
   * @description: Obtiene los generos
   */
  private getGeneros(): void {
    this.generos$ = this.genericaServices.getGeneros();
  }
  /**
   * @description: Obtiene los tipos de vivienda
   */
  private getTiposVivienda(): void {
    this.tipoVivienda$ = this.genericaServices.getTipoViviendas();
  }
  /**
   * @description: Obtiene el nivel de estudio
   */
  private getNivelEstudio(): void {
    this.nivelEstudio$ = this.genericaServices.getNivelEstudio();
  }
  /**
   * @description: Obtiene listado de vive en negocio
   */
  private getViveNegocio(): void {
    this.viveNegocio$ = this.genericaServices.getViveNegocio();
  }
  /**
   * @description: Obtiene el listado de declarantes
   */
  private getDeclarante(): void {
    this.declarante$ = this.genericaServices.getDeclarante();
  }
  /**
   * @description:
   */
  private getCamaraComercio(): void {
    this.camaraComercio$ = this.genericaServices.getCamaraComercio();
  }

  onPostDatos(){
    Swal.fire({
      title: 'Guardar información',
      text: '¿Está seguro de guardar información?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#a3a0a0',
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
  }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Completado',
          'Información guardada con éxito',
          'success'
      );
      }
  });
  }

}

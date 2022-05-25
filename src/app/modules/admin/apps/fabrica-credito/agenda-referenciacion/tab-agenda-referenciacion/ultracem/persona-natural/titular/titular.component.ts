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
  @Input () currentStep: number; 
 
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
  public MostrarfabricaDatos: boolean=false;
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
            this.form.controls.codigoDepartamento.setValue(dataModal.departamento);
            this.form.controls.descripcionDepartamento.setValue(dataModal.departamentoNombre);
            this.form.controls.codigoCiudad.setValue(dataModal.municipio);
            this.form.controls.descripcionCiudad.setValue(dataModal.municipioNombre);
            this.form.controls.codigoBarrio.setValue(Number(dataModal.codigoBarrio));
            this.form.controls.descripcionBarrio.setValue(dataModal.barrio);
            this.form.controls.direccionResidencial.setValue(
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
      id: undefined,
      numeroSolicitud: [''],
      emision: [''],
      fechaIngresoFabrica: [''],
      descripcionEstado: [''],
      descripcionOrigen: [''],
      codigoSubEstado: [''],
      cupoTotal: [''],
      cupoReservado: [''],
      cupoDisponible: [''],
      score: [''],
      descripcionSubestado: [''],
      descripcionScore: [''],
      nivelEndeudamiento: [''],
      comprasSemanales: [''],
      antiguedadComprasSemanales: [''],
      ventasMensuales: [''],
      activos: [''],
      declarante: ['', [Validators.required]],
      codigoDepartamentoNegocio: [''],
      descripcionDepartamentoNegocio: [''],
      codigoCiudadNegocio: [''],
      descripcionCiudadNegocio: [''],
      codigoBarrioNegocio: [''],
      descripcionBarrioNegocio: [''],
      direccionNegocio: [''],
      telefonoNegocio: ['', [Validators.pattern(/^[0-9]*$/)]],
      telefono: [''],
      antiguedadNegocio: [''],
      camaraComercio: [''],
      nitNegocio: ['', [Validators.pattern(/^[0-9]*$/)]],
      tipo: [''],
      tipoDocumento: [''],
      identificacion: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      digitoVerificacion: [''],
      nombreCompleto: ['', [Validators.required]],
      nombreNegocio: [''],
      fechaMatricula: [''],
      primerNombre: ['', [Validators.required]],
      segundoNombre: [''],
      primerApellido: ['', [Validators.required]],
      segundoApellido: [''],
      celular: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(7), Validators.maxLength(11)]],
      email: [''],
      genero: [''],
      nacionalidad: [''],
      fechaNacimiento: [''],
      codigoDepartamentoNacimiento: [''],
      codigoCiudadNacimiento: [''],
      tipoVivienda: [''],
      codigoDepartamento: [''],
      descripcionDepartamento: [''],
      codigoCiudad: [''],
      descripcionCiudad: [''],
      codigoBarrio: [''],
      descripcionBarrio: [''],
      direccionResidencial: [''],
      nivelEstudio: [''],
      viveEnNegocio: [''],
      descripcionTipo: [''],

    });
  }

  /**
 * @description: Obtiene la data para cargar al formulario
 */
  private getFabricaCreditoAgenda(numeroSolicitud: string, identificacion: string): void {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    const datosSolicitud: any = {
      numeroSolicitud: numeroSolicitud,
      identificacion: identificacion
    };
    this.fabricaCreditoService.getDatosFabricaAgenda(datosSolicitud).pipe(takeUntil(this.unSubscribe$))
      .subscribe(({ data }) => {
        Swal.close();
        console.log(data);
        this.MostrarfabricaDatos=true;
        this.fabricaDatos=data
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
        if (data.comprasSemanales) {
          this.form.controls['comprasSemanales'].setValue(this.utility.formatearNumero(String(this.form.value.comprasSemanales)));
        }
        if (data.ventasMensuales) {
          this.form.controls['ventasMensuales'].setValue(this.utility.formatearNumero(String(this.form.value.ventasMensuales)));
        }
        if (data.activos) {
          this.form.controls['activos'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
        }
        if (data.cupoTotal) {
          this.form.controls['cupoTotal'].setValue(this.utility.formatearNumero(String(this.form.value.cupoTotal)));
        }
        if (data.cupoReservado) {
          this.form.controls['cupoReservado'].setValue(this.utility.formatearNumero(String(this.form.value.cupoReservado)));
        }
        if (data.cupoDisponible) {
          this.form.controls['cupoDisponible'].setValue(this.utility.formatearNumero(String(this.form.value.cupoDisponible)));
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

}

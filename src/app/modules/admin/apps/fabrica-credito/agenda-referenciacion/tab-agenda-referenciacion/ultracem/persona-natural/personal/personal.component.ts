import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartamentosCiudadesService } from 'app/core/services/departamentos-ciudades.service';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { GenericasService } from 'app/core/services/genericas.service';
import { UtilityService } from 'app/resources/services/utility.service';
import { DirectionsComponent } from 'app/shared/modal/directions/directions.component';
import { Subject, Observable, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'ULTRACEM-NATURAL-PERSONAL',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  @Input() currentStep: number;

  // currentStep = 1;

  public form: FormGroup;
  public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
  public identificacion: string = this.route.snapshot.paramMap.get('id');
  public referencia: string = this.route.snapshot.paramMap.get('referencia');
  public tipoReferenciacion: string = this.route.snapshot.paramMap.get('tipoReferenciacion');
  public undadNegocio: string = this.route.snapshot.paramMap.get('unidadNegocio');
  public subscription$: Subscription;
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
    this.getFabricaCreditoAgenda();

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
      recurso: [''],
      unidadNegocio: null,
      numeroSolicitud: [''],
      tipoReferencia: [''],
      idReferencia: [''],
      nombreCompleto: [''],
      celular: [''],
      nombreTitular:[''],
      conoceTitularValida: [''],
      conoceTitularValida_bool: Boolean,
      tiempoConoceTitular: ['', [Validators.pattern(/^[0-9]*$/)]],
      conoceProfesionTitular: [''],
      conoceDeDondeTitular: [''],
      tipoComentario: 1,
      comentario: [''],
      estadoReferencia: [''],
      resultadoReferencia: [''],
      refenciaValidada: [''],
      referenciaValidada_bool:Boolean
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
  private getFabricaCreditoAgenda(): void {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    const datosSolicitud: any = {
      "numeroSolicitud": this.numeroSolicitud,
      "tipo": this.tipoReferenciacion,
      "identificacion": this.referencia
    };
    this.fabricaCreditoService.getDatosFabricaAgendaReferenciacion(datosSolicitud).pipe(takeUntil(this.unSubscribe$))
      .subscribe(({ data }) => {
        Swal.close();
        this.MostrarfabricaDatos = true;
        this.fabricaDatos = data
        this.form.patchValue(data);
      });
  }

 /**
   * @description: Departamento de 
   */
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


  /**
  * @description:
  */
  public onPostDatos(): void {
    const datos: any = this.form.getRawValue();
    const { ...data } = datos;
    const conoceTitularValida = this.form.value.conoceTitularValida_bool == false ? 'N' : 'S';
    const refenciaValidada = this.form.value.referenciaValidada_bool == false ? 'N' : 'S';
    delete data.conoceTitularValida_bool;
    delete data.refenciaValidada;
    delete data.referenciaValidada_bool;
    delete data.numeroSolicitud;
    const datosFormularios: any = {
      numeroSolicitud: this.numeroSolicitud.toString(),
      conoceTitularValida: conoceTitularValida,
      refenciaValidada:refenciaValidada,
      ...data
    };
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
        this.postFormularioFabrica(datosFormularios);
      }
    });

  }

  /**
 * @description: Guardado de datos fabrica
 */
  private postFormularioFabrica(datos: any): void {
    Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    this.subscription$ = this.fabricaCreditoService.postDatosFabricaCreditoReferenciacion(datos)
      .subscribe(() => {
        Swal.fire(
          'Completado',
          'Información guardada con éxito',
          'success'
        ).then((result) => {
          if (result) {
            this.router.navigate([`credit-factory/agenda-referencing/${this.undadNegocio}/${this.numeroSolicitud}/${this.identificacion}`]);
          }
        })
        setTimeout(() => {
          this.router.navigate([`credit-factory/agenda-referencing/${this.undadNegocio}/${this.numeroSolicitud}/${this.identificacion}`]);
        }, 1000);
      }, (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          text: error.error.msg,
        });
      });
  }

}

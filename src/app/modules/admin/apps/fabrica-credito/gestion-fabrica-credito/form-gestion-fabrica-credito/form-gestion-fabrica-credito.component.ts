import {Component, OnDestroy, OnInit} from '@angular/core';
import {FabricaCreditoService} from '../../../../../../core/services/fabrica-credito.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {AgendaCompletacionService} from '../../../../../../core/services/agenda-completacion.service';
import {delay, takeUntil} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {DepartamentosCiudadesService} from '../../../../../../core/services/departamentos-ciudades.service';
import {MatSelectChange} from '@angular/material/select';
import {
    FormularioCreditoInterface,
} from '../../../../../../core/interfaces/formulario-fabrica-credito.interface';
import Swal from 'sweetalert2';
import {GenericasService} from '../../../../../../core/services/genericas.service';
import * as moment from 'moment';
import {MatDialog} from '@angular/material/dialog';
import {GridDocumentacionComponent} from '../grid-documentacion/grid-documentacion.component';
import { UtilityService } from 'app/resources/services/utility.service';
import {FormDialogDecisionComponent} from '../form-dialog-decision/form-dialog-decision.component';

@Component({
  selector: 'app-form-gestion-fabrica-credito',
  templateUrl: './form-gestion-fabrica-credito.component.html',
  styleUrls: ['./form-gestion-fabrica-credito.component.scss'],
})
export class FormGestionFabricaCreditoComponent implements OnInit, OnDestroy {
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
  public form: FormGroup;
  public subscription$: Subscription;
  public verComentarios: boolean = false;
  public minimizarComentarios:  boolean = false;
  public esVerComentarios: boolean = false;
  public tipoDocumento: string = '';
  public numeroSolicitud: string =  this.route.snapshot.paramMap.get('num');
  public identificacion: string = this.route.snapshot.paramMap.get('id');
  constructor(
      private agendaCompletacionService: AgendaCompletacionService,
      private fabricaCreditoService: FabricaCreditoService,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private departamentosCiudadesService: DepartamentosCiudadesService,
      private router: Router,
      private genericaServices: GenericasService,
      private _dialog: MatDialog,
      public utility: UtilityService,
  ) {

    if (!this.numeroSolicitud) {
        return;
    }else {
        this.getFabricaCreditoAgenda(this.numeroSolicitud, this.identificacion);
    }
  }

  ngOnInit(): void {
      this.createFormulario();
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
      this.listenFormulario();
  }
  /**
   * @description:
   */
  public onCerrar(event): void {
      this.verComentarios = event;
      this.minimizarComentarios = event;
  }
  /**
   * @description: Minimiza el componente comentarios
   */
  public onMinimiza(event): void {
      this.minimizarComentarios = !event;
      this.verComentarios = event;
  }
  /**
   * @description: Abre el modal de listado de documentos
   */
  public onDialogo(): void {
      const dialogRef = this._dialog.open(GridDocumentacionComponent, {
          width: '80%',
          data: {numeroSolicitud: this.numeroSolicitud, tipoDocumento: this.tipoDocumento}
      });
      dialogRef.afterClosed().subscribe((result) => {
          console.log('The dialog was closed');
      });
  }
  /**
   * @description: Modal de decision
   */
  public onDialogoDecision(): void {
      const dialogRef = this._dialog.open(FormDialogDecisionComponent, {
          minWidth: '30%',
          minHeight: '30%',
          data: {numeroSolicitud: this.numeroSolicitud},
          disableClose: false,
      });
      dialogRef.afterClosed().toPromise().then(() => {
          this.getFabricaCreditoAgenda(this.numeroSolicitud, this.identificacion);
      });
  }
  /**
   * @description: Direcciona al componente comentarios
   */
  public onComentarios(): void {
      this.router.navigate(['/credit-factory/credit-management/commentaries', this.numeroSolicitud]);
  }
  /**
   * @description:
   */
  public onPostDatos(): void {
      if (this.form.valid) {
          const datos: FormularioCreditoInterface = this.form.getRawValue();
          const {fechaNacimiento, fechaMatricula, antiguedadComprasSemanales, ...data} = datos;
          const fechaNacimientoFormato = moment(fechaNacimiento).format('YYYY-MM-DD');
          const fechaMatriculaFormato = moment(fechaMatricula).format('YYYY-MM-DD');
          const compraSemanal= Number(this.utility.enviarNumero(this.form.value.comprasSemanales));
          const ventasMensuales= Number(this.utility.enviarNumero(this.form.value.ventasMensuales));
          // const antiguedadComprasSemanales = Number(this.form.value.antiguedadComprasSemanales);
          const activos= Number(this.utility.enviarNumero(this.form.value.activos));
          delete data.ventasMensuales;
          delete data.comprasSemanales;
          delete data.activos;
          const datosFormularios: FormularioCreditoInterface = {
              fechaNacimiento: fechaNacimientoFormato,
              fechaMatricula: fechaMatriculaFormato,
              comprasSemanales: compraSemanal,
              ventasMensuales: ventasMensuales,
              activos: activos,
              antiguedadComprasSemanales: Number(antiguedadComprasSemanales),
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
                  // console.log(this.form.getRawValue());
              }
          });
      }else {
          this.form.markAllAsTouched();
      }
  }
  /**
   * @description: Obtiene la data para cargar al formulario
   */
  private getFabricaCreditoAgenda(numeroSolicitud: string, identificacion: string): void {
      Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
      const datosSolicitud: any  = {
          numeroSolicitud: numeroSolicitud,
          identificacion: identificacion
      };
      this.fabricaCreditoService.getDatosFabricaAgenda(datosSolicitud).pipe(takeUntil(this.unSubscribe$))
          .subscribe(({data}) => {
          Swal.close();
          // console.log(data);
          this.form.patchValue(data);
          if (data.tipoDocumento === 'NIT') {
              const digitoVerificacion: string = this.calcularDigitoVerificacion(data.identificacion);
              const diitoString: string = digitoVerificacion.toString();
              this.form.controls.digitoVerificacion.setValue(diitoString);
          }
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
          if(data.comprasSemanales){
            this.form.controls['comprasSemanales'].setValue(this.utility.formatearNumero(String(this.form.value.comprasSemanales)));
          }
          if(data.ventasMensuales){
            this.form.controls['ventasMensuales'].setValue(this.utility.formatearNumero(String(this.form.value.ventasMensuales)));
          }
          if(data.activos){
            this.form.controls['activos'].setValue(this.utility.formatearNumero(String(this.form.value.activos)));
          }

          this.tipoDocumento = data.tipoDocumento;
          const datosDocumentos: any = {
              numeroSolicitud: datosSolicitud.numeroSolicitud,
              tipoDocumento: this.tipoDocumento
          };
          this.fabricaCreditoService.seleccionDatos.next({data: datosDocumentos});
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
  /**
   * @description: Guardado de datos fabrica
   */
  private postFormularioFabrica(datos: FormularioCreditoInterface): void {
      Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
      this.subscription$ = this.fabricaCreditoService.postDatosFabricaCredita(datos)
          .subscribe(() => {
              Swal.fire(
                  'Completado',
                  'Información guardada con exito',
                  'success'
              );
              this.router.navigate(['/credit-factory/agenda-completion']);
      }, (error) => {
              Swal.fire({
                  icon: 'error',
                  title: 'Ha ocurrido un error',
                  text: error.error.msg,
              });
          });
  }
  /**
   * @description: Calcula el digito de verificacion
   */
  private calcularDigitoVerificacion(data): string {
      let vpri; let x; let y; let z;

      // Se limpia el Nit
      data = data.replace ( /\s/g, '' ) ; // Espacios
      data = data.replace ( /,/g,  '' ) ; // Comas
      data = data.replace ( /\./g, '' ) ; // Puntos
      data = data.replace ( /-/g,  '' ) ; // Guiones

      // Se valida el nit
      if  ( isNaN ( data ) )  {
          console.log ('El nit/cédula \'' + data + '\' no es válido(a).') ;
          return '' ;
      };

      // Procedimiento
      vpri = new Array(16) ;
      z = data.length ;

      vpri[1]  =  3 ;
      vpri[2]  =  7 ;
      vpri[3]  = 13 ;
      vpri[4]  = 17 ;
      vpri[5]  = 19 ;
      vpri[6]  = 23 ;
      vpri[7]  = 29 ;
      vpri[8]  = 37 ;
      vpri[9]  = 41 ;
      vpri[10] = 43 ;
      vpri[11] = 47 ;
      vpri[12] = 53 ;
      vpri[13] = 59 ;
      vpri[14] = 67 ;
      vpri[15] = 71 ;

      x = 0 ;
      y = 0 ;
      for  ( let i = 0; i < z; i++ )  {
          y = ( data.substr (i, 1 ) ) ;
          // console.log ( y + "x" + vpri[z-i] + ":" ) ;

          x += ( y * vpri [z-i] ) ;
          // console.log ( x ) ;
      }

      y = x % 11 ;
      // console.log ( y ) ;

      return ( y > 1 ) ? 11 - y : y ;
  }


  private createFormulario(): void {
      this.form = this.fb.group({
          id:                             undefined,
          numeroSolicitud:               [''],
          emision:                       [''],
          descripcionEstado:             [''],
          descripcionOrigen:             [''],
          codigoSubEstado:               [''],
          cupoTotal:                     [''],
          cupoReservado:                 [''],
          cupoDisponible:                [''],
          score:                         [''],
          descripcionSubestado:          [''],
          descripcionScore:              [''],
          nivelEndeudamiento:            [''],
          comprasSemanales:              [''],
          antiguedadComprasSemanales:    [''],
          ventasMensuales:               [''],
          activos:                       [''],
          declarante:                    ['', [Validators.required]],
          codigoDepartamentoNegocio:     [''],
          codigoCiudadNegocio:           [''],
          codigoBarrioNegocio:           [''],
          direccionNegocio:              [''],
          telefonoNegocio:               ['', [Validators.pattern(/^[0-9]*$/)]],
          telefono:                      [''],
          antiguedadNegocio:             [''],
          camaraComercio:                [''],
          nitNegocio:                    ['', [Validators.pattern(/^[0-9]*$/)]],
          tipo:                          [''],
          tipoDocumento:                 [''],
          identificacion:                ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
          digitoVerificacion:            [''],
          nombreCompleto:                ['', [Validators.required]],
          fechaMatricula:                [''],
          primerNombre:                  ['', [Validators.required]],
          segundoNombre:                 [''],
          primerApellido:                ['', [Validators.required]],
          segundoApellido:               [''],
          celular:                       ['', [Validators.pattern(/^[0-9]*$/)]],
          email:                         [''],
          genero:                        [''],
          nacionalidad:                  [''],
          fechaNacimiento:               [''],
          codigoDepartamentoNacimiento:  [''],
          codigoCiudadNacimiento:        [''],
          tipoVivienda:                  [''],
          codigoDepartamento:            [''],
          codigoCiudad:                  [''],
          codigoBarrio:                  [''],
          direccionResidencial:          [''],
          nivelEstudio:                  [''],
          viveEnNegocio:                 [''],
          descripcionTipo:               [''],

      });
  }
  /**
   * @description: Escucha los cambios del formulario
   */
  public listenFormulario(): void {
      this.form.controls.tipoDocumento.valueChanges.subscribe((tipo) => {
          if (tipo === 'NIT') {
              this.form.controls.primerNombre.setValidators(Validators.nullValidator);
              this.form.controls.primerApellido.setValidators(Validators.nullValidator);
          }
      });
  }
  /**
   * @description: Valida que el campo solo sea numeros
   */
  public soloNumero(field: string) {
      return this.form.controls[field].hasError('pattern');
  }

  ngOnDestroy(): void {
      this.unSubscribe$.unsubscribe();
      // this.agendaCompletacionService.resetSeleccionAgenda();
  }

  get primerNombre(): ValidatorFn {
      return this.form.controls.primerNombre.errors?.required ||
          (this.form.controls.primerNombre.dirty ||
          this.form.controls.primerNombre.touched);
  }
  get primerApellido(): ValidatorFn {
      return this.form.controls.primerApellido.errors?.required ||
          (this.form.controls.primerApellido.dirty ||
          this.form.controls.primerApellido.touched);
  }

}

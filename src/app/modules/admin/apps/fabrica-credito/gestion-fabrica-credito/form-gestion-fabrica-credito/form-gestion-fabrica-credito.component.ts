import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FabricaCreditoService} from '../../../../../../core/services/fabrica-credito.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {AgendaCompletacionService} from '../../../../../../core/services/agenda-completacion.service';
import {delay, takeUntil} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DepartamentosCiudadesService} from '../../../../../../core/services/departamentos-ciudades.service';
import {MatSelectChange} from '@angular/material/select';
import {
    FormularioCreditoInterface,
} from '../../../../../../core/interfaces/formulario-fabrica-credito.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-gestion-fabrica-credito',
  templateUrl: './form-gestion-fabrica-credito.component.html',
  styleUrls: ['./form-gestion-fabrica-credito.component.scss'],
})
export class FormGestionFabricaCreditoComponent implements OnInit, OnDestroy {
  public unSubscribe$: Subject<any> = new Subject<any>();
  public departamentos$: Observable<any>;
  public ciudades$: Observable<any>;
  public barrios$: Observable<any>;
  public form: FormGroup;
  public ciudades: any = [];
  public departamentos: any = [];
  public barrios: any = [];
  public subscription$: Subscription;
  constructor(
      private agendaCompletacionService: AgendaCompletacionService,
      private fabricaCreditoService: FabricaCreditoService,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private departamentosCiudadesService: DepartamentosCiudadesService,
      private router: Router

  ) {
    const numeroSolicitud: string =  this.route.snapshot.paramMap.get('num');
    const identificacion: string =  this.route.snapshot.paramMap.get('id');
    if (!numeroSolicitud) {
        return;
    }else {
        this.getFabricaCreditoAgenda(numeroSolicitud, identificacion);
    }
  }

  ngOnInit(): void {
      this.createFormulario();
      this.getDepartamentos();
  }
  /**
   * @description:
   */
  public onPostDatos(): void {
      if (this.form.valid) {
          const datos: FormularioCreditoInterface = this.form.getRawValue();
          console.log(datos);
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
                  this.postFormularioFabrica(datos);
                  Swal.fire(
                      'Completado',
                      'Información guardada con exito',
                      'success'
                  );
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
      Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
      const datosSolicitud: any  = {
          numeroSolicitud: numeroSolicitud,
          identificacion: identificacion
      };
      this.fabricaCreditoService.getDatosFabricaAgenda(datosSolicitud).pipe(takeUntil(this.unSubscribe$))
          .subscribe(({data}) => {
          Swal.close();
          console.log(data);
          this.form.patchValue(data);
          if (data.tipoDocumento === 'NIT') {
              const digitoVerificacion: string = this.calcularDigitoVerificacion(data.identificacion);
              const diitoString: string = digitoVerificacion.toString();
              this.form.controls.digitoVerificacion.setValue(diitoString);
          }
          // this.fabricaCreditoService.seleccionDatos.next({data: data, show: true});
          if (data.codigoDepartamentoNegocio) {
            this.getCiudades(data.codigoDepartamentoNegocio);
          }
          if (data.codigoDepartamento) {
              this.getCiudades(data.codigoDepartamento);
          }
          if (data.codigoCiudadNegocio) {
            this.getBarrios(data.codigoCiudadNegocio);
          }
          if (data.codigoCiudad) {
            this.getBarrios(data.codigoCiudad);
          }
      });
  }
  public seleccionDepartamento(event: MatSelectChange): void {
       const codigo: string = event.value;
       this.getCiudades(codigo);
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
   * @description: Obtiene el listado de departamento
   */
  private getDepartamentos(): void {
      this.departamentos$ = this.departamentosCiudadesService.getDepartamentos();
  }
  /**
   * @description: Obtiene el listado de ciudades
   */
  private getCiudades(codigo: string): void {
      this.ciudades$ = this.departamentosCiudadesService.getCiudades(codigo);
  }
  /**
   * @description: Obtiene el listado de barrios
   */
  private getBarrios(codigo: string): void {
      this.barrios$ = this.departamentosCiudadesService.getBarrios(codigo);
  }
  /**
   * @description: Guardado de datos fabrica
   */
  private postFormularioFabrica(datos: FormularioCreditoInterface): void {
      this.subscription$ = this.fabricaCreditoService.postDatosFabricaCredita(datos)
          .subscribe(() => {
          this.router.navigate(['/credit-factory/agenda-completion']);
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
          numeroSolicitud:               [{value: '', disabled: true}],
          emision:                       [{value: '', disabled: true}],
          descripcionEstado:             [{value: '', disabled: true}],
          codigoEstado:                  [{value: '', disabled: true}],
          codigoSubEstado:               [{value: '', disabled: true}],
          cupoTotal:                     [{value: '', disabled: true}],
          cupoReservado:                 [{value: '', disabled: true}],
          cupoDisponible:                [{value: '', disabled: true}],
          score:                         [''],
          descripcionSubestado:          [{value: '', disabled: true}],
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
          telefonoNegocio:               [''],
          telefono:                      [''],
          antiguedadNegocio:             [''],
          camaraComercio:                [''],
          nitNegocio:                    [''],
          tipo:                          [''],
          tipoDocumento:                 [''],
          identificacion:                ['', [Validators.required]],
          digitoVerificacion:            [''],
          nombreCompleto:                ['', [Validators.required]],
          fechaMatricula:                [''],
          primerNombre:                  ['', [Validators.required]],
          segundoNombre:                 [''],
          primerApellido:                ['', [Validators.required]],
          segundoApellido:               ['', [Validators.required]],
          celular:                       [''],
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
      });
  }

  ngOnDestroy(): void {
      this.unSubscribe$.unsubscribe();
      // this.agendaCompletacionService.resetSeleccionAgenda();
  }

}

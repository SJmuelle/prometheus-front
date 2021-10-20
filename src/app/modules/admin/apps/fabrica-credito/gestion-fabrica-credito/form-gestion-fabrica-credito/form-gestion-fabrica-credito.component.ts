import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FabricaCreditoService} from '../../../../../../core/services/fabrica-credito.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {AgendaCompletacionService} from '../../../../../../core/services/agenda-completacion.service';
import {takeUntil} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DepartamentosCiudadesService} from '../../../../../../core/services/departamentos-ciudades.service';
import {MatSelectChange} from '@angular/material/select';
import {FormularioDatosTitularInterface} from "../../../../../../core/interfaces/formulario-fabrica-credito.interface";

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
      private departamentosCiudadesService: DepartamentosCiudadesService

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
      const datos: FormularioDatosTitularInterface = this.form.getRawValue();
      console.log(datos);
      this.postFormularioFabrica(datos);
  }
  /**
   * @description: Obtiene la data para cargar al formulario
   */
  private getFabricaCreditoAgenda(numeroSolicitud: string, identificacion: string): void {
      const datosSolicitud: any  = {
          numeroSolicitud: numeroSolicitud,
          identificacion: identificacion
      };
      this.fabricaCreditoService.getDatosFabricaAgenda(datosSolicitud).pipe(takeUntil(this.unSubscribe$))
          .subscribe(({data}) => {
          console.log(data);
          this.form.patchValue(data);
          this.fabricaCreditoService.seleccionDatos.next({data: data, show: true});
          if (data.codigoDepartamentoNegocio) {
            this.getCiudades(data.codigoDepartamentoNegocio);
          }
          if (data.codigoCiudadNegocio) {
            this.getBarrios(data.codigoCiudadNegocio);
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
  private postFormularioFabrica(datos: FormularioDatosTitularInterface): void {
      this.subscription$ = this.fabricaCreditoService.postDatosFabricaCredita(datos).subscribe(console.log);
  }


  private createFormulario(): void {
      this.form = this.fb.group({
          id:                             undefined,
          numeroSolicitud:               [{value: '', disabled: true}],
          emision:                       [{value: '', disabled: true}],
          descripcionEstado:             [''],
          codigoEstado:                  [''],
          codigoSubEstado:               [''],
          cupoTotal:                     [''],
          cupoReservado:                 [''],
          cupoDisponible:                [''],
          score:                         [''],
          descripcionScore:              [''],
          nivelEndeudamiento:            [''],
          comprasSemanales:              [''],
          antiguedadComprasSemanales:    [''],
          ventasMensuales:               [''],
          activos:                       [''],
          declarante:                    [''],
          codigoDepartamentoNegocio:     [''],
          codigoCiudadNegocio:           [''],
          codigoBarrioNegocio:           [''],
          direccionNegocio:              [''],
          telefonoNegocio:               [''],
          antiguedadNegocio:             [''],
          camaraComercio:                [''],
          nitNegocio:                    [''],
      });
  }

  ngOnDestroy(): void {
      this.unSubscribe$.unsubscribe();
      // this.agendaCompletacionService.resetSeleccionAgenda();
  }

}

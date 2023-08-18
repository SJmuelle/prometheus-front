import { Component, OnInit } from '@angular/core';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { ListadoPagaduriasComponent } from '../listado-pagadurias/listado-pagadurias.component';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionPagaduriaService } from 'app/core/services/gestion-pagaduria.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DepartamentosCiudadesService } from 'app/core/services/departamentos-ciudades.service';
import { MatSelectChange } from '@angular/material/select';
import { GenericasService } from 'app/core/services/genericas.service';
import { FormularioCreditoMicro } from 'app/core/interfaces/formulario-fabrica-credito.interface';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { PagaduriaService } from 'app/core/services/pagaduria.service';

@Component({
  selector: 'app-detalle-pagaduria',
  templateUrl: './detalle-pagaduria.component.html',
  styleUrls: ['./detalle-pagaduria.component.scss']
})
export class DetallePagaduriaComponent implements OnInit {
  form: FormGroup;
  public pagaduria: string = '';
  datos: any;
  editar: boolean = false;
  public departamentos$: Observable<any>;
  public ciudades$: Observable<any>;
  public barrios$: Observable<any>;
  public tipoEmpresa$: Observable<any>;
  nuevo: boolean;
  constructor(
    private _listadoPagaduriasComponent: ListadoPagaduriasComponent,
    private route: ActivatedRoute,
    private router: Router,

    private _gestionPagaduriaService: GestionPagaduriaService,
    private fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private genericaServices: GenericasService,
    private departamentosCiudadesService: DepartamentosCiudadesService,
  ) { }

  ngOnInit(): void {
    this.GetTipoEmpresa();
    this.getDepartamentos();
    this._listadoPagaduriasComponent.matDrawer.open();
    this._activatedRoute.params.subscribe((param) => {
      if(param.pagaduria==0){
        this.createForm();
        this.editar=true;
        this.nuevo=true;
        return
      }
      this.getDataPagaduria(param.pagaduria);
      this.createForm();
      this.editar=false;
      this.nuevo=false;

    });
  }

  /**
   * @description: Obtiene el listado de agenda de completacion
  */
  private getDataPagaduria(pagaduria): void {
    let info = {
      nitPagaduria: pagaduria
    }
    this._gestionPagaduriaService.postInformacionPagadurias(info).subscribe((res) => {
      this.datos = res.data;
      this.form.patchValue(res.data);

      this.pagaduria = pagaduria;
    });
  }

  /**
 * Close the drawer
 */
  closeDrawer(): Promise<MatDrawerToggleResult> {
    return this._listadoPagaduriasComponent.matDrawer.close();
  }

  createForm() {
    this.form = this.fb.group({
      regStatus: '',
      razonSocial: ['', [Validators.required]],
      dv: ['', [Validators.required, Validators.pattern('^[0-9]{1,1}$')]],
      departamento: ['', [Validators.required]],
      municipio: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      tipoEmpresa: ['', [Validators.required]],
      empresaAliada: [false],
      convenioEspecialTemporal: [false],
      contratoFijo: [false],
      porcentajeIngresosBrutos: ['', [Validators.required]],
      requiereCartaLaboral: [false],
      liqSinPagaduria: [false],
      documento: ['', [Validators.required, Validators.pattern('^[0-9]{5,10}$')]],
    });
  }

  /**
 * @description: Obtiene el listado de departamento
 */
  private getDepartamentos(): void {
    this.departamentos$ =
      this.departamentosCiudadesService.getDepartamentos();
  }

  /**
   * @description: Obtiene el listado de ciudades
   */
  private getCiudades(codigo: string): void {
    this.ciudades$ = this.departamentosCiudadesService.getCiudades(codigo);
  }

  /**
 * @description: Selecciona el codigo para cargar el api ciudades
 *
 */
  public seleccionDepartamento(event: MatSelectChange): void {
    const codigo: string = event.value;
    this.getCiudades(codigo);
  }

  /**
 * @description: Obtiene el listado de tipoEmpresa
 */
  private GetTipoEmpresa(): void {
    this.tipoEmpresa$ = this.genericaServices.getSelectDinamicoSinBase('tipo-empresa');
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }
    let data = { ...this.form.value }
    data.dv = Number(data.dv)
    data.nitPagaduria=data.documento
    data.porcentajeIngresosBrutos = Number(data.porcentajeIngresosBrutos)
    this.postFormulario(data)
  }

  /**
 * @description: Guardado de datos fabrica
 */
  private postFormulario(datos): void {

    Swal.fire({
      title: 'Cargando',
      html: 'Guardando información',
      timer: 500000,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => { });
    if (this.nuevo) {
      this._gestionPagaduriaService.postInformacionPagaduriasCrear(datos).subscribe(
        (res) => {
          Swal.fire(
            'Completado',
            res.data.mensaje,
            'success'
          ).then(rep => {
            this.router.navigate(['/pagaduria/parametria/gestion-pagaduria/']);
          })
           this.router.navigate(['/pagaduria/parametria/gestion-pagaduria']);
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un error',
            text: error.error.msg,
          });
        }
      );
    }else{
      this._gestionPagaduriaService
      .UpdateInformacionPagadurias(datos).subscribe(
        (res) => {
          Swal.fire(
            'Completado',
            res.data.mensaje,
            'success'
          ).then(rep => {
            this.router.navigate(['/pagaduria/parametria/gestion-pagaduria/']);
          })
           this.router.navigate(['/pagaduria/parametria/gestion-pagaduria']);


        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un error',
            text: error.error.msg,
          });
        }
      );
    }
    
  }

  inactivar() {
    let data = { ...this.form.value }
    data.regStatus = 'A'
    data.dv = Number(data.dv)
    this.postFormulario(data);
  }


}

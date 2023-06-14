import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartamentosCiudadesService } from 'app/core/services/departamentos-ciudades.service';
import { GenericasService } from 'app/core/services/genericas.service';
import { GestionPagaduriaService } from 'app/core/services/gestion-pagaduria.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ListadoPagaduriasComponent } from '../../gestion-pagaduria/listado-pagadurias/listado-pagadurias.component';
import { ListadoPlazosComponent } from '../listado-plazos/listado-plazos.component';

@Component({
  selector: 'app-detalle-plazo',
  templateUrl: './detalle-plazo.component.html',
  styleUrls: ['./detalle-plazo.component.scss']
})
export class DetallePlazoComponent implements OnInit {

  form: FormGroup;
  public plazo: string = '';
  datos: any;
  idConfigPlazo: any;
  editar: boolean = true;
  public tipoContrato$: Observable<any>;
  public departamentos$: Observable<any>;
  public ciudades$: Observable<any>;
  public barrios$: Observable<any>;
  public tipoEmpresa$: Observable<any>;
  nuevo: boolean;
  constructor(
    private _listadoPlazoComponent: ListadoPlazosComponent,
    private route: ActivatedRoute,
    private router: Router,

    private _gestionPagaduriaService: GestionPagaduriaService,
    private fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private genericaServices: GenericasService,
    private departamentosCiudadesService: DepartamentosCiudadesService,
  ) { }

  ngOnInit(): void {
    
    this.GetTipoContrato();
    this._listadoPlazoComponent.matDrawer.open();
    this._activatedRoute.params.subscribe((param) => {
      if (param.idPlazo == 0) {
        this.createForm();
        this.editar = true;
        this.nuevo = true;
        this.idConfigPlazo=param.idPlazo 
        return
      }
      this.getDataPagaduria(param.idPlazo);
      this.createForm();
      this.editar = false;
      this.nuevo = false;
      this.idConfigPlazo=param.idPlazo
    });
  }

  /**
   * @description: Obtiene el listado de agenda de completacion
  */
  private getDataPagaduria(idPlazo): void {

    this._gestionPagaduriaService.getPlazos().subscribe((res) => {
      let datos = res.data;
      let dataEncontrada = datos.find(function (data) {
        return data.idPlazo == idPlazo;
      });
      this.form.patchValue(dataEncontrada);
      this.datos = dataEncontrada
      this.plazo = dataEncontrada;
    });
  }

  /**
 * Close the drawer
 */
  closeDrawer(): Promise<MatDrawerToggleResult> {
    return this._listadoPlazoComponent.matDrawer.close();
  }

  createForm() {
    this.form = this.fb.group({
      
      idPlazo: [null],
      estado:[''],
      tipoContrato: ['', [Validators.required]],
      antiguedadMinima: ['', [Validators.required]],
      antiguedadMaxima: ['', [Validators.required]],
      plazoMinimo:['', [Validators.required]],
      plazoMaximo: ['', [Validators.required]],
    });
  }





  
  /**
 * @description: Obtiene el listado de GetTipoContrato
 */
  private GetTipoContrato(): void {
    this.tipoContrato$ = this.genericaServices.getSelectDinamicoSinBase('tipos-contratos');
  }



  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }
    let data = { ...this.form.value }
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
      this._gestionPagaduriaService.postGuardarPlazo(datos).subscribe(
        (res) => {
          if(res.data.respuesta!='OK'){
            Swal.fire(
              'Advertencia',
              res.data.respuesta,
              'warning'
            ).then(rep => {
              return
            })
            return

          }
          Swal.fire(
            'Completado',
           'Se guardo con exito',
            'success'
          ).then(rep => {
            this.router.navigate(['/pagaduria/plazo/parametria/gestion-plazo']);
          })
          this.router.navigate(['/pagaduria/plazo/parametria/gestion-plazo']);
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un error',
            text: error.error.msg,
          });
        }
      );
    } else {
      this._gestionPagaduriaService
        .postEditarPlazo(datos).subscribe(
          (res) => {
            if(res.data.respuesta!='OK'){
              Swal.fire(
                'Advertencia',
                res.data.respuesta,
                'warning'
              ).then(rep => {
                return
              })
              return

            }
            Swal.fire(
              'Completado',
              'Se guardo con exito',
              'success'
            ).then(rep => {
              this.router.navigate(['/pagaduria/plazo/parametria/gestion-plazo']);
            })
            this.router.navigate(['/pagaduria/plazo/parametria/gestion-plazo']);


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
    data.estado = 'A'
    this.postFormulario(data);
  }

  activar() {
    let data = { ...this.form.value }
    data.estado = ''
    this.postFormulario(data);
  }

}

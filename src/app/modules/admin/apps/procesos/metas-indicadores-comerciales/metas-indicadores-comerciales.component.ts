import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { ProcesosService } from 'app/core/services/procesos.service';
import { UtilityService } from 'app/resources/services/utility.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-metas-indicadores-comerciales',
  templateUrl: './metas-indicadores-comerciales.component.html',
  styleUrls: ['./metas-indicadores-comerciales.component.scss']
})
export class MetasIndicadoresComercialesComponent implements OnInit {
  public form: FormGroup;
  public step = 0;
  public formNuevo: FormGroup;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  // @ViewChild('courseSteps', { static: true }) courseSteps: MatTabGroup;
  currentStep: number = 0;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  totalsteps = 1;
  steps: { order: number; title: string; subtitle: string; }[];
  data: any;
  dataAgencia: any;
  agencia: string = "ATL";

  agencias = [
    {
      codigo: "",
      descripcion: ""
    },
    {
      codigo: "ATL",
      descripcion: "Atlantico"
    },
    {
      codigo: "SUC",
      descripcion: "Sucre"
    },
    {
      codigo: "COR",
      descripcion: "Cordoba"
    },
    {
      codigo: "",
      descripcion: ""
    },
  ]
  agenciasStep = [
    {
      codigo: "ATL",
      descripcion: "Atlantico",
      mostrarNuevo: false
    },
    {
      codigo: "SUC",
      descripcion: "Sucre",
      mostrarNuevo: false
    },
    {
      codigo: "COR",
      descripcion: "Cordoba",
      mostrarNuevo: false
    },
  ]
  clonarPeriodo: boolean = false;
  total: number = 0;

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  usuarios: any = [];
  dataTotal: any[] = [];

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _changeDetectorRef: ChangeDetectorRef,
    private _procesosService: ProcesosService,
    private fb: FormBuilder,
    public utility: UtilityService,

  ) { }

  ngOnInit(): void {
    this.crearFormularios();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }


  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Go to given step
   *
   * @param step
   */
  goToStep(step: number): void {
    // Set the current step
    this.currentStep = step;

    // Go to the step
    // this.courseSteps.selectedIndex = this.currentStep;

    // Mark for check
    this._changeDetectorRef.markForCheck();
    this.metasListaIndicadoresTotal()



  }

  agregarAsesor(asesor) {
    this.formNuevo.controls['asesor'].setValue(asesor)
  }

  metasClonarPeriodo() {
    if (this.form.valid) {
      const data: any = this.form.getRawValue();
      let envio = {
        periodoActual: data.periodoActual.replace('-', ''),
        periodoAnterior: data.periodoAnterior.replace('-', ''),
      }
      Swal.fire({
        title: 'Cargando',
        html: 'Guardando información',
        timer: 500000,
        didOpen: () => {
          Swal.showLoading();
        },
      }).then((result) => { });
      this._procesosService
        .metasClonarPeriodo(envio)
        .subscribe((res) => {
          Swal.close();
          Swal.close();
          if (res.data.resultado == 'OK') {
            Swal.fire('Completado', res.data.msg, 'success').then((result) => {
              if (result) {
                this.clonarPeriodo = true;
               
                this.goToStep(1)
                
              }
            })
            setTimeout(() => {
              this.clonarPeriodo = true;
              // Swal.fire('Completado', res.data.msg, 'success');
              this.goToStep(1)

            }, 1000);
          } else {
            this.clonarPeriodo = false;
            Swal.fire('Advertencia', res.data.msg, 'warning');
          }


        });
    }
  }

  metasListaIndicadores() {
    if (this.form.valid) {
      const data: any = this.form.getRawValue();
      let envio = {
        periodoActual: data.periodoActual.replace('-', ''),
        agencia: this.agencias[this.currentStep].codigo
      }
      Swal.fire({
        title: 'Cargando',
        html: 'Guardando información',
        timer: 500000,
        didOpen: () => {
          Swal.showLoading();
        },
      }).then((result) => { });
      this._procesosService
        .metasListaIndicadoresAgencia(envio)
        .subscribe((res) => {
          Swal.close();
          this.total = 0;
          this.data = [];
          res.data.forEach(element => {
            this.data.push({
              ...element,
              formatoMetaColocacion: this.utility.formatearNumero(String(element.metaColocacion)),
              editar: true,
            }
            )
            this.total += element.metaColocacion
          });

        });
    }
  }

  metasListaIndicadoresTotal() {
    if (this.form.valid) {
      const data: any = this.form.getRawValue();
      let envio = {
        periodoActual: data.periodoActual.replace('-', ''),
      }
   
      this._procesosService
        .metasListaIndicadores(envio)
        .subscribe((res) => {
          this.dataTotal = res.data;
        });
    }
  }

  metasListaIndicadoresAgencia(agencia) {
    if (this.form.valid) {
      const data: any = this.form.getRawValue();
      let envio = {
        periodoActual: data.periodoActual.replace('-', ''),
        agencia: agencia
      }
      Swal.fire({
        title: 'Cargando',
        html: 'Guardando información',
        timer: 500000,
        didOpen: () => {
          Swal.showLoading();
        },
      }).then((result) => { });
      this._procesosService
        .metasListaIndicadoresAgencia(envio)
        .subscribe((res) => {
          Swal.close();
          this.dataAgencia = [];
          res.data.forEach(element => {
            this.dataAgencia.push({
              ...element,
              formatoMetaColocacion: this.utility.formatearNumero(String(element.metaColocacion)),
              editar: true,
            }
            )
          });
          this.metasListaIndicadoresTotal()

        });
    }
  }

  metasSgtePaso() {
    if (this.form.valid) {
      const data: any = this.form.getRawValue();
      let envio = {
        periodoActual: data.periodoActual.replace('-', ''),
      }
      Swal.fire({
        title: 'Cargando',
        html: 'Guardando información',
        timer: 500000,
        didOpen: () => {
          Swal.showLoading();
        },
      }).then((result) => { });
      this._procesosService
        .metasSgtePaso(envio)
        .subscribe((res) => {
          Swal.close();

          if (res.data.resultado == 'OK') {
            Swal.fire('Completado', res.data.msg, 'success').then((result) => {
              if (result) {
                this.clonarPeriodo = false;
                this.currentStep = 0;
                this.form.reset();
              }
            })
            setTimeout(() => {
              this.clonarPeriodo = false;
              this.currentStep = 0;
              this.form.reset();

            }, 1000);
          } else {
            Swal.fire('Advertencia', res.data.msg, 'warning');
          }
        });
    }
  }

  metasAnularAsesor(asesor: string, agencia:string) {
    Swal.fire({
      title: 'Confirmar anulación',
      html: `¿Está seguro de anular el asesor <strong>${asesor}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#a3a0a0',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const data: any = this.form.getRawValue();
        let envio = {
          periodoActual: data.periodoActual.replace('-', ''),
          agencia: agencia,
          asesor: asesor
        }
        Swal.fire({
          title: 'Cargando',
          html: 'Actualizando información',
          timer: 500000,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then((result) => { });
        this._procesosService
          .metasAnularAsesor(envio)
          .subscribe((res) => {
            Swal.close();
            if (res.data.resultado == 'OK') {
              Swal.fire('Completado', res.data.msg, 'success').then((result) => {
                if (result) {
                  this.metasListaIndicadoresAgencia(agencia);
                }
              })
              setTimeout(() => {
                this.metasListaIndicadoresAgencia(agencia);
              }, 1000);
            } else {
              this.clonarPeriodo = false;
              Swal.fire('Advertencia', res.data.msg, 'warning');
            }

          });
      }
    });


  }

  metasUpdateMetaColocacion(item: any, agencia:string) {
    Swal.fire({
      title: 'Confirmar anulación',
      html: `¿Está seguro de actulizar la meta de colocación a <strong>${item.formatoMetaColocacion}</strong> al asesor <strong>${item.asesor}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#a3a0a0',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const data: any = this.form.getRawValue();
        let envio = {
          periodoActual: data.periodoActual.replace('-', ''),
          agencia: agencia,
          asesor: item.asesor,
          metaColocacion: Number(this.utility.enviarNumero(item.formatoMetaColocacion))
        }
        Swal.fire({
          title: 'Cargando',
          html: 'Actualizando información',
          timer: 500000,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then((result) => { });
        this._procesosService
          .metasUpdateMetaColocacion(envio)
          .subscribe((res) => {
            Swal.close();
            if (res.data.resultado == 'OK') {
              Swal.fire('Completado', res.data.msg, 'success').then((result) => {
                if (result) {
                  this.metasListaIndicadoresAgencia(agencia);
                }
              })
              setTimeout(() => {
                this.metasListaIndicadoresAgencia(agencia);
              }, 1000);
            } else {
              this.clonarPeriodo = false;
              Swal.fire('Advertencia', res.data.msg, 'warning');
            }

          });
      }
    });


  }

  metasAgregarAsesor( agencia: string) {
    if (this.formNuevo.valid) {
      const data: any = this.formNuevo.getRawValue();
      Swal.fire({
        title: 'Confirmar anulación',
        html: `¿Está seguro de guardar la meta de colocación a <strong>${data.metaColocacion}</strong> al asesor <strong>${data.asesor}</strong>?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#a3a0a0',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          const data: any = this.form.getRawValue();
          const nuevo: any = this.formNuevo.getRawValue();
          let envio = {
            periodoActual: data.periodoActual.replace('-', ''),
            agencia: agencia,
            asesor: nuevo.asesor,
            tipoAsesor: nuevo.tipoAsesor,
            metaColocacion: Number(this.utility.enviarNumero(nuevo.metaColocacion))
          }
          Swal.fire({
            title: 'Cargando',
            html: 'Actualizando información',
            timer: 500000,
            didOpen: () => {
              Swal.showLoading();
            },
          }).then((result) => { });
          this._procesosService
            .metasAgregarAsesor(envio)
            .subscribe((res) => {
              Swal.close();
              if (res.data.resultado == 'OK') {
                Swal.fire('Completado', res.data.msg, 'success').then((result) => {
                  if (result) {
                    this.metasListaIndicadoresAgencia(agencia);
                    this.formNuevo.reset();
                    this.myControl.setValue('');

                  }
                })
                setTimeout(() => {
                  this.metasListaIndicadoresAgencia(agencia);
                  this.formNuevo.reset();
                  this.myControl.setValue('');

                }, 1000);
              } else {
                Swal.fire('Advertencia', res.data.msg, 'warning');
              }

            });
        }
      });

    }
  }

  /**
 * Go to previous step
 */
  goToPreviousStep(): void {
    // Return if we already on the first step
    if (this.currentStep === 0) {
      return;
    }

    // Go to step
    this.goToStep(this.currentStep - 1);

    // Scroll the current step selector from sidenav into view
    this._scrollCurrentStepElementIntoView();
  }

  /**
   * Go to next step
   */
  goToNextStep(): void {
    if (this.clonarPeriodo) {
      // Return if we already on the last step
      if (this.currentStep === this.totalsteps) {
        return;
      }

      // Go to step
      this.goToStep(this.currentStep + 1);

      // Scroll the current step selector from sidenav into view
      this._scrollCurrentStepElementIntoView();
    }
  }



  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  /**
 * Track by function for ngFor loops
 *
 * @param index
 * @param item
 */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------
  private crearFormularios(): void {
    this.form = this.fb.group({
      periodoAnterior: ['', [Validators.required]],
      periodoActual: ['', [Validators.required]],
    });
    this.formNuevo = this.fb.group({
      asesor: [{ value: '', disabled: true }, [Validators.required]],
      tipoAsesor: ['', [Validators.required]],
      metaColocacion: ['', [Validators.required]],
    });
  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter(option => option.toLowerCase().includes(filterValue));

  // }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    this.postBusquedaUsuarios(value);
    return this.usuarios;
    // return this.genericaServices.postBusquedaEntidadFinanciera(filterValue);
  }

  private postBusquedaUsuarios(nombre: string) {
    if (nombre.length > 0) {
      this._procesosService.obtenerInformacionUsuarios(nombre).subscribe((res) => {
        this.usuarios = res.data;
      });
    }
  }

  /**
   * Desplaza el elemento de paso actual desde
   * sidenav en la vista. Esto solo sucede cuando
   * botones anterior/siguiente presionados porque no queremos
   * para cambiar la posición de desplazamiento de la barra lateral
   * cuando el usuario hace clic en la barra lateral.
   *
   * @private
   */
  private _scrollCurrentStepElementIntoView(): void {

    // Envuelva todo en setTimeout para que podamos asegurarnos de que la clase 'paso actual' apunte al elemento correcto
    setTimeout(() => {

      // Get the current step element and scroll it into view
      const currentStepElement = this._document.getElementsByClassName('current-step')[0];
      if (currentStepElement) {
        currentStepElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }

}

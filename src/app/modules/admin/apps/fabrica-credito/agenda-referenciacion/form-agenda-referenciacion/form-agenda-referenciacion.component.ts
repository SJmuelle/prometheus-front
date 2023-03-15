import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-agenda-referenciacion',
  templateUrl: './form-agenda-referenciacion.component.html',
  styleUrls: ['./form-agenda-referenciacion.component.scss']
})
export class FormAgendaReferenciacionComponent implements OnInit {
  public unSubscribe$: Subject<any> = new Subject<any>();
  public drawerMode: 'over' | 'side' = 'side';
  public drawerOpened: boolean = true;
  public steps: { order: number; title: string; subtitle: string; }[];
  public totalsteps: number;
  public currentStep: number = 0;
  public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
  public identificacion: string = this.route.snapshot.paramMap.get('id');
  public referencia: string = this.route.snapshot.paramMap.get('referencia');
  public tipoReferenciacion: string = this.route.snapshot.paramMap.get('tipoReferenciacion');
  public tipoPersona: string = this.route.snapshot.paramMap.get('tipoPersona');
  public CodUnidadNegocio: string = this.route.snapshot.paramMap.get('unidadNegocio');
  public unidadNegocio: string = this.route.snapshot.paramMap.get('unidadNegocio');
  public fabrica_datos: any = {};
  public tipoDocumento: string = '';
  titulo: string;

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _changeDetectorRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private fabricaCreditoService: FabricaCreditoService,
  ) {
    if (!this.numeroSolicitud) {
      return;
    } else {
      this.getFabricaCreditoAgenda(this.numeroSolicitud, this.identificacion);
      this.getObtenerStepsAgendaReferenciacion(this.numeroSolicitud)
    }
  }

  ngOnInit(): void {
    switch (this.tipoReferenciacion) {
      case 'P':
        this.titulo = "personal"
        break;
      case 'R':
        this.titulo = "representate legal"
        break;

      case 'C':
        this.titulo = "comercial"
        break;

      case 'T':
        this.titulo = "titular"
        break;
      case 'L':
        this.titulo = "Laboral"
        break;
      case 'F':
        this.titulo = "Familiar"
        break;
      default:
        break;
    }
    this.goToStep(0);

    this.activatedRoute.params.subscribe(params => {
      const id: any = params['id'];
      // Código...









    });
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
    // // Set the current step
    this.currentStep = step;

    // Go to the step
    // this.courseSteps.selectedIndex = this.currentStep;

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }
  /**
 * Go to next step
 */
  goToNextStep(): void {
    // Return if we already on the last step
    if (this.currentStep === (this.totalsteps - 1)) {
      return;
    }

    // // Go to step
    this.goToStep(this.currentStep + 1);

    // // Scroll the current step selector from sidenav into view
    this._scrollCurrentStepElementIntoView();
  }

  /**
   * Go to previous step
   */
  goToPreviousStep(): void {
    // Return if we already on the first step
    if (this.currentStep === 0) {
      return;
    }

    // // Go to step
    this.goToStep(this.currentStep - 1);

    // Scroll the current step selector from sidenav into view
    this._scrollCurrentStepElementIntoView();
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

  /**
   * Scrolls the current step element from
   * sidenav into the view. This only happens when
   * previous/next buttons pressed as we don't want
   * to change the scroll position of the sidebar
   * when the user actually clicks around the sidebar.
   *
   * @private
   */
  private _scrollCurrentStepElementIntoView(): void {
    // Wrap everything into setTimeout so we can make sure that the 'current-step' class points to correct element
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


  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
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
        if (data) {
          this.tipoDocumento = data.tipoDocumento;
          const datosDocumentos: any = {
            numeroSolicitud: datosSolicitud.numeroSolicitud,
            tipoDocumento: this.tipoDocumento
          };
          this.fabricaCreditoService.seleccionDatos.next({ data: datosDocumentos });
          this.fabrica_datos = data;
        }this.tipoDocumento = data.tipoDocumento;

      });
  }

  /**
  * Track by function for ngFor loops
  *
  * @param index
  * @param item
  */
  private getObtenerStepsAgendaReferenciacion(numeroSolicitud: string): void {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    const datosSolicitud: any = {
      numeroSolicitud: numeroSolicitud,
      tipo: this.tipoReferenciacion,
    };
    this.fabricaCreditoService.obtenerStepsAgendaReferenciacion(datosSolicitud).pipe(takeUntil(this.unSubscribe$))
      .subscribe(({ data }) => {
        Swal.close();
        console.log(data)

        this.steps = data
        this.totalsteps = this.steps.length;
      });
  }


  ngOnDestroy(): void {
    this.unSubscribe$.unsubscribe();
  }

}

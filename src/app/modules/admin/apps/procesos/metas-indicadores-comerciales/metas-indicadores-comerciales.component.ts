import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-metas-indicadores-comerciales',
  templateUrl: './metas-indicadores-comerciales.component.html',
  styleUrls: ['./metas-indicadores-comerciales.component.scss']
})
export class MetasIndicadoresComercialesComponent implements OnInit {

  // @ViewChild('courseSteps', { static: true }) courseSteps: MatTabGroup;
  currentStep: number = 0;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  totalsteps = 8;
  steps: { order: number; title: string; subtitle: string; }[];


  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.steps = [
      {
        order: 0,
        title: 'Datos básicos',
        subtitle: '',
      },
      {
        order: 1,
        title: 'Datos de contacto',
        subtitle: '',
      },
      {
        order: 2,
        title: 'Información laboral',
        subtitle: '',
      },
      {
        order: 3,
        title: 'Referencia',
        subtitle: '',
      },
      {
        order: 4,
        title: 'Detalles del credito',
        subtitle: '',
      },
      {
        order: 5,
        title: 'Desembolso',
        subtitle: '',
      },
      {
        order: 6,
        title: 'Formas de pago',
        subtitle: '',
      },
      {
        order: 7,
        title: 'Cargue de documentos',
        subtitle: '',
      }
    ]
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
    // Return if we already on the last step
    if (this.currentStep === this.totalsteps) {
      return;
    }

    // Go to step
    this.goToStep(this.currentStep + 1);

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

import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-agenda-referenciacion',
  templateUrl: './form-agenda-referenciacion.component.html',
  styleUrls: ['./form-agenda-referenciacion.component.scss']
})
export class FormAgendaReferenciacionComponent implements OnInit {

  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  steps: { order: number; title: string; subtitle: string; }[];
  totalsteps: number;
  currentStep: number = 0;

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _changeDetectorRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,


  ) { }

  ngOnInit(): void {
    this.goToStep(0);
    this.activatedRoute.params.subscribe(params => {
      const id: any = params['id'];
      // Código...






      this.totalsteps = 4;
      this.steps = [
        {
          order: 0,
          title: 'Datos de la llamada',
          subtitle: 'La documentación completa',
        },
        {
          order: 1,
          title: 'Edición del formulario',
          subtitle: 'Los datos posibles para editar la informacion del crédito',
        },
        {
          order: 2,
          title: 'Preguntas a la referencia',
          subtitle: 'Respuesta de preguntas  ',
        },
        {
          order: 3,
          title: 'Comentario',
          subtitle: 'Evalue la llamada',
        }
      ]


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


}

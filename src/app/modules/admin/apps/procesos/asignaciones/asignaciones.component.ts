import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { ProcesosService } from 'app/core/services/procesos.service';
import { UtilityService } from 'app/resources/services/utility.service';
import * as XLSX from 'xlsx';

import Swal from 'sweetalert2'
@Component({
  selector: 'app-asignaciones',
  templateUrl: './asignaciones.component.html',
  styleUrls: ['./asignaciones.component.scss']
})
export class AsignacionesComponent implements OnInit {


  public step = 0;

  @ViewChild(MatAccordion) accordion: MatAccordion;
  currentStep: number = 0;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  totalsteps = 1;


  asignacionExcel: boolean = false;
  listRowsExcel: any[];
  cabeceras: any[];
  igual: boolean;



  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _changeDetectorRef: ChangeDetectorRef,
    private _procesosService: ProcesosService,
    private fb: FormBuilder,
    public utility: UtilityService,

  ) { }

  ngOnInit(): void {

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





  subirArchivo(event) {
    Swal.fire({
      title: 'Cargando',
      html: 'Guardando información',
      timer: 500000,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => { });
    this.listRowsExcel = [];
    this.cabeceras = [];
    const seleccionado = event.target.files[0];
    const lector = new FileReader();
    lector.readAsBinaryString(seleccionado);
    lector.onload = (event) => {
      let datoBinario = event.target.result;
      let workbook = XLSX.read(datoBinario, { type: 'binary' })
      let hoja = workbook.SheetNames[0];
      const data = XLSX.utils.sheet_to_json(workbook.Sheets[hoja]);
      this.listRowsExcel = data;
      this.cabeceras = Object.keys(this.listRowsExcel[0])

      if (this.comparar(this.cabeceras)) {
        this.asignacionExcel = true
        this.goToNextStep();
        Swal.close();
      } else {
        Swal.close();

        this.listRowsExcel = [];
        this.cabeceras = [];
        Swal.fire({
          title: 'Archivo incorrecto',
          icon: 'info',
          imageUrl: 'assets/images/estructuras.png',
          imageWidth: 400,
          html: '<p class="text-justify">Los archivos a importar deben cumplir con la estructura mostrada.</p>'
        })
      }
    }
  }

  comparar(data) {
    if (data.length != 2) {
      return false
    }

    if ((data[0] == "NEGOCIO") && (data[1] == "RESPONSABLE")) {
      return true
    }
    return false
  }

  metasSgtePaso() {

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
    if (this.asignacionExcel) {
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

import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AnalisisFinancieroService } from 'app/core/services/analisis-financiero.service';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { UtilityService } from 'app/resources/services/utility.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-dialog-analisis-financiero',
  templateUrl: './form-dialog-analisis-financiero.component.html',
  styleUrls: ['./form-dialog-analisis-financiero.component.scss']
})
export class FormDialogAnalisisFinancieroComponent implements OnInit {
  public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
  datosAnalisis: any[] = [];
  public analisis$: Observable<any>;
  public analisisForm: FormGroup;
  public dataAnalisis: any;
  permisoEditar: boolean=false;

  constructor(
    public matDialogRef: MatDialogRef<FormDialogAnalisisFinancieroComponent>,
    private fabricaCreditoService: FabricaCreditoService,
    private formBuilder: FormBuilder,
    private utilit: UtilityService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialog: MatDialog,
    private route: ActivatedRoute,
    private AnalisisFinancieroService: AnalisisFinancieroService
  ) {
    this.buildForms();

  }

  get formControls(): {
    [key: string]: AbstractControl;
  } {
    return this.analisisForm.controls
  }

  ngOnInit(): void {
    this.getAnalisisFinanciero(this.data.numeroSolicitud);
    this.permisoEditar = this.data.permiso;
    if(this.permisoEditar){
        this.analisisForm.disable();
    }
    this.analisisForm.get('ventasMensuales').valueChanges.subscribe((e) => {
      this.getDatosOperacion(e, 'Utilidad');
    })
    this.analisisForm.get('gastoPersonalBalance').valueChanges.subscribe((e) => {
      this.getDatosOperacion(e, 'Personal');
    })
    this.analisisForm.get('costoServiciosBalance').valueChanges.subscribe((e) => {
      this.getDatosOperacion(e, 'Servicios');
    })
    this.analisisForm.get('costoArriendoBalance').valueChanges.subscribe((e) => {
      this.getDatosOperacion(e, 'Arriendo');
    })
    this.analisisForm.get('otrosGastosOperativosBalance').valueChanges.subscribe((e) => {
      this.getDatosOperacion(e, 'Operativos');
    })
    this.analisisForm.get('utilidadBrutaBalance').valueChanges.subscribe((e) => {
      this.getDatosOperacion(e, 'UtilidadBruta');
    })
    this.analisisForm.get('totalGastosBalance').valueChanges.subscribe((e) => {
      this.getDatosOperacion(e, 'GastosNegocio');
    })
    this.analisisForm.get('inventarioActualBalance').valueChanges.subscribe((e) => {
      this.getDatosOperacion(e, 'Inventario');
    })
    this.analisisForm.get('ahorroMensualBalance').valueChanges.subscribe((e) => {
      this.getDatosOperacion(e, 'Ahorros');
    })
    this.analisisForm.get('dineroEfectivoBalance').valueChanges.subscribe((e) => {
      this.getDatosOperacion(e, 'Efectivo');
    })
    this.analisisForm.get('dineroPorCobrarBalance').valueChanges.subscribe((e) => {
      this.getDatosOperacion(e, 'DineroCobrar');
    })
    this.analisisForm.get('totalActivoCorrienteBalance').valueChanges.subscribe((e) => {
      this.getDatosOperacion(e, 'ActivoCorriente');
    })
    this.analisisForm.get('totalActivosBalance').valueChanges.subscribe((e) => {
      this.getDatosOperacion(e, 'Activos');
    })
    this.analisisForm.get('dineroProveedoresBalance').valueChanges.subscribe((e) => {
      this.getDatosOperacion(e, 'DeudasProveedor');
    })
    this.analisisForm.get('cuotasCreditosBalance').valueChanges.subscribe((e) => {
      this.getDatosOperacion(e, 'CuotaCredito');
    })
    this.analisisForm.get('totalPasivoBalance').valueChanges.subscribe((e) => {
      this.getDatosOperacion(e, 'Pasivo');
    })
    this.analisisForm.get('pasivoCortoBalance').valueChanges.subscribe((e) => {
      this.getDatosOperacion(e, 'PasivoCorto');
    })
    this.analisisForm.get('pasivoLargoBalance').valueChanges.subscribe((e) => {
      this.getDatosOperacion(e, 'PasivoLargo');
    })
  }

  public sendForm(): void {
    let valueFormuario = this.analisisForm.value;
    valueFormuario.numeroSolicitud = Number(this.data.numeroSolicitud);

    Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    this.AnalisisFinancieroService.postAnalisisFinanciero(valueFormuario)
      .subscribe(() => {
        Swal.fire(
          'Completado',
          'Información guardada con éxito',
          'success'
        ).then((result) => {
          if (result) {
            this.matDialogRef.close(true);
          }
        })
        setTimeout(() => {

        }, 1000);
      }, (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          text: error.error.msg,
        });
      });





  }

  private buildForms(): void {
    this.analisisForm = this.formBuilder.group({
      ventasMensuales: ['', Validators.required],
      costoOperacionBalance: ['', Validators.required],
      utilidadBrutaBalance: ['', Validators.required],
      gastoPersonalBalance: ['', Validators.required],
      costoServiciosBalance: ['', Validators.required],
      costoArriendoBalance: ['', Validators.required],
      otrosGastosOperativosBalance: ['', Validators.required],
      totalGastosBalance: ['', Validators.required],
      utilidadOperativaBalance: ['', Validators.required],
      inventarioActualBalance: ['', Validators.required],
      ahorroMensualBalance: ['', Validators.required],
      dineroEfectivoBalance: ['', Validators.required],
      dineroPorCobrarBalance: ['', Validators.required],
      totalActivoCorrienteBalance: ['', Validators.required],
      totalActivoFijoBalance: ['', Validators.required],
      totalActivosBalance: ['', Validators.required],
      dineroProveedoresBalance: ['', Validators.required],
      cuotasCreditosBalance: ['', Validators.required],
      pasivoCortoBalance: ['', Validators.required],
      pasivoLargoBalance: ['', Validators.required],
      totalPasivoBalance: ['', Validators.required],
      totalPatrimonioBalance: ['', Validators.required],
      razonCorrienteBalance: ['', Validators.required],
      nivelEndeudamientoBalance: ['', Validators.required],
      capitalTrabajoBalance: ['', Validators.required]
    })
  }
  private getDatosOperacion(e, tipo): void {
    let sumatoria = 0;
    let totalValor = 0;
    let total = 0;
    let valor: string = "";
    let f: string = "";
    switch (tipo) {
      case 'Utilidad':
        if (this.dataAnalisis) {
          let res = (e * this.dataAnalisis.porcentajeCosto) / 100;
          let utilidad = e - res;
          this.analisisForm.controls['costoOperacionBalance'].setValue(res);
          this.analisisForm.controls['utilidadBrutaBalance'].setValue(utilidad);
        }
        break;
      case 'Personal':
        sumatoria = Number(e) + Number(this.analisisForm.value.costoServiciosBalance) + Number(this.analisisForm.value.costoArriendoBalance) + Number(this.analisisForm.value.otrosGastosOperativosBalance);
        this.analisisForm.controls['totalGastosBalance'].setValue(sumatoria);
        break;
      case 'Servicios':
        sumatoria = Number(e) + Number(this.analisisForm.value.gastoPersonalBalance) + Number(this.analisisForm.value.costoArriendoBalance) + Number(this.analisisForm.value.otrosGastosOperativosBalance);
        this.analisisForm.controls['totalGastosBalance'].setValue(sumatoria);
        break;
      case 'Arriendo':
        sumatoria = Number(e) + Number(this.analisisForm.value.gastoPersonalBalance) + Number(this.analisisForm.value.costoServiciosBalance) + Number(this.analisisForm.value.otrosGastosOperativosBalance);
        this.analisisForm.controls['totalGastosBalance'].setValue(sumatoria);
        break;
      case 'Operativos':
        sumatoria = Number(e) + Number(this.analisisForm.value.gastoPersonalBalance) + Number(this.analisisForm.value.costoServiciosBalance) + Number(this.analisisForm.value.costoArriendoBalance);
        this.analisisForm.controls['totalGastosBalance'].setValue(sumatoria);
        break;
      case 'UtilidadBruta':
        sumatoria = Number(e) - Number(this.analisisForm.value.totalGastosBalance);
        this.analisisForm.controls['utilidadOperativaBalance'].setValue(sumatoria);
        break;
      case 'GastosNegocio':
        sumatoria = Number(this.analisisForm.value.utilidadBrutaBalance) - Number(e);
        this.analisisForm.controls['utilidadOperativaBalance'].setValue(sumatoria);
        break;
      case 'Inventario':
        sumatoria = Number(e) + Number(this.analisisForm.value.ahorroMensualBalance) + Number(this.analisisForm.value.dineroEfectivoBalance) + Number(this.analisisForm.value.dineroPorCobrarBalance);
        this.analisisForm.controls['totalActivoCorrienteBalance'].setValue(sumatoria);
        break;
      case 'Ahorros':
        sumatoria = Number(e) + Number(this.analisisForm.value.inventarioActualBalance) + Number(this.analisisForm.value.dineroEfectivoBalance) + Number(this.analisisForm.value.dineroPorCobrarBalance);
        this.analisisForm.controls['totalActivoCorrienteBalance'].setValue(sumatoria);
        break;
      case 'Efectivo':
        sumatoria = Number(e) + Number(this.analisisForm.value.inventarioActualBalance) + Number(this.analisisForm.value.ahorroMensualBalance) + Number(this.analisisForm.value.dineroPorCobrarBalance);
        this.analisisForm.controls['totalActivoCorrienteBalance'].setValue(sumatoria);
        break;
      case 'DineroCobrar':
        sumatoria = Number(e) + Number(this.analisisForm.value.inventarioActualBalance) + Number(this.analisisForm.value.ahorroMensualBalance) + Number(this.analisisForm.value.dineroEfectivoBalance);
        this.analisisForm.controls['totalActivoCorrienteBalance'].setValue(sumatoria);
        break;
      case 'ActivoCorriente':
        sumatoria = Number(e) - Number(this.analisisForm.value.totalActivoCorrienteBalance);
        this.analisisForm.controls['totalActivoFijoBalance'].setValue(sumatoria);

        sumatoria = Number(e) - Number(this.analisisForm.value.pasivoCortoBalance);
        this.analisisForm.controls['capitalTrabajoBalance'].setValue(sumatoria);

        sumatoria = Number(e) / Number(this.analisisForm.value.pasivoCortoBalance);
        totalValor = sumatoria<1?sumatoria:Math.round(sumatoria);
        valor = totalValor.toString();
        if (this.analisisForm.value.pasivoCortoBalance != 0) {
          
          this.analisisForm.controls['razonCorrienteBalance'].setValue(valor);
        } else {
          this.analisisForm.controls['razonCorrienteBalance'].setValue(0);
        }
        break;
      case 'Activos':
        sumatoria = Number(e) - Number(this.analisisForm.value.totalActivoCorrienteBalance);
        this.analisisForm.controls['totalActivoFijoBalance'].setValue(sumatoria);

        sumatoria = Number(e) - Number(this.analisisForm.value.totalPasivoBalance)
        this.analisisForm.controls['totalPatrimonioBalance'].setValue(sumatoria);

        sumatoria = (Number(this.analisisForm.value.totalPasivoBalance) / Number(e)) * 100
        if (Number(e) != 0) {
          total = Math.round(sumatoria);
          f = total.toFixed(0);

          this.analisisForm.controls['nivelEndeudamientoBalance'].setValue(f);
        } else {
          this.analisisForm.controls['nivelEndeudamientoBalance'].setValue(0);
        }
        break;
      case 'DeudasProveedor':
        sumatoria = Number(e) + Number(this.analisisForm.value.cuotasCreditosBalance);
        this.analisisForm.controls['pasivoCortoBalance'].setValue(sumatoria);
        break;
      case 'CuotaCredito':
        sumatoria = Number(e) + Number(this.analisisForm.value.dineroProveedoresBalance);
        this.analisisForm.controls['pasivoCortoBalance'].setValue(sumatoria);
        break;
      case 'Pasivo':
        sumatoria = Number(this.analisisForm.value.totalActivosBalance) - Number(e);
        this.analisisForm.controls['totalPatrimonioBalance'].setValue(sumatoria);

        sumatoria = (Number(e) / Number(this.analisisForm.value.totalActivosBalance)) * 100
        this.analisisForm.controls['nivelEndeudamientoBalance'].setValue(sumatoria);

        total = Math.round(sumatoria);
        f = total.toFixed(0);
        if (Number(this.analisisForm.value.totalActivosBalance) != 0) {
          this.analisisForm.controls['nivelEndeudamientoBalance'].setValue(f);
        } else {
          this.analisisForm.controls['nivelEndeudamientoBalance'].setValue(0);
        }
        break;
      case 'PasivoCorto':
        sumatoria = Number(e) + Number(this.analisisForm.value.pasivoLargoBalance);
        this.analisisForm.controls['totalPasivoBalance'].setValue(sumatoria);

        sumatoria = Number(this.analisisForm.value.totalActivoCorrienteBalance) - Number(e);
        this.analisisForm.controls['capitalTrabajoBalance'].setValue(sumatoria);

        sumatoria = Number(this.analisisForm.value.totalActivoCorrienteBalance) / Number(e);
        totalValor = sumatoria>0?sumatoria:Math.round(sumatoria);
        valor = totalValor.toString();
        if (Number(e) != 0) {
          this.analisisForm.controls['razonCorrienteBalance'].setValue(valor);
        } else {
          this.analisisForm.controls['razonCorrienteBalance'].setValue(0);
        }
        break;
      case 'PasivoLargo':
        sumatoria = Number(e) + Number(this.analisisForm.value.pasivoCortoBalance);
        this.analisisForm.controls['totalPasivoBalance'].setValue(sumatoria);
        break;
      default:
        break;
    }


  }

  private getAnalisisFinanciero(numeroSolicitud: string): void {
    this.AnalisisFinancieroService.getAnalisis(numeroSolicitud).subscribe(({ data }) => {
      this.analisisForm.patchValue(data);
      this.dataAnalisis = data;
      let total = 0;
      let f: string = "";
      let res = (data.ventasMensuales * data.porcentajeCosto) / 100;
      this.analisisForm.controls['costoOperacionBalance'].setValue(res);

      res = (data.ventasMensuales - (data.ventasMensuales * data.porcentajeCosto) / 100);
      this.analisisForm.controls['utilidadBrutaBalance'].setValue(res);

      res = (Number(data.inventarioActualBalance) + Number(data.ahorroMensualBalance) + Number(data.dineroEfectivoBalance) + Number(data.dineroPorCobrarBalance));
      this.analisisForm.controls['totalActivoCorrienteBalance'].setValue(res);

      res = (Number(data.totalActivosBalance) - Number(data.totalActivoCorrienteBalance));
      this.analisisForm.controls['totalActivoFijoBalance'].setValue(res);

      res = (Number(data.dineroProveedoresBalance) + Number(data.cuotasCreditosBalance));
      this.analisisForm.controls['pasivoCortoBalance'].setValue(res);

      res = (Number(data.pasivoCortoBalance) + Number(data.pasivoLargoBalance));
      this.analisisForm.controls['totalPasivoBalance'].setValue(res);

      res = (Number(data.pasivoCortoBalance) + Number(data.pasivoLargoBalance));
      this.analisisForm.controls['totalPasivoBalance'].setValue(res);

      res = (Number(data.totalActivosBalance) - Number(data.totalPasivoBalance));
      this.analisisForm.controls['totalPatrimonioBalance'].setValue(res);

      res = (Number(data.totalActivoCorrienteBalance) / Number(data.pasivoCortoBalance)) ;
      if (Number(data.pasivoCortoBalance) != 0) {
        total = res;
        f = total.toString();;
        this.analisisForm.controls['razonCorrienteBalance'].setValue(f);
      } else {
        this.analisisForm.controls['razonCorrienteBalance'].setValue(0);
      }

      res = (Number(data.totalActivoCorrienteBalance) - Number(data.pasivoCortoBalance));
      this.analisisForm.controls['capitalTrabajoBalance'].setValue(res);

      res = (parseInt(data.totalPasivoBalance) / parseInt(data.totalActivosBalance)) * 100;
      if (Number(data.totalActivosBalance) != 0) {
        total = Math.round(res);
        f = total.toFixed(0);
        this.analisisForm.controls['nivelEndeudamientoBalance'].setValue(f);
      } else {
        this.analisisForm.controls['nivelEndeudamientoBalance'].setValue(0);
      }

      res = Number(this.analisisForm.value.otrosGastosOperativosBalance) + Number(this.analisisForm.value.gastoPersonalBalance) + Number(this.analisisForm.value.costoServiciosBalance) + Number(this.analisisForm.value.costoArriendoBalance);
      this.analisisForm.controls['totalGastosBalance'].setValue(res);



    })
  }
}

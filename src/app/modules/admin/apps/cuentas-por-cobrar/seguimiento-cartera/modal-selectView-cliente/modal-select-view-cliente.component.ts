import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CarteraClientesService } from 'app/core/services/cartera-clientes.service';
import { Sweetalert2Service } from 'app/core/services/sweetalert2.service';
import { IoptionTable } from 'app/shared/componentes/table/table.component';
import { forkJoin, Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-modal-select-view-cliente',
  templateUrl: './modal-select-view-cliente.component.html',
  styleUrls: ['./modal-select-view-cliente.component.scss']
})
export class ModalSelectViewClienteComponent implements OnInit {
  public options: string[] = ['Detalle cartera', 'Detalle Pagos', 'Plan de pagos', 'Detalle gestiones', 'Compromisos de pagos']
  public selected: any = { selectOne: [...this.options], selectTwo: [], selectTree: [], SelectFor: [] }
  public formView: FormGroup = new FormGroup({});
  public Alldata: any = null;
  public suscription$: Subscription = new Subscription();
  public unsuscribe$: Subject<void> = new Subject();
  public selectedOptions: string[] = []


  public detalleCartera: IoptionTable[] = [
    { name: 'negocio', text: 'Negocio', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'cedula', text: 'Cedula', typeField: 'text', view: false, classTailwind: 'whitespace-pre' },
    { name: 'nombreCliente', text: 'Cliente', typeField: 'text', view: false, classTailwind: 'whitespace-pre' },
    { name: 'cuota', text: 'Cuota', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'fechaVencimiento', text: 'Fecha vencimiento', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'diasVencidoHoy', text: 'Dias de vencimiento hoy', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'vencimientoMayor', text: 'Vencimiento mayor', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'diasVencidos', text: 'Dias vencidos', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'status', text: 'Estado', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'valorAsignado', text: 'Valor asignado', typeField: 'text', pipeName: 'number', footerSum: true, classTailwind: 'whitespace-pre text-end' },
    { name: 'debidoCobrar', text: 'Debido cobrar', typeField: 'text', pipeName: 'number', footerSum: true, classTailwind: 'whitespace-pre text-end' },
    { name: 'interesMora', text: 'Interes de mora', typeField: 'text', pipeName: 'number', footerSum: true, classTailwind: 'whitespace-pre text-end' },
    { name: 'gastoCobranza', text: 'Gasto cobranza', typeField: 'text', pipeName: 'number', footerSum: true, classTailwind: 'whitespace-pre text-end' },
    { name: 'totalesParciales', text: 'Total parciales', typeField: 'text', pipeName: 'number', footerSum: true, classTailwind: 'whitespace-pre text-end' },
  ]

  public visualizarPagos: IoptionTable[] = [
    { name: 'negocio', text: 'Negocio', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'cedula', text: 'Cédula', typeField: 'text', view: false, classTailwind: 'whitespace-pre' },
    { name: 'nombreCliente', text: 'Cliente', typeField: 'text', view: false, classTailwind: 'whitespace-pre' },
    { name: 'descripcionIngreso', text: 'Descripción', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'ingreso', text: 'Ingreso', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'cuota', text: 'Cuota', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'fechaIngreso', text: 'Fecha ingreso', typeField: 'text', pipeName: 'date', classTailwind: 'whitespace-pre' },
    { name: 'fechaConsignacion', text: 'Fecha consignación', typeField: 'text', pipeName: 'date', classTailwind: 'whitespace-pre' },
    { name: 'branchCode', text: 'Código banco', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'bankAccountNo', text: 'Cuenta banco', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'valorIngreso', text: 'Valor ingreso', typeField: 'text', pipeName: 'number', footerSum: true, classTailwind: 'whitespace-pre text-end' },
  ]

  public visualizarGestiones: IoptionTable[] = [
    { name: 'observacion', text: 'Observación', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'tipoGestion', text: 'Tipo de gestión', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'resultadoGestion', text: 'Resultado gestión', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'proAccion', text: 'Próxima acción', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'fechaProxGestion', text: 'Fecha próxima acción', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'fechaCreacion', text: 'Fecha creación', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'usuarioCreacion', text: 'Usuario creador', typeField: 'text', classTailwind: 'whitespace-pre' },
  ]

  public visualizarCompromisosPago: IoptionTable[] = [
    { name: 'observacion', text: 'Observación', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'fechaaPagar', text: 'Fecha a pagar', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'direccion', text: 'Dirección', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'barrio', text: 'Barrio', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'ciudad', text: 'Ciudad', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'fechaCreacion', text: 'Fecha creación', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'usuarioCreacion', text: 'Usuario creador', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'valoraPagar', text: 'Valor a pagar', typeField: 'text', pipeName: 'number', classTailwind: 'whitespace-pre text-end', footerSum: true },

  ]

  public visualizarPlanPago: IoptionTable[] = [
    { name: 'ingreso', text: 'Ingreso', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'cedula', text: 'Cédula', typeField: 'text', view: false, classTailwind: 'whitespace-pre' },
    { name: 'nombre_cliente', text: 'Cliente', typeField: 'text', view: false, classTailwind: 'whitespace-pre' },
    { name: 'cuota', text: 'Cuota', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'branch_code', text: 'Código banco', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'bank_account_no', text: 'Cuenta banco', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'fecha_ingreso', text: 'Fecha ingreso', typeField: 'text', pipeName: 'date', classTailwind: 'whitespace-pre' },
    { name: 'fecha_consignacion', text: 'Fecha consignación', typeField: 'text', pipeName: 'date', classTailwind: 'whitespace-pre' },
    { name: 'descripcion_ingreso', text: 'Descripción', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'negocio', text: 'Negocio', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'valor_ingreso', text: 'Valor ingreso', typeField: 'text', pipeName: 'number', footerSum: true, classTailwind: 'text-end whitespace-pre' },

  ]

  public arrayPromises: any[] = []
  public dataTable: any[] = []
  //  [
  //   {vista: 'Detalle cartera', valueVista: [], optionsTable:[...this.detalleCartera] },
  //   {vista: 'Detalle Pagos', valueVista: [], optionsTable:[...this.visualizarPagos] },
  //   {vista: 'Detalle gestiones', valueVista: [], optionsTable:[...this.visualizarGestiones] },
  //   {vista: 'Compromisos de pagos', valueVista: [], optionsTable:[...this.visualizarCompromisosPago] },

  // ]

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialogRef<ModalSelectViewClienteComponent>,
    private _seguimientoCarteraService: CarteraClientesService,
    private _sweetAlerService: Sweetalert2Service,
    private _modalTab: MatDialog
  ) { }

  ngOnInit(): void {
    this.initform();

  }

  // public selectedOptions(Value: string): void {

  //   this.selected.selectTwo = this.options.filter(item => item !== Value) || []


  // }

  public changeSelect(selectedOption): void {

    let formControl: string[];
    const values = this.formView.getRawValue();
    switch (selectedOption) {
      case 'viewOne':
        formControl = ['viewTwo', 'viewTree', 'viewFour']
        formControl.forEach((control) => {
          this.formView.controls[control].setValue(null);
          this.formView.controls[control].markAsUntouched();

        })

        this.selected.selectTwo = this.options.filter(item => item !== values.viewOne)
        this.selected.selectTree = []
        this.selected.SelectFor = []
        break;

      case 'viewTwo':
        formControl = ['viewTree', 'viewFour']
        formControl.forEach((control) => {
          this.formView.controls[control].setValue(null);
          this.formView.controls[control].markAsUntouched();

          this.selected.selectTree = this.options.filter(item => item !== values.viewTwo && item !== values.viewOne)
          this.selected.SelectFor = []
        })
        break;
      case 'viewTree':
        formControl = ['viewFour']
        formControl.forEach((control) => {
          this.formView.controls[control].setValue(null);
          this.formView.controls[control].markAsUntouched();

        })

        this.selected.SelectFor = this.options.filter(item => item !== values.viewTree && item !== values.viewOne && item !== values.viewTwo)
        break;


    }



  }

  public async Onsave(): Promise<void> {

    this.Alldata = this._seguimientoCarteraService.getSearchData();

    if (!this.Alldata) {
      this.router.navigate(['/cuentas-por-cobrar/seguimiento-cartera']);
      this.dialog.close();
      return
    }

    const { tab } = this.formView.getRawValue();

    if (tab) {
      // this._modalTab.open(ModalTabDetalleClienteComponent, {
      //   maxWidth: '80%',
      //   maxHeight: '85%',
      //   disableClose: true
      // })
      this._seguimientoCarteraService.selectedOption$.next([...this.selectedOptions])
      this.dialog.close();
      return
    }


    this._sweetAlerService.startLoading({});

    this.arrayPromises = []



    await this.loadData().then(() => {
      // if (!this.arrayPromises.length) {
      //   setTimeout(() => {
      //     this._seguimientoCarteraService.dataTablesSelected$.next([]);
      //     this._seguimientoCarteraService.selectedOption$.next([...this.selectedOptions])
      //     this._sweetAlerService.stopLoading();
      //     this.dialog.close();
      //     this.router.navigate(['cuentas-por-cobrar/seguimiento-cartera/vista-detalle-cliente'])
      //   }, 400);
      // }
      forkJoin(this.arrayPromises).pipe(takeUntil(this.unsuscribe$)).subscribe({
        next: (res) => {
          setTimeout(() => {
            console.log(res)

            this._seguimientoCarteraService.dataTablesSelected$.next([...res]);
            // this._seguimientoCarteraService.selectedOption$.next([...this.selectedOptions])
            this._sweetAlerService.stopLoading();
            this.dialog.close();
            // this.router.navigate(['cuentas-por-cobrar/seguimiento-cartera/vista-detalle-cliente'])
          }, 400);
        },
        error: (e) => {
          this._sweetAlerService.alertError();
        }
      })
    })

  }

  public async loadData(): Promise<void> {
    this.dataTable = [];
    const { tab, ...data } = this.formView.getRawValue();
    const values: string[] = Object.values(data);
    const filterValues: string[] = values.filter(item => item !== null);
    this.selectedOptions = [...filterValues]

    filterValues.forEach((item) => {
      this.apiGet(item)
    })

  }


  public apiGet(vista: string): void {

    const apiGet = {
      'Detalle cartera': () => {
        const detalleCartera = {
          periodo: this.Alldata.periodo,
          unidadNegocio: this.Alldata.unidadNegocio,
          negocio: this.Alldata.negocio,
        }

        const historico = this.Alldata.estados.includes('historico');

        if (historico) {
          const verDetalleCarteraHistorico = this._seguimientoCarteraService.verDetalleCarteraHistorico(detalleCartera).pipe(takeUntil(this.unsuscribe$), map((res) => {
            const response = { vista: 'Detalle cartera', valueVista: res?.data || [], optionsTable: [...this.detalleCartera] }
            return response
          }))

          this.arrayPromises.push(verDetalleCarteraHistorico);

        } else {
          const cargarClienteCartera = this._seguimientoCarteraService.cargarClienteCartera(detalleCartera).pipe(takeUntil(this.unsuscribe$)
            , map((res) => {
              const response = {
                vista: 'Detalle cartera', valueVista: res?.data || [], optionsTable: [...this.detalleCartera],
              }
              return response
            })
          )
          this.arrayPromises.push(cargarClienteCartera);
        }
      },
      'Detalle Pagos': () => {
        const visualizarPagos = {
          periodo: this.Alldata.periodo,
          negocio: this.Alldata.negocio
        }
        const verPagosClientes = this._seguimientoCarteraService.verPagosClientes(visualizarPagos).pipe(takeUntil(this.unsuscribe$), map((res) => {
          const response = { vista: 'Detalle Pagos', valueVista: res.data || [], optionsTable: [...this.visualizarPagos], }
          return response
        }))

        this.arrayPromises.push(verPagosClientes);

      },
      'Detalle gestiones': () => {

        const visualizarGestiones = this.Alldata.negocio
        const verGestionesCliente = this._seguimientoCarteraService.verGestionesCliente(visualizarGestiones).pipe(takeUntil(this.unsuscribe$), map((res) => {
          const response = { vista: 'Detalle gestiones', valueVista: res.data || [], optionsTable: [...this.visualizarGestiones], }
          return response
        }))

        this.arrayPromises.push(verGestionesCliente);
      },
      'Compromisos de pagos': () => {

        const visualizarCompromisosPago = this.Alldata.negocio

        const verCompromisosPagos = this._seguimientoCarteraService.verCompromisosPagos(visualizarCompromisosPago).pipe(takeUntil(this.unsuscribe$), map((res) => {
          const response = { vista: 'Compromisos de pagos', valueVista: res.data || [], optionsTable: [...this.visualizarCompromisosPago], }
          return response
        }))

        this.arrayPromises.push(verCompromisosPagos);

      },
      'Agregar gestiones': () => {
      },
      'Editar información': () => {
      },
      'Plan de pagos': () => {
        const { negocio, periodo } = this.Alldata
        const detallePagos = {
          negocio,
          periodo
        }
        const verDetallePagoCliente = this._seguimientoCarteraService.verDetallePagoCliente(detallePagos).pipe(takeUntil(this.unsuscribe$), map((res) => {
          const response = { vista: 'Plan de pagos', valueVista: res.data || [], optionsTable: [...this.visualizarPlanPago], }
          return response
        }))
        this.arrayPromises.push(verDetallePagoCliente);

      }
    }

    apiGet[vista]()



  }

  public validform(): boolean {

    if (this.formView.value.tab) {
      return false
    } else {
      if (this.formView.invalid) {
        return true
      } else {
        return false
      }
    }


  }



  public disabledForm(): void {
    if (this.formView.value.tab) {
      const controls = ['viewOne', 'viewTwo', 'viewTree', 'viewFour']
      controls.forEach((value) => {
        this.formView.controls[value]?.setValue(null);
        this.formView.controls[value]?.disable();
        this.formView.controls[value]?.updateValueAndValidity();
      })
    } else {
      const controls = ['viewOne', 'viewTwo', 'viewTree', 'viewFour']
      controls.forEach((value) => {
        this.formView.controls[value]?.enable();
        this.formView.controls[value]?.markAsUntouched();
        this.formView.controls[value]?.updateValueAndValidity();
      })
    }

  }

  private initform(): void {
    this.formView = this.fb.group({
      viewOne: [, [Validators.required,]],
      viewTwo: [, [Validators.required]],
      viewTree: [,],
      viewFour: [,],
      tab: [true, []]

    })

    this.disabledForm()
  }

}

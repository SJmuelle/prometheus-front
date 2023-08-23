import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CarteraClientesService } from 'app/core/services/cartera-clientes.service';
import { Sweetalert2Service } from 'app/core/services/sweetalert2.service';
import { IinfoTitulo } from 'app/shared/componentes/header/header.component';
import { IoptionTable } from 'app/shared/componentes/table/table.component';
import moment from 'moment';
import { forkJoin, Subject, Subscription } from 'rxjs';
import { delay, map, takeUntil } from 'rxjs/operators';
import { ModalSelectViewClienteComponent } from '../modal-selectView-cliente/modal-select-view-cliente.component';
import { ModalSubDetalleClienteComponent } from '../modal-sub-detalle-cliente/modal-sub-detalle-cliente/modal-sub-detalle-cliente.component';

@Component({
  selector: 'app-full-views-details-cliente',
  templateUrl: './full-views-details-cliente.component.html',
  styleUrls: ['./full-views-details-cliente.component.scss']
})
export class FullViewsDetailsClienteComponent implements OnInit, OnDestroy {
  public infoTitulo: IinfoTitulo = { titulo: 'Seguimiento cartera clientes', subtitulo: 'Realiza los seguimientos a la cartera de los clientes' }
  public Subscription$: Subscription = new Subscription;
  public unsuscribe$: Subject<void> = new Subject<void>();
  public data: any = null
  public valuesSelect: string[]
  @Input() public allDataTable: any[] = []

  public AllDataSearch: any = null
  public formAgregarGestiones: FormGroup = new FormGroup({});
  public listarResultadoGestion: any[] = []
  public estadoCliente: any[] = []
  public listarProximaAccion: any[] = []
  public motivoNoPago: any[] = []
  public departamentos: any[] = []
  public ciudades: any[] = []
  public tipoGestor: any[] = []
  public tipoGestion: any[] = []
  public tipoContacto: any[] = []
  public selectedOptions: string[] = []
  public formEditClient: FormGroup = new FormGroup({});
  public barrios: any[] = []
  public ciudadeseditar: any[] = []
  public dapartamentosEdit: any[] = []
  public barriosGestiones: any[] = []
  public arrayPromises: any[] = [];

  public visualizarGestiones: IoptionTable[] = [
    { name: 'observacion', text: 'Observación', typeField: 'text', classTailwind: 'min-w-90' },
    { name: 'tipoGestion', text: 'Tipo de gestión', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'resultadoGestion', text: 'Resultado gestión', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'proAccion', text: 'Próxima acción', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'fechaProxGestion', text: 'Fecha próxima acción', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'fechaCreacion', text: 'Fecha creación', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'usuarioCreacion', text: 'Usuario creador', typeField: 'text', classTailwind: 'whitespace-pre' },
  ]
  public visualizarCompromisosPago: IoptionTable[] = [
    { name: 'observacion', text: 'Observación', typeField: 'text', classTailwind: 'min-w-90' },
    { name: 'fechaaPagar', text: 'Fecha a pagar', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'direccion', text: 'Dirección', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'barrio', text: 'Barrio', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'ciudad', text: 'Ciudad', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'fechaCreacion', text: 'Fecha creación', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'usuarioCreacion', text: 'Usuario creador', typeField: 'text', classTailwind: 'whitespace-pre' },
    { name: 'valoraPagar', text: 'Valor a pagar', typeField: 'text', pipeName: 'number', classTailwind: 'whitespace-pre text-end', footerSum: true },

  ]

  constructor(
    private _seguimientoClienteService: CarteraClientesService,
    private dialog: MatDialog,
    private route: Router,
    private fb: FormBuilder,
    private _sweetAlertService: Sweetalert2Service,
  ) { }




  ngOnDestroy(): void {
    this.Subscription$.unsubscribe();
    this.unsuscribe$.next();
    this.unsuscribe$.complete();
  }

  ngOnInit(): void {
    this.AllDataSearch = this._seguimientoClienteService.getSearchData();
    if (!this.AllDataSearch) {
      this.route.navigate(['/cuentas-por-cobrar/seguimiento-cartera'])
      return
    }
    this.initForm();
    this.AgregarGestiones();
    this.listenObservable();
    this.cargarSelects();

    this.loadSelect();

  }

  public openModalView(): void {

    this.dialog.open(ModalSelectViewClienteComponent, {})

  }

  public cargarSelects(): void {

    const today = new Date();

    this.formAgregarGestiones.controls['Fecha'].setValue(today)
    this.formAgregarGestiones.controls['Cliente'].setValue(this.AllDataSearch['nombreCliente'])
    this.formAgregarGestiones.controls['Negocio'].setValue(this.AllDataSearch['negocio'])
    this.formAgregarGestiones.controls['Cliente'].disable()
    this.formAgregarGestiones.controls['Negocio'].disable()
    this.formAgregarGestiones.controls['Cliente'].updateValueAndValidity();
    this.formAgregarGestiones.controls['Negocio'].updateValueAndValidity();



    this._seguimientoClienteService.ListarTipoGestor().pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (resp) => {
        this.tipoGestor = resp?.data || []
      },
      error: (e) => { this._sweetAlertService.alertError(); }
    })

    this._seguimientoClienteService.listarTipoGestion().pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (resp) => {
        this.tipoGestion = resp?.data || []
      },
      error: (e) => { this._sweetAlertService.alertError(); }
    })

    this._seguimientoClienteService.listarTipoContacto().pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (resp) => {
        this.tipoContacto = resp?.data || []
      },
      error: (e) => { this._sweetAlertService.alertError(); }
    })

  }


  // public allDatatables(): any[] {
  //   console.log('tabla detalle desde full view', this.allDataTable)
  //   this.allDataTable = [...this._seguimientoClienteService.getAllDataTables()];
  //   return this.allDataTable
  //   // console.log('all dataaa', allDataTable);

  // }

  public onSaveGestiones(): void {

    const callback = () => {
      this._sweetAlertService.startLoading({});

      const resultadoGestion = this.formAgregarGestiones.controls['Resultadogestión'].value
      const form = this.formAgregarGestiones.getRawValue()
      let data = {}


      const motivoNoPago = form.Resultadogestión === '64' ? form.Motivonopago : '0'

      if (resultadoGestion === '62') {
        data = {
          empresa: 'FINT',
          negocio: this.AllDataSearch['negocio'],
          observacion: form.Observaciones,
          valorPagar: Number(form.valorPagar),
          fechaPagar: moment(form.fechaPagar).format('YYYY-MM-DD'),
          dapartamento: form.departamento ?? '',
          ciudad: form.ciudad ?? '',
          barrio: form.barrio ?? '',
          direccion: form.direccion ?? '',
          estadoCliente: form.Estadocliente,
          resultadoGestion,
          proxAccion: form.Proximaacción,
          tipoGestor: form.Tipodegestor,
          tipoGestion: form.Tipodegestion,
          tipoContacto: form.Tipodecontacto,
          motivoNoPago,
          fechaProxGestion: moment(form.Fecha).format('YYYY-MM-DD hh:mm:00')
        }

      } else {
        data = {
          empresa: 'FINT',
          negocio: this.AllDataSearch['negocio'],
          observacion: form.Observaciones,
          valorPagar: 0,
          fechaPagar: '',
          dapartamento: '',
          ciudad: '',
          barrio: '',
          direccion: '',
          estadoCliente: form.Estadocliente,
          resultadoGestion: resultadoGestion,
          proxAccion: form.Proximaacción,
          tipoGestor: form.Tipodegestor,
          tipoGestion: form.Tipodegestion,
          tipoContacto: form.Tipodecontacto,
          motivoNoPago,
          fechaProxGestion: moment(form.Fecha).format('YYYY-MM-DD hh:mm:00')
        }
      }









      this._seguimientoClienteService.guardarGestionCliente(data).pipe(takeUntil(this.unsuscribe$), delay(400)).subscribe({
        next: (resp) => {

          this.arrayPromises = [];


          const formReset = ['Tipodegestor', 'Tipodegestion', 'Tipodecontacto', 'Resultadogestión', 'Motivonopago', 'Observaciones', 'Estadocliente', 'Proximaacción', 'valorPagar', 'fechaPagar',]


          formReset.forEach((item) => {
            this.formAgregarGestiones.controls[item].setValue(null);
            this.formAgregarGestiones.controls[item].clearValidators();
            this.formAgregarGestiones.controls[item].markAsUntouched();
            this.formAgregarGestiones.controls[item].updateValueAndValidity();

          })

          const today = new Date();
          this.formAgregarGestiones.controls['Fecha'].setValue(today);
          this.formAgregarGestiones.controls['domicilio'].setValue(false);


          if (this.selectedOptions.includes('Detalle gestiones')) {
            const objetValue = this.allDataTable.filter(value => value.vista === 'Detalle gestiones');
            this.allDataTable = this.allDataTable.filter(value => value.vista !== 'Detalle gestiones');

            const visualizarGestiones = this.AllDataSearch['negocio'];
            const verGestionesCliente = this._seguimientoClienteService.verGestionesCliente(visualizarGestiones).pipe(takeUntil(this.unsuscribe$), map((res) => {
              const response = { vista: 'Detalle gestiones', valueVista: res.data || [], optionsTable: [...this.visualizarGestiones], footer: false, class: objetValue[0].class }
              return response
            }))

            this.arrayPromises.push(verGestionesCliente);


          }

          if (this.selectedOptions.includes('Compromisos de pagos')) {
            const objetValue = this.allDataTable.filter(value => value.vista === 'Compromisos de pagos');
            this.allDataTable = this.allDataTable.filter(value => value.vista !== 'Compromisos de pagos');

            const visualizarCompromisosPago = this.AllDataSearch['negocio'];
            const verCompromisosPagos = this._seguimientoClienteService.verCompromisosPagos(visualizarCompromisosPago).pipe(takeUntil(this.unsuscribe$), map((res) => {
              const response = { vista: 'Compromisos de pagos', valueVista: res.data || [], optionsTable: [...this.visualizarCompromisosPago], footer: true, class: objetValue[0].class }
              return response
            }))

            this.arrayPromises.push(verCompromisosPagos);

          }

          if (!this.arrayPromises.length) {
            this._sweetAlertService.alertSuccess();
          } else {
            forkJoin(this.arrayPromises).pipe(takeUntil(this.unsuscribe$), delay(400)).subscribe({
              next: (resp) => {
                resp.forEach((item) => {
                  this.allDataTable.push(item);
                })
                this._sweetAlertService.alertSuccess();

              },
              error: (e) => {
                this._sweetAlertService.alertError();
              }
            })
          }








        },
        error: () => {
          this._sweetAlertService.alertError();
        }
      })
    }



    this._sweetAlertService.alertConfirmation(callback);

  }

  public onSaveEdit(): void {

    const callback = () => {
      this._sweetAlertService.startLoading({});

      this.formEditClient.enable();
      const form = this.formEditClient.getRawValue();
      const data = {
        ...form,
        negocio: this.AllDataSearch.negocio,
        empresa: 'FINT'
      }

      this._seguimientoClienteService.guardarInformacionCliente(data).pipe(takeUntil(this.unsuscribe$)).subscribe({
        next: (res) => {
          this._seguimientoClienteService.reloadData$.next();
          setTimeout(() => {
            this._sweetAlertService.alertSuccess();
          }, 500);

          const disable = ['codigoCliente', 'nitCliente', 'nombreCliente']

          disable.forEach(element => {
            this.formEditClient.controls[element]?.disable();
          });


        },
        error: (e) => {

          const disable = ['codigoCliente', 'nitCliente', 'nombreCliente']

          disable.forEach(element => {
            this.formEditClient.controls[element]?.disable();
          });

          this._sweetAlertService.alertError();
        }
      })
    }

    this._sweetAlertService.alertConfirmation(callback);


  }

  public resetDocimiclio(): void {
    this.formAgregarGestiones.controls['departamento'].setValue(null)
    this.formAgregarGestiones.controls['ciudad'].setValue(null)
    this.formAgregarGestiones.controls['barrio'].setValue(null)

    this.ciudades = []
    if (this.formAgregarGestiones.controls['domicilio'].value) {
      this.formAgregarGestiones.controls['departamento'].setValue(this.AllDataSearch['coddpto']);
      const departamento = this.AllDataSearch['coddpto']
      this._seguimientoClienteService.listarCiudades(departamento).pipe(takeUntil(this.unsuscribe$)).subscribe({
        next: (resp) => {
          this.ciudades = resp?.data || []
          this.formAgregarGestiones.controls['ciudad'].setValue(this.AllDataSearch['codciu']);
        },
        error: (e) => { this._sweetAlertService.alertError() }

      })

      this._seguimientoClienteService.listarBarrios(this.AllDataSearch['codciu']).pipe(takeUntil(this.unsuscribe$)).subscribe({
        next: (resp) => {
          this.barriosGestiones = resp?.data || []
          this.formAgregarGestiones.controls['barrio'].setValue(this.AllDataSearch['barrio'])
        }
      })
      this.formAgregarGestiones.controls['departamento'].setValidators([Validators.required])
      this.formAgregarGestiones.controls['ciudad'].setValidators([Validators.required])
      this.formAgregarGestiones.controls['barrio'].setValidators([Validators.required])
      this.formAgregarGestiones.controls['direccion'].setValidators([Validators.required])

      this.formAgregarGestiones.controls['departamento'].updateValueAndValidity()
      this.formAgregarGestiones.controls['ciudad'].updateValueAndValidity()
      this.formAgregarGestiones.controls['barrio'].updateValueAndValidity()
      this.formAgregarGestiones.controls['direccion'].updateValueAndValidity()
    } else {
      this.formAgregarGestiones.controls['departamento'].clearValidators()
      this.formAgregarGestiones.controls['ciudad'].clearValidators()
      this.formAgregarGestiones.controls['barrio'].clearValidators()
      this.formAgregarGestiones.controls['direccion'].clearValidators()

      this.formAgregarGestiones.controls['departamento'].updateValueAndValidity()
      this.formAgregarGestiones.controls['ciudad'].updateValueAndValidity()
      this.formAgregarGestiones.controls['barrio'].updateValueAndValidity()
      this.formAgregarGestiones.controls['direccion'].updateValueAndValidity()
    }
  }

  public changeSelects(eventSelect, select: string): void {

    switch (select) {
      case 'Tipodegestor':

        const validaciones = ['Tipodegestor', 'Tipodegestion', 'Tipodecontacto', 'Resultadogestión', 'Observaciones', 'Estadocliente', 'Proximaacción', 'Fecha']
        validaciones.forEach((item) => {
          this.formAgregarGestiones.controls[item].addValidators([Validators.required]);
          this.formAgregarGestiones.controls[item].markAsPristine();
          this.formAgregarGestiones.controls[item].updateValueAndValidity();
        })
        break;
      case 'Tipodecontacto':
        const selectTipodecontacto = eventSelect.value
        const controls = ['Resultadogestión', 'Estadocliente', 'Motivonopago', 'Proximaacción']

        controls.forEach((controls) => {
          this.formAgregarGestiones.controls[controls]?.setValue(null)
        })

        const listarResultadoGestion = selectTipodecontacto
        this._seguimientoClienteService.listarResultadoGestion(listarResultadoGestion).pipe(takeUntil(this.unsuscribe$)).subscribe({
          next: (resp) => {
            this.listarResultadoGestion = resp?.data || []
          },
          error: (e) => { this._sweetAlertService.alertError(); }
        })

        const estadoCliente = selectTipodecontacto
        this._seguimientoClienteService.listarEstadoCliente(estadoCliente).pipe(takeUntil(this.unsuscribe$)).subscribe({
          next: (resp) => {
            this.estadoCliente = resp?.data || []
          },
          error: (e) => { this._sweetAlertService.alertError() }
        })

        const listarProximaAccion = selectTipodecontacto
        this._seguimientoClienteService.listarProximaAccion(listarProximaAccion).pipe(takeUntil(this.unsuscribe$)).subscribe({
          next: (resp) => {
            this.listarProximaAccion = resp?.data || []
          },
          error: (e) => { this._sweetAlertService.alertError() }
        })

        break;

      case 'Resultadogestión':
        const selectResultadoGestión = eventSelect.value
        const controlsValue = ['Motivonopago', 'departamento', 'ciudad']

        controlsValue.forEach((item) => {
          this.formAgregarGestiones.controls[item]?.setValue(null);
        })

        const Tipodecontacto = this.formAgregarGestiones.controls['Tipodecontacto'].value

        const listarMotivoNoPago = { id: Tipodecontacto, select: selectResultadoGestión }
        this._seguimientoClienteService.listarMotivoNoPago(listarMotivoNoPago).pipe(takeUntil(this.unsuscribe$)).subscribe({
          next: (resp) => {
            if (!resp?.data?.length) {
              this.motivoNoPago = [{ id: '0', descripcion: 'Sin motivo' }]
              this.formAgregarGestiones.controls['Motivonopago'].setValue('0')

            } else {
              this.motivoNoPago = resp?.data || []
            }
            this.formAgregarGestiones.controls['Motivonopago'].markAsUntouched()

          },
          error: (e) => { this._sweetAlertService.alertError() }
        })

        if (selectResultadoGestión === '62') {
          this.formAgregarGestiones.controls['domicilio'].setValue(false)

          this.formAgregarGestiones.controls['valorPagar'].setValidators([Validators.required])
          this.formAgregarGestiones.controls['fechaPagar'].setValidators([Validators.required])
          this.formAgregarGestiones.controls['valorPagar'].updateValueAndValidity()
          this.formAgregarGestiones.controls['fechaPagar'].updateValueAndValidity()

          this._seguimientoClienteService.listarDepartamentos().pipe(takeUntil(this.unsuscribe$)).subscribe({
            next: (resp) => {
              this.departamentos = resp?.data || []
              this.formAgregarGestiones.controls['departamento'].setValue(this.AllDataSearch['coddpto']);
              this.formAgregarGestiones.controls['barrio'].setValue(this.AllDataSearch['barrio']);
              this.formAgregarGestiones.controls['direccion'].setValue(this.AllDataSearch['direccion']);
              this._seguimientoClienteService.listarBarrios(this.formAgregarGestiones.value.ciudad).pipe(takeUntil(this.unsuscribe$)).subscribe({
                next: (resp) => {
                  this.barriosGestiones = resp?.data || []
                }
              })
            },
            error: (e) => { this._sweetAlertService.alertError() }
          })
        } else {
          this.formAgregarGestiones.controls['valorPagar'].clearValidators()
          this.formAgregarGestiones.controls['fechaPagar'].clearValidators()
          this.formAgregarGestiones.controls['valorPagar'].updateValueAndValidity()
          this.formAgregarGestiones.controls['fechaPagar'].updateValueAndValidity()
        }

        if (selectResultadoGestión === '64') {
          this.formAgregarGestiones.controls['Motivonopago'].setValidators([Validators.required])
          this.formAgregarGestiones.controls['Motivonopago'].updateValueAndValidity()

        } else {
          this.formAgregarGestiones.controls['Motivonopago'].clearValidators()
          this.formAgregarGestiones.controls['Motivonopago'].updateValueAndValidity()
        }

        if (selectResultadoGestión !== '62') {
          this.formAgregarGestiones.controls['departamento'].clearValidators()
          this.formAgregarGestiones.controls['ciudad'].clearValidators()
          this.formAgregarGestiones.controls['barrio'].clearValidators()
          this.formAgregarGestiones.controls['direccion'].clearValidators()

          this.formAgregarGestiones.controls['departamento'].updateValueAndValidity()
          this.formAgregarGestiones.controls['ciudad'].updateValueAndValidity()
          this.formAgregarGestiones.controls['barrio'].updateValueAndValidity()
          this.formAgregarGestiones.controls['direccion'].updateValueAndValidity()
        }

        break;
      case 'departamento':
        const departamento = eventSelect.value
        this.formAgregarGestiones.controls['ciudad'].setValue(null)
        this.formAgregarGestiones.controls['barrio'].setValue(null)

        this._seguimientoClienteService.listarCiudades(departamento).pipe(takeUntil(this.unsuscribe$)).subscribe({
          next: (resp) => {
            this.ciudades = resp?.data || []

          },
          error: (e) => { this._sweetAlertService.alertError() }
        })
        break;

      case 'ciudad':
        this.formAgregarGestiones.controls['barrio'].setValue(null)
        const ciudad = eventSelect.value
        this._seguimientoClienteService.listarBarrios(ciudad).pipe(takeUntil(this.unsuscribe$)).subscribe({
          next: (resp) => {
            this.barriosGestiones = resp?.data || []
          },
          error: (e) => {
            this._sweetAlertService.alertError();
          }

        })
        break;

    }
  }

  public loadSelect(): void {


    const dataClient = {
      codigoCliente: this.AllDataSearch.negocio,
      nombreCliente: this.AllDataSearch.nombreCliente,
      nitCliente: this.AllDataSearch.identificacion,
      direccionCliente: this.AllDataSearch.direccion,
      telefonoCliente: this.AllDataSearch.telcontacto,
      celularCliente: this.AllDataSearch.telefono,
      celular2Cliente: '',
      barrio: this.AllDataSearch.barrio,
      ciudad: this.AllDataSearch.codciu,
      departamento: this.AllDataSearch.coddpto,
      observaciones: '',
      correoCliente: '',
      extorsion: false
    }
    this.formEditClient.setValue({ ...dataClient })
    const disable = ['codigoCliente', 'nitCliente', 'nombreCliente']

    disable.forEach(element => {
      this.formEditClient.controls[element]?.disable();
    });



    this._seguimientoClienteService.listarDepartamentos().pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (resp) => {
        this.dapartamentosEdit = resp?.data || []
        const { coddpto } = this.AllDataSearch
        this.formEditClient.controls['departamento'].setValue(coddpto)
      },
      error: (e) => {
        this._sweetAlertService.alertError();
      }
    })


    const { coddpto } = this.AllDataSearch
    this._seguimientoClienteService.listarCiudades(coddpto).pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (resp) => {
        this.ciudadeseditar = resp?.data || []
        const { codciu } = this.AllDataSearch
        this.formEditClient.controls['ciudad'].setValue(codciu)
      },
      error: (e) => { this._sweetAlertService.alertError() }
    })

    this._seguimientoClienteService.listarBarrios(this.AllDataSearch.codciu).pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (resp) => {
        this.barrios = resp?.data || []
      },
      error: (e) => {
        this._sweetAlertService.alertError();
      }
    })

  }

  public resetBarrio(): void {
    this.formEditClient.controls['barrio'].setValue(null);
    const codciu = this.formEditClient.value.ciudad

    this._seguimientoClienteService.listarBarrios(codciu).pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (resp) => {
        this.barrios = resp?.data || []
      },
      error: (e) => {
        this._sweetAlertService.alertError();
      }
    })

    this.formEditClient.controls['barrio'].markAsUntouched();
  }

  public changeSelectsedit(select): void {
    this.formEditClient.controls['ciudad'].setValue(null)
    const departamento = select.value
    this._seguimientoClienteService.listarCiudades(departamento).pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (resp) => {
        this.ciudadeseditar = resp?.data || []
      },
      error: (e) => { this._sweetAlertService.alertError() }
    })

    this.resetBarrio();


  }

  public openDiag(): void {


    const data = {
      viewModal: 'Seleccionar Dirección',
      valuesData: [],
      width: '30%'
    }

    this.loadingModal(data)

  }

  public openDiagGestion(): void {


    const data = {
      viewModal: 'Seleccionar Dirección',
      valuesData: [],
      width: '30%'
    }

    this.loadingModal(data)

  }


  public loadingModal({ viewModal, valuesData, width }): void {
    const dialogRef = this.dialog.open(ModalSubDetalleClienteComponent,
      {
        maxWidth: '90vw',
        maxHeight: '80vh',
        width,
        data: { viewModal, valuesData },
        disableClose: false
      })


  }

  public filteredOptions(): any[] {
    const filter = this.formEditClient.controls['barrio'].value?.toLowerCase() || '';
    return this.barrios.filter(item => item.barrio?.toLowerCase().includes(filter))
  }

  public filteredOptionsGestiones(): any[] {
    const filter = this.formAgregarGestiones.controls['barrio'].value?.toLowerCase() || '';
    return this.barriosGestiones.filter(item => item.barrio?.toLowerCase().includes(filter))
  }

  public expandTable(id: number): void {
    const active = this.allDataTable[id].class
    if (active === 'sm:col-span-1') {
      this.allDataTable[id].class = 'sm:col-span-2'
    } else {
      this.allDataTable[id].class = 'sm:col-span-1'
    }


  }






  private listenObservable(): void {


    this.Subscription$ = this._seguimientoClienteService.dataTablesSelected$.pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (response) => {
        this.allDataTable = []
        this.allDataTable = [...response]
        const { length } = this.allDataTable
        this.allDataTable.forEach((item, index) => {

          if (length === 1) {
            item.class = 'sm:col-span-2'
          } else {
            item.class = 'sm:col-span-1'
          }

          if ((index === 2) && (length === 3)) {
            item.class = 'sm:col-span-2'
          }


        })

      }
    })

    this.Subscription$ = this._seguimientoClienteService.agregarGestiones$.pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (resp) => {
        this.selectedOptions = [...resp]
        // console.log('this.selectedOptions', this.selectedOptions);
      }
    })

    // this.Subscription$ = this._seguimientoClienteService.direccionCliente$.pipe(skip(1), takeUntil(this.unsuscribe$)).subscribe({
    //   next: (resp) => {

    //     this.formEditClient.controls['direccionCliente'].setValue(resp)
    //     this.formAgregarGestiones.controls['direccion'].setValue(resp)
    //   }
    // })


  }

  private initForm(): void {
    this.formEditClient = this.fb.group({
      codigoCliente: [],
      nombreCliente: [],
      nitCliente: [],
      direccionCliente: [, [Validators.required]],
      telefonoCliente: [, [Validators.required]],
      celularCliente: [, [Validators.required]],
      celular2Cliente: [,],
      barrio: [, [Validators.required]],
      ciudad: [, [Validators.required]],
      departamento: [, [Validators.required]],
      observaciones: [],
      correoCliente: [],
      extorsion: [false, []]
    })
  }

  private AgregarGestiones(): void {
    this.formAgregarGestiones = this.fb.group({
      'Cliente': [],
      'Negocio': [],
      'Tipodegestor': [, [Validators.required]],
      'Tipodegestion': [, [Validators.required]],
      'Tipodecontacto': [, [Validators.required]],
      'Resultadogestión': [, [Validators.required]],
      'Motivonopago': [],
      'Observaciones': [, [Validators.required]],
      'Estadocliente': [, [Validators.required]],
      'Proximaacción': [, [Validators.required]],
      'Fecha': [, [Validators.required]],
      'valorPagar': [],
      'fechaPagar': [],
      'domicilio': [false],
      'departamento': [],
      'ciudad': [],
      'barrio': [],
      'direccion': [],
    })

  }

}

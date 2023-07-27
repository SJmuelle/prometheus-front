import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarteraClientesService } from 'app/core/services/cartera-clientes.service';
import { Sweetalert2Service } from 'app/core/services/sweetalert2.service';
import { IinfoTitulo } from 'app/shared/componentes/header/header.component';
import { Subject, Subscription } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { ModalSubDetalleClienteComponent } from '../../modal-sub-detalle-cliente/modal-sub-detalle-cliente/modal-sub-detalle-cliente.component';

@Component({
  selector: 'app-modal-actualizar-cliente',
  templateUrl: './modal-actualizar-cliente.component.html',
  styleUrls: ['./modal-actualizar-cliente.component.scss']
})
export class ModalActualizarClienteComponent implements OnInit, OnDestroy {
  public tittleModal: string = '';
  public formEditClient: FormGroup = new FormGroup({});
  public dapartamentos: any[] = [];
  public ciudades: any[] = []
  private unsuscribe$: Subject<any> = new Subject<any>();
  private suscription$: Subscription;
  public infoTitulo: IinfoTitulo = { titulo: 'Seguimiento cartera clientes', subtitulo: 'Realiza los seguimientos a la cartera de los clientes' }
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _sweetAlertService: Sweetalert2Service,
    private _carteraClienteService: CarteraClientesService,
    private _dialogRef: MatDialogRef<ModalActualizarClienteComponent>,
    private _dialogOpen: MatDialog
  ) { }

  ngOnDestroy(): void {
    this.suscription$.unsubscribe();
    this.unsuscribe$.next(null);
    this.unsuscribe$.complete();


  }

  ngOnInit(): void {
    this.initForm()

    const tittle = {
      detalleCartera: 'Detalle de la cartera',
      visualizarPagos: 'Visualizar pagos',
      visualizarGestiones: 'Visualizar gestiones',
      visualizarCompromisosPago: 'Visualizar compromisos de pago',
      estadoCuentaGeotech: 'Estado de cuenta Geotech',
      agregarGestiones: 'Agregar gestiones',
      editarInformacion: 'Editar información'
    }
    this.tittleModal = tittle[this.data.viewModal]
    const { cedula, negocio, ...values } = this.data.valuesData
    this.formEditClient.setValue({ ...values })
    const disable = ['codigoCliente', 'nitCliente', 'nombreCliente']

    disable.forEach(element => {
      this.formEditClient.controls[element]?.disable();
    });

    this.loadSelect()
    this.listenObservable();
  }

  public loadSelect(): void {

    this._carteraClienteService.listarDepartamentos().pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (resp) => {
        this.dapartamentos = resp?.data || []
        const { departamento } = this.data.valuesData
        this.formEditClient.controls['departamento'].setValue(departamento)
      },
      error: (e) => {
        this._sweetAlertService.alertError();
      }
    })


    const { departamento } = this.data.valuesData
    this._carteraClienteService.listarCiudades(departamento).pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (resp) => {
        this.ciudades = resp?.data || []
        const { ciudad } = this.data.valuesData
        this.formEditClient.controls['ciudad'].setValue(ciudad)
      },
      error: (e) => { this._sweetAlertService.alertError() }
    })

  }

  public closeModal(): void {
    this._dialogRef.close();
  }

  public onSave(): void {



    const callback = () => {
      this.formEditClient.enable();
      const form = this.formEditClient.getRawValue();
      const data = {
        ...form,
        negocio: this.data.valuesData.negocio,
        empresa: 'FINT'
      }

      this._carteraClienteService.guardarInformacionCliente(data).pipe(takeUntil(this.unsuscribe$)).subscribe({
        next: (res) => {
          this._sweetAlertService.alertSuccess();
          this._dialogRef.close();
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

  public changeSelects(select): void {
    this.formEditClient.controls['ciudad'].setValue(null)
    const departamento = select.value
    this._carteraClienteService.listarCiudades(departamento).pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (resp) => {
        this.ciudades = resp?.data || []
      },
      error: (e) => { this._sweetAlertService.alertError() }
    })
  }

  public openDiag(): void {


    const data = {
      viewModal: 'Seleccionar Dirección',
      valuesData: [],
      width: '30%'
    }

    this.loadingModal(data)

  }


  public loadingModal({ viewModal, valuesData, width }): void {
    const dialogRef = this._dialogOpen.open(ModalSubDetalleClienteComponent,
      {
        maxWidth: '90vw',
        maxHeight: '80vh',
        width,
        data: { viewModal, valuesData },
        disableClose: false
      })


  }

  private listenObservable(): void {
    this.suscription$ = this._carteraClienteService.direccionCliente$.pipe(skip(1), takeUntil(this.unsuscribe$)).subscribe({
      next: (resp) => {

        this.formEditClient.controls['direccionCliente'].setValue(resp)
      }
    })
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

}

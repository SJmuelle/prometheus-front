import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarteraClientesService } from 'app/core/services/cartera-clientes.service';
import { Sweetalert2Service } from 'app/core/services/sweetalert2.service';
import { IoptionTable } from 'app/shared/componentes/table/table.component';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-modal-sub-detalle-cliente',
  templateUrl: './modal-sub-detalle-cliente.component.html',
  styleUrls: ['./modal-sub-detalle-cliente.component.scss']
})
export class ModalSubDetalleClienteComponent implements OnInit, OnDestroy {
  public tittleModal: string = '';
  public dataClient: any = null
  public dataOptionTable: IoptionTable[] = [
    { name: 'ingreso', text: 'Ingreso', typeField: 'text' },
    { name: 'cedula', text: 'Cédula', typeField: 'text', view: false },
    { name: 'nombre_cliente', text: 'Cliente', typeField: 'text', view: false },
    { name: 'cuota', text: 'Cuota', typeField: 'text' },
    { name: 'branch_code', text: 'Código banco', typeField: 'text' },
    { name: 'bank_account_no', text: 'Cuenta banco', typeField: 'text' },
    { name: 'fecha_ingreso', text: 'Fecha ingreso', typeField: 'text', pipeName: 'date' },
    { name: 'fecha_consignacion', text: 'Fecha consignación', typeField: 'text', pipeName: 'date' },
    { name: 'descripcion_ingreso', text: 'Descripción', typeField: 'text' },
    { name: 'negocio', text: 'Negocio', typeField: 'text' },
    { name: 'valor_ingreso', text: 'Valor ingreso', typeField: 'text', pipeName: 'number', footerSum: true, classTailwind: 'text-end' },

  ]
  public formDireccion: FormGroup = new FormGroup({});
  public allDataRow: any[] = []

  public viaPrincipal: any[] = []
  public numeroVia: any[] = []


  public suscription$: Subscription;
  public unsuscribe$: Subject<any> = new Subject<any>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private _carteraServices: CarteraClientesService,
    private fb: FormBuilder,
    private _sweetAlertService: Sweetalert2Service,
    private _dialRef: MatDialogRef<ModalSubDetalleClienteComponent>
  ) { }


  ngOnDestroy(): void {
    this.suscription$.unsubscribe();
    this.unsuscribe$.next(null);
    this.unsuscribe$.complete();
  }

  ngOnInit(): void {

    this.tittleModal = this.data.viewModal
    this.listenObservable();
    if (this.tittleModal === 'Seleccionar Dirección') {
      this.initForm();
      this.loadSelects()
    }
  }


  public loadSelects(): void {

    this._carteraServices.listarNomenclaturas().pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (resp) => {

        this.viaPrincipal = resp?.data || []
      },
      error: (e) => {
        this._sweetAlertService.alertError();
      }
    })
  }

  public changeSelects(event): void {
    this.formDireccion.controls['numero'].setValue(null)
    const selected = event.value
    this.numeroVia = this.viaPrincipal.filter((value) => value.nombre !== selected)
  }

  public direccionCompleta(): string {
    const viaPrincipal = this.formDireccion.controls['viaPrincipal'].value || '';
    const numeroVia = this.formDireccion.controls['numero'].value || '';
    const valorViaPrincipal = this.formDireccion.controls['valorViaPrincipal'].value || '';
    const valorOneNumeroVia = this.formDireccion.controls['valorNumero1'].value || '';
    const valorTwoNumeroVia = this.formDireccion.controls['valorNumero2'].value || '';
    const complementto = this.formDireccion.controls['complemento'].value || '';
    const direccion = `${viaPrincipal} ${valorViaPrincipal} ${numeroVia} ${valorOneNumeroVia} ${valorTwoNumeroVia} ${complementto}`
    this.formDireccion.controls['direccion'].setValue(direccion?.trim())
    return direccion?.trim()
  }

  public onsaveDireccion(): void {
    const direccion = this.formDireccion.controls['direccion'].value
    this._carteraServices.direccionCliente$.next(direccion)
    this._dialRef.close()
  }

  public closeModal(): void {
    this._dialRef.close()
  }

  private initForm(): void {

    const ValidatorNumero = /^\d{1,3}$/
    this.formDireccion = this.fb.group({
      viaPrincipal: [, [Validators.required]],
      valorViaPrincipal: [, [Validators.required,]],
      numero: [, [Validators.required]],
      valorNumero1: [, [Validators.required,]],
      valorNumero2: [, [Validators.required, Validators.pattern(ValidatorNumero)]],
      complemento: [],
      direccion: []
    })
  }

  private listenObservable(): void {
    this.suscription$ = this._carteraServices.dataCliente$.pipe(takeUntil(this.unsuscribe$)).subscribe({
      next: (data) => {
        this.dataClient = data
        // console.log('data cliente', this.dataClient);
        this.allDataRow = this.data?.valuesData || []

      },
    })
  }

}

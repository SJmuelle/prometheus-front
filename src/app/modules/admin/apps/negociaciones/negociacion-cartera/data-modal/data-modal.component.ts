import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NegociacionCarteraService } from 'app/core/services/negociacion-cartera.service';
import { Sweetalert2Service } from 'app/core/services/sweetalert2.service';
import { NegociacionCarteraComponent } from '../negociacion-cartera.component';
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs';

@Component({
    selector: 'app-data-modal',
    templateUrl: './data-modal.component.html',
    styleUrls: ['./data-modal.component.scss']
})
export class DataModalComponent implements OnInit, OnChanges, OnDestroy {
    @Input() dataRow: any = null;
    @Output() closedEmit: EventEmitter<void> = new EventEmitter<void>();
    @Input() ListadoNegociaciones: any[] = []
    @ViewChild(NegociacionCarteraComponent) update: NegociacionCarteraComponent
    public formNegociacionCartera: FormGroup
    public panelOpenState: boolean = true;
    public panelOpenStateForm: boolean = true;
    public valuesRangeInputs: any = { descuento_debido_total: 100, descuento_gac: 100, descuento_ixm: 100 }
    public selectedDescuento: string = '';
    public disabledInput: boolean = false;
    public disabledSlider: boolean = true;
    private unsuscribe$: Subject<void> = new Subject<void>()

    constructor(
        private fb: FormBuilder,
        private _negociacionCarteraService: NegociacionCarteraService,
        private _sweetAlert: Sweetalert2Service
    ) { }

    ngOnDestroy(): void {
        this.unsuscribe$.next();
        this.unsuscribe$.complete();
    }


    ngOnChanges(changes: SimpleChanges): void {
        this.panelOpenState = true;
        this.panelOpenStateForm = true;
        this.disabledInput = false;


        this.valuesRangeInputs = { descuento_debido_total: 100, descuento_gac: 100, descuento_ixm: 100 }




        if (this.formNegociacionCartera) {

            this.formNegociacionCartera.controls['descuento'].setValue(0);
            this.formNegociacionCartera.controls['mora'].setValue(0);
            this.formNegociacionCartera.controls['gastoCobranza'].setValue(0);

            setTimeout(() => {

                this.valuesRangeInputs.descuento_debido_total = 0,
                    this.valuesRangeInputs.descuento_gac = 0,
                    this.valuesRangeInputs.descuento_ixm = 0
            }, 50);


            this.formNegociacionCartera.enable();

            const reset = {
                tipoNegociacion: null,
                descuento: 0,
                mora: 0,
                gastoCobranza: 0,
                comentario: null
            }

            this.formNegociacionCartera.controls['comentario'].markAsUntouched();
            this.formNegociacionCartera.controls['tipoNegociacion'].markAsUntouched();
            this.formNegociacionCartera.reset({ ...reset });
            let negociacion = null;

            if (this.dataRow.tiene_negociacion === 'Por negociar') {
                return
            }

            negociacion = this.dataRow?.negociacion[0]


            if (negociacion !== undefined) {
                this.dataRow = this.dataRow?.datosCliente;

                this.selectedDescuento = negociacion?.tiponegociacion;
                this.ListadoNegociaciones = [{ codigo: 1, descripcion: negociacion.tiponegociacion }]
                const payload = {
                    tipoNegociacion: 1,
                    descuento: negociacion.por_descuento_deb,
                    mora: negociacion.por_descuento_ixmora,
                    gastoCobranza: negociacion.por_descuento_gac,
                    comentario: negociacion.descripcion
                }

                this.formNegociacionCartera.setValue({ ...payload });
                this.formNegociacionCartera.disable();

                this.disabledInput = true;


            } else {

                this.disabledInput = false;
                this.formNegociacionCartera.enable();

            }





        }



    }



    ngOnInit(): void {
        this.form();

    }




    public resetRanges(valueSelectec: any): void {

        this.valuesRangeInputs = { descuento_debido_total: 100, descuento_gac: 100, descuento_ixm: 100 }

        this.formNegociacionCartera.controls['descuento'].setValue(0);
        this.formNegociacionCartera.controls['mora'].setValue(0);
        this.formNegociacionCartera.controls['gastoCobranza'].setValue(0);

        setTimeout(() => {
            this.ListadoNegociaciones.forEach((item) => {
                if (item.codigo === valueSelectec.value) {
                    this.selectedDescuento = item.descripcion
                    this.valuesRangeInputs.descuento_debido_total = item.descuento_debido_total,
                        this.valuesRangeInputs.descuento_gac = item.descuento_gac,
                        this.valuesRangeInputs.descuento_ixm = item.descuento_ixm

                }
            });

            if (this.dataRow?.gastos_cobranza === 0) {
                this.valuesRangeInputs.descuento_gac = 0
            }

        }, 50);


    }


    public saveData(): void {

        const callBack = () => {
            const data = this.formNegociacionCartera.getRawValue();
            const json = {
                codneg: this.dataRow.cod_neg,
                descripcion: data.comentario,
                debido: this.dataRow.debido_cobrar,
                por_descuento_deb: data.descuento,
                ixmora: this.dataRow.interes_mora,
                por_descuento_ixmora: data.mora,
                gac: this.dataRow.gastos_cobranza,
                por_descuento_gac: data.gastoCobranza,
                tneg: data.tipoNegociacion
            }

            this._sweetAlert.startLoading({});

            this._negociacionCarteraService.guardarNegociacionCartera(json).pipe(takeUntil(this.unsuscribe$)).subscribe({
                next: (resp) => {
                    this._negociacionCarteraService.reloadData$.next({ reload: true })
                    this.cancelForm();
                },
                error: () => {
                    this._sweetAlert.alertError();
                }
            });




        }

        this._sweetAlert.alertConfirmation(callBack);



    }

    public get disabledForm(): boolean {
        if (this.formNegociacionCartera.invalid || this.formNegociacionCartera.controls['comentario']?.value?.trim()?.length === 0) {
            return true
        } else {
            return false
        }
    }

    public cancelForm(): void {

        this._negociacionCarteraService.reloadData$.next({ fullTable: true })

        const reset = {
            tipoNegociacion: null,
            descuento: 0,
            mora: 0,
            gastoCobranza: 0,
            comentario: null
        }
        this.formNegociacionCartera.reset({ ...reset });
        this.formNegociacionCartera.controls['comentario'].markAsUntouched();
        this.formNegociacionCartera.controls['tipoNegociacion'].markAsUntouched();
        this.closedEmit.emit();
    }

    public reverseNegociacion(): void {

        const callBack = () => {

            const negocio = this.dataRow.cod_neg;
            this._sweetAlert.startLoading({});

            this._negociacionCarteraService.reversarNegociacionRealizada(negocio).subscribe({
                next: (data) => {
                    this._negociacionCarteraService.reloadData$.next({ reload: true })
                },
                error: (err) => {
                    this._sweetAlert.alertError();
                }
            })
        }



        this._sweetAlert.alertConfirmation(callBack);
    }

    private form(): void {
        this.formNegociacionCartera = this.fb.group({
            tipoNegociacion: ['', Validators.required],
            descuento: [0, Validators.required],
            mora: [0, Validators.required],
            gastoCobranza: [0, Validators.required],
            comentario: [, [Validators.required, Validators.minLength(16)]],
        })
    }




}

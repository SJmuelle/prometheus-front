import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NegociacionCarteraService } from 'app/core/services/negociacion-cartera.service';
import Swal from 'sweetalert2';
import { NegociacionCarteraComponent } from '../negociacion-cartera.component';

@Component({
    selector: 'app-data-modal',
    templateUrl: './data-modal.component.html',
    styleUrls: ['./data-modal.component.scss']
})
export class DataModalComponent implements OnInit, OnChanges {
    @Input() dataRow: any = null;
    @Output() closedEmit: EventEmitter<void> = new EventEmitter<void>();
    @Input() ListadoNegociaciones: any[] = []
    @ViewChild(NegociacionCarteraComponent) update: NegociacionCarteraComponent
    public formNegociacionCartera: FormGroup
    public panelOpenState: boolean = true;
    public panelOpenStateForm: boolean = true;
    public valuesRangeInputs: any = { descuento_debido_total: 100, descuento_gac: 100, descuento_ixm: 100 }
    public selectedDescuento: string = '';
    public disabled: boolean = false;


    constructor(private fb: FormBuilder, private _negociacionCarteraService: NegociacionCarteraService) { }


    ngOnChanges(changes: SimpleChanges): void {

        this.panelOpenState = true;
        this.panelOpenStateForm = true;
        this.disabled = false;
        if (this.formNegociacionCartera) {
            this.formNegociacionCartera.enable();

            const reset = {
                tipoNegociacion: ' ',
                descuento: 0,
                mora: 0,
                gastoCobranza: 0,
                comentario: ' '
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
                this.dataRow = this.dataRow?.datosCliente[0];
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

                this.disabled = true;


            } else {

                this.disabled = false;
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
        }, 50);



    }


    public saveData(): void {

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

        Swal.fire({
            title: 'Cargando',
            html: 'Por favor espere',
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 500000,
            didOpen: () => {
                Swal.showLoading()
                Swal.close();
                this._negociacionCarteraService.guardarNegociacionCartera(json).subscribe({
                    next: (resp) => {

                        this._negociacionCarteraService.reloadData$.next({ reload: true })

                        Swal.fire(
                            'Correcto',
                            'Solicitud realizada correctamente',
                            'success'
                        )
                        this.cancelForm();

                    },
                    error: () => {
                        Swal.fire(
                            'Error',
                            'Solicitud no pudo ser procesada, porfavor intente mas tarde.',
                            'error'
                        )
                    }
                });
            }
        })

    }

    public get disabledForm(): boolean {
        if (this.formNegociacionCartera.invalid || this.formNegociacionCartera.controls['comentario']?.value?.trim()?.length === 0) {
            return true
        } else {
            return false
        }
    }

    public cancelForm(): void {

        const reset = {
            tipoNegociacion: ' ',
            descuento: 0,
            mora: 0,
            gastoCobranza: 0,
            comentario: ' '
        }
        this.formNegociacionCartera.controls['comentario'].markAsUntouched();
        this.formNegociacionCartera.controls['tipoNegociacion'].markAsUntouched();
        this.formNegociacionCartera.reset({ ...reset });
        this.closedEmit.emit();
    }

    private form(): void {
        this.formNegociacionCartera = this.fb.group({
            tipoNegociacion: ['', Validators.required],
            descuento: [0, Validators.required],
            mora: [0, Validators.required],
            gastoCobranza: [0, Validators.required],
            comentario: ['', Validators.required],
        })
    }




}

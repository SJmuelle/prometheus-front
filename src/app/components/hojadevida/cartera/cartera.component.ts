import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ICartera } from 'app/resources/interfaces/hojadevida/cartera/icartera';
import { CarteraService } from 'app/resources/services/hojadevida/cartera/cartera.service';
import { List } from 'lodash';
import { ModalcarteraComponent } from '../modalcartera/modalcartera.component';

@Component({
    selector: 'app-cartera',
    templateUrl: './cartera.component.html',
    styleUrls: ['./cartera.component.scss'],
})
export class CarteraComponent implements OnInit, OnChanges {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    iCartera: List<ICartera> = [];

    @Input() codNegocio: string = '';

    displayedColumns: string[] = [
        'tipoCliente',
        'unidadNegocio',
        'codigoNegocio',
        'estado',
        'edadMora',
        'tipoCuenta',
        'valorCuotaMes',
        'cuotasPendientes',
        'cuotasVencidas',
        'saldoVencido',
        'saldoObligacion',
        'detalle',
    ];

    constructor(
        public dialog: MatDialog,
        private _carteraService: CarteraService
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        // console.log(changes);
        this.onCartera(this.codNegocio);
    }

    ngOnInit(): void {
        this.onCartera(this.codNegocio);
    }

    openDialog(codigoNegocio): void {
        const dialogRef = this.dialog.open(ModalcarteraComponent, {
            width: '1080px',
            maxHeight: '550px',
            data: { codigoNegocio: codigoNegocio },
        });

        dialogRef.afterClosed().subscribe((result) => {
        });
    }

    onCartera(codigo) {
        // SERVICIO DE LA PESTAÑA DE CARTERA
        this._carteraService
            .getCartera(codigo)
            .subscribe((respCartera: any) => {
                // // console.log(respCartera);
                if (respCartera.data) {
                    this.iCartera = respCartera.data;
                } else {
                    this.iCartera = [];
                }
            });
    }

}

import {
    AfterViewInit,
    Component,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ICredito } from 'app/resources/interfaces/hojadevida/credito/icredito';
import { List } from 'lodash';
import { ModalcreditoComponent } from '../modalcredito/modalcredito.component';

@Component({
    selector: 'app-credito',
    templateUrl: './credito.component.html',
    styleUrls: ['./credito.component.scss'],
})
export class CreditoComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    @Input() iCredito: List<ICredito> = [];

    displayedColumns: string[] = [
        'tipoCliente',
        'tipoCredito',
        'agencia',
        'unidadNegocio',
        'codigoNegocio',
        'fechaSolicitud',
        'fechaAprobacion',
        'estado',
        'subestado',
        'valorNegocio',
        'valorDisponible',
        'detalle',
    ];

    constructor(public dialog: MatDialog) {}

    openDialog(codigoNegocio): void {
        const dialogRef = this.dialog.open(ModalcreditoComponent, {
            width: '1080px',
            maxHeight: '550px',
            data: { codigoNegocio },
        });

        dialogRef.afterClosed().subscribe((result) => {
        });
    }

    ngOnInit(): void {
        // // console.log(this.iCredito);
    }

    ngAfterViewInit() {
        // this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);
        // // If the user changes the sort order, reset back to the first page.
        // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        // merge(this.sort.sortChange, this.paginator.page)
        //   .pipe(
        //     startWith({}),
        //     switchMap(() => {
        //       this.isLoadingResults = true;
        //       return this.exampleDatabase!.getRepoIssues(
        //         this.sort.active, this.sort.direction, this.paginator.pageIndex)
        //         .pipe(catchError(() => observableOf(null)));
        //     }),
        //     map(data => {
        //       // Flip flag to show that loading has finished.
        //       this.isLoadingResults = false;
        //       this.isRateLimitReached = data === null;
        //       if (data === null) {
        //         return [];
        //       }
        //       // Only refresh the result length if there is new data. In case of rate
        //       // limit errors, we do not want to reset the paginator to zero, as that
        //       // would prevent users from re-triggering requests.
        //       this.resultsLength = data.total_count;
        //       return data.items;
        //     })
        //   ).subscribe(data => this.data = data);
    }
}

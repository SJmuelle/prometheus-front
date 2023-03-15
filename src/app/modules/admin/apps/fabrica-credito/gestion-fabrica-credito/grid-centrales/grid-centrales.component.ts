import {
    Component,
    EventEmitter,
    Inject,
    OnInit,
    Output,
    ViewEncapsulation,
    ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CentralesService } from 'app/core/services/centrales.service';
import Swal from 'sweetalert2';
import moment from 'moment';

@Component({
    selector: 'app-grid-centrales',
    templateUrl: './grid-centrales.component.html',
    styleUrls: ['./grid-centrales.component.scss'],
})
export class GridCentralesComponent implements OnInit {
    @Output() cerrarComponente: EventEmitter<boolean> =
        new EventEmitter<boolean>();
    @Output() minimizarComponente: EventEmitter<boolean> =
        new EventEmitter<boolean>();

    public numeroIdentificacion;
    public numeroSolicitud;
    public datosDocumentosCentrales: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private centralesService: CentralesService
    ) {
        this.numeroIdentificacion = this.route.snapshot.paramMap.get('id');
        this.numeroSolicitud = this.route.snapshot.paramMap.get('num');
        this.getDocumentoHistorico();
    }

    ngOnInit(): void {
    }

    public onMinimiza(): void {
        this.minimizarComponente.emit(false);
    }
    public onCerrar(): void {
        this.cerrarComponente.emit(false);
    }

    private getDocumentoHistorico(): void {
        Swal.fire({
            title: 'Cargando',
            html: 'Buscando información...',
            timer: 500000,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then((result) => {});
        const data = {
            identificacion: this.numeroIdentificacion,
            numeroSolicitud:Number(this.numeroSolicitud)
        };
        this.centralesService.getComentarios(data).subscribe((res) => {
            this.datosDocumentosCentrales = res.data;
            console.log('aqui' + res.data);
            Swal.close();
        });
    }

    public getDownloadHistorico(data: any) {
        const archivo = data.base64;
        const extension = 'pdf';
        // console.log(extension);
        const link = document.createElement('a');
        document.body.appendChild(link);
        link.href = `data:application/pdf;base64,${archivo}`;
        link.target = '_self';
        link.download = 'reporte'+data.idHistorico+'.pdf';
        link.click();
    }

    /**
     *
     * @param date
     * @returns
     */
    cambiarFecha(date) {
        moment.locale('es');
        return moment(date).format('MMMM D YYYY');
    }
}

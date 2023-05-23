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
import {  takeUntil } from 'rxjs/operators';
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
    public titularDocumentosCentrales: any[]= [];
    public codeudorDocumentosCentrales: any[]= [];
    public solidarioDocumentosCentrales: any[]= [];

    constructor(
        private route: ActivatedRoute,
        private centralesService: CentralesService
    ) {
        this.numeroIdentificacion = this.route.snapshot.paramMap.get('id');
        this.numeroSolicitud = this.route.snapshot.paramMap.get('num');
        this.getDocumentoHistorico();
        this.getDatosConsultaDataCredito();
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
            this.asignarDatosDocumentos(res.data)
            Swal.close();
        });
    }

    private getDatosConsultaDataCredito(){

    }

    private asignarDatosDocumentos(datos: any[]){ 
        datos.forEach(item => {
            switch(item.tipoTercero){
                case 'T':
                this.titularDocumentosCentrales.push(item);
                break;
                case 'C':
                this.codeudorDocumentosCentrales.push(item);
                break;
                case 'S':
                this.solidarioDocumentosCentrales.push(item);
                break;
                default:
                    this.titularDocumentosCentrales.push(item);
            }
        })
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

    renovarConsultaCredit(tipoTercero: string){
        const data = {
            numeroSolicitud: Number(this.numeroSolicitud),
            tipoTercero: tipoTercero
        }
        Swal.fire({ title: 'Cargando', html: 'Buscando información', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
         this.centralesService.getHistorialCredit(data).subscribe(({data}) => {
            const formatearData = {
                tipo_identificacion: data.tipo_identificacion,
                identificacion: data.identificacion,
                primer_apellido: data.primer_apellido,
                nit_empresa: data.nit_empresa,
                entidad: data.entidad,
                ciudad: data.ciudad,
                asesor: data.asesor,
                departamento: data.departamento,
                codigo_interno: data.codigo_interno+'',
                resultado: 'OK'
            }
            
            this.centralesService.postRenovarConsultaCredit(formatearData).subscribe(({info}) => {
                if(info.data.codigo_respuesta === 'OK'){
                    Swal.fire('Renovación éxitosa', 'Recuerda que se debe evaluar nuevamente el motor de decisión y políticas del crédito.', 'success')
                }else{
                    Swal.fire('Ha ocurrido un error', 'Lo sentimos, en este momento presentamos inconvenientes en la comunicación con las centrales de riesgos. <br>' + info.data.codigo_respuesta , 'error')
                }
            })
         })
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

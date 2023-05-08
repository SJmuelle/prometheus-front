import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { ReferenciasService } from "../../../../../../core/services/referencias.service";
import { MatDialog } from "@angular/material/dialog";
import { FormDialogReferenciasComponent } from "../form-dialog-referencias/form-dialog-referencias.component";
import { FormDetallesReferenciasComponent } from "../form-detalles-referencias/form-detalles-referencias.component";
import { PermisosService } from 'app/core/services/permisos.service';
import { FormGenericoComponent } from '../../agenda-referenciacion/tab-agenda-referenciacion/form-generico-modal/form-generico.component';
import { GenericasService } from 'app/core/services/genericas.service';


@Component({
    selector: 'app-grid-referencias',
    templateUrl: './grid-referencias.component.html',
    styleUrls: ['./grid-referencias.component.scss']
})
export class GridReferenciasComponent implements OnInit, OnDestroy, AfterViewInit {
    public referencias$: Observable<any>;
    public esVer: boolean = false;
    public subscription$: Subscription;
    @Input() datos: any;
    public permisoEditar: boolean = false;
    public codeduor: boolean = false;
    public tiposTercero$: Observable<any>;

    constructor(
        private route: ActivatedRoute,
        private referenciasService: ReferenciasService,
        private _dialog: MatDialog,
        public _permisosService: PermisosService,
        private genericaServices: GenericasService,

    ) {


    }

    ngOnInit(): void {
        this.cargarReferencias();
        this.escuchaObservable();
        this.permisoEditar = this._permisosService.permisoPorModuleTrazabilidad()
        this.tieneCoudeudor();
    }
    /**
     * @description: Abre el dialogo de nueva referencia
     */
    public onDialogReferencia(): void {
        const numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
        const dialogRef = this._dialog.open(FormDialogReferenciasComponent, {
            data: { numeroSolicitud: numeroSolicitud },
            minWidth: '440px',
            minHeight: '420px',
            disableClose: true,
        });
        dialogRef.afterClosed().toPromise();
    }
    /**
   * @description: Abre el dialogo de nueva referencia
   */
    public onDialogReferenciacionFormGenerico(item): void {
        // {
        //     "idReferencias": 481,
        //     "numeroSolicitud": 186129,
        //     "identificacion": "1143163517",
        //     "nombreCompleto": "Abigail Muelle Camargo",
        //     "telefono": "",
        //     "celular": "3045337156",
        //     "tipo": "P",
        //     "descripcionTipoReferencia": "Personal",
        //     "descripcionEstado": "Activo",
        //     "fechaReferencia": "08/03/2023",
        //     "unidadNegocio": 1,
        //     "tipoTercero": "T",
        //     "tipoReferenciacion": "P",
        //     "tipoDocumento": "CC"
        // }
        const numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
        const dialogRef = this._dialog.open(FormGenericoComponent, {
            data: {
                currentStep: 0,
                tipoDocumento: item.tipoDocumento,
                numeroSolicitud: item.numeroSolicitud,
                identificacion: item.idReferencias,
                referencia: item.idReferencias,
                tipoReferenciacion: item.tipoReferenciacion,
                tipoPersona: item.tipo,
                CodUnidadNegocio: item.unidadNegocio,
                tipoDocPersona: item.tipoDocumento,
                tipoTercero: item.tipoTercero
            },
            minHeight: '420px',
            disableClose: true,
        });
        dialogRef.afterClosed().toPromise();
    }
    /**
     * @description: Cerrar formulario de detalles referencias
     */
    public onCerrarFormularioDetalle(event: boolean) {
        this.esVer = event;
    }
    /**
     * @description: carga las referencias desde el inicio
     */
    public cargarReferencias(): void {
        const codigo: string = this.route.snapshot.paramMap.get('num');
        if (codigo) {
            this.getReferencias(codigo);
        }
    }

    public onGetReferencia(datos: any): void {
        this.esVer = true;
        const dialogRef = this._dialog.open(FormDetallesReferenciasComponent, {
            minWidth: window.innerWidth < 600 ? '240px' : '500px',
            minHeight: '440px',
            disableClose: true,
            // data: datos
        });
        dialogRef.afterClosed().toPromise();
        this.referenciasService.seleccionDatosReferencia.next({ value: datos, show: true });
    }

    /**
     * @description: Obtiene las referencias
     */
    private getReferencias(codigo: string): void {
        this.referencias$ = this.referenciasService.getReferencias(codigo);
    }
    /**
     * @description:  Escucha el observable evento
     */
    private escuchaObservable(): void {
        this.subscription$ = this.referenciasService.eventos$.subscribe((res) => {
            if (res) {
                this.cargarReferencias();
            }
        });
    }

    public tieneCoudeudor(): void {
        const codigo: string = this.route.snapshot.paramMap.get('num');

        this.genericaServices.getTiposTercero(codigo).subscribe(({ data }) => {
            // transforma el array a boolean,  si se pueden crear codeudores aparecerá la lista
            this.codeduor = !!data?.filter(element => element?.codigoOpcion === 'C').length;
        });
    }

    ngOnDestroy(): void {
        this.esVer = false;
        this.subscription$.unsubscribe();
    }

    ngAfterViewInit(): void {
        if (this.datos) {
            if (Object.keys(this.datos).length) {
                this.getReferencias(this.datos.numeroSolicitud);
            }
        }
    }


}

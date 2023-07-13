import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ExcepcionCreditoService } from 'app/core/services/excepcion-credito.service';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { LibranzaPublicaService } from 'app/core/services/libranza-publica.service';
import moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-excepcion-credito',
  templateUrl: './excepcion-credito.component.html',
  styleUrls: ['./excepcion-credito.component.scss']
})
export class ExcepcionCreditoComponent implements OnInit {

  public form: FormGroup;
  public buscarPor: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  drawerOpened: boolean;

  public unidad$: Observable<any>;
  public pagaduria$: Observable<any>;
  public estados$: Observable<any>;
  public subestados$: Observable<any>;
  public dataInicial: any;
  public listados = [];
  public listadoCount = 0;

  constructor(private fb: FormBuilder, private _excepcionCreditoService: ExcepcionCreditoService,private _libranzaService: LibranzaPublicaService,
    private _fabricaCreditoService: FabricaCreditoService,
    private router: Router) {
    this.form = this.fb.group({
        'FECHA_INICIAL': [''],
        'FECHA_FINAL': [''],
        'CODIGO-NEGOCIO': [''],
        pagaduria: [''],
        estado: [''],
        solicitud: [''],
        buscar: [''],
        identificacion: [''],
        subestado: ['']
    })
   }

  ngOnInit(): void {
  //  this.getBuscarPorSelect()
  this.cargueInicial()
  }

  getBuscarPorSelect(){
    this._excepcionCreditoService.getBuscarPorSelect().pipe(takeUntil(this._unsubscribeAll)).subscribe(rep =>{
        console.log('rep', rep);

    })
  }

  private cargueInicial() {
    let data = {
        entidad: "CARGUE-VISTA-EXCEPCION",
        unidadNegocio: 0
    };
    this._libranzaService.cargueInicialFormularioCorto(data).subscribe((resp: any) => {
        if (resp) {
            this.dataInicial = resp.data
            console.log('data inicial', this.dataInicial);
        }
    })
}

  armarForm(){
    console.log('form', this.form.getRawValue());

  }

  consultaFiltro(){
    let data = this.form.getRawValue()
    data = this.tranformData(data);

    Swal.fire({ title: 'Cargando', html: 'Buscando información', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
        this._fabricaCreditoService
            .trazabilidadBusquedaFiltro(data)
            .subscribe((response: any) => {
                Swal.close();
                if (response) {
                    this.listados = response.data.trazabilidad;
                    this.listadoCount = this.listados.length;
                } else {
                    this.listados = [];
                    this.listadoCount = this.listados.length;
                }
            });
  }

  tranformData(data: any){
    data['FECHA_INICIAL'] = data['FECHA_INICIAL'] && moment(data['FECHA_INICIAL'].toString()).format('YYYY-MM-DD') || '';
    data['FECHA_FINAL'] =  data['FECHA_FINAL'] && moment( data['FECHA_FINAL'].toString()).format('YYYY-MM-DD') || '';

    // estructura para el backend
    let transformData = {};
    transformData['entidad'] = 'TRAZABILIDAD';
    transformData['details'] = [];

    // recibir por defecto las rechazadass
    transformData['details'].push({
        "tipo": "TIPO",
        "buscar": "RE"
    })

    Object.keys(data).forEach((key,i) => {
        console.log(`item ${key} i ${data[key]}`);
        if(data[key] !== ''){
            transformData['details'].push({tipo: key.toUpperCase(), buscar:  data[key]})
        }
    })

    data = transformData
    console.log('datos formateados', data);
    return data;
  }


     /**
     * @description: abre la agenda
     */
     public onGetAgenda(data: any): void {
        //this.agendaCompletacionService.seleccionAgenda.next({selected: data, show: true});
        localStorage.setItem("trazabilidad", "si")
        localStorage.setItem("excepcionCredito", "si")
        const { numeroSolicitud, identificacion } = data;
        this.router.navigate(['/credit-factory/credit-management', numeroSolicitud, identificacion]);
    }

    public cambiarFecha(date) {
        moment.locale('es');
        return moment(date).format('MMMM D YYYY')
    }

    public cambiarHora(date) {
        moment.locale('es');
        return moment(date).format('hh:mm A')
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}

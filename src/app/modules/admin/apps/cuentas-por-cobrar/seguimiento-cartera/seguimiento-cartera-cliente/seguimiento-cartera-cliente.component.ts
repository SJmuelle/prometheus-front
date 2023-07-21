import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarteraClientesService } from 'app/core/services/cartera-clientes.service';
import { Sweetalert2Service } from 'app/core/services/sweetalert2.service';
import { IinfoTitulo } from 'app/shared/componentes/header/header.component';
import { IoptionTable } from 'app/shared/componentes/table/table.component';

@Component({
  selector: 'app-seguimiento-cartera-cliente',
  templateUrl: './seguimiento-cartera-cliente.component.html',
  styleUrls: ['./seguimiento-cartera-cliente.component.scss']
})
export class SeguimientoCarteraClienteComponent implements OnInit {
  public infoTitulo: IinfoTitulo = { titulo: 'Seguimiento cartera clientes', subtitulo: 'Realiza los seguimientos a la cartera de los clientes' }
  public dataRows: any[] = []
  public formSearch: FormGroup;
  public openSearch: boolean = true
  public unidadesNegocio: any[] = []
  public periodosFotos: any[] = []
  public optionsTable: IoptionTable[] = [
    {
      name: 'Opciones',
      text: 'Opciones',
      typeField: 'mat-menu',
      MenuFunctions: [
        {
          nameFunction: 'prueba',
          callback: (data) => {
            // console.log('prueba 1')
            this.prueba(data)
          },
          iconFuseTemplate: 'search'
        },
        {
          nameFunction: 'prueba 2',
          callback: (data) => {
            // console.log('prueba 2')
            this.prueba(2)
          },
          iconFuseTemplate: 'search'
        },
        {
          nameFunction: 'prueba 3',
          callback: (data) => {
            // console.log('prueba 3')
            this.prueba(3)
          },
          iconFuseTemplate: 'search'
        },

      ]
    },
    {
      name: 'cedula',
      text: 'Cedula',
      typeField: 'text',
    },
    {
      name: 'nombreCliente',
      text: 'Nombre cliente',
      typeField: 'text',
    },
    {
      name: 'direccion',
      text: 'Direccion',
      typeField: 'text',
    },
    {
      name: 'barrio',
      text: 'Barrio',
      typeField: 'text',
    },
    {
      name: 'ciudad',
      text: 'Ciudad',
      typeField: 'text',
    },
    {
      name: 'telcontacto',
      text: 'Telefono',
      typeField: 'text',
    },
    {
      name: 'telefono',
      text: 'Celular',
      typeField: 'text',
    },
    {
      name: 'negocio',
      text: 'Negocio',
      typeField: 'text',
    },
    {
      name: 'nombreConvenio',
      text: 'U. Negocio',
      typeField: 'text',
    },
    {
      name: 'vencimientoMayor',
      text: 'Vencimiento mayor',
      typeField: 'text',
    },
    {
      name: 'Dia de pago',
      text: 'Dia de pago',
      typeField: 'text',
    },
    {
      name: 'Valor saldo',
      text: 'Valor saldo',
      typeField: 'text',
    },
    {
      name: 'debidoCobrar',
      text: 'Debido cobrar',
      typeField: 'text',
    },
    {
      name: 'recaudosxCuota',
      text: 'Recaudo',
      typeField: 'text',
    },
    {
      name: 'cumplimiento',
      text: '% cumplimiento',
      typeField: 'text',
    },
    {
      name: 'valoraPagar',
      text: 'Valor a pagar',
      typeField: 'text',
    },
    {
      name: 'fechaultCompromiso',
      text: 'Fecha ultimo compromiso',
      typeField: 'text',
    },
    {
      name: 'reestructuracion',
      text: 'Reest',
      typeField: 'text',
    },
    {
      name: 'juridica',
      text: 'Juridico',
      typeField: 'text',
    },
    {
      name: 'agente',
      text: 'Negociacion',
      typeField: 'text',
    },
  ]
  constructor(
    private _carteraClienteServices: CarteraClientesService,
    private fb: FormBuilder,
    private _sweetAlerService: Sweetalert2Service) { }

  ngOnInit(): void {
    this.loadsearch()
    this.formSearchBuilder();
  }

  public prueba(data): void {
    console.log('prueba', data)
  }

  public loadsearch(): void {
    this._carteraClienteServices.listarUnidadNEgocio().subscribe({
      next: (resp) => {
        this.unidadesNegocio = resp?.data || []

      },
      error: (e) => {
        console.log(e)
      }
    })

    this._carteraClienteServices.listarPeriodosFotos().subscribe({
      next: (resp) => {
        this.periodosFotos = resp?.data || []

      },
      error: (e) => {
        console.log(e)
      }
    })


  }




  public searchClient(): void {
    this._sweetAlerService.startLoading({});

    const { periodo, unidadNegocio, identificacion, ...values } = this.formSearch.getRawValue();

    const data = {
      periodo,
      unidadNegocio,
      identificacion,
      details: [
        { estadoCartera: values.alDia ? 'Al dia' : '' },
        { estadoCartera: values.porVencer ? 'Por vencer' : '' },
        { estadoCartera: values.vencido ? 'Vencido' : '' }
      ]
    }


    this._carteraClienteServices.buscarClienteCartera(data).subscribe({
      next: (resp) => {
        if (!resp.data.length) {
          this._sweetAlerService.alertInfo({});
        } else {
          this.openSearch = false
          this._sweetAlerService.stopLoading();
          this.dataRows = resp?.data || []
        }

      },
      error: (e) => {
        this._sweetAlerService.alertError();
        console.log(e)
      }
    })


  }

  private formSearchBuilder(): void {
    this.formSearch = this.fb.group({
      periodo: ['202307', [Validators.required]],
      unidadNegocio: ['1', [Validators.required]],
      identificacion: ['72187427', [Validators.required]],
      alDia: [false],
      porVencer: [true],
      vencido: [true]
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AgendaCompletacionService } from 'app/core/services/agenda-completacion.service';
import { AgendaReferenciacionService } from 'app/core/services/agenda-referenciacion.service';
import { DepartamentosCiudadesService } from 'app/core/services/departamentos-ciudades.service';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { GenericasService } from 'app/core/services/genericas.service';
import { UtilityService } from 'app/resources/services/utility.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grid-tipo-referenciacion',
  templateUrl: './grid-tipo-referenciacion.component.html',
  styleUrls: ['./grid-tipo-referenciacion.component.scss']
})
export class GridTipoReferenciacionComponent implements OnInit {
  public unSubscribe$: Subject<any> = new Subject<any>();
  public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
  public identificacion: string = this.route.snapshot.paramMap.get('id');
  public animacionVer: boolean = true;
  public agenda_fabrica: string = '';
  public tipoDocumento: string = '';
  public estado: string = '';
  public page: number = 1;
  public pageComercial: number = 1;
  public verComentarios: boolean = false;
  public esVerComentarios: boolean = false;
  public minimizarComentarios: boolean = false;
  public minimizarDevoluciones: boolean = false;
  listado: any;

  constructor(
    private agendaCompletacionService: AgendaCompletacionService,
    private fabricaCreditoService: FabricaCreditoService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private departamentosCiudadesService: DepartamentosCiudadesService,
    private router: Router,
    private genericaServices: GenericasService,
    private _dialog: MatDialog,
    public utility: UtilityService,
    private agendaReferenciaService: AgendaReferenciacionService,
  ) {
    if (!this.numeroSolicitud) {
      return;
    } else {
      this.getFabricaCreditoAgenda(this.numeroSolicitud, this.identificacion);
    }
  }

  ngOnInit(): void {
    this.getTipoReferenciacion(this.numeroSolicitud)
    // this.getFabricaCreditoAgenda();
  }

  /**
 * @description:
 */
  public onCerrar(event): void {
    this.verComentarios = event;
    this.minimizarComentarios = event;
  }
  /**
   * @description: Minimiza el componente comentarios
   */
  public onMinimiza(event): void {
    this.minimizarComentarios = !event;
    this.verComentarios = event;
  }

  /**
 * @description: Obtiene la data para cargar al formulario
 */
  private getFabricaCreditoAgenda(numeroSolicitud: string, identificacion: string): void {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    const datosSolicitud: any = {
      numeroSolicitud: numeroSolicitud,
      identificacion: identificacion
    };
    this.fabricaCreditoService.getDatosFabricaAgenda(datosSolicitud).pipe(takeUntil(this.unSubscribe$))
      .subscribe(({ data }) => {
        Swal.close();

        this.tipoDocumento = data.tipoDocumento;
        const datosDocumentos: any = {
          numeroSolicitud: datosSolicitud.numeroSolicitud,
          tipoDocumento: this.tipoDocumento
        };
        this.fabricaCreditoService.seleccionDatos.next({ data: datosDocumentos });
        this.estado = data.descripcionEstado;
      });
  }

  /**
   * @description: Valida que el campo solo sea numeros
   */
  public irAtras() {
    switch (this.agenda_fabrica) {
      case 'CO':
        this.redireccionar('agenda-completion');
        break;
      case 'RE':
        this.redireccionar('agenda-referencing');
        break;
      default:
        this.redireccionar('agenda-comercial');
        break;
    }
  }


  /**
   * @description:aqui va algo
   */
  public onGetFormRefrenciacion(tipo: any): void {
    this.router.navigate([`../agenda/${this.numeroSolicitud}/${this.identificacion}/${tipo}`]);
  }


  /**
   * @description: Redireciona a la grid de cada agenda
   */
  private redireccionar(data: any) {
    this.router.navigate(['/credit-factory/' + data]);
  }

  private getTipoReferenciacion(data): void {
    this.listado = {};
    let datos = {
      "numeroSolicitud": data
    }
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
    this.agendaReferenciaService.getTipoReferenciacion(datos).pipe().subscribe((res) => {
      if (res.status === 200) {
        console.log(res.data)
        this.listado = res.data;
        Swal.close();
      } else {
        Swal.close();
      }
    });
  }

  ngOnDestroy(): void {
    this.unSubscribe$.unsubscribe();
    // this.agendaCompletacionService.resetSeleccionAgenda();
  }
}

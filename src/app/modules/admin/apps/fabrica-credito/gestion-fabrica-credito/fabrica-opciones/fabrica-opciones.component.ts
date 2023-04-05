import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { PermisosService } from 'app/core/services/permisos.service';
import { FormDialogDecisionComponent } from 'app/modules/admin/apps/fabrica-credito/gestion-fabrica-credito/form-dialog-decision/form-dialog-decision.component';
import { FormDialogoChecklistComponent } from 'app/modules/admin/apps/fabrica-credito/gestion-fabrica-credito/form-dialogo-checklist/form-dialogo-checklist.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormDecisionComponent } from '../../agenda-decision/form-decision/form-decision.component';
import { ModalRecalcularComponent } from '../modal-recalcular/modal-recalcular.component';
import { FormDialogAnalisisFinancieroComponent } from 'app/modules/admin/apps/fabrica-credito/gestion-fabrica-credito/form-dialog-analisis-financiero/form-dialog-analisis-financiero.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fabrica-opciones',
  templateUrl: './fabrica-opciones.component.html',
  styleUrls: ['./fabrica-opciones.component.scss']
})
export class FabricaOpcionesComponent implements OnInit, OnDestroy {
  public unSubscribe$: Subject<any> = new Subject<any>();
  public animacionVer: boolean = true;
  public fabricaDatos;
  public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
  public identificacion: string = this.route.snapshot.paramMap.get('id');
  public permisoEditar: boolean;
  public verComentarios: boolean = false;
  public minimizarComentarios: boolean = false;
  public verDevoluciones: boolean = false;
  public minimizarDevoluciones: boolean = false;
  public verCentrales: boolean = false;
  public minimizarCentrales: boolean = false;
  public habilitaDevolucion: boolean = true;
  public habilitaSiguiente: boolean = true;
  dialogMostrar: string;
  toolText: string = 'Siguiente';
  iconoSvg: string = '';

  constructor(
    private fabricaCreditoService: FabricaCreditoService,
    private route: ActivatedRoute,
    private router: Router,
    private _dialog: MatDialog,
    public _permisosService: PermisosService
  ) {
    this.permisoEditar = this._permisosService.permisoPorModuleTrazabilidad()
  }


  ngOnInit(): void {
    this.getFabricaCreditoAgenda(this.numeroSolicitud, this.identificacion);

  }

  /**
 * @description: Obtiene la data para cargar al formulario
 */
  private getFabricaCreditoAgenda(numeroSolicitud: string, identificacion: string): void {
    const datosSolicitud: any = {
      numeroSolicitud: numeroSolicitud,
      identificacion: identificacion
    };
    if(this.numeroSolicitud && this.identificacion){
      this.fabricaCreditoService.getDatosFabricaAgenda(datosSolicitud).pipe(takeUntil(this.unSubscribe$))
      .subscribe(({ data }) => {
        this.fabricaDatos = data;
        if (data.unidadNegocio === 32) {
          if (data.validacionAnalisisFinanciero == 'S') {
            if ((data.cantidadCheckList != data.totalCheckList)) {
              this.toolText = 'Check list';
              this.iconoSvg = 'check_circle';
            } else {
              this.toolText = 'Siguiente';
              this.iconoSvg = 'next_plan';
            }
          } else {
            this.toolText = 'Análisis Financiero';
            this.iconoSvg = 'heroicons_outline:calculator';
          }
        } else {
          if ((data.cantidadCheckList != data.totalCheckList)) {
            this.toolText = 'Check list';
            this.iconoSvg = 'check_circle';
          } else {
            this.toolText = 'Siguiente';
            this.iconoSvg = 'next_plan';
          }
        }

        switch (this.fabricaDatos.agenda) {
          case 'VD':
            this.habilitaDevolucion = false;
            this.habilitaSiguiente = true;
            break;
          case 'CO':
            this.habilitaDevolucion = true;
            this.habilitaSiguiente = true;
            break;
          case 'CC':
            this.habilitaDevolucion = true;
            this.habilitaSiguiente = true;
            break;
          case 'CM':
            this.habilitaDevolucion = true;
            this.habilitaSiguiente = true;
            break;
          case 'RE':
            this.habilitaDevolucion = true;
            this.habilitaSiguiente = true;
            break;
          case 'DE':
            this.habilitaDevolucion = true;
            this.habilitaSiguiente = true;
            break;
          case 'GC':
            this.habilitaDevolucion = true;
            this.habilitaSiguiente = true;
            break;
          case 'FO':
            this.habilitaDevolucion = true;
            this.habilitaSiguiente = true;
            break;
          case 'VI':
            this.habilitaDevolucion = true;
            this.habilitaSiguiente = true;
            break;
          default:
            this.habilitaDevolucion = false;
            this.habilitaSiguiente = false;
            break;
        }
      });
    }
    
    
  }

  //funciones privadas
  /**
 * @description: Redireciona a la grid de cada agenda
 */
  private redireccionar(data: any) {
    this.router.navigate(['/credit-factory/' + data]);
  }

  // funciones publicas

  /**
 * @description: Valida que el campo solo sea numeros
 */
  public irAtras() {
    if (this.permisoEditar) {
      this.redireccionar('trazabilidad');
      return
    }
    switch (this.fabricaDatos.agenda) {
      case 'VD':
        this.redireccionar('agenda-venta-digital');
        break;
      case 'CO':
        this.redireccionar('agenda-completion');
        break;
      case 'CC':
        this.redireccionar('agenda-comite-comercial');
        break;
      case 'CM':
        this.redireccionar('agenda-comercial');
        break;
      case 'RE':
        this.redireccionar('agenda-referencing');
        break;
      case 'DE':
        this.redireccionar('agenda-decision');
        break;
      case 'GC':
        this.redireccionar('agenda-cartera');
        break;
      case 'FO':
        this.redireccionar('agenda-formalizacion');
        break;
      case 'VI':
        this.redireccionar('agenda-visitas');
        break;
      default:
        this.redireccionar('trazabilidad');
        break;
    }


  }

  /**
   * @description: Modal de decision
   */
  public onDialogoDecision(): void {
    let dialogRef;
    dialogRef = this._dialog.open(FormDialogoChecklistComponent, {
      minWidth: '60%',
      maxHeight: '80%',
      data: {
        numeroSolicitud: this.numeroSolicitud,
        tipoDocumento: this.fabricaDatos.tipoDocumento,
        agenda: this.fabricaDatos.agenda,
        unidadNegocio: this.fabricaDatos.unidadNegocio,
        tipo: ''

      },
      disableClose: false,
    });
    dialogRef.afterClosed().toPromise().then(() => {
    });

  }

  /**
     * @description: Modal de decision
     */
  public abrirDecision(): void {
    let dialogRef;
    dialogRef = this._dialog.open(FormDialogoChecklistComponent, {
      minWidth: '60%',
      maxHeight: '80%',
      data: {
        numeroSolicitud: this.numeroSolicitud,
        tipoDocumento: this.fabricaDatos.tipoDocumento,
        agenda: this.fabricaDatos.agenda,
        unidadNegocio: this.fabricaDatos.unidadNegocio,
        tipo: 'D'
      },
      disableClose: false,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (this.fabricaDatos.unidadNegocio != 32) {
        if (res == true) {
          this.abrirModal('recalcular')
        }
      } else {
        if (res == true) {
          this.abrirDecisionDesistir();
        }
      }
    });
  }

  /**
   * @description: Modal de decision
   */
  public abrirDecisionDesistir(): void {
    this.abrirModal('decision')
  }

  abrirModal(tipo: string) {
    switch (tipo) {
      case "decision":
        const dialogRef = this._dialog.open(FormDecisionComponent, {
          width: '60%',
          data: this.fabricaDatos,
          disableClose: false,

        });
        dialogRef.afterClosed().subscribe((res) => {
          if (res == true) {
            this.irAtras()
          }
        })
        break;
      case "recalcular":
        const dialogRec = this._dialog.open(ModalRecalcularComponent, {
          width: '100%',
          data: this.fabricaDatos,
          disableClose: false
        });
        dialogRec.afterClosed().subscribe((res) => {
          if (res == true) {
            this.abrirModal('decision')
          }
        })
        break;
      default:
        break;
    }

  }


  /**
   * @description: Minimiza el componente comentarios
   */
  public onMinimiza(event): void {
    this.minimizarComentarios = !event;
    this.verComentarios = event;
  }

  /**
* @description:
*/
  public onCerrar(event): void {
    this.verComentarios = event;
    this.minimizarComentarios = event;
  }

  /**
* @description:
*/
  public onCerrarCentrales(event): void {
    this.verCentrales = event;
    this.minimizarCentrales = event;
  }
  /**
   * @description: Minimiza el componente centrales
   */
  public onMinimizaCentrales(event): void {
    this.minimizarCentrales = !event;
    this.verCentrales = event;
  }
  /**
 * @description:Cierra el componente de devoluciones
 */
  public onCerrarDevolucion(event): void {
    this.verDevoluciones = event;
    this.minimizarDevoluciones = event;
  }
  /**
   * @description: Minimiza el componente Devoluciones
   */
  public onMinimizaDevolucion(event): void {
    this.minimizarDevoluciones = !event;
    this.verDevoluciones = event;
  }

  ngOnDestroy(): void {
    this.unSubscribe$.unsubscribe();
  }

  /**
 * @description: Modal de decision
 */
  public onDialogoAnalisis(): void {
    let dialogRef;
    if (this.fabricaDatos.unidadNegocio == 32 && this.fabricaDatos.validacionAnalisisFinanciero == 'N') {
      dialogRef = this._dialog.open(FormDialogAnalisisFinancieroComponent, {
        minWidth: '80%',
        height: '620px',
        data: {
          numeroSolicitud: this.numeroSolicitud,
          permiso: false
        },
        disableClose: false,
      });
      dialogRef.afterClosed().toPromise().then((res) => {
        if (res == true) {
          this.onDialogoDecision();
        }
      });
    } else {
      this.onDialogoDecision();
    }
  }

  /**
* @description: Modal de decision
*/
  public onDialogoAnalisisConsulta(): void {
    let dialogRef;
    if (this.fabricaDatos.unidadNegocio == 32 && this.fabricaDatos.validacionAnalisisFinanciero == 'S') {
      dialogRef = this._dialog.open(FormDialogAnalisisFinancieroComponent, {
        minWidth: '80%',
        height: '620px',
        data: {
          numeroSolicitud: this.numeroSolicitud,
          permiso: true
        },
        disableClose: false,
      });
      dialogRef.afterClosed().toPromise().then((res) => {

      });
    } else {
      Swal.fire('Informacion', 'Aun no se ha configurado el analisis financiero', 'warning');
    }
  }
}

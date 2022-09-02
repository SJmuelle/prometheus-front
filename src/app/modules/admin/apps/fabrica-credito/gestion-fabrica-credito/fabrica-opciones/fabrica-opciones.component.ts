import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { FormDialogDecisionComponent } from 'app/modules/admin/apps/fabrica-credito/gestion-fabrica-credito/form-dialog-decision/form-dialog-decision.component';
import { FormDialogoChecklistComponent } from 'app/modules/admin/apps/fabrica-credito/gestion-fabrica-credito/form-dialogo-checklist/form-dialogo-checklist.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormDecisionComponent } from '../../agenda-decision/form-decision/form-decision.component';

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
  public verComentarios: boolean = false;
  public minimizarComentarios: boolean = false;
  public verDevoluciones: boolean = false;
  public minimizarDevoluciones: boolean = false;
  public verCentrales: boolean = false;
  public minimizarCentrales: boolean = false;
  dialogMostrar: string;

  constructor(
    private fabricaCreditoService: FabricaCreditoService,
    private route: ActivatedRoute,
    private router: Router,
    private _dialog: MatDialog,
  ) { }


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
    this.fabricaCreditoService.getDatosFabricaAgenda(datosSolicitud).pipe(takeUntil(this.unSubscribe$))
      .subscribe(({ data }) => {
        this.fabricaDatos = data;
        this.dialogMostrar = ((data.cantidadCheckList != data.totalCheckList) ? 'CHECKLIST' : 'SIGUIENTE');

      });
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
    switch (this.fabricaDatos.agenda) {
      case 'CO':
        this.redireccionar('agenda-completion');
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
    switch (this.dialogMostrar) {
      case 'CHECKLIST':
        dialogRef = this._dialog.open(FormDialogoChecklistComponent, {
          minWidth: '60%',
          maxHeight: '80%',
          data: {
            numeroSolicitud: this.numeroSolicitud,
            tipoDocumento: this.fabricaDatos.tipoDocumento,
            agenda: this.fabricaDatos.agenda,
            unidadNegocio: this.fabricaDatos.unidadNegocio
          },
          disableClose: false,
        });
        dialogRef.afterClosed().toPromise().then(() => {
          this.getFabricaCreditoAgenda(this.numeroSolicitud, this.identificacion);
        });
        break;
      case 'SIGUIENTE':
        dialogRef = this._dialog.open(FormDialogDecisionComponent, {
          minWidth: '30%',
          minHeight: '30%',
          data: {
            numeroSolicitud: this.numeroSolicitud,
            etapa: 1,
            idAgenda: this.fabricaDatos.agenda,
          },
          disableClose: false,
        });
        dialogRef.afterClosed().toPromise().then(() => {
          this.getFabricaCreditoAgenda(this.numeroSolicitud, this.identificacion);
        });
        break;
      default:
        break;
    }

  }

  /**
     * @description: Modal de decision
     */
  public abrirDecision(): void {
    const dialogRef = this._dialog.open(FormDecisionComponent, {
      width: '30%',
      data: this.fabricaDatos,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.irAtras();
    })
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

}

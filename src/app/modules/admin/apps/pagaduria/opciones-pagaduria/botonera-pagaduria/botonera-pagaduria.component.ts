import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { PermisosService } from 'app/core/services/permisos.service';
import { ModalDecisionCreditoComponent } from '../modal-decision-credito/modal-decision-credito.component';

@Component({
  selector: 'app-botonera-pagaduria',
  templateUrl: './botonera-pagaduria.component.html',
  styleUrls: ['./botonera-pagaduria.component.scss']
})
export class BotoneraPagaduriaComponent implements OnInit, OnDestroy {
  public animacionVer: boolean = true;
  @Input() apiData: any;
  public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
  public identificacion: string = this.route.snapshot.paramMap.get('id');
  constructor(
    private fabricaCreditoService: FabricaCreditoService,
    private route: ActivatedRoute,
    private router: Router,
    private _dialog: MatDialog,
    public _permisosService: PermisosService
  ) {

  }



  ngOnInit(): void {
    console.log(this.apiData)
  }




  /**
 * @description: Redireciona a la grid de cada agenda
 */
  private redireccionar(data: any) {
    this.router.navigate([data]);
  }


  abrirDecision(){
    let dialogRef;
    dialogRef = this._dialog.open(ModalDecisionCreditoComponent, {
      minWidth: '60%',
      maxHeight: '80%',
      data: {
        numeroSolicitud: this.numeroSolicitud,
        tipoDocumento: this.identificacion,
        agenda: 'VP',
        unidadNegocio: '22',
        tipo: 'D'
      },
      disableClose: false,
    });
    dialogRef.afterClosed().toPromise().then((atras) => {
      if(atras){
        this.irAtras() 
      }
    });
  }


  nuevaPagaduria(){
    this.redireccionar('/pagaduria/parametria/gestion-pagaduria/0');
  }
  nuevoPlazo(){
    this.redireccionar('/pagaduria/plazo/parametria/gestion-plazo/0');
  }
  gestionPlazo(){
    this.redireccionar('/pagaduria/plazo/parametria/gestion-plazo');
  }
  gestionPagaduria(){
    this.redireccionar('/pagaduria/parametria/gestion-pagaduria/0');
  }
  /**
 * @description: Valida que el campo solo sea numeros
 */
  public irAtras() {
 
    switch (this.apiData) {
      case 'resumen':
        this.redireccionar('/pagaduria/agenda-pagaduria');
      break;

      case 'pagaduria':
        this.redireccionar('/pagaduria/agenda-pagaduria');
      break;

      default:
      break;
    }
  }


  ngOnDestroy(): void {
    
  }

}

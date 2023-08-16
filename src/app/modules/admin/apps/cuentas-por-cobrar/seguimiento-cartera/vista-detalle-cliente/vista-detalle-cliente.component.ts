import { BreakpointObserver, Breakpoints, } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CarteraClientesService } from 'app/core/services/cartera-clientes.service';
import { Sweetalert2Service } from 'app/core/services/sweetalert2.service';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalDetailsCarteraClienteComponent } from '../modal-details-cartera-cliente/modal-details-cartera-cliente/modal-details-cartera-cliente.component';

@Component({
  selector: 'app-vista-detalle-cliente',
  templateUrl: './vista-detalle-cliente.component.html',
  styleUrls: ['./vista-detalle-cliente.component.scss']
})
export class VistaDetalleClienteComponent implements OnInit, OnDestroy {

  @Input() public infoCliente: any = null;
  @Output() public closePage: EventEmitter<void> = new EventEmitter<void>();

  public viewMode: any = { gestiones: false, detalle: true }
  public displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);
  public destroyed: Subject<void> = new Subject<void>();
  public currentScreenSize: string;
  public suscription$: Subscription = new Subscription();
  public valueSearch: any = null
  constructor(private dialog: MatDialog, private _sweetAlerService: Sweetalert2Service,
    private breakpointObserver: BreakpointObserver, private _carteraClienteServices: CarteraClientesService) { }


  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
    this.suscription$.unsubscribe();
  }

  ngOnInit(): void {
    this.listenObservable();

    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result: any) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
            const { gestiones } = this.viewMode
            if (this.currentScreenSize.includes('mall')) {
              if (this.viewMode.gestiones) {

                this.viewMode = { gestiones: true, detalle: false }
              } else {
                this.viewMode = { gestiones: false, detalle: true }

              }
            } else {
              if (this.viewMode.gestiones) {

                this.viewMode = { gestiones: true, detalle: true }
              } else {
                this.viewMode = { gestiones: false, detalle: true }
              }

            }
          }
        }
      });
  }


  public calculateWith(): number {

    return window.innerWidth
  }


  // public displayView(): void {
  //   const ancho = window.innerWidth
  //   const { gestiones } = this.viewMode

  //   if (ancho <= 600 && gestiones) {
  //     this.viewMode = { gestiones: true, detalle: false }
  //     return
  //   }
  //   if (ancho >= 600 && gestiones) {
  //     this.viewMode.detalle = true
  //     return
  //   }


  // }


  public openGestiones(): void {
    const ancho = window.innerWidth

    if (ancho <= 600) {
      this.viewMode = { gestiones: true, detalle: false }
    } else {

      this.viewMode.gestiones = true
    }



  }



  public openDialog(viewModal: string, dataRow: any): void {

    this._sweetAlerService.stopLoading();
    const valuesData = dataRow
    const width = '50%'
    this.loadingModal({ viewModal, valuesData, width });
  }

  public loadingModal({ viewModal, valuesData, width = '80%' }): void {
    const dialogRef = this.dialog.open(ModalDetailsCarteraClienteComponent,
      {
        maxWidth: '90vw',
        maxHeight: '80vh',
        width,
        data: { viewModal, valuesData },
        disableClose: false
      })

  }

  private listenObservable(): void {
    this.suscription$ = this._carteraClienteServices.dataCliente$.pipe(takeUntil(this.destroyed)).subscribe({
      next: (resp) => {
        if (resp?.gestiones) {
          this.viewMode = { gestiones: true, detalle: true }
        } else {
          this.viewMode = { gestiones: false, detalle: true }
        }
      }
    });


  }











}

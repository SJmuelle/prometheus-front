import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import Swal from 'sweetalert2';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AgendaReferenciacionService } from 'app/core/services/agenda-referenciacion.service';


@Component({
  selector: 'app-ver-referenciacion',
  templateUrl: './ver-referenciacion.component.html',
  styleUrls: ['./ver-referenciacion.component.scss']
})
export class VerReferenciacionComponent implements OnInit {

  @Output() cerrarComponente: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() minimizarComponente: EventEmitter<boolean> = new EventEmitter<boolean>();
  public unSubscribe$: Subject<any> = new Subject<any>();
  public tipoDocumento: any;
  public estado: any;
  public fabricaDatos: any;
  public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
  public identificacion: string = this.route.snapshot.paramMap.get('id');
  public listado: any = {};
  public page: number = 1;
  public pageFamiliar:number=1;
  public pageComercial: number = 1;

  constructor(
    private fabricaCreditoService: FabricaCreditoService,
    private route: ActivatedRoute,
    private agendaReferenciaService: AgendaReferenciacionService,) { }

  ngOnInit(): void {
    this.getFabricaCreditoAgenda(this.numeroSolicitud, this.identificacion)
  }

  
  /**
 * @description: Obtiene la data para cargar al formulario
 */
  private getFabricaCreditoAgenda(numeroSolicitud: string, identificacion: string): void {
    let datos = {
      "numeroSolicitud": numeroSolicitud
    }
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
    this.agendaReferenciaService.getTipoReferenciacion(datos).pipe().subscribe((res) => {
      if (res.status === 200) {
        console.log('data',res.data);
        
        this.listado = res.data;
        Swal.close();
      } else {
        Swal.close();
      }
    });
  }

  public onCerrar(): void {
    this.cerrarComponente.emit(false);
  }

  public onMinimiza(): void {
    this.minimizarComponente.emit(false);
  }
}

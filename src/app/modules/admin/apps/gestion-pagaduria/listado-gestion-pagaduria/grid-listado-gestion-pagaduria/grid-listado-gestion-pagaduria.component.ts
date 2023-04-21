import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GestionPagaduriaService } from '../../../../../../core/services/gestion-pagaduria.service';

@Component({
  selector: 'app-grid-listado-gestion-pagaduria',
  templateUrl: './grid-listado-gestion-pagaduria.component.html',
  styleUrls: ['./grid-listado-gestion-pagaduria.component.scss']
})
export class GridListadoGestionPagaduriaComponent implements OnInit, OnDestroy {
  public contactos: any[] = [];
  public contactosOriginales: any[] = [];
  public total: number;
  private unsubscribe$: Subject<any> = new Subject();
  public editMode: boolean[] = [];
  public firstInitial: string;
  // Agrega una variable para almacenar el estado de la barra lateral
  public showSidebar = false;

  constructor(
    private _gestionPagaduriaService: GestionPagaduriaService,
  ) { }

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    console.log(usuario);
    this._gestionPagaduriaService.getContactos(usuario.user).subscribe({
      next: ({ data }) => {
        console.log('data', data);
        this.firstInitial = data[0].nombre.charAt(0).toUpperCase()
        this.contactos = [...data];
        this.contactosOriginales = [...data];
        this.total = data.length;
      },
      error: (err) => {
        console.log('err', err);
      }
    })
  }

  filtrarTabla(nombre: string) {
    if (nombre) {
      this.contactos = this.contactosOriginales.filter(item => {
        return item.nombre.toLowerCase().includes(nombre.toLowerCase());
      });
    } else {
      this.contactos = [...this.contactosOriginales];
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // Método para mostrar u ocultar la barra lateral
  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }
  crearInformacion() {
    const nitPagaduria = '123456789'; 
    this._gestionPagaduriaService.crearInformacionPagadurias(nitPagaduria).subscribe(response => {
      // Manejar la respuesta aquí si es necesario
    });
}
}
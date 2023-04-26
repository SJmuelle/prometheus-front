import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GestionPagaduriaService } from '../../../../../../core/services/gestion-pagaduria.service';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';

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
  public firstInitial: string;
  public infoPagaduria: any[] = [];
  public filtrarTabla = new FormControl('');
  
  // Agrega una variable para almacenar el estado de la barra lateral
  dialog: any;
  listado: any = [];
  showModal = false;
 
  

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

    this.consulta();
  }
  consulta() {
    // Swal.fire({ title: 'Cargando', html: 'Buscando información de las pagadurias', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    var usuario= JSON.parse(localStorage.getItem ("usuario")); 
    console.log(usuario);
    this._gestionPagaduriaService.getPlazos(usuario.user).subscribe((response: any) => {
        Swal.close();
        // debugger
        console.log(response)
        if (response) {
          this.listado = response.data;
        } else {
          this.listado = [];
        }
      });

  }



  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }
  
  crearInformacion(nitPagaduria: string) {
    let data = {
      nitPagaduria: nitPagaduria
    }
    console.log(nitPagaduria)
    this._gestionPagaduriaService.postInformacionPagadurias(data).subscribe((response : any) => {
      this.infoPagaduria = response.data; // Se supone que response.data es un array, así que usamos el primer elemento
      console.log(response.data); 
      this.abrirModal(this.infoPagaduria);
    },
    error => {
      console.log(error); // Imprimir el error en la consola
    }
    );      
  }
  
  abrirModal(infoPagaduria: any): void {
    this.infoPagaduria = infoPagaduria;
    this.showModal = true;
  }
}
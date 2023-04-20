import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GestionPagaduriaService } from '../../../../../../core/services/gestion-pagaduria.service';

@Component({
  selector: 'app-grid-listado-gestion-pagaduria',
  templateUrl: './grid-listado-gestion-pagaduria.component.html',
  styleUrls: ['./grid-listado-gestion-pagaduria.component.scss']
})
export class GridListadoGestionPagaduriaComponent implements OnInit, OnDestroy {
  public contact: any[] = [];
  private unsubscribe$: Subject<any> = new Subject();
  public editMode: boolean[] = [];


  constructor(
    private _gestionPagaduriaService: GestionPagaduriaService,
  ) { }

  ngOnInit(): void {
   
  var usuario= JSON.parse(localStorage.getItem ("usuario")); 
  console.log(usuario);
    this._gestionPagaduriaService.getContactos(usuario.user).subscribe({
      next: ({data}) => {
        console.log('data', data);
        this.contact = [...data]
      },
      error: (err) => {
        console.log('err', err);
      }
      
      
    })

  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
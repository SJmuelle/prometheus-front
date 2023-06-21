import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class Sweetalert2Service {

  constructor() { }



  public startLoading(): void {
    Swal.fire({ title: 'Cargando', html: 'Por favor espere', allowOutsideClick: false, timer: 500000, didOpen: () => { Swal.showLoading() }, })

  }

  public stopLoading(): void {
    Swal.close();

  }




}

import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class Sweetalert2Service {

  constructor() { }



  public startLoading({ title = 'Cargando', html = 'Por favor espere' }): void {

    Swal.fire({ title, html, allowOutsideClick: false, timer: 500000, didOpen: () => { Swal.showLoading() }, })

  }

  public stopLoading(): void {
    Swal.close();

  }

  /**
   * despues de confirmar => .then((result : any)=>{if(result.isConfirmed){//logica}})
   */
  public async alertConfirmation(callBack: Function): Promise<void> {
    Swal.fire({
      allowOutsideClick: false,
      title: '¿Estas seguro?',
      text: "esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result: any) => {
      if (result.isConfirmed) {
        callBack();
      }
    })
  }

  public alertSuccess(): void {
    Swal.fire(
      'Correcto!',
      'Solicitud realizada correctamente',
      'success'
    )
  }

  public alertError(): void {
    this.stopLoading();
    Swal.fire(
      'Error!',
      'Su solicitud no pudo ser procesada, por favor intente nuevamente.',
      'error'
    )
  }


}

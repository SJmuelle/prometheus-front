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
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      customClass: {
        actions: 'flex-row-reverse gap-2',
        cancelButton: 'rounded-full w-26 bg-gray-500',
        confirmButton: 'rounded-full w-26 '
      }
    }).then((result: any) => {
      if (result.isConfirmed) {
        callBack();
      }
    })
  }

  public alertSuccess(): void {


    Swal.fire({
      allowOutsideClick: true,
      title: 'Correcto!',
      text: "Solicitud realizada correctamente",
      icon: 'success',
      confirmButtonColor: '#3085d6',
      customClass: {
        confirmButton: 'rounded-full w-20 bg-blue-400 '
      }
    })
  }

  public alertError(): void {

    this.stopLoading();

    Swal.fire({
      allowOutsideClick: true,
      title: 'Error!',
      text: "Su solicitud no pudo ser procesada, por favor intente nuevamente",
      icon: 'error',
      customClass: {
        confirmButton: 'rounded-full w-20 bg-gray-400 '
      }
    })
  }


}

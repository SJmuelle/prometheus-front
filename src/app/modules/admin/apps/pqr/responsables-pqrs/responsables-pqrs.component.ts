import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PqrService } from '../pqr.service';
import { FormResponsablesComponent } from './form-responsables/form-responsables.component';
import { ListUsuarioComponent } from './list-usuario/list-usuario.component';

@Component({
  selector: 'app-responsables-pqrs',
  templateUrl: './responsables-pqrs.component.html',
  styleUrls: ['./responsables-pqrs.component.scss']
})
export class ResponsablesPQRSComponent implements OnInit {

  listado: any = [];
  page: number = 1;
  tamanoTabl: number = 5;
  filtrarTabla: string = '';
  mostrar_form: boolean = true;
  datos:any= {};
  ocultarForm: boolean = true;
  tipo: string;
  responsable: any;
  escala: any;
  listadoArea: any=[];
  // datos: { responsable: string; escalado: string; estado: string; cerrarPqrs: boolean; };


  constructor(
    public dialog: MatDialog,
    private _pqrService: PqrService) { }

  ngOnInit(): void {
    this.consulta();
    this.datos = {
      responsable: "",
      escalado: "",
      estado: "",
      cerrarPqrs: '',
      titulo: 'N'
    }
  }
  consulta() {
    Swal.fire({ title: 'Cargando', html: 'Buscando información responsables de PQRS', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._pqrService
      .setResponsables()
      .subscribe((response: any) => {
        Swal.close();
        if (response) {
          this.listado = response;
        } else {
          this.listado = [];
        }
      });
  }
  abrirModal(datos, titulo) {
    if (titulo == 'N') {
      this.datos = {
        responsable: "",
        escalado: "",
        estado: "",
        cerrarPqrs: '',
        titulo: 'N'
      }
    } else {
      this.datos = {
        id:datos.id,
        responsable: datos.responsable,
        escalado: datos.escalado,
        areaResponsable: datos.areaResponsable,
        areaEscalado: datos.areaEscalado,
        estado:datos.estado=='Activo'?'A':"I",
        cerrarPqrs: '',
        titulo: 'A'
      }
    }

    const dialogRef = this.dialog.open(FormResponsablesComponent, {
        width: '60%',
      // maxHeight: '550px',
      data: this.datos,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed');
      // console.log(result);
      this.consulta();
    });

  }
  crearNuevo() {
    this.consultaListado();
    this.ocultarForm = false;
    this.datos = {
      responsable: "",
      escalado: "",
      estado: "",
      cerrarPqrs: 'S',
      titulo: 'N'
    }
  }

  buscarUsuarios(tipo) {
    this.tipo=tipo;
    const dialogRef = this.dialog.open(ListUsuarioComponent, {
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed');
      // console.log(result);
      if(tipo=='R'){
        this.responsable=result;
        this.datos.responsable=` ${result.cedula}  (${result.usuario}) `
      }else{
        this.escala=result;
        this.datos.escalado= ` ${result.cedula}  (${result.usuario}) `
      }

    });
  }
  consultaListado(){
    Swal.fire({ title: 'Cargando', html: 'Buscando información de Tipos de PQRS', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
        this._pqrService
          .getListados(`/tk/select-areas`)
          .subscribe((response: any) => {
            Swal.close();
            if (response) {
              this.listadoArea = response;
            } else {
              this.listadoArea = [];
            }
          });
  }
  guardar() {
    let url, data;
    url = "/agregar-pqrs-responsable";
    data = {
      "responsable":  this.responsable.cedula,
      "escalado":  this.escala.cedula,
      "areaRes":  this.datos.areaResponsable,
      "areaEsc":  this.datos.areaEscalado,
      "estado": "",
      "cerrarPqrs":  false
    }
    Swal.fire({ title: 'Cargando', html: 'Guardando información de PQRS', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._pqrService
      .Create(url, data )
      .subscribe((response: any) => {
        Swal.close();
        if (response) {
          if (response.status == 200) {
            if (!response.data.respuesta.includes('OK')) {
              Swal.fire(
                '¡Información!',
                response.data.respuesta,
                'error'
              );
              return;
            }
            Swal.fire(
              '¡Información!',
              `Se guardo el registro con éxito`,
              'success'
            );
            setTimeout(() => {
              this.ocultarForm = true;
              this.consulta();
            }, 2000);

          } else {
            Swal.fire(
              '¡Información!',
              `Hubo un error en los datos enviados, favor evaluar`,
              'success'
            );
          }
        } else {
          Swal.fire(
            '¡Advertencia!',
            'Para este tipo de búsqueda, mínimo es necesario la cédula del cliente',
            'error'
          );
        }

      });
  }
}

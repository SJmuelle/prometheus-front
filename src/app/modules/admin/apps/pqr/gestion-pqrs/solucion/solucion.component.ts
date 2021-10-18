import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { PqrService } from '../../pqr.service';

@Component({
  selector: 'app-solucion',
  templateUrl: './solucion.component.html',
  styleUrls: ['./solucion.component.scss']
})
export class SolucionComponent implements OnInit {

  // @Output() devolver: EventEmitter<any> = new EventEmitter();
  mensaje: any;
  quillModules: any = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
      ['clean']
    ]
  };

  seguimiento: { idPqrs: any; idPqrsPadre: any; motivoRechazo: string; idTipoComentario: number; detalle: string; };
  pqrid: any;
  datos: any = {};
  solucionArea: boolean = false;
  solucionCliente: boolean = false;
  todo: boolean = false;
  nada: boolean = false;
  file: any = null;
  filename: string;
  idTipoComentario: string;
  constructor(private _pqrService: PqrService, private _activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(param => {
      this.pqrid = param.idPQR
    })
    let url = `/informacion-pqrs/${this.pqrid}`;
    this._pqrService
      .getListados(url)
      .subscribe((response: any) => {
        if (response) {
          this.datos = response[0];
          this.seguimiento = {
            idPqrs: parseInt(this.pqrid),
            idPqrsPadre: this.datos.idPadre,
            motivoRechazo: '',
            idTipoComentario: null,
            detalle: ''
          }
          url = `/pqrs-validar-permisos/${this.pqrid}/${usuario.id}`;
          this._pqrService
            .getListados(url)
            .subscribe((response: any) => {
              // aprobarComentario: 0
              // solucionArea: 0
              // solucionCliente: 0
              this.solucionArea = response.solucionArea == 1 ? true : false;
              this.solucionCliente = response.solucionCliente == 1 ? true : false;
              if ((this.solucionArea == true) && (this.solucionCliente == true)) {
                this.todo = true;
              } else if ((this.solucionArea == false) && (this.solucionCliente == false)) {
                this.nada = true;
              } else {
                this.seguimiento.idTipoComentario = this.solucionArea == true ? 1 : 2;
              }
            });

        } else {
          this.datos = {};
        }
      });
    let usuario = JSON.parse(sessionStorage.getItem("usuario"));
  }

  public onCharge(input: HTMLInputElement): void {
    // this.showButtonSave = false;
    // this.showButtonRecord = true;
    // this.nameFile = 'masivo.cvs';
    const files = input.files;
    console.log(files);
    // this.filename = "archivo.ext";
    if (files && files.length) {
      const fileToRead = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(fileToRead);
      reader.onloadend = () => {
        const file: string | ArrayBuffer = reader.result;
        this.file = file;
        this.filename = fileToRead.name;
    
      };
    }
  }

  guardar() {
    this.seguimiento.idTipoComentario = parseInt(this.idTipoComentario);
    let url = "/agregar-solucion-comentario";
    Swal.fire({ title: 'Cargando', html: 'Guardando información de PQRS', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._pqrService
      .Create(url, this.seguimiento)
      .subscribe((response: any) => {
        Swal.close();
        if (response) {
          if (response.status == 200) {
      
            if (response.data.respuesta.includes('Error')) {
              Swal.fire(
                'Información',
                response.data.respuesta,
                'error'
              );
              return;
            }
            if (this.file != null) {


              let nombre = this.filename.split('.');
              let data = {
               
                "idComentario": response.data.respuesta,
                "nombreArchivo": nombre[0],
                "extension": nombre[1],
                "fuente": "registro-pqrs",
                "identificador": "pqrs",
                "base64": this.file,
                "descripcion": 'Solución'
              }
              url = "/file/cargar-archivo-pqrs";
              Swal.fire({ title: 'Cargando', html: 'Guardando documento de PQRS', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
              this._pqrService
                .postFile(url, data)
                .subscribe((response: any) => {
                  Swal.close();
                  if (response) {
                    Swal.fire(
                      'Información',
                      `Se guardo el registro con exito`,
                      'success'
                    );
                    this.limpiar();
                  }
                })
            } else {
              Swal.fire(
                'Información',
                `Se guardo el registro con exito`,
                'success'
              );
              this.limpiar();
            }

          } else {
            Swal.fire(
              'Información',
              `Hubo un error en los datos enviados, favor evaluar`,
              'success'
            );
          }
        } else {
          Swal.fire(
            'Información',
            'Error en la respuesta del servicio, favor intente nuevamente',
            'error'
          );
        }

      });
  }

  limpiar() {
    this.seguimiento = {
      idPqrs: parseInt(this.pqrid),
      idPqrsPadre: this.datos.idPadre,
      motivoRechazo: '',
      idTipoComentario: null,
      detalle: ''
    }
    this.filename = '';
    this.file = null;
  }

}

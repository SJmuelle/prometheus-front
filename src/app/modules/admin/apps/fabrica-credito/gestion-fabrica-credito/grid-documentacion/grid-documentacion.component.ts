import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {DocumentosAdjuntosService} from "../../../../../../core/services/documentos-adjuntos.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-grid-documentacion',
  templateUrl: './grid-documentacion.component.html',
  styleUrls: ['./grid-documentacion.component.scss']
})
export class GridDocumentacionComponent implements OnInit {
  public documentos$: Observable<any>;
  constructor(
      private route: ActivatedRoute,
      private documentosServices: DocumentosAdjuntosService,
  ) {
      /*const datos: any = {
          numeroSolicitud: data.numeroSolicitud,
          tipoDocumento: data.tipoDocumento
      };*/
      // console.log(datos);
      // this.getDocumentos(datos);


  }

  ngOnInit(): void {
  }

  public subirArchivo(input: any, item: any): void {
      Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
      let formulario: {};
      const files = input.target.files;
      if (files && files.length) {
          const fileToRead = files[0];
          const reader = new FileReader();
          reader.readAsDataURL(fileToRead);
          reader.onloadend = () => {
              const file: string | ArrayBuffer | null = reader.result;
              const extension: string = fileToRead.type.split('/')[1];
              const fechaHoy = Date.now();
              formulario = {
                  nombreArchivo: item.nombreArchivo + '' + fechaHoy,
                  extension: extension,
                  fuente: 'archivo-multi',
                  identificador: '',
                  numeroSolicitud: 0,
                  tipoArchivo: item.idArchivo,
                  categoria: item.idCategoria,
                  agencia: 'OP',
                  tipo: 'negocio',
                  base64: file
              };
              this.guardarAdjunto(formulario);
          };

      }
  }

  private getDocumentos(datos: any): void {
      this.documentos$ = this.documentosServices.getDocumentos(datos);
  }

  private guardarAdjunto(datos: any): void {
      this.documentosServices.adjuntarDocumento(datos).subscribe((data: any) => {
          if (data.status === 200) {
              Swal.fire(
                  '¡Información!',
                  'Se guardo el registro con éxito',
                  'success'
              ).then(resultado => {
                  if (resultado.isConfirmed) {
                      const dato: any = {
                          // numeroSolicitud: this.data.numeroSolicitud,
                          // tipoDocumento: this.data.tipoDocumento
                      };
                      // this.getDocumentos(dato);
                  }
              });
          }
      }, error => {
          Swal.fire(
              '¡Información!',
              'Ha ocurrido un error',
              'error',
          );
      });

  }

}

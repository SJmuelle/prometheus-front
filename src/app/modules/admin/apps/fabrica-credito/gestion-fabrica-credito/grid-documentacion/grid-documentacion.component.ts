import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {DocumentosAdjuntosService} from "../../../../../../core/services/documentos-adjuntos.service";
import Swal from "sweetalert2";
import {FabricaCreditoService} from "../../../../../../core/services/fabrica-credito.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-grid-documentacion',
  templateUrl: './grid-documentacion.component.html',
  styleUrls: ['./grid-documentacion.component.scss']
})
export class GridDocumentacionComponent implements OnInit, OnDestroy {
  public documentos$: Observable<any>;
  public unsubscribe$: Subject<any> = new Subject();
  public datosDocumentos: any = {};
  constructor(
      private route: ActivatedRoute,
      private documentosServices: DocumentosAdjuntosService,
      private fabricaCreditoService: FabricaCreditoService
  ) {
      this.escuchaObservable();
  }

  ngOnInit(): void {
  }

  public escuchaObservable(): void {
      this.fabricaCreditoService.seleccionDatos.pipe(takeUntil(this.unsubscribe$))
          .subscribe(({data}) => {
          if (data) {
              this.getDocumentos(data);
              this.datosDocumentos = data;
          }
      });
  }

  public onDescargar(item: any): void {
      this.getDocumento(item);
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
                  numeroSolicitud: this.datosDocumentos.numeroSolicitud,
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
                      this.getDocumentos(this.datosDocumentos);
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

  private getDocumento(datos: any): void {
      Swal.fire({ title: 'Cargando', html: 'Descargando...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
      const numeroSolicitud: string =  this.route.snapshot.paramMap.get('num');
      const datosDescargar = {
          numeroSolicitud: numeroSolicitud,
          idAdjunto: datos.idArchicoCargado,
      };
      this.documentosServices.getDocumento(datosDescargar).subscribe(res => {
          console.log(res.data);
          Swal.close();
          const archivo = res.data.base64.split(',')[1];
          console.log(archivo);
          const downloadLink = document.createElement('a');
          document.body.appendChild(downloadLink);
          downloadLink.href = archivo;
          downloadLink.target = '_self';
          downloadLink.download = res.data.nombreArchivo;
          downloadLink.click();
          /*const link: any = document.createElement('a');
          document.body.appendChild(link);
          link.target = res.data.base64;
          debugger;
          link.download = `${res.data.nombreArchivo}_${datosDescargar.numeroSolicitud}.pdf`;
          link.click();*/
      });
  }

    ngOnDestroy(): void {
      this.unsubscribe$.unsubscribe();
    }

}

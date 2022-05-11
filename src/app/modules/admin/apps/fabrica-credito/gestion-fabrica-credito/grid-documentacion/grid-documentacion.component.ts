import {Component, ElementRef, Inject, Input, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {DocumentosAdjuntosService} from "../../../../../../core/services/documentos-adjuntos.service";
import Swal from "sweetalert2";
import {FabricaCreditoService} from "../../../../../../core/services/fabrica-credito.service";
import {takeUntil} from "rxjs/operators";
import {MatCheckbox, MatCheckboxChange} from "@angular/material/checkbox";
import {MatDialog} from "@angular/material/dialog";
import {FormDialogCompararDocumentosComponent} from "../form-dialog-comparar-documentos/form-dialog-comparar-documentos.component";
import {FormControl} from "@angular/forms";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-grid-documentacion',
  templateUrl: './grid-documentacion.component.html',
  styleUrls: ['./grid-documentacion.component.scss']
})
export class GridDocumentacionComponent implements OnInit, OnDestroy {
  public documentos$: Observable<any>;
  public unsubscribe$: Subject<any> = new Subject();
  public datosDocumentos: any = {};
  public archivoIzquierda: any = {};
  public archivoDerecha: any = {};
  public longitudArchivos: number = 0;
  public documentos: any [] = [];
  public documentoComparado: FormControl = new FormControl('seleccione');
  public numeroSolicitud: string;
  public habilitarComparar: boolean = false;
  // @ViewChildren('checkboxes') checkbox: QueryList<ElementRef>;
  constructor(
      private route: ActivatedRoute,
      private documentosServices: DocumentosAdjuntosService,
      private fabricaCreditoService: FabricaCreditoService,
      private _dialog: MatDialog
  ) {
      this.escuchaObservable();
      this.numeroSolicitud = this.route.snapshot.paramMap.get('num');
  }
  ngOnInit(): void {
  }
  /**
  * @description: Escucha el observable
  * */
  public escuchaObservable(): void {
      this.fabricaCreditoService.seleccionDatos.pipe(takeUntil(this.unsubscribe$))
          .subscribe(({data}) => {
          if (data) {
              this.getDocumentos(data);
              this.datosDocumentos = data;
          }
      });
  }
  /**
   * @description: Metodo para descargar documentos
   */
  public onDescargar(item: any): void {
      this.getDocumento(item);
  }
  /**
   * @description: Seleccion de check
   */
  public onSeleccionDocumento(event: MatCheckbox, item: any): void {
      if (event.checked) {
          this.documentos.map((x) =>{
              if (x.idArchivoCargado === item.idArchivoCargado){
                  x.selected = event.checked;
              }
              return x;
          });
          const datos: any = {
              numeroSolicitud: this.numeroSolicitud,
              idAdjunto: item.idArchivoCargado
          };
          this.seleccionDocumentoIzquierdo(datos);
      }else {
          this.longitudArchivos = 0;
          this.documentos.map((x) =>{
              if (x.idArchivoCargado === item.idArchivoCargado){
                  x.selected = event.checked;
              }
              return x;
          });
      }
  }

  public onSeleccionadoComparar(event: MatSelectChange): void {
      const datos: any = {
          numeroSolicitud: this.numeroSolicitud,
          idAdjunto: event.value
      };
      this.seleccionDocumentoDerecho(datos);
  }
  /**
   * @description: Elimina documento adjunto
   */
  public onEliminarDocumento(item: any): void {
      const datos: any = {
          numeroSolicitud: Number(this.numeroSolicitud),
          idArchivoCargado: Number(item.idArchivoCargado)
      };
      this.eliminarDocumentos(datos);
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
      this.documentosServices.getDocumentos(datos).subscribe((res) => {
          this.documentos = res.data;
          this.documentos.map((x) => {
              x['selected'] = false;
              return x;
          });
      });
  }

  private guardarAdjunto(datos: any): void {
      this.documentosServices.adjuntarDocumento(datos).subscribe((data: any) => {
          if (data.status === 200) {
              Swal.fire(
                  '¡Información!',
                  'Se guardo el registro con éxito',
                  'success'
              ).then((resultado) => {
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

  public onDialogComparar(): void {
      const datosComparar: any = {
          izquierda: this.archivoIzquierda,
          derecha: this.archivoDerecha
      };
      const dialogRef = this._dialog.open(FormDialogCompararDocumentosComponent, {
          minWidth: '100%',
          minHeight: '100vh',
          disableClose: true,
          data: datosComparar,
          panelClass: 'my-full-screen-dialog'
        });
      dialogRef.afterClosed().toPromise();
  }

  private getDocumento(datos: any): void {
      Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
      const datosDescargar = {
          numeroSolicitud: this.numeroSolicitud,
          idAdjunto: datos.idArchivoCargado,
      };
      this.documentosServices.getDocumento(datosDescargar).subscribe((res) => {
          const archivo = res.data.base64.split(',')[1];
          const extension = res.data.nombreArchivo.split('.')[1];
          // console.log(extension);
          const link = document.createElement('a');
          document.body.appendChild(link);
          link.href = `data:application/${extension};base64,${archivo}`;
          link.target = '_self';
          link.download = res.data.nombreArchivo;
          link.click();
          Swal.close();
      });
  }

  private seleccionDocumentoIzquierdo(datos: any): void {
      Swal.fire({ title: 'Cargando', html: 'Descargando...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
      this.documentosServices.getDocumento(datos).subscribe((res) => {
          if (res) {
              const archivo = res.data.base64.split(',')[1];
              const extension = res.data.nombreArchivo.split('.')[1];
              this.archivoIzquierda = {
                  // base64: `${archivo}`,
                  extension: extension,
                  base64: extension === 'pdf'? `data:application/${extension};base64,${archivo}` : `data:image/${extension};base64,${archivo}`,
                  nombreArchivo: res.data.nombreArchivo,
              };
              this.longitudArchivos = Object.keys(this.archivoIzquierda).length;
             // console.log(this.longitudArchivos);
          }
          // console.log(this.archivoIzquierda);
          Swal.close();
      });

  }
  private seleccionDocumentoDerecho(datos: any): void {
      Swal.fire({ title: 'Cargando', html: 'Descargando...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
      this.documentosServices.getDocumento(datos).subscribe((res) => {
          if (res) {
              this.habilitarComparar = true;
              const archivo = res.data.base64.split(',')[1];
              const extension = res.data.nombreArchivo.split('.')[1];
              this.archivoDerecha = {
                  // base64: `${archivo}`,
                  extension: extension,
                  base64: extension === 'pdf'? `data:application/${extension};base64,${archivo}` : `data:image/${extension};base64,${archivo}`,
                  nombreArchivo: res.data.nombreArchivo,
              };
          }
          Swal.close();
      });
  }

  private eliminarDocumentos(datos: any): void {
      Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
      this.documentosServices.eliminaDocumento(datos).subscribe((data: any) => {
          if (data.status === 200) {
              Swal.fire(
                  '¡Información!',
                  'Se eliminó el registro con éxito',
                  'success'
              ).then((resultado) => {
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

    ngOnDestroy(): void {
      this.unsubscribe$.unsubscribe();
    }

}

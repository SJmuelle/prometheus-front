import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {DocumentosAdjuntosService} from "../../../../../../core/services/documentos-adjuntos.service";
import Swal from "sweetalert2";
import {FabricaCreditoService} from "../../../../../../core/services/fabrica-credito.service";
import {takeUntil} from "rxjs/operators";
import {MatCheckbox, MatCheckboxChange} from "@angular/material/checkbox";
import {MatDialog} from "@angular/material/dialog";
import {FormDialogReferenciasComponent} from "../form-dialog-referencias/form-dialog-referencias.component";
import {FormDialogCompararDocumentosComponent} from "../form-dialog-comparar-documentos/form-dialog-comparar-documentos.component";

@Component({
  selector: 'app-grid-documentacion',
  templateUrl: './grid-documentacion.component.html',
  styleUrls: ['./grid-documentacion.component.scss']
})
export class GridDocumentacionComponent implements OnInit, OnDestroy {
  public documentos$: Observable<any>;
  public unsubscribe$: Subject<any> = new Subject();
  public datosDocumentos: any = {};
  public archivos: any = [];
  constructor(
      private route: ActivatedRoute,
      private documentosServices: DocumentosAdjuntosService,
      private fabricaCreditoService: FabricaCreditoService,
      private _dialog: MatDialog
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
      const numeroSolicitud: string =  this.route.snapshot.paramMap.get('num');
      if (event.checked) {
          const datos: any = {
              numeroSolicitud: numeroSolicitud,
              idAdjunto: item.idArchicoCargado
          };
          this.compararDocumentos(datos);
      }

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

  public onDialogComparar(): void {
      const dialogRef = this._dialog.open(FormDialogCompararDocumentosComponent, {
          minWidth: '680px',
          minHeight: '420px',
          disableClose: true,
          data: this.archivos
        });
      dialogRef.afterClosed().toPromise();
  }

  private getDocumento(datos: any): void {
      Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
      const numeroSolicitud: string =  this.route.snapshot.paramMap.get('num');
      const datosDescargar = {
          numeroSolicitud: numeroSolicitud,
          idAdjunto: datos.idArchicoCargado,
      };
      this.documentosServices.getDocumento(datosDescargar).subscribe((res) => {
          const archivo = res.data.base64.split(',')[1];
          const extension = res.data.nombreArchivo.split('.')[1];
          console.log(extension);
          const link = document.createElement('a');
          document.body.appendChild(link);
          link.href = `data:application/${extension};base64,${archivo}`;
          link.target = '_self';
          link.download = res.data.nombreArchivo;
          link.click();
          Swal.close();
      });
  }

  private compararDocumentos(datos: any): void {
      Swal.fire({ title: 'Cargando', html: 'Descargando...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
      this.documentosServices.getDocumento(datos).subscribe((res) => {
          if (res) {
              this.archivos.push(res.data);
          }
          console.log(this.archivos);
          Swal.close();
      });
  }

    ngOnDestroy(): void {
      this.unsubscribe$.unsubscribe();
    }

}

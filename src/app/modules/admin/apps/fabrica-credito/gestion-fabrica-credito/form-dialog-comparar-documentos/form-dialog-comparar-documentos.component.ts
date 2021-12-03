import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-form-dialog-comparar-documentos',
  templateUrl: './form-dialog-comparar-documentos.component.html',
  styleUrls: ['./form-dialog-comparar-documentos.component.scss']
})
export class FormDialogCompararDocumentosComponent implements OnInit, AfterViewInit {
  @ViewChild('pdfIzquierdo') pdfIzquierdo: ElementRef;
  @ViewChild('pdfDerecho') pdfDerecho: ElementRef;
  constructor(
      private _matDialog: MatDialogRef<FormDialogCompararDocumentosComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
      // console.log(this.data);
      // console.log(this.pdfViewerOnDemand)
      // console.log(this.pdfViewerAutoLoad)
  }

    ngAfterViewInit(): void {
        console.log(this.data);
        console.log(this.data.base64);
        console.log(this.pdfDerecho)


        // this.pdfViewerOnDemand.nativeElement.baseHref = this.data.izquierda.base64;
        // this.pdfViewerAutoLoad.nativeElement.baseHref =  this.data.derecha.base64;
    }

}

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-form-dialog-comparar-documentos',
  templateUrl: './form-dialog-comparar-documentos.component.html',
  styleUrls: ['./form-dialog-comparar-documentos.component.scss']
})
export class FormDialogCompararDocumentosComponent implements OnInit {

  constructor(
      private _matDialog: MatDialogRef<FormDialogCompararDocumentosComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
      console.log(this.data);
  }

}

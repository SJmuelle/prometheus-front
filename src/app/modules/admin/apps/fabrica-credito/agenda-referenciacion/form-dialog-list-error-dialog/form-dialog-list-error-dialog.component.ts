import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-dialog-list-error-dialog',
  templateUrl: './form-dialog-list-error-dialog.component.html',
  styleUrls: ['./form-dialog-list-error-dialog.component.scss']
})
export class FormDialogListErrorDialogComponent implements OnInit {

  tipoD=0
  tipoT=0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
  
    this.data.forEach(element => {
      if(element.tipo=='D'){
        this.tipoD++;
      }else{
        this.tipoT++;
      }
    });
  }

}

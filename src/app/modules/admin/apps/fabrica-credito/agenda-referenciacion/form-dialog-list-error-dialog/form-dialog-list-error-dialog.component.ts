import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-dialog-list-error-dialog',
  templateUrl: './form-dialog-list-error-dialog.component.html',
  styleUrls: ['./form-dialog-list-error-dialog.component.scss']
})
export class FormDialogListErrorDialogComponent implements OnInit {



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
    console.log(this.data)
  }

}

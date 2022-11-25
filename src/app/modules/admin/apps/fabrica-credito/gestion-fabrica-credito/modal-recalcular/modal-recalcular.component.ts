import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-recalcular',
  templateUrl: './modal-recalcular.component.html',
  styleUrls: ['./modal-recalcular.component.scss']
})
export class ModalRecalcularComponent implements OnInit {

  unidadNegocio=30;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<ModalRecalcularComponent>,
    private _dialog: MatDialog

  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  decision() {
    this.matDialogRef.close(true);
  }

}

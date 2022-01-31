import {Component, Inject, OnInit,} from '@angular/core';
import moment from "moment";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-form-dialog-reprogramar',
  templateUrl: './form-dialog-reprogramar.component.html',
  styleUrls: ['./form-dialog-reprogramar.component.scss']
})
export class FormDialogReprogramarComponent implements OnInit {
  public myDatePicker: FormControl = new FormControl('');
  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private _matDialog: MatDialogRef<FormDialogReprogramarComponent>
  ) { }

  ngOnInit(): void {
  }

  public onReprogramar(): void {
      const numeroSolicitud: string = this.data.numeroSolicitud;
      const data: any = {
          numeroSolicitud,
          fechaReprogramacion: this.myDatePicker.value
      };
      console.log(data);
  }

  public onCerrar(): void {
      this._matDialog.close();
  }

}

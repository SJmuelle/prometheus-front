import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-infofile',
  templateUrl: './infofile.component.html',
  styleUrls: ['./infofile.component.scss']
})
export class InfofileComponent implements OnInit {

  constructor(private dialog: MatDialogRef<InfofileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  public oncCerrarDialog(): void {
    this.dialog.close();
  }

  ngAfterViewInit(): void {

  }

}

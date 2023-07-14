import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tabla-evidente',
  templateUrl: './tabla-evidente.component.html',
  styleUrls: ['./tabla-evidente.component.scss']
})
export class TablaEvidenteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

}

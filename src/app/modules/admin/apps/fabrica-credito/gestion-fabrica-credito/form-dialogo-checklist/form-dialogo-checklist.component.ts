import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';

@Component({
  selector: 'app-form-dialogo-checklist',
  templateUrl: './form-dialogo-checklist.component.html',
  styleUrls: ['./form-dialogo-checklist.component.scss']
})
export class FormDialogoChecklistComponent implements OnInit {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  constructor(
    private fabricaCreditoService: FabricaCreditoService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    // this.consulta()
  }


  consulta() {
    this.fabricaCreditoService.getCheckList(this.data)
      .subscribe(({ data }) => {
        if (data) {

        }
      });
  }


}

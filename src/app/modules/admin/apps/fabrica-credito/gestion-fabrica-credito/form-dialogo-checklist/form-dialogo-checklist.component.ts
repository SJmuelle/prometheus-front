import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';

@Component({
  selector: 'app-form-dialogo-checklist',
  templateUrl: './form-dialogo-checklist.component.html',
  styleUrls: ['./form-dialogo-checklist.component.scss']
})
export class FormDialogoChecklistComponent implements OnInit {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  listado: any[]=[];
  form = this.formBuilder.group({
    selectedTech: ''
  });
  constructor(
    private fabricaCreditoService: FabricaCreditoService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.consulta()
  }

  ngOnInit(): void {
    console.log(this.data)
  }


  consulta() {
    this.fabricaCreditoService.getCheckList(this.data)
      .subscribe(({ data }) => {
        if (data) {
          console.log(data)
          this.listado=data;

          for (let index = 0; index < this.listado.length; index++) {
            if(this.listado[index].seleccionado=='f'){
              this.form.controls.selectedTech.setValue(this.listado[index].idItem)
            }
          }
        }
      });
  }



  onListSelectionChange(ob: any) {
    console.log("Selected Item: " + ob.source.selectedOptions.selected.length);
 }


}

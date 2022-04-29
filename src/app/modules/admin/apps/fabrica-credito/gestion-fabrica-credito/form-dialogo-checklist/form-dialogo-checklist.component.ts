import { Component, OnInit } from '@angular/core';
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
  ) { } 

  ngOnInit(): void {
    this.consulta()
  }


  consulta(){
     this.fabricaCreditoService.getCheckList('data')
            .subscribe(({ data }) => {
                if (data) {
                  
                }
        });
  }


}

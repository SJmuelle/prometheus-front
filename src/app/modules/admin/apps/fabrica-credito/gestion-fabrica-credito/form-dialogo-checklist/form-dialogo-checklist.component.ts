import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { UtilityService } from 'app/resources/services/utility.service';
import Swal from 'sweetalert2';

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
    private _utility: UtilityService,
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
          let selecionado=[]; 
          for (let index = 0; index < this.listado.length; index++) {
            if(this.listado[index].seleccionado!='f'){
              selecionado.push(this.listado[index].idItem)
            }
          }
          this.form.controls.selectedTech.setValue(selecionado)
        }
      });
  }



  guardar(item) {
    let data, url;
  
      url = 'registro-chequeo-credito';
      data = {
        v_numeroSolicitud:this.data.numeroSolicitud,
        v_nombre:this.data.numeroSolicitud,
        i_idItem:this.data.numeroSolicitud,
        b_valorItem:this.data.numeroSolicitud,
        v_user:this.data.numeroSolicitud
      };
   
    Swal.fire({
      title: 'Cargando',
      html: 'Guardando...',
      timer: 500000,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => { });
    this._utility.postQuery(url, data).subscribe((response: any) => {
      Swal.close();
      if (response) {
        if (response.status == 200) {
          if (!response.data.respuesta.includes('OK')) {
            Swal.fire(
              'Información',
              response.data.respuesta,
              'error'
            );
            return;
          }
          Swal.fire(
            '¡Información!',
            `Se guardó el registro con éxito`,
            'success'
          ).then((resultado) => {
            if (resultado) {
            }
          });
        } else {
          Swal.fire(
            '¡Información!',
            `Hubo un error en los datos enviados, favor evaluar`,
            'success'
          );
        }
      } else {
        Swal.fire(
          '¡Advertencia!',
          'Para este tipo de búsqueda, mínimo es necesario la cédula del cliente',
          'error'
        );
      }
    });
  }


}

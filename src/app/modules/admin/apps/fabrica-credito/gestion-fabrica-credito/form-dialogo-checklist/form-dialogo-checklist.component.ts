import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { UtilityService } from 'app/resources/services/utility.service';
import Swal from 'sweetalert2';
import { FormDialogDecisionComponent } from '../form-dialog-decision/form-dialog-decision.component';
import moment from "moment";
import 'moment/locale/es';
@Component({
  selector: 'app-form-dialogo-checklist',
  templateUrl: './form-dialogo-checklist.component.html',
  styleUrls: ['./form-dialogo-checklist.component.scss']
})
export class FormDialogoChecklistComponent implements OnInit {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  listado: any[] = [];
  form = this.formBuilder.group({
    selectedTech: ''
  });
  total: number = 0;
  constructor(
    public matDialogRef: MatDialogRef<FormDialogoChecklistComponent>,
    private fabricaCreditoService: FabricaCreditoService,
    private formBuilder: FormBuilder,
    private _utility: UtilityService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialog: MatDialog
  ) {
    this.consulta()
  }

  ngOnInit(): void {
    console.log(this.data)
  }
  decision() {
    this.matDialogRef.close();
  }

  consulta() {
    this.total = 0;
    let data = {
      "numeroSolicitud": Number(this.data.numeroSolicitud),
      "unidadNegocio": this.data.unidadNegocio,
      "idAgenda": this.data.agenda,
      "tipoIdentificacion": this.data.tipoDocumento
    }
    this.fabricaCreditoService.getCheckList(data)
      .subscribe(({ data }) => {
        if (data) {
          console.log(data)
          this.listado = data;
          let selecionado = [];
          for (let index = 0; index < this.listado.length; index++) {
            if (this.listado[index].seleccionado != 'f') {
              this.total++;
            }
          }
          if (this.listado.length == 0) {
            this.SiguienteEtapa();
          }

        } else {
          this.SiguienteEtapa();
        }
      });
  }

  SiguienteEtapa() {
    if(this.data.tipo=='D'){
      this.decision()
    }
    this.matDialogRef.close();
    let dialogRef = this._dialog.open(FormDialogDecisionComponent, {
      minWidth: '50%',
      minHeight: '50%',
      data: {
        numeroSolicitud: this.data.numeroSolicitud,
        etapa: 1,
        idAgenda: this.data.agenda,
      },
      disableClose: false,
    });
    dialogRef.afterClosed().toPromise().then(() => {
    });
  }


  guardar(item) {
    let data, url;
    url = '/registro-chequeo-credito';
    data = {
      numeroSolicitud: this.data.numeroSolicitud,
      nombre: item.nombre,
      idItem: parseInt(item.idItem),
      valorItem: item.seleccionado == 'f' ? true : false
    };


    this._utility.postQuery(url, data).subscribe((response: any) => {
    
      if (response) {
        if (response.status == 200) {
          if (!response.data.resultado.includes('OK')) {
            Swal.fire(
              'Información',
              response.data.resultado,
              'error'
            ).then((result) => {
              if (result) {
                this.consulta();
              }
            });;

            return;
          }
          this.consulta();
        } else {
          Swal.fire(
            '¡Información!',
            `Hubo un error en los datos enviados, favor evaluar`,
            'success'
          ).then((result) => {
            if (result) {
              this.consulta();
            }
          });;
        }
      } else {
        Swal.fire(
          '¡Advertencia!',
          'Algo fallo',
          'error'
        ).then((result) => {
          if (result) {
            this.consulta();
          }
        });;
      }
    });
  }


}

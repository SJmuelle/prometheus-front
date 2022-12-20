import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { PqrService } from '../../pqr.service';
import Swal from 'sweetalert2';
import moment from 'moment';

@Component({
  selector: 'app-rango',
  templateUrl: './rango.component.html',
  styleUrls: ['./rango.component.scss']
})
export class RangoComponent implements OnInit {

  rangeForm: FormGroup;
  idenForm: FormGroup;
  negForm: FormGroup;
  estadoForm: FormGroup;
  listEstado: any=[];
  details: any=[];

  constructor(private fb: FormBuilder, private _pqrService: PqrService, public dialogRef: MatDialogRef<RangoComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.rangeForm = this.fb.group({
        minimo: ['', [Validators.required]],
        maximo: ['', [Validators.required]]
      }),
      this.idenForm = this.fb.group({
        identificacion: ['', [Validators.required]]
      }),
      this.negForm = this.fb.group({
        negocio: ['', [Validators.required]]
      }),
      this.estadoForm = this.fb.group({
        estado: ['', [Validators.required]]
      })
    }

  ngOnInit(): void {
    this.consultarEstado()
  }

  enviaRango(): void {
    if (this.rangeForm.value.minimo!='') {
      let data = {
        "fechaInicial": moment(this.rangeForm.value.minimo).format("YYYY-MM-DD")
      }
      this.details.push(data)
    }

    if (this.rangeForm.value.maximo!='') {
      let data = {
        "fechaFinal": moment(this.rangeForm.value.maximo).format("YYYY-MM-DD")
      }
      this.details.push(data)
    }

    if (this.idenForm.value.identificacion!='') {
      let data = {
        "identificacion": this.idenForm.value.identificacion
      }
      this.details.push(data)
    }

    if (this.negForm.value.negocio!='') {
      let data = {
        "negocio": this.negForm.value.negocio
      }
      this.details.push(data)
    }

    if (this.estadoForm.value.estado!='') {
      let data = {
        "estado": this.estadoForm.value.estado
      }
      this.details.push(data)
    }
    this.dialogRef.close(this.details);
  }

  consultarEstado(){
    if (this.listEstado.length==0) {
      Swal.fire({ title: 'Cargando', html: 'Buscando estados de PQRS', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
      this._pqrService.getListados('consulta-estados-pqrs').subscribe((response: any) => {
        Swal.close();
        if (response) {
          this.listEstado = response;
        } else {
          this.listEstado = [];
        }
      }); 
    }
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PqrService } from '../../pqr.service';

@Component({
  selector: 'app-agregar-comentario',
  templateUrl: './agregar-comentario.component.html',
  styleUrls: ['./agregar-comentario.component.scss']
})
export class AgregarComentarioComponent implements OnInit {

  form:FormGroup;
  public contador = 0;
  comentario={
    id_pqrs:"",
    descripcion:"",
    estado:""
  }

  get frm() {
          return this.form.controls;
  }

  constructor(private fb: FormBuilder, private _pqrService: PqrService,  
    public dialogRef: MatDialogRef<AgregarComentarioComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    this.form = this.fb.group({
      descripcion: ['', [Validators.required, Validators.maxLength(500), Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
  }

  contarCaracteres(event){
    this.contador = event.target.value.length
  }

  guardar(){
    let url = '/guardar-comentario-seguimiento';
    const { descripcion } = this.form.getRawValue();
    this.comentario={
      id_pqrs:this.data.id,
      descripcion: descripcion,
      estado:this.data.estado
    }
    this._pqrService.CreateComentario(url, this.comentario).subscribe((response:any)=>{
      Swal.fire(
        '¡Exito!',
        `Comentario guardado exitosamente.`,
        'success'
      ).then();

    })
  }

}

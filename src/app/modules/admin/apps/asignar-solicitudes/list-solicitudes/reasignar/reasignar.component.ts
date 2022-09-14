import { Component, Inject, OnInit } from '@angular/core';
import { AsignarSolicitudesService } from 'app/core/services/asignar-solicitudes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reasignar',
  templateUrl: './reasignar.component.html',
  styleUrls: ['./reasignar.component.scss']
})
export class ReasignarComponent implements OnInit {

  reasignarForm: FormGroup;
  asesores: any[] = [];

  constructor(public asigService: AsignarSolicitudesService, private fb: FormBuilder, public dialogRef: MatDialogRef<ReasignarComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.reasignarForm = this.fb.group({
        analista: ['', [Validators.required]]
      });
    }

    ngOnInit() {
      this.consultarAsesores()
    }
  
    consultarAsesores(){
      this.asigService.getAsesores().subscribe((res: any) => {
        if (res) {
          this.asesores = res.data;
        }else{
          this.asesores = [];
        }
      })
    }

}

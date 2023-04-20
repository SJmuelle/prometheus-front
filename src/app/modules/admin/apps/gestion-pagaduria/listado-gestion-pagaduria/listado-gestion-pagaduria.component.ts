import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComentariosService } from 'app/core/services/comentarios.service';
import { DecisionService } from 'app/core/services/decision.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';



@Component({
    selector: 'app-listado-gestion-pagaduria',
    templateUrl: './listado-gestion-pagaduria.component.html',
    styleUrls: ['./listado-gestion-pagaduria.component.scss']
})

export class ListadoGestionPagaduriaComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {

    }

}

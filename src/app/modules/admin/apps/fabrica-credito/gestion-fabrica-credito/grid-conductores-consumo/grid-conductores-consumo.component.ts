import { FormDetallesConductoresComponent } from '../form-detalles-conductores/form-detalles-conductores.component';
import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DepartamentosCiudadesService } from "../../../../../../core/services/departamentos-ciudades.service";
import { Observable, Subscription } from "rxjs";
import { MatSelectChange } from "@angular/material/select";
import { GenericasService } from "../../../../../../core/services/genericas.service";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { ConductoresService } from 'app/core/services/conductores.service';



@Component({
  selector: 'app-grid-conductores-consumo',
  templateUrl: './grid-conductores-consumo.component.html',
  styleUrls: ['./grid-conductores-consumo.component.scss']
})
export class GridConductoresConsumoComponent implements OnInit, OnDestroy, AfterViewInit {
  public Conductores$: Observable<any>;
  public esVer: boolean = false;
  @Input() datos: any;
  constructor(
      private route: ActivatedRoute,
      private conductoresService: ConductoresService,
      private _dialog: MatDialog
  ) {


  }

  ngOnInit(): void {
      this.cargarConductores();
  }

  public onDialogConductores(): void {
      const numeroSolicitud: string =  this.route.snapshot.paramMap.get('num');
      const dialogRef = this._dialog.open(FormDetallesConductoresComponent, {
          data: {numeroSolicitud: Number(numeroSolicitud), tipo:"N"},
          minWidth: '480px',
          minHeight: '460px',
          disableClose: true,
      });
      dialogRef.afterClosed().subscribe(result => {
        this.cargarConductores();
      });
  }


  public onCerrarFormularioDetalle(event: boolean) {
      this.esVer = event;
  }
  
  /**
   * @description: carga las Conductoress desde el inicio
   */
  public cargarConductores(): void {
      const codigo: string = this.route.snapshot.paramMap.get('num');
      if (codigo) {
          this.getConductores(codigo);
      }
  }

  public onGetConductores(datos: any): void {
     let data={...datos, tipo:"V"}
      this.esVer = true;
      const dialogRef = this._dialog.open(FormDetallesConductoresComponent, {
          minWidth: '480px',
          minHeight: '460px',
          disableClose: true,
          data: data
      });
      dialogRef.afterClosed().subscribe(result => {
        this.cargarConductores();
      });

  }

  /**
   * @description: Obtiene las Conductoress
   */
  private getConductores(codigo: string): void {
      this.Conductores$ = this.conductoresService.getConductores(codigo);
  }

    ngOnDestroy(): void {
      this.esVer = false;
    }

    ngAfterViewInit(): void {
        if (this.datos) {
            if (Object.keys(this.datos).length) {
                this.getConductores(this.datos.numeroSolicitud);
            }
        }
    }


}

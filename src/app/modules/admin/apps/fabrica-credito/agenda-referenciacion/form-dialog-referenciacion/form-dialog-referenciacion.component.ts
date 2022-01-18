import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ReferenciasService} from "../../../../../../core/services/referencias.service";
import {DirectionsComponent} from "../../../../../../shared/modal/directions/directions.component";
import {Observable} from "rxjs";
import {GenericasService} from "../../../../../../core/services/genericas.service";

@Component({
  selector: 'app-form-dialog-referenciacion',
  templateUrl: './form-dialog-referenciacion.component.html',
  styleUrls: ['./form-dialog-referenciacion.component.scss']
})
export class FormDialogReferenciacionComponent implements OnInit {
  public form: FormGroup;
  public estadoReferencia$: Observable<any>;
  constructor(
      private fb: FormBuilder,
      private _dialog: MatDialogRef<FormDialogReferenciacionComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private matDialog: MatDialog,
      private referenciasService: ReferenciasService,
      private genericaService: GenericasService,
  ) {
      this.crearFormulario();
      const numeroSolicitud: string = data.numeroSolicitud;
      this.form.controls.numeroSolicitud.setValue(numeroSolicitud);
      this.form.controls.tipo.setValue(data.tipoDocumento);
      console.log(data);
      console.log(this.form.getRawValue())
  }

  ngOnInit(): void {
      this.getEstadosReferencias();
  }

    public onCerrar(): void {
        this._dialog.close();
    }

    public openModalDirection(): void {
        const dialogRef = this.matDialog.open(DirectionsComponent, {
            // width: '250px',
            width: '60%',
            data: {
                departamento: '',
                municipio: '',
                barrio: '',
                direccion: '',
            },
            disableClose: false
        });

        dialogRef.afterClosed().subscribe((res) => {
            // this.formTab1.controls['direccionNegocio'].setValue(res);
            let dataModal = res;
            console.log(dataModal)

            if (dataModal.departamentoNombre != undefined) {
                this.form.controls.codigoDepartamento.setValue(dataModal.departamento);
                this.form.controls.departamentoNombre.setValue(dataModal.departamentoNombre);
                this.form.controls.codigoCiudad.setValue(dataModal.municipio);
                this.form.controls.ciudadNombre.setValue(dataModal.municipioNombre);
                this.form.controls.codigoBarrio.setValue(parseInt(dataModal.codigoBarrio));
                this.form.controls.nombreBarrio.setValue(dataModal.barrio);
                this.form.controls.direccion.setValue(
                    (dataModal.viaNombre == undefined
                        ? ''
                        : `${dataModal.viaNombre}`) +
                    (dataModal.callePrincipal == undefined
                        ? ''
                        : ` ${dataModal.callePrincipal}`) +
                    (dataModal.numero == undefined
                        ? ''
                        : ` # ${dataModal.numero}`) +
                    (dataModal.numero2 == undefined
                        ? ''
                        : ` - ${dataModal.numero2}`) +
                    (dataModal.complemento == undefined
                        ? ''
                        : ` ${dataModal.complemento}`));
            }
        });
    }

    private crearFormulario(): void {
        this.form = this.fb.group({
            numeroSolicitud:    [''],
            primerNombre:       ['', [Validators.required]],
            segundoNombre:      [''],
            primerApellido:     ['', [Validators.required]],
            segundoApellido:    [''],
            nombreCompleto:     [''],
            tipo:               [''],
            parentesco:         [''],
            telefono:           ['', [Validators.pattern(/^[0-9]*$/)]],
            celular:            ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
            codigoPais:         [''],
            codigoDepartamento: [''],
            departamentoNombre: [''],
            codigoCiudad:       [''],
            ciudadNombre:       [''],
            codigoBarrio:       [''],
            nombreBarrio:       [],
            direccion:          [''],
            antiguedad:         [''],
            estado:         [''],
        });
    }

    /**
     * @description: Valida que el campo solo sea numeros
     */
    public soloNumero(field: string) {
        return this.form.controls[field].hasError('pattern');
    }

    public campoRequerido(field: string) {
        return this.form.controls[field].errors && this.form.controls[field].touched;
    }

    private getEstadosReferencias(): void {
        this.estadoReferencia$ = this.genericaService.getEstadoReferencias();
    }


}

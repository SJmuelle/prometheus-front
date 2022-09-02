import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FabricaCreditoService } from 'app/core/services/fabrica-credito.service';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'LIBRANZA-NATURAL-LABORAL',
  templateUrl: './laboral.component.html',
  styleUrls: ['./laboral.component.scss']
})
export class LibranzaLaboralComponent implements OnInit, OnDestroy {
  public unSubscribe$: Subject<any> = new Subject<any>();
  public numeroSolicitud: string = this.route.snapshot.paramMap.get('num');
  public undadNegocio: string = this.route.snapshot.paramMap.get('unidadNegocio');
  public identificacion: string = this.route.snapshot.paramMap.get('id');
  public subscription$: Subscription;

  fabricaDatos: any;
  mensajeQuill: any;

  quillModules: any = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
    ],
  };
  @ViewChild('editor') editor;
  public form: FormGroup;

  constructor(
    private fabricaCreditoService: FabricaCreditoService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,


  ) {
    this.createFormulario();

  }

  ngOnInit() {
    this.getFabricaCreditoAgenda();
  }

  /**
 * {
  "numeroSolicitud":185376,
  "tipo":"T",
  "identificacion":"1110178226"
}
* @description: Obtiene la data para cargar al formulario
*/
  private getFabricaCreditoAgenda(): void {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    const datosSolicitud: any = {
      "numeroSolicitud": this.numeroSolicitud,
      "tipo": "L",
      "identificacion": this.identificacion
    };
    this.fabricaCreditoService.getDatosFabricaAgendaReferenciacion(datosSolicitud).pipe(takeUntil(this.unSubscribe$))
      .subscribe(({ data }) => {
        Swal.close();
        debugger;
        console.log(data);
        this.fabricaDatos = data
        this.form.controls['referenciaValidada_bool'].setValue(this.fabricaDatos.referenciaValidada == 'S' ? true : false)

      })
  }

  private createFormulario(): void {
    this.form = this.fb.group({
      referenciaValidada_bool: Boolean,
      telefonoContactoObservacion: ['', [Validators.required], Validators.minLength(30)],
    })
  }

  logChange($event) {
    console.log(this.editor);
    this.mensajeQuill = $event.text;
  }


  ngOnDestroy(): void {
    this.unSubscribe$.unsubscribe();
  }

  public onPostDatos(): void {
    const datos: any = this.form.getRawValue();
    let data = {
      numeroSolicitud: this.numeroSolicitud,
      unidadNegocio: this.fabricaDatos.unidadNegocio,
      idReferencia: this.fabricaDatos.idReferencia,
      tipoReferecia: 'L',
      recurso: 'guardar-rerefencia-laboral',
      referenciaValidada: datos.referenciaValidada_bool == true ? 'S' : 'N',
      comentario: datos.telefonoContactoObservacion
    }
    this.postFormularioFabrica(data);
  }


  /**
* @description: Guardado de datos fabrica
*/
  private postFormularioFabrica(datos: any): void {
    Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    this.subscription$ = this.fabricaCreditoService.postDatosFabricaCreditoReferenciacion(datos)
      .subscribe(() => {
        Swal.fire(
          'Completado',
          'Información guardada con éxito',
          'success'
        ).then((result) => {
          if (result) {
            this.router.navigate([`credit-factory/agenda-referencing/${this.undadNegocio}/${this.numeroSolicitud}/${this.identificacion}`]);
          }
        })
        setTimeout(() => {
          this.router.navigate([`credit-factory/agenda-referencing/${this.undadNegocio}/${this.numeroSolicitud}/${this.identificacion}`]);
        }, 1000);
      }, (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          text: error.error.msg,
        });
      });
  }
}

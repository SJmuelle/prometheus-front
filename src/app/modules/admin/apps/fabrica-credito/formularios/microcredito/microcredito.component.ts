import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormularioCreditoService } from 'app/core/services/formulario-credito.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-microcredito',
  templateUrl: './microcredito.component.html',
  styleUrls: ['./microcredito.component.scss']
})
export class MicrocreditoComponent implements OnInit, OnDestroy {
  form: FormGroup;
  dataInicial;
  listadoActividadEconomica: any[];
  listadoCiudades: any[];
  listadoBarrios: any[];
  editable=true;
  public unidadNegocio: string = this.route.snapshot.paramMap.get('unidadNegocio');
  public tipoIdentificacion: string = this.route.snapshot.paramMap.get('tipoIdentificacion');
  public identificacion: string = this.route.snapshot.paramMap.get('identificacion');
  public unSubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private fb: FormBuilder,
    private _formularioCreditoService: FormularioCreditoService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.cargueInicial();
    this.form = this.fb.group({
      tipoDocumento: ['', [Validators.required]],
      identificacion: ['', [Validators.required, Validators.pattern('^[0-9]{5,10}$')]],
      primerNombre: ['', [Validators.required, Validators.pattern('^[a-zA-zÀ-úA-Z \u00f1\u00d1]+$')]],
      primerApellido: ['', [Validators.required, Validators.pattern('^[a-zA-zÀ-úA-Z \u00f1\u00d1]+$')]],
      celular: ['', [Validators.required]],
      email: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      nivelEstudio: ['', [Validators.required]],
      estrato: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      tipoActividad: ['', [Validators.required]],
      camaraComercio: ['', [Validators.required]],
      tipoLocal: ['', [Validators.required]],
      actividadEconomica: ['', [Validators.required]],
      actividadEspecifica: ['', [Validators.required]],
      antiguedadActividad: ['', [Validators.required]],
      antiguedadNegocio: ['', [Validators.required]],
      departamentoNegocio: ['', [Validators.required]],
      ciudadNegocio: ['', [Validators.required]],
      barrioNegocio: ['', [Validators.required]],
      valorCredito: ['', [Validators.required]],
      plazoCredito: ['', [Validators.required]],
      codigoAsesor: ['', [Validators.required]],

    });

    this.form.get('nivelEstudio')?.valueChanges.subscribe((e: string) => {
      this.cargueActividadEconomica()
    });
    this.form.get('tipoActividad')?.valueChanges.subscribe((e: string) => {
      this.cargueActividadEconomica()
    });
    this.form.get('camaraComercio')?.valueChanges.subscribe((e: string) => {
      this.cargueActividadEconomica()
    });

    setTimeout(() => {
      if ((this.tipoIdentificacion) && (this.identificacion)) {
        
        this.form.controls.tipoDocumento.setValue(this.tipoIdentificacion);
        this.form.controls.identificacion.setValue(this.identificacion);
        this.solicitudesFormularioSimulaciones()
        this.editable=true;
      }
    }, 1000);



  }

  private cargueActividadEconomica() {
    const datos = this.form.getRawValue();
    const { nivelEstudio, tipoActividad, camaraComercio } = datos;
    if ((nivelEstudio) && (nivelEstudio != null) && (tipoActividad) && (tipoActividad != null) && (camaraComercio)&&(camaraComercio != null)) {
      this._formularioCreditoService.cargueActividadEconomica(nivelEstudio, tipoActividad, camaraComercio).subscribe((resp: any) => {
        if (resp) {
          this.listadoActividadEconomica = resp.data
        }
      })
    } else {
      this.listadoActividadEconomica = [];
    }
  }

  public listarBarrios(){
    const datos = this.form.getRawValue();
    const { ciudadNegocio } = datos;
    this._formularioCreditoService.listarBarriosMicro(ciudadNegocio).subscribe((resp: any) => {
      if (resp) {
        this.listadoBarrios = resp.data
      } else {
        this.listadoBarrios = []
      }
    })
  }

  public listarCiudades(){
    const datos = this.form.getRawValue();
    const { departamentoNegocio } = datos;
    this._formularioCreditoService.listarCiudadesMicro(departamentoNegocio).subscribe((resp: any) => {
      if (resp) {
        this.listadoCiudades = resp.data
      } else {
        this.listadoCiudades = []
      }
    })
  }

  public solicitudesFormularioSimulaciones() {
    const datos = this.form.getRawValue();
    const { tipoDocumento, identificacion, } = datos;
    if ((tipoDocumento) && (identificacion)) {

      this._formularioCreditoService.cargueSolicitudesFormularioSimulaciones(tipoDocumento, identificacion, this.unidadNegocio).subscribe((resp: any) => {
        if (resp) {
          this.form.patchValue(resp.data);
        }
      })
    } 
  }

  private cargueInicial() {
    let data = {
      entidad: "CONFIG-MICRO",
      unidadNegocio: 1
    };
    this._formularioCreditoService.cargueInicial(data).subscribe((resp: any) => {
      if (resp) {
        this.dataInicial = resp.data
      }
    })
  }


  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    let data = this.form.value;
    const { barrioNegocio, valorCredito } = data;
    delete data.barrioNegocio
    data.barrioNegocio = Number(barrioNegocio)
    delete data.valorCredito
    data.valorCredito = Number(valorCredito)
    data.autorizacionCentrales = 'S',
      data.terminosCondiciones = 'S',
      data.clausulaVeracidad = 'S',
      data.unidadNegocio = 1,
      data.tipoTercero = 'T',
      this._formularioCreditoService.postDatos(data).subscribe(() => {
        Swal.fire(
          'Completado',
          'Información guardada con éxito',
          'success'
        ).then((result) => {
          if (result) {
            this.form.reset();
          }
        })
        setTimeout(() => {
          this.form.reset();
        }, 2000);
      }, (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          text: error.error.msg,
        });
      });


  }


  ngOnDestroy(): void {
    this.unSubscribe$.unsubscribe();
    // this.agendaCompletacionService.resetSeleccionAgenda();
  }
}

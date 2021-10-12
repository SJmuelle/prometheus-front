import {Component, OnDestroy, OnInit} from '@angular/core';
import {FabricaCreditoService} from "../../../../../../core/services/fabrica-credito.service";
import {Subject} from "rxjs";
import {AgendaCompletacionService} from "../../../../../../core/services/agenda-completacion.service";
import {takeUntil} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-form-gestion-fabrica-credito',
  templateUrl: './form-gestion-fabrica-credito.component.html',
  styleUrls: ['./form-gestion-fabrica-credito.component.scss']
})
export class FormGestionFabricaCreditoComponent implements OnInit, OnDestroy {
  public unSubscribe$: Subject<any> = new Subject<any>();
  public form: FormGroup;
  constructor(
      private agendaCompletacionService: AgendaCompletacionService,
      private fabricaCreditoService: FabricaCreditoService,
      private route: ActivatedRoute,
      private fb: FormBuilder

  ) {
    const numeroSolicitud: string =  this.route.snapshot.queryParamMap.get('pnum');
    const identificacion: string =  this.route.snapshot.queryParamMap.get('pnumein');
    if (!numeroSolicitud) {
        return;
    }else {
        this.getFabricaCreditoAgenda(numeroSolicitud, identificacion);
    }
  }

  ngOnInit(): void {
      // this.getFabricaCreditoAgenda();
      this.createFormulario();

  }

 /* private getFabricaCreditoAgenda(): void {
      /!*const {selected, show} = this.agendaCompletacionService.seleccionAgenda.getValue();
      if (show) {
        this.fabricaCreditoService.getDatosFabricaAgenda(selected).subscribe(console.log);
      }*!/
      this.agendaCompletacionService.seleccionAgenda.pipe(takeUntil(this.unSubscribe$))
          .subscribe(({selected, show}) => {
          if (show) {
            console.log(selected);
          }
      });
  }*/

  private getFabricaCreditoAgenda(numeroSolicitud: string, identificacion: string): void {
      const datosSolicitud: any  = {
          numeroSolicitud: numeroSolicitud,
          identificacion: identificacion
      };
      this.fabricaCreditoService.getDatosFabricaAgenda(datosSolicitud).subscribe(({data}) => {
          console.log(data);
          // this.form.patchValue(data);
      });
  }

  private createFormulario(): void {
      this.form = this.fb.group({
          numero_solicitud:                    [''],
          tipo:                                [''],
          emision:                             [''],
          origen:                              [''],
          codigo_estado:                       [''],
          descripcion_estado:                  [''],
          codigo_sub_estado:                   [''],
          descripcion_subestado:               [''],
          cupo_total:                          [''],
          cupo_reservado:                      [''],
          cupo_disponible:                     [''],
          score:                               [''],
          descripcion_score:                   [''],
          nivel_endeudamiento:                 [''],
          tipo_documento:                      [''],
          identificacion:                      [''],
          nombre_completo:                     [''],
          primer_nombre:                       [''],
          segundo_nombre:                      [''],
          primer_apellido:                     [''],
          segundo_apellido:                    [''],
          telefono:                            [''],
          celular:                             [''],
          email:                               [''],
          genero:                              [''],
          descripcion_genero:                  [''],
          nacionalidad:                        [''],
          fecha_nacimiento:                    [''],
          codigo_departamento_nacimiento:      [''],
          descripcion_departamento_nacimiento: [''],
          codigo_ciudad_nacimiento:            [''],
          descripcion_ciudad_nacimiento:       [''],
          tipo_vivienda:                       [''],
          descripcion_tipo_vivienda:           [''],
          codigo_departamento:                 [''],
          descripcion_departamento:            [''],
          codigo_ciudad:                       [''],
          descripcion_ciudad:                  [''],
          codigo_barrio:                       [''],
          descripcion_barrio:                  [''],
          direccion_residencial:               [''],
          nivel_estudio:                       [''],
          descripcion_nivel_estudio:           [''],
          vive_en_negocio:                     [''],
          descripcion_vive_negocio:            [''],
          fecha_matricula:                     [''],
          compras_semanales:                   [''],
          antiguedad_compras_semanales:        [''],
          ventas_mensuales:                    [''],
          activos:                             [''],
          declarante:                          [''],
          descripcion_declarante:              [''],
          codigo_departamento_negocio:         [''],
          descripcion_departamento_negocio:    [''],
          codigo_ciudad_negocio:               [''],
          descripcion_ciudad_negocio:          [''],
          codigo_barrio_negocio:               [''],
          descripcion_barrio_negocio:          [''],
          direccion_negocio:                   [''],
          telefono_negocio:                    [''],
          antiguedad_negocio:                  [''],
          camara_comercio:                     [''],
          descripcion_camara_comercio:         [''],
          nit_negocio:                         [''],
      });
  }

  ngOnDestroy(): void {
      this.unSubscribe$.unsubscribe();
      this.agendaCompletacionService.resetSeleccionAgenda();
  }

}

import { Component, OnInit, Input } from '@angular/core';

export interface IinfoTitulo {
  titulo?: string
  subtitulo?: string,
  icon?: string
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  /**
   * Opcion para definir titulo, subtitulo e icono, la ruta del icono debe iniciar en la carpeta assets/.......
   */
  @Input() infoTitulo: IinfoTitulo = { titulo: 'Titulo modulo', subtitulo: 'Subtitulo del modulo', icon: 'assets/images/agendas/Asignacion.png' }


  constructor() { }

  ngOnInit(): void {
  }

}

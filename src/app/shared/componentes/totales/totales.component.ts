import { Component, OnInit,ChangeDetectorRef, Output,EventEmitter } from '@angular/core';
import {  Input} from '@angular/core';

@Component({
    selector: 'app-totales',
    templateUrl: './totales.component.html',
    styleUrls: ['./totales.component.scss']
})
export class TotalesComponent implements OnInit {


    private scrollSpeed: number = 280;
    private scrollGap: number = 50;
    mostrarTotales: boolean = true;
    blockNext: boolean = false;
    blockPrevios: boolean = true;
    @Input() totales: any[];
    @Input() dataTable: any[];
    @Output() dataFilter = new EventEmitter();

    constructor(private cd: ChangeDetectorRef) { }

    ngOnInit(): void {


    }

    ngAfterViewInit(): void {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        setTimeout(() => {
            this.checkScrollWidth()
        }, 1000);
    }


    nextTotalesSlider() {
        var slider: HTMLElement = document.getElementById("totalesScroll");
        const currentScroll = slider.scrollLeft

        const width = slider.offsetWidth
        const widthContainer = slider.scrollWidth
        const nextEventClose =  widthContainer <= (currentScroll + width + (this.scrollSpeed * 2) + this.scrollGap)

        const move = nextEventClose ? widthContainer : currentScroll + this.scrollSpeed

        slider.scroll({
            left: move,
            behavior: 'smooth'
        })

        if(this.blockPrevios) this.blockPrevios = false;
        this.limitNext(move)
    }

    previousTotalesSlider() {
        var slider: HTMLElement = document.getElementById("totalesScroll");
        const currentScroll = slider.scrollLeft

        const width = slider.offsetWidth
        const nextEventClose = (currentScroll  - (this.scrollSpeed * 2) - this.scrollGap) <= 0

        const move = nextEventClose ? 0 : currentScroll - this.scrollSpeed


        slider.scroll({
            left: move,
            behavior: 'smooth'
        })

        this.blockPrevios = move <= 0
        if(this.blockNext) this.blockNext = false;
    }

      /**
     *
     * @param estado
     */
      public cambiarEstado(estado) {
        this.mostrarTotales = estado;
    }

       /**
     *
     * retornar si ya se ha llegado al limite del next
     */

    limitNext(currentScroll: number){
        var slider: HTMLElement = document.getElementById("totalesScroll");

        const width = slider.offsetWidth
        const widthContainer = slider.scrollWidth

        this.blockNext =  widthContainer <= (currentScroll + width)
    }

    filter(unidad){
        this.quitarHovers();

        const arrayUnidades = this.convertirCadenaAArray(unidad) // {}

       const datosFiltrados = this.dataTable.filter(item => {
        let guardar: boolean = false

        arrayUnidades.forEach(unidadNegocio => {
            if(unidadNegocio === item.unidadNegocioFabrica){
                guardar = true
                return
            }
        });
        return guardar
       })

       this.dataFilter.emit(datosFiltrados)
    }

    quitarHovers(){
        this.totales.forEach(total => {
            total.seleccionado = false;
        })
    }

     convertirCadenaAArray(cadena) {
        // Eliminamos los caracteres de llaves al inicio y final de la cadena
        const cadenaLimpia = cadena.replace(/[{}]/g, '');

        // Separamos los números usando ',' como delimitador
        const numerosStr = cadenaLimpia.split(',');

        // Convertimos los números de tipo string a tipo number
        const numeros = numerosStr.map(num => parseInt(num, 10));

        return numeros;
      }




     /**
     *
     * Verifica si la la pantalla puede cargar todo el contenedor y deshabilita los botónes next y previous
     */

    checkScrollWidth(){
        var slider: HTMLElement = document.getElementById("totalesScroll");

        const width = slider.offsetWidth
        const widthContainer = slider.scrollWidth

        if(width >= widthContainer){
            this.blockNext = true;
            this.blockPrevios = true;

            this.cd.detectChanges();
        }

    }
}

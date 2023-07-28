import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import {  Input} from '@angular/core';

@Component({
    selector: 'app-totales',
    templateUrl: './totales.component.html',
    styleUrls: ['./totales.component.scss']
})
export class TotalesComponent implements OnInit {


    private scrollSpeed: number = 200;
    mostrarTotales: boolean = true;
    blockNext: boolean = false;
    blockPrevios: boolean = true;
    @Input() totales: any[];

    constructor(private cd: ChangeDetectorRef) { }

    ngOnInit(): void {


    }

    ngAfterViewInit(): void {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        setTimeout(() => {
            this.checkScrollWidth()
            console.log('totales', this.totales);
        }, 1000);
    }


    nextTotalesSlider() {
        var slider: HTMLElement = document.getElementById("totalesScroll");
        const currentScroll = slider.scrollLeft

        slider.scroll({
            left: currentScroll + this.scrollSpeed,
            behavior: 'smooth'
        })

        if(this.blockPrevios) this.blockPrevios = false;
        this.limitNext(currentScroll + this.scrollSpeed)
    }

    previousTotalesSlider() {
        var slider: HTMLElement = document.getElementById("totalesScroll");
        const currentScroll = slider.scrollLeft

        slider.scroll({
            left: currentScroll - this.scrollSpeed,
            behavior: 'smooth'
        })

        this.blockPrevios = currentScroll - this.scrollSpeed < 0
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

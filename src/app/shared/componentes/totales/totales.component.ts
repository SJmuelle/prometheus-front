import { Component, OnInit } from '@angular/core';
import {  Input} from '@angular/core';

@Component({
    selector: 'app-totales',
    templateUrl: './totales.component.html',
    styleUrls: ['./totales.component.scss']
})
export class TotalesComponent implements OnInit {


    private scrollSpeed: number = 200;
    @Input() mostrarTotales: boolean;
    @Input() totales: any[];

    constructor() { }

    ngOnInit(): void {
    }


    nextTotalesSlider() {
        var slider: HTMLElement = document.getElementById("totalesScroll");
        const currentScroll = slider.scrollLeft

        slider.scroll({
            left: currentScroll + this.scrollSpeed,
            behavior: 'smooth'
        })
    }

    previousTotalesSlider() {
        var slider: HTMLElement = document.getElementById("totalesScroll");
        const currentScroll = slider.scrollLeft

        slider.scroll({
            left: currentScroll - this.scrollSpeed,
            behavior: 'smooth'
        })
    }
}

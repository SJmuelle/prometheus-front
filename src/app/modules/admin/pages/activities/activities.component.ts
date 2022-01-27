import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { Activity } from 'app/modules/admin/pages/activities/activities.types';
import { ActivitiesService } from 'app/modules/admin/pages/activities/activities.service';
import { Item } from './file-manager.types'; 
import {MatDialog} from "@angular/material/dialog";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector       : 'activity',
    templateUrl    : './activities.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivitiesComponent implements OnInit
{

    imageURL: string;
    uploadFile: FormGroup;

    activities: Activity[];
    files: Item[];

    docupreview:boolean = false;

    archivopreview: any;

    constructor(
        public _activityService: ActivitiesService,
        private _dialog: MatDialog, public fb: FormBuilder
    ){
        this.uploadFile = this.fb.group({
            avatar: [null],
            name: ['']}    
        )
    }

    
    ngOnInit(): void {

        this.files = [
            {
                id: '1',
                icon: 'heroicons_solid:download',
                type: 'pdf',
                name: 'Reporte Facturas',
                date: moment().subtract(25, 'minutes').toISOString()
            },
            {
                id: '2',
                icon: 'heroicons_solid:download',
                type: 'doc',
                name: 'Reporte Facturas',
                date: moment().subtract(50, 'minutes').toISOString()
            },
            {
                id: '3',
                icon: 'heroicons_solid:download',
                type: 'xls',
                name: 'Reporte Facturas',
                date: moment().subtract(9, 'hours').toISOString()
            },
            {
                id: '4',
                icon: 'heroicons_solid:download',
                type: 'jpg',
                name: 'Reporte Facturas',
                date: moment().subtract(1, 'day').toISOString()
            },
            {
                id: '5',
                icon: 'heroicons_solid:download',
                type: 'txt',
                name: 'Reporte Facturas',
                date: moment().subtract(4, 'day').toISOString()
            }
        ]

        this.archivopreview = {
            id: '5', 
            type: 'txt',
            base64: "data:text/plain;base64,RXN0byBlcyBzb2xvIHVuYSBwcnVlYmEu"
        }

    }

    prevista(){
        // this.docupreview = true;
        // console.log(this.docupreview)
    }
    /**
     * Returns whether the given dates are different days
     *
     * @param current
     * @param compare
     */
    isSameDay(current: string, compare: string): boolean {
        return moment(current, moment.ISO_8601).isSame(moment(compare, moment.ISO_8601), 'day');
    }

    /**
     * Get the relative format of the given date
     *
     * @param date
     */
    getRelativeFormat(date: string): string {

        const today = moment().startOf('day');
        const yesterday = moment().subtract(1, 'day').startOf('day');

        // Is today?
        if ( moment(date, moment.ISO_8601).isSame(today, 'day') )
        {
            return 'Today';
        }

        // Is yesterday?
        if ( moment(date, moment.ISO_8601).isSame(yesterday, 'day') )
        {
            return 'Yesterday';
        }

        return moment(date, moment.ISO_8601).fromNow();
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}

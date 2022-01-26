import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { Activity } from 'app/modules/admin/pages/activities/activities.types';
import { ActivitiesService } from 'app/modules/admin/pages/activities/activities.service';
import { Item } from './file-manager.types'; 

@Component({
    selector       : 'activity',
    templateUrl    : './activities.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivitiesComponent implements OnInit
{
    activities: Activity[];
    files: Item[];

    /**
     * Constructor
     */
    constructor(public _activityService: ActivitiesService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {

        this.files = [
            {
                id: '1',
                icon: 'heroicons_solid:download',
                type: 'PDF',
                name: 'Reporte Facturas',
                date: moment().subtract(25, 'minutes').toISOString()
                
            },
            {
                id: '2',
                icon: 'heroicons_solid:download',
                type: 'DOC',
                name: 'Reporte Facturas',
                date: moment().subtract(50, 'minutes').toISOString()
            },
            {
                id: '3',
                icon: 'heroicons_solid:download',
                type: 'XLS',
                name: 'Reporte Facturas',
                date: moment().subtract(9, 'hours').toISOString()
            },
            {
                id: '4',
                icon: 'heroicons_solid:download',
                type: 'JPG',
                name: 'Reporte Facturas',
                date: moment().subtract(1, 'day').toISOString()
            },
            {
                id: '5',
                icon: 'heroicons_solid:download',
                type: 'TXT',
                name: 'Reporte Facturas',
                date: moment().subtract(4, 'day').toISOString()
            }
        ]

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Returns whether the given dates are different days
     *
     * @param current
     * @param compare
     */
    isSameDay(current: string, compare: string): boolean
    {
        return moment(current, moment.ISO_8601).isSame(moment(compare, moment.ISO_8601), 'day');
    }

    /**
     * Get the relative format of the given date
     *
     * @param date
     */
    getRelativeFormat(date: string): string
    {
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
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}

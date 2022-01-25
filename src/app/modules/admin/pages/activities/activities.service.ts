import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Activity } from 'app/modules/admin/pages/activities/activities.types';
import { Item } from './file-manager.types'; 

@Injectable({
    providedIn: 'root'
})
export class ActivitiesService
{
    // Private
    private _activities: BehaviorSubject<any> = new BehaviorSubject(null);
    private _items: BehaviorSubject<Item | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for activities
     */
    get activities(): Observable<any>
    {
        return this._activities.asObservable();
    }

    get items$(): Observable<Item>
    {
        return this._items.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get activities
     */
    getActivities(): Observable<any>
    {
        return this._httpClient.get<Activity[]>('api/pages/activities').pipe(
            tap((response: Activity[]) => {
                this._activities.next(response);
            })
        );
    }

    getItems(folderId: string | null = null): Observable<Item[]>
    {
        return this._httpClient.get<Item>('api/apps/file-manager', {params: {folderId}}).pipe(
            tap((response: any) => {
                this._items.next(response);
            })
        );
    }
}

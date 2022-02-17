import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Activity } from 'app/modules/admin/pages/activities/activities.types';
import { Item } from './file-manager.types'; 
import { AppSettingsService } from 'app/core/app-configs/app-settings.service'; 


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
    constructor(private _http: HttpClient,
        private _appSettings: AppSettingsService)
    {
    }
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
    /**
     * Get activities
     */
    getActivities(): Observable<any>
    {
        return this._http.get<Activity[]>('api/pages/activities').pipe(
            tap((response: Activity[]) => {
                this._activities.next(response);
            })
        );
    }

    getItems(folderId: string | null = null): Observable<Item[]>
    {
        return this._http.get<Item>('api/apps/file-manager', {params: {folderId}}).pipe(
            tap((response: any) => {
                this._items.next(response);
            })
        );
    }

    public  getFiles(): Observable<any> {
        return this._http.get(`${this._appSettings.archivos.url.ListFiles}`);
    }

    public  showFiles(data: any): Observable<any> {
        return this._http.post(this._appSettings.archivos.url.ListFiles, data);
    }

    public  getFilesDown(): Observable<any> {
        return this._http.get(`${this._appSettings.archivos.url.DownFile}`);
    }

    public  downFiles(data: any = 2): Observable<any> {
        return this._http.post(this._appSettings.archivos.url.DownFile, data);
    }

}

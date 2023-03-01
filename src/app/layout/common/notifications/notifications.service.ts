import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { Notification } from 'app/layout/common/notifications/notifications.types';
import { map, switchMap, take } from 'rxjs/operators';
import { UtilityService } from 'app/resources/services/utility.service';

@Injectable({
    providedIn: 'root',
})
export class NotificationsService {
    private _notifications: ReplaySubject<Notification[]> = new ReplaySubject<
        Notification[]
    >(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient,private _utility: UtilityService) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for notifications
     */
    get notifications$(): Observable<Notification[]> {
        return this._notifications.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Store notifications on the service
     *
     * @param notifications
     */
    store(notifications: Notification[]): Observable<Notification[]> {
        // Load the notifications
        this._notifications.next(notifications);

        // Return the notifications
        return this.notifications$;
    }

    /**
     * Create a notification
     *
     * @param notification
     */
    create(notification: Notification): Observable<Notification> {
        return this.notifications$.pipe(
            take(1),
            switchMap((notifications) =>
                this._httpClient
                    .post<Notification>('api/common/notifications', {
                        notification,
                    })
                    .pipe(
                        map((newNotification) => {
                            // Update the notifications with the new notification
                            this._notifications.next([
                                ...notifications,
                                newNotification,
                            ]);

                            // Return the new notification from observable
                            return newNotification;
                        })
                    )
            )
        );
    }

    /**
     * Update the notification
     *
     * @param id
     * @param notification
     */
    update(id: string, notification: Notification): Observable<Notification> {
        let url="";
        let data="";
        return this.notifications$.pipe(
            take(1),
            switchMap((notifications) =>
            this._utility.postQuery(url, data)
                    .pipe(
                        map((updatedNotification: Notification) => {
                            // Find the index of the updated notification
                            const index = notifications.findIndex(
                                (item) => item.id === id
                            );

                            // Update the notification
                            notifications[index] = updatedNotification;

                            // Update the notifications
                            this._notifications.next(notifications);

                            // Return the updated notification
                            return updatedNotification;
                        })
                    )
            )
        );
    }

    /**
     * Delete the notification
     *
     * @param id
     */
    delete(id: string): Observable<boolean> {
        return this.notifications$.pipe(
            take(1),
            switchMap((notifications) =>
                this._httpClient
                    .delete<boolean>('api/common/notifications', {
                        params: { id },
                    })
                    .pipe(
                        map((isDeleted: boolean) => {
                            // Find the index of the deleted notification
                            const index = notifications.findIndex(
                                (item) => item.id === id
                            );

                            // Delete the notification
                            notifications.splice(index, 1);

                            // Update the notifications
                            this._notifications.next(notifications);

                            // Return the deleted status
                            return isDeleted;
                        })
                    )
            )
        );
    }


    /**
     * Mark all notifications as read
     */
    markAllAsRead(): Observable<boolean> {
        let usuario = JSON.parse(localStorage.getItem('usuario'));
        let url = `tk/cre-select-notificaciones-fabrica`;
        return this.notifications$.pipe(
            take(1),
            switchMap((notifications) =>
                this._utility.getQuery(url, true).pipe(
                    map((isUpdated: boolean) => {
                        // ;
                        // Go through all notifications and set them as read
                        notifications.forEach((notification, index) => {
                            notifications[index].read = 't';
                        });

                        // Update the notifications
                        this._notifications.next(notifications);

                        // Return the updated status
                        return isUpdated;
                    })
                )
            )
        );
    }
}

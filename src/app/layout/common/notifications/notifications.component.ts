import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatButton } from '@angular/material/button';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Notification } from 'app/layout/common/notifications/notifications.types';
import { NotificationsService } from 'app/layout/common/notifications/notifications.service';
import { UtilityService } from 'app/resources/services/utility.service';
import moment from "moment";
import 'moment/locale/es';

@Component({
    selector: 'notifications',
    templateUrl: './notifications.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'notifications',
})
export class NotificationsComponent implements OnChanges, OnInit, OnDestroy {
    @Input() notifications: Notification[];
    @ViewChild('notificationsOrigin') private _notificationsOrigin: MatButton;
    @ViewChild('notificationsPanel')
    private _notificationsPanel: TemplateRef<any>;

    unreadCount: number = 0;
    private _overlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _notificationsService: NotificationsService,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef,
        private _utility: UtilityService,
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On changes
     *
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        // Notifications
        if ('notifications' in changes) {
            // Store the notifications on the service
            this._notificationsService.store(
                changes.notifications.currentValue
            );
        }
    }

    /**
       /**
     * On init
     */
    ngOnInit(): void {
        this.consulta();
        setTimeout(() => {
            this.consulta();
        }, 1000);
        console.log(this.consulta())
    }

    consulta() {
        let usuario = JSON.parse(localStorage.getItem('usuario'));
        let url = `tk/cre-select-notificaciones-fabrica`;
        this._utility
            .getQuery(url, true)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((notifications: any) => {

                this.notifications = notifications.data;
                console.log(this.notifications);
                this._calculateUnreadCount();
                this._changeDetectorRef.markForCheck();
            });
    }
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();

        // Dispose the overlay
        if (this._overlayRef) {
            this._overlayRef.dispose();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Open the notifications panel
     */
    openPanel(): void {
        // Return if the notifications panel or its origin is not defined
        if (!this._notificationsPanel || !this._notificationsOrigin) {
            return;
        }

        // Create the overlay if it doesn't exist
        if (!this._overlayRef) {
            this._createOverlay();
        }

        // Attach the portal to the overlay
        this._overlayRef.attach(
            new TemplatePortal(this._notificationsPanel, this._viewContainerRef)
        );
    }

    /**
     * Close the messages panel
     */
    closePanel(): void {
        this._overlayRef.detach();
    }

    /**
     * Mark all notifications as read
     */
    markAllAsRead(): void {
        // Mark all as read
        this._notificationsService.markAllAsRead().subscribe();
    }

    /**
     * Toggle read status of the given notification
     */
    toggleRead(notification: Notification): void {
        // Toggle the read status
        notification.read = notification.read=='f'?'t':'f';

        let url = `update-notificacion-leida`;
        let data={
            id:Number(notification.id),
            valorLeido:notification.read=='f'?false:true
        }
        this._utility
            .postQuery(url, data)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((notifications: any) => {
                this.consulta();

            });
    }

    /**
     * Delete the given notification
     */
    delete(notification: Notification): void {
        // Delete the notification
        this._notificationsService.delete(notification.id).subscribe();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create the overlay
     */
    private _createOverlay(): void {
        // Create the overlay
        this._overlayRef = this._overlay.create({
            hasBackdrop: true,
            backdropClass: 'fuse-backdrop-on-mobile',
            scrollStrategy: this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay
                .position()
                .flexibleConnectedTo(
                    this._notificationsOrigin._elementRef.nativeElement
                )
                .withLockedPosition()
                .withPush(true)
                .withPositions([
                    {
                        originX: 'start',
                        originY: 'bottom',
                        overlayX: 'start',
                        overlayY: 'top',
                    },
                    {
                        originX: 'start',
                        originY: 'top',
                        overlayX: 'start',
                        overlayY: 'bottom',
                    },
                    {
                        originX: 'end',
                        originY: 'bottom',
                        overlayX: 'end',
                        overlayY: 'top',
                    },
                    {
                        originX: 'end',
                        originY: 'top',
                        overlayX: 'end',
                        overlayY: 'bottom',
                    },
                ]),
        });

        // Detach the overlay from the portal on backdrop click
        this._overlayRef.backdropClick().subscribe(() => {
            this._overlayRef.detach();
        });
    }

    /**
     * Calculate the unread count
     *
     * @private
     */
    private _calculateUnreadCount(): void {
        let count = 0;
                if (this.notifications && this.notifications.length) {
            count = this.notifications.filter(
                (notification) => (notification.read =='f')
            ).length;
        }

        this.unreadCount = count;
    }
}

import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-asignacion-cuentas',
  templateUrl: './asignacion-cuentas.component.html',
  styleUrls: ['./asignacion-cuentas.component.scss']
})
export class AsignacionCuentasComponent implements OnInit,OnDestroy {
  @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;
  drawerMode: 'side' | 'over';
  open: boolean = false;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
  ) { 
     
  }


  ngOnInit(): void {
    // Subscribe to MatDrawer opened change
    this.matDrawer.openedChange.subscribe((opened) => {
      if (!opened) {
        // Remove the selected contact when drawer closed
        // this.selectedContact = null;

        // Mark for check
        this._changeDetectorRef.markForCheck();
      }
    });

    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {

        // Set the drawerMode if the given breakpoint is active
        if (matchingAliases.includes('lg')) {
          this.drawerMode = 'side';
        }
        else {
          this.drawerMode = 'over';
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });
  }
  /**
       * On backdrop clicked
       */
  onBackdropClicked(): void {
    this.open = false;
    this._changeDetectorRef.markForCheck();
  }

  mostrarDetalle() {
    this.open = true;
    this._changeDetectorRef.markForCheck();

  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
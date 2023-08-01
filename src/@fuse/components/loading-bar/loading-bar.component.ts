import {
    AfterViewInit, ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import {Subject} from "rxjs";
import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {delay, takeUntil} from "rxjs/operators";
import { FuseLoadingService } from '@fuse/services/loading';

@Component({
  selector: 'fuse-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  exportAs     : 'fuseLoadingBar'
})
export class FuseLoadingBarComponent implements OnChanges, OnInit, OnDestroy {
  @Input() autoMode: boolean = true;
  mode: 'determinate' | 'indeterminate';
  progress: number = 0;
  show: boolean = false;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
      private _fuseLoadingService: FuseLoadingService,
      private cd: ChangeDetectorRef
  ) { }

    /**
     * On changes
     *
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void
    {
        // Auto mode
        if ( 'autoMode' in changes )
        {
            // Set the auto mode in the service
            this._fuseLoadingService.setAutoMode(coerceBooleanProperty(changes.autoMode.currentValue));
        }
    }

  ngOnInit(): void {
      // Subscribe to the service
      this._fuseLoadingService.mode$
          .pipe(takeUntil(this._unsubscribeAll)).pipe(delay(300))
          .subscribe((value) => {
              this.mode = value;
          });

      this._fuseLoadingService.progress$
          .pipe(takeUntil(this._unsubscribeAll)).pipe(delay(300))
          .subscribe((value) => {
              this.progress = value;
          });

      this._fuseLoadingService.show$
          .pipe(takeUntil(this._unsubscribeAll)).pipe(delay(300))
          .subscribe((value) => {
              this.show = value;
          });

  }



    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }


}

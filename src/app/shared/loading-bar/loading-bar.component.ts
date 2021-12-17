import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {Subject} from "rxjs";
import {LoadingService} from "../../core/services/loading.service";
import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // exportAs     : 'fuseLoadingBar'
})
export class LoadingBarComponent implements OnChanges, OnInit, OnDestroy {
  @Input() autoMode: boolean = true;
  mode: 'determinate' | 'indeterminate';
  progress: number = 0;
  show: boolean = false;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
      private _fuseLoadingService: LoadingService
  ) {
      console.log('SSSSSS')
  }

    /**
     * On changes
     *
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void
    {
        console.log(changes);
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
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((value) => {
              this.mode = value;
          });

      this._fuseLoadingService.progress$
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((value) => {
              this.progress = value;
          });

      this._fuseLoadingService.show$
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((value) => {
              console.log(value);
              this.show = value;
          });
  }



    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoadingService} from "./loading.service";
import {finalize} from "rxjs/operators";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  handleRequestsAutomatically: boolean;

  constructor(
      private _fuseLoadingService: LoadingService
  ) {
      // Subscribe to the auto
      this._fuseLoadingService.auto$
          .subscribe((value) => {
              this.handleRequestsAutomatically = value;
          });
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      // If the Auto mode is turned off, do nothing
      if ( !this.handleRequestsAutomatically )
      {
          return next.handle(req);
      }

      // Set the loading status to true
      this._fuseLoadingService._setLoadingStatus(true, req.url);

      return next.handle(req).pipe(
          finalize(() => {
              // Set the status to false if there are any errors or the request is completed
              this._fuseLoadingService._setLoadingStatus(false, req.url);
          }));
  }
}

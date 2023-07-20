import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableDataFilterService {
  private filterData: Subject<string> = new Subject();

  constructor() { }

  get filterTable$(): Observable<string> {
    return this.filterData.asObservable();
  }



  public sendFilterData(dataFilter: string): void {
    this.filterData.next(dataFilter.toUpperCase().trim());
  }
}

import { Injectable } from '@angular/core';
// import { IMobileFilterType } from 'app/data/interfaces/index';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TableFilterService {
  private filterData: Subject<string> = new Subject();
  private filterStatus: Subject<{ type: string; value: string }> = new Subject();
  // private filterCardStatus: Subject<{ type: IMobileFilterType }> = new Subject();

  constructor() { }

  get filterTable$(): Observable<string> {
    return this.filterData.asObservable();
  }

  get filterTableStatus$(): Observable<{ type: string; value: string }> {
    return this.filterStatus.asObservable();
  }

  // get filterCardStatus$(): Observable<{ type: IMobileFilterType }> {
  //   return this.filterCardStatus.asObservable();
  // }

  public sendFilterData(dataFilter: string): void {
    this.filterData.next(dataFilter);
  }

  public sendFilterStatus(dataFilter: { type: string; value: string }): void {
    this.filterStatus.next(dataFilter);
  }

  // public sendCardStatus(dataFilter: { type: IMobileFilterType }): void {
  //   this.filterCardStatus.next(dataFilter);
  // }
}

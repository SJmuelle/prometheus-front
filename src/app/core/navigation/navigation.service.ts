import { Injectable } from '@angular/core';
import { compactNavigation, defaultNavigation, futuristicNavigation, horizontalNavigation } from 'app/mock-api/common/navigation/data';
import { UtilityService } from 'app/resources/services/utility.service';
import { cloneDeep } from 'lodash-es';
import { BehaviorSubject, Observable} from 'rxjs';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  public navigation: BehaviorSubject<{data:[],msg:string;status:number}| null> = new BehaviorSubject(null);

  constructor(private _utility: UtilityService) {

  }

  get navigation$(): Observable<any> {
    return this.navigation.asObservable();
  }

  getNavigation(): Observable<{data:[],msg:string;status:number}>   {

      let url: string = `tk/opciones-sistemas`;
      return this._utility
        .getQuery(url, true)
        .pipe(tap((res: any) => {
      
          if(res.data){
            this.navigation.next(res.data)
          
          }else{
            this.navigation.next({data:[],msg:'Error',status:400})
          }
         
      }));
  }


}



import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityService } from 'app/resources/services/utility.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private _icons: BehaviorSubject<any> = new BehaviorSubject(null);
  private _empresas: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private _utility: UtilityService,
    private _httpClient: HttpClient
  ) { }


  // -----------------------------------------------------------------------------------------------------
  // @  methods basic
  // -----------------------------------------------------------------------------------------------------


  /**
 *  pos basic 
 * @param url
 * @param data
 */
  public posbasic(url: string, data: any): Observable<any> {
    return this._utility.postQuery(url, data).pipe(
      map((result: any) => {
        return result;
      })
    );
  }




  // -----------------------------------------------------------------------------------------------------
  // @  methods adbace
  // -----------------------------------------------------------------------------------------------------


  /**
   * Getter for icons
   */
  public get icons(): Observable<any> {
    return this._icons.asObservable();
  }

  /**
   * Get icons
   *
   * @param url
   */
  public getIcons(url: string): Observable<any> {
    // Prepend the url with 'api'
    url = 'api' + url;

    return this._httpClient.get(url).pipe(
      tap((response: any) => {
        this._icons.next(response);
      })
    );
  }


  /**
   * Getter for icons
   */
  public get empresas(): Observable<any> {
    return this._empresas.asObservable();
  }

  /**
   * Get icons
   *
   * @param url
   */
  public getEmpresas(): Observable<any> {
    let url = 'consulta-lista-generica/empresas';
    // let url: string = `/informacion-tipo-pqrs`;
    return this._utility.getQuery(url, true).pipe(
      tap((response: any) => {
        this._empresas.next(response);
      })
    );
  }

}

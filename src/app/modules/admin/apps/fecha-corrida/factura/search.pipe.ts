import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(prov: any[], searchTxt: string): any[] {

    if(!prov || !prov.length) return prov;

    if(!searchTxt || !searchTxt.length) return prov;

    return prov.filter(item => {

      return item.viewValue.toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1

    });

  }

}

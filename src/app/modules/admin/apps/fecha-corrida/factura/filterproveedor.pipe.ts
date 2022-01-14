import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, arg: any): any {

    const resultProv = [];

    for(const prov of value){

      if(prov.proveedor.toLowerCase().indexOf(arg.toLowerCase()) > -1){

         resultProv.push(prov);

      };

    };

    return resultProv;

  }

}

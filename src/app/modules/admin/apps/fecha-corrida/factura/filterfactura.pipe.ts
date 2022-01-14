import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {

    const resultFact = [];

    for(const fact of value){

      if(fact.nit.indexOf(arg) > -1){

         resultFact.push(fact);

      };

    };

    return resultFact;

  }

  

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterdate'
})
export class FilterdatePipe implements PipeTransform {

  transform(value: any, arg: any): any {

    const resultFactDate = [];

    for(const fact of value){

      if(fact.vencimiento.indexOf(arg) > -1){

         resultFactDate.push(fact);

      };

    };

    return resultFactDate;

  }

}

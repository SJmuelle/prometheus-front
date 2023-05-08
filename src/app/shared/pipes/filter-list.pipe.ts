import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterList'
})
export class FilterListPipe implements PipeTransform {

  transform(value: any[] = [], valueFilter: string, key: string): unknown {
    return value.filter((dataValue: any) => dataValue[key].toLowerCase().includes(valueFilter.toLowerCase()));
  }

}

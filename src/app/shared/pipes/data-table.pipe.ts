import { Pipe, PipeTransform } from '@angular/core';
import { PipeDataTable } from 'app/core/interfaces';


@Pipe({
  name: 'dataTable',
})
export class DataTablePipe implements PipeTransform {
  private pipeDataTable: PipeDataTable = {
    text: (value: any = '---') => value,
    percentage: (value: any) => `${value}%`,
    date: (value: any = '---') => value ,
    speed: (value: any) => `${value || '0'} km/h`,
    titleCase: (value: any) => {
      if (value){
        const firstCaracter = (value as string).charAt(0).toUpperCase();
        const word = (value as string).substring(1);
        return `${firstCaracter}${word}`;
      }
  }
};

  constructor() { }

  transform(value: unknown, args: string): unknown {
    return this.pipeDataTable[args](value);
  }
}

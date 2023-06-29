import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

type PipeDataTable = {
  [key: string]: (value: any) => string;
};

@Pipe({
  name: 'dataTable',
})



export class DataTablePipe implements PipeTransform {



  private pipeDataTable: PipeDataTable = {
    text: (value: any = '---') => value,
    number: (value: any = 0.00) => `$ ${Intl.NumberFormat('es-ES').format(Math.trunc(value))}`,
    percentage: (value: any) => `${value}%`,
    date: (value: any) => value ? this.convertDateAlert(value) : '---',
    titleCase: (value: any) => {
      if (value) {
        const firstCaracter = (value as string).charAt(0).toUpperCase();
        const word = (value as string).substring(1);
        return `${firstCaracter}${word}`;
      }
    }
  };





  public convertDateAlert(date: Date | string): string {
    return moment(date).format('MM/DD/YYYY');
  }

  constructor() { }

  transform(value: unknown, args: string): unknown {
    return this.pipeDataTable[args](value);
  }
}


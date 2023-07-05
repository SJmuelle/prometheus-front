import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'smPaginator'
})
export class SmPaginatorPipe implements PipeTransform {

  transform(array: any[], page_size: number, page_number: number): any[] {

    if (array.length === 0) {
      return
    }



    page_size = page_size || 5

    page_number = page_number || 0

    if (page_number === 0) {
      return array.slice(page_number, page_size)

    } else {

      return array.slice(page_number * page_size, (page_number + 1) * page_size)
    }


  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProducts',
  standalone: true
})
export class FilterProductsPipe implements PipeTransform {

  transform(products: any, search: string) {
    return products?.filter((p: any) => p.name.includes(search) || p.description.includes(search))
  }

}

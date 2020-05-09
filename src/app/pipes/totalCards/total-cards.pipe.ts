import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalCards'
})
export class TotalCardsPipe implements PipeTransform {

  transform(lesson: any): any {
    return (lesson.cards3.items.length)+30
  }
}
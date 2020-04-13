import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'videoScore'
})
export class VideoScorePipe implements PipeTransform {
  transform(lesson: any, type?: any): any {
    let result;
    if (lesson) {
      console.log('in video score, what is lesson (updated??),type?',lesson, type)
      if (lesson.cards3.items.length < 0) {
        result = 0;
      }
      if (lesson.cards3.items.length > 0) {

        for (let i = 0; i < lesson.cards3.items.length; i++) {

          //if (lesson.cards3.items.users3.items[0] != null) {

          if (lesson.cards3.items[i].lesson3.id == type) {

            if (lesson.cards3.items[i].users3.items.length>0) {
              result = (lesson.cards3.items[i].users3.items[0].user3.videos3.items[0]) ?lesson.cards3.items[i].users3.items[0].user3.videos3.items[0].score:0;
              // if (lesson.cards3.items[i].users3.items[0].user3.videos3.items.length == 0) {
              //   result = 1001
              // }else{
              //   result = lesson.cards3.items[i].users3.items[0].user3.videos3.items[0].score;
              // }
            }

          }

          //}
        }
      }
    }
    return result;
  }
}

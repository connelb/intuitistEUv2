import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalScore'
})
export class TotalScorePipe implements PipeTransform {

  transform(lesson: any, type?: any): any {

    //console.log('is lesson updated?? with ne video score??', lesson, type);
    let video = 0;
    let done = 0;
    let doing = 0;
    let result;
    if (lesson.length > 0) {
      for (let i = 0; i < lesson.length; i++) {
        if (lesson[i].users3.items[0] != null) {

          for (let j = 0; j < lesson[i].users3.items.length; j++) {

            //lesson === listLesson3s.items.cards3.items
            //listLesson3s.items.cards3.items.users3.items

            // "users3": {
            //   "items": [
            //     null
            //   ]
            // }

            if (lesson[i].users3.items[j].status == 'done') {
              //console.log(lesson[i].users3.items[j].score);
              done += (lesson[i].users3.items[j].score) ? lesson[i].users3.items[j].score : 0;
            } else {
              doing += (lesson[i].users3.items[j].score) ? lesson[i].users3.items[j].score : 0;
            }
            // if(lesson[i].users3.items[0].user3.videos3.items.length>0){
            //.user3.videos3.items[0]
            video = (lesson[i].users3.items[0].user3.videos3.items[0]) ? lesson[i].users3.items[0].user3.videos3.items[0].score : 0;
            // }
            // for (let k = 0; k < lesson[i].users3.items[j].user3.videos3.items.length; k++) {
            //   //lesson[i].users3.items[0].user3.videos3.items[0].score;
            //   //lesson.cards3.items[i].users3.items[0].user3.videos3.items[0].score;
            //   video +=lesson[i].users3.items[j].user3.videos3.items[k].score
            // }
          }
        }
      }

      switch (type) {
        case 'done':
          result = done;
          break;
        case 'doing':
          result = doing;
          break;
        case 'video':
          result = video;
          break;
        default:
          result = 0

      }
      return result
    }
  }
}
import { Pipe, PipeTransform } from '@angular/core';
import * as d3Array from 'd3-array';
import * as d3Collection from 'd3-collection';

@Pipe({
  name: 'totalScore'
})
export class TotalScorePipe implements PipeTransform {
  lessonCards: any;
  myLessonScore: any;

  transform(lesson: any, type?: any): any {

   
    // let video = 0;
    // let done = 0;
    // let doing = 0;
    let result;
    let temp = [];


    this.lessonCards = lesson.cards3.items;

    this.lessonCards.map((card: any) => {
      temp.push({
        'name': lesson.name,
        'cardId': card.id,
        'status': (card.users3.items.length > 0) ? card.users3.items[0].status : 0,
        'score': (card.users3.items.length > 0) ? card.users3.items[0].score : 0
      })
    })
   

    this.myLessonScore = d3Collection.nest()
      .key(function (d: any) { return d['status']; })
      .rollup(function (leaves: any) {
        return {
          total: d3Array.sum(leaves, function (d) {
            return d['score'];
          }), tally: leaves.length
        } as any
      })
      .entries(temp);

      // console.log('is lesson this.myLessonScore??', this.myLessonScore);

    let toDo = (this.myLessonScore[0].value.tally) ? this.myLessonScore[0].value.tally : 0;
    let doing = (this.myLessonScore[1]) ? this.myLessonScore[1].value.tally : 0;
    let done = (this.myLessonScore[2]) ? this.myLessonScore[2].value.tally : 0;
    let myTotalArray = [done, doing, toDo];

    let doingScore = (this.myLessonScore[1]) ? this.myLessonScore[1].value.total : 0;
    let doneScore = (this.myLessonScore[2]) ? this.myLessonScore[2].value.total : 0;


    let myScoreArray = [done, doing];

    let total = myTotalArray.reduce((a, b) => a + b, 0);

    let score = myScoreArray.reduce((a, b) => a + b, 0);

    console.log('myTotalArray=',myTotalArray)
    console.log('done=',done)
    console.log('total=',total)



    // if (lesson.length > 0) {
    //   for (let i = 0; i < lesson.length; i++) {
    //     if (lesson[i].users3.items[0] != null) {

    //       for (let j = 0; j < lesson[i].users3.items.length; j++) {

    //         //lesson === listLesson3s.items.cards3.items
    //         //listLesson3s.items.cards3.items.users3.items

    //         // "users3": {
    //         //   "items": [
    //         //     null
    //         //   ]
    //         // }

    //         if (lesson[i].users3.items[j].status == 'done') {
    //           //console.log(lesson[i].users3.items[j].score);
    //           done += (lesson[i].users3.items[j].score) ? lesson[i].users3.items[j].score : 0;
    //         } else {
    //           doing += (lesson[i].users3.items[j].score) ? lesson[i].users3.items[j].score : 0;
    //         }
    //         // if(lesson[i].users3.items[0].user3.videos3.items.length>0){
    //         //.user3.videos3.items[0]
    //         video = (lesson[i].users3.items[0].user3.videos3.items[0]) ? lesson[i].users3.items[0].user3.videos3.items[0].score : 0;
    //         // }
    //         // for (let k = 0; k < lesson[i].users3.items[j].user3.videos3.items.length; k++) {
    //         //   //lesson[i].users3.items[0].user3.videos3.items[0].score;
    //         //   //lesson.cards3.items[i].users3.items[0].user3.videos3.items[0].score;
    //         //   video +=lesson[i].users3.items[j].user3.videos3.items[k].score
    //         // }
    //       }
    //     }
    //   }

    switch (type) {
      case 'done%':
        result = done/total;
        break;
        case 'done':
        result = done;
        break;
      case 'doing%':
        result = doing/total;
        break;
        case 'doing':
        result = doing;
        break;
      case 'total':
        result = total;
        break;
      default:
        result = 0

    }
    // console.log("result:", done, doing)
    return result
  }
}
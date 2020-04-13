import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sumScore'
})
export class SumScorePipe implements PipeTransform {
  total: any;

  transform(lesson: any, type?: any): any {
    let temp = 0;
    if (lesson.cards3.items.length > 0) {
      let total = lesson.cards3.items.length;
      for (let i = 0; i < lesson.cards3.items.length; i++) {
        if (lesson.cards3.items[i].users3.items.length > 0) {
          lesson.cards3.items[i].users3.items.map(d => {
            if (d.status == type) {
              temp = temp + Number(d.score);
            }
          })
        }
      }
      return temp
    }
  }
}

// {
//   "id": "a007b753-cb4d-4608-987b-500bd64b4c16",
//   "users3": {
//     "items": [
//       {
//         "id": "bc671a73-3bd5-408c-b69f-dc9c570e4c7b",
//         "score": 2,
//         "status": "done"
//       }
//     ]
//   }
// },
// {
//   "id": "5536d897-17c4-4566-80de-7c33bbd9004d",
//   "users3": {
//     "items": []
//   }
// }
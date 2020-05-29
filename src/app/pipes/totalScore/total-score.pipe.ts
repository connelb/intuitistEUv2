import { Pipe, PipeTransform } from '@angular/core';
import * as d3Array from 'd3-array';
import * as d3Collection from 'd3-collection';
// import { AppsyncService } from '../../providers/appsync.service';
// import { ObservableQuery } from 'apollo-client';
import { API, graphqlOperation } from "aws-amplify";
import gql from 'graphql-tag';
// import { Auth } from 'aws-amplify';
import { BehaviorSubject, Observable } from 'rxjs';
import { ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic';

const GetUser3Video3 =
  gql`query GetUser3Video3Id($user3Video3User3Id: ID!, $user3Video3Video3Id: ID!){
  listUser3Video3s(filter: {user3Video3User3Id: {eq: $user3Video3User3Id}, user3Video3Video3Id: {eq: $user3Video3Video3Id} }){
    items {
      id
      score
      status
      _version
    }
  }
}`

@Pipe({
  name: 'totalScore'
})
export class TotalScorePipe implements PipeTransform {
  lessonCards: any;
  myLessonScore: any;
  lesson: any;
  user: any;
  globalVideoArray = [];
  // videoScore:any;
  cachedData: any;
  videoScore: any;
  result$: BehaviorSubject<any>;
  toDo: any;
  done: any;
  doing: any;
  constructor() { }

  transform(lesson: any, userId: any, type?: any): Observable<string> {

    // this.getUserVideoId(userId, lesson.video).then(d=> {
    //   this.globalVideoArray.push(d);
    // })

    let result;
    let temp = [];

    this.lessonCards = lesson.cards3.items;

    this.lessonCards.map((card: any) => {
      temp.push({
        'name': lesson.name,
        'cardId': card.id,
        'status': (card.users3.items.length > 0) ? card.users3.items[0].status : "toDo",
        'score': (card.users3.items.length > 0) ? card.users3.items[0].score : 0
      })
    })


    this.myLessonScore = d3Collection.nest()
      .key(function (d: any) { return d['status']; }).sortKeys(d3Array.ascending)
      .rollup(function (leaves: any) {
        return leaves.length
      //     d['key']:leaves.length
      //     // 'status': d.key,
      //     // total: d3Array.sum(leaves, function (d) {
      //     //   return d['score'];
      //     // }), tally: leaves.length
        //  as any
      })
      .entries(temp);


      let summary = {
        doing:0,
        done:0,
        toDo:0,
        total:0
      }


      for(let i=0;i< this.myLessonScore.length;i++){
        if(this.myLessonScore[i].key == "doing"){
          summary.doing = (this.myLessonScore[i].value)
        }
        if(this.myLessonScore[i].key == "done"){
          summary.done = (this.myLessonScore[i].value)
        }
        if(this.myLessonScore[i].key == "toDo"){
          summary.toDo = (this.myLessonScore[i].value)
        }

      }

      summary.total = (summary.doing+ summary.doing+ summary.toDo)

//       .entries(temp).map(d => {
//         temp =[];

//         if (d['key'] == "done") {
//           this.done = d.values.length;
//           temp.push(d.values.length);
//         }
//         if (d['key'] == "doing") {
//           this.doing = d.values.length;
//           temp.push(d.values.length);
//         }
//         if (d['key'] == "toDo") {
//           this.toDo = d.values.length;
//           temp.push(d.values.length);
//         }


// // let temp = [];
// // temp.push()

//         return {
//           done: this.done || 0,
//           doing: this.doing || 0,
//           toDo: this.toDo || 0,
//           total: temp.reduce((a, b) => a + b, 0)
//         }
//         // console.log('this.done', this.done, this.doing, this.toDo)
//         // console.log('temp7 ', temp7 )
//         // return (
//         //   { 'done':d=>{
//         //     (d['key']=="done")?d.values.length:0
//         //   },
//         //   'doing':d=>{
//         //     (d['key']=="doing")?d.values.length:0
//         //   },
//         //   'toDo':d=>{
//         //     (d['key']=="toDo")?d.values.length:0
//         //   }
//         // })


//       })
// let test = d3Collection.values(this.myLessonScore).map(d=>{
//   console.log('?',d['key'], d['values'].length)
//   return({
//     "done":(d['key']=='done')?d['values'].length:0,
//     "doing":(d['key']=='doing')?d['values'].length:0,
//     "toDo":(d['key']=='toDo')?d['values'].length:0,
//   })
//   })

  // dd=>d.values(ddd=>{})
  // return d
// })


    // this.myLessonScore.total = (this.done, this.doing, this.toDo).reduce((a, b) => a + b, 0)

    // console.log('temp7', temp7)
    //   .map(d=>{
    //     console.log('d.values', d.values)

    //   // switch (d.key) {
    //   //   case 'toDo':
    //   //   this.toDo = (this.myLessonScore[2]) ? d.values.tally : 0;
    //   //     break;
    //   //     case 'done':
    //   //     this.done = (this.myLessonScore[1]) ? this.myLessonScore[1].value.tally : 0;
    //   //     break;
    //   //   case 'doing':
    //   //   this.doing = (this.myLessonScore[0]) ? this.myLessonScore[0].value.tally : 0;
    //   //     break;
    //   //   default:
    //   //     result = 0

    //   // }
    // }

    // this.myLessonScore.forEach(element => {
    //   switch (element.key) {
    //     case 'done':
    //       this.done = element.value.tally
    //       break;
    //     case 'doing':
    //       this.doing = element.value.tally
    //       break;
    //     default:
    //       this.toDo = element.value.tally
    //   }
    // });


    // let myTotalArray = [this.done, this.doing, this.toDo];


    // console.log('done???', this.done, this.doing, this.toDo, this.myLessonScore);

    // let doingScore = (this.myLessonScore[1]) ? this.myLessonScore[1].value.total : 0;
    // let doneScore = (this.myLessonScore[2]) ? this.myLessonScore[2].value.total : 0;


    // let myScoreArray = [done, doing];

    // let total = myTotalArray.reduce((a, b) => a + b, 0);

    // let score = myScoreArray.reduce((a, b) => a + b, 0);

    // console.log('myTotalArray=',myTotalArray)
    // console.log('done=',done)
    // console.log('total=',total)



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
        result = summary.done / summary.total;
        break;
      case 'done':
        result = summary.done;
        break;
      case 'doing%':
        result = summary.doing / summary.total;
        break;
      case 'doing':
        result = summary.doing;
        break;
      // case 'video':
      //   result = this.globalVideoArray.reduce((a, b) => a + b, 0);
      //   break;
      case 'total':
        result = summary.total;
        break;
      default:
        result = 0

    }
    // console.log("result:", done, doing,total,this.globalVideoArray.reduce((a, b) => a + b, 0))
    this.result$ = new BehaviorSubject(result);
    return this.result$
  }

  // async getUserVideoId(userId, lessonVideo) {
  //   const [userVideo] = await Promise.all([
  //     API.graphql(graphqlOperation(GetUser3Video3, { user3Video3User3Id: userId, user3Video3Video3Id: lessonVideo })) as Promise<any>
  //   ]);
  //   return (userVideo.data.listUser3Video3s.items.length > 0) ? userVideo.data.listUser3Video3s.items[0].score : 0;
  // }
}
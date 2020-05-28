import { Pipe, PipeTransform } from '@angular/core';
import * as d3Array from 'd3-array';
import * as d3Collection from 'd3-collection';
// import { AppsyncService } from '../../providers/appsync.service';
// import { ObservableQuery } from 'apollo-client';
import { API, graphqlOperation } from "aws-amplify";
import gql from 'graphql-tag';
// import { Auth } from 'aws-amplify';
import { BehaviorSubject, Observable } from 'rxjs';

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
  globalVideoArray=[];
  // videoScore:any;
  cachedData: any;
  videoScore: any;
  result$: BehaviorSubject<any>;
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

      // console.log('0 toDo 1 doing 2 done???', this.myLessonScore, this.videoScore);

    let toDo = (this.myLessonScore[0].value.tally) ? this.myLessonScore[0].value.tally : 0;
    let doing = (this.myLessonScore[2]) ? this.myLessonScore[2].value.tally : 0;
    let done = (this.myLessonScore[1]) ? this.myLessonScore[1].value.tally : 0;
    let myTotalArray = [done, doing, toDo];

    // let doingScore = (this.myLessonScore[1]) ? this.myLessonScore[1].value.total : 0;
    // let doneScore = (this.myLessonScore[2]) ? this.myLessonScore[2].value.total : 0;


    // let myScoreArray = [done, doing];

    let total = myTotalArray.reduce((a, b) => a + b, 0);

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
      // case 'video':
      //   result = this.globalVideoArray.reduce((a, b) => a + b, 0);
      //   break;
      case 'total':
        result = total;
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
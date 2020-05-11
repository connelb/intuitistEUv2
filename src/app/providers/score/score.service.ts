import { Injectable, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { AppsyncService } from '../appsync.service';
import { Auth, Storage } from 'aws-amplify';
import * as d3Array from 'd3-array';
import * as d3Collection from 'd3-collection';
import { CardsPage } from '../../cards/cards.page';
import { ObservableQuery } from 'apollo-client';
import { API, graphqlOperation } from "aws-amplify";


const ListLessonsByUser = gql`
query ListLessonsByUser($user3Card3User3Id: ID!) {
  listLesson3s {
    items {
      id
      name
      description
      section
      subSection
      level
      video
      keywords
      cards3(limit:60) {
        items {
          id
          question
          answer
          audio
          order
          _version
          lesson3 {
            id
            video
          }
          users3(filter: {user3Card3User3Id: {eq: $user3Card3User3Id}}) {
            items {
              user3 {
                id
                videos3 {
                  items {
                    id
                    status
                    score
                    _version
                  }
                }
              }
              id
              score
              status
              _version
            }
            __typename
          }
        }
      }
    }
  }
}
`

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

const ListLessonsByUserByLesson = gql`
query ListLessonsByUserByLesson($id:ID!,$user3Card3User3Id:ID){
  listLesson3s(filter:{id:{eq:$id}}) {
    items {
      __typename
      id
      name
      description
      section
      subSection
      video
      _version
      cards3(limit:60) {
        __typename
        items {
          id
          question
          answer
          audio
          order
          _version
          _deleted
          users3(filter: {user3Card3User3Id: {eq: $user3Card3User3Id}}) {
            __typename
            items {
              __typename
              id
              user3 {
                id
                username
                _lastChangedAt
                _version
                videos3 {
                  __typename
                  items {
                    id
                    status
                    score
                    _version
                  }
                }
              }
              score
              status
              _version
            }
          }
        }
      }
    }
  }
}
`

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  observedQuery: ObservableQuery<any>;
  doingScore: any;
  doneScore: any;
  user: any;
  totalScore: any;
  totalTally: any;
  toDoScore: any;
  myScore: any;
  temp = [];
  toDo: any;
  doing: any;
  done: any = 0;
  myScoreArray: any[];
  total: any = 0;
  myTotalArray: any[];
  score: any;
  userVideo: any;
  videoScore: any =0;
  lessonCards: any;
  lesson: any;
  myLessonScore: any;
  // globalVideoScore =[];
  globalVideoTotal: number = 0;
  globalVideoScore = [];

  constructor(private appsync: AppsyncService) { }


  async getUserVideoId(user, lesson) {
    this.lesson = Object.assign({}, lesson);


    const [userVideo] = await Promise.all([
      API.graphql(graphqlOperation(GetUser3Video3, { user3Video3User3Id: user.attributes.sub, user3Video3Video3Id: lesson.video })) as Promise<any>
    ]);
    // console.log('userVideo?',(userVideo.data.listUser3Video3s.items.length>0)?userVideo.data.listUser3Video3s.items[0].score:0);
    return (userVideo.data.listUser3Video3s.items.length > 0) ? userVideo.data.listUser3Video3s.items[0].score : 0;
  }


  async getGlobalScores(user) {
    let temp = [];
 
    const [lessons] = await Promise.all([
      API.graphql(graphqlOperation(ListLessonsByUser, { user3Card3User3Id: user.attributes.sub })) as Promise<any>
    ])

    this.globalVideoTotal = lessons.data.listLesson3s.items.length*30;

    lessons.data.listLesson3s.items.map((lesson: any) => {
      this.getUserVideoId(user, lesson).then(d => this.globalVideoScore.push(d))

      lesson.cards3.items.map((card: any) => {
        temp.push({
          'name': lesson.name,
          'cardId': card.id,
          'status': (card.users3.items.length > 0) ? card.users3.items[0].status : 0,
          'score': (card.users3.items.length > 0) ? card.users3.items[0].score : 0
        })
      })
    })

    this.myScore = d3Collection.nest()
      .key(function (d: any) { return d['status']; })
      .rollup(function (leaves: any) {
        return {
          total: d3Array.sum(leaves, function (d) {
            return d['score'];
          }), tally: leaves.length
        } as any
      })
      .entries(temp);

      // console.log('getGlobalScores this.myScore??', this.myScore)

    this.toDo = (this.myScore[0].value.tally) ? this.myScore[0].value.tally : 0;
    this.doing = (this.myScore[1].value.tally) ? this.myScore[1].value.tally : 0;
    this.done = (this.myScore[2].value.tally) ? this.myScore[2].value.tally : 0;
    this.myTotalArray = [this.done, this.doing, this.toDo];

    this.doingScore = (this.myScore[1].value.total) ? this.myScore[1].value.total : 0;
    this.doneScore = (this.myScore[2].value.total) ? this.myScore[2].value.total : 0;


    // this.myScoreArray = [this.done, this.doing];

    this.total = this.myTotalArray.reduce((a, b) => a + b, 0);
    // this.score = this.myScoreArray.reduce((a, b) => a + b, 0);
    // this.videoScore = globalVideoScore.reduce((a, b) => a + b, 0);
    this.videoScore = this.globalVideoScore.reduce((a, b) => a + b, 0);

    
    // console.log('this.globalVideoScore',this.globalVideoScore);
    // console.log('this.done',this.done);
    // console.log('this.videoScore',this.videoScore);

    return [Math.round(this.done), this.total, (this.done/this.total).toFixed(2), (this.doing/this.total).toFixed(2),  (this.videoScore/this.globalVideoTotal).toFixed(2)]
  }


  // async ListLessonsByUserByLesson(lessonId) {

  //   this.appsync.hc().then(client => {
  //     const observable = client.watchQuery({
  //       query: ListLessonsByUserByLesson,
  //       variables: { id: lessonId, user3Card3User3Id: this.user.attributes.sub },
  //       fetchPolicy: 'cache-and-network'
  //     });

  //     observable.subscribe(({ data }) => {
  //       if (!data) {
  //         return console.log('ListLessonsByUserByLesson - no data');
  //       }

  //       this.lesson = data.listLesson3s.items[0];
  //       this.lessonCards = data.listLesson3s.items[0].cards3.items.sort((a, b) => +a['order'] - +b['order']);

  //       this.getModelVideo(this.lesson);

  //       this.getUserVideoId(this.lesson);

  //     });
  //   })
  // }

  async getLessonScores(user, lesson) {
    let videoScore;
    let temp = [];

    this.appsync.hc().then(client => {
      const observable = client.watchQuery({
        query: ListLessonsByUserByLesson,
        variables: { id: lesson.id, user3Card3User3Id: this.user.attributes.sub },
        fetchPolicy: 'cache-and-network'
      });

      observable.subscribe(({ data }) => {
        if (!data) {
          return console.log('ListLessonsByUserByLesson - no data');
        }

        this.lesson = data.listLesson3s.items[0];

        // get video score
        this.getUserVideoId(user, this.lesson.video).then(d => videoScore = d)


        this.lessonCards = data.listLesson3s.items[0].cards3.items;

        this.lessonCards.map((card: any) => {
          temp.push({
            'name': lesson.name,
            'cardId': card.id,
            'status': (card.users3.items.length > 0) ? card.users3.items[0].status : 0,
            'score': (card.users3.items.length > 0) ? card.users3.items[0].score : 0
          })
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

      let toDo = (this.myLessonScore[0].value.tally) ? this.myLessonScore[0].value.tally : 0;
      let doing = (this.myLessonScore[1].value.tally) ? this.myLessonScore[1].value.tally : 0;
      let done = (this.myLessonScore[2].value.tally) ? this.myLessonScore[2].value.tally : 0;
      let myTotalArray = [this.done, this.doing, this.toDo];

      let doingScore = (this.myLessonScore[1].value.total) ? this.myLessonScore[1].value.total : 0;
      let doneScore = (this.myLessonScore[2].value.total) ? this.myLessonScore[2].value.total : 0;


      let myScoreArray = [this.done, this.doing];

      let total = this.myTotalArray.reduce((a, b) => a + b, 0);
      let score = this.myScoreArray.reduce((a, b) => a + b, 0);
      // let videoScore = globalVideoScore.reduce((a, b) => a + b, 0);



      return [done / total, doing / total, score, total, videoScore]
    })
  }


}

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
  done: any;
  myScoreArray: any[];
  total: any;
  myTotalArray: any[];
  score: any;

  constructor(private appsync: AppsyncService) { }


  async getLessons(user) {
    let temp =[];
    const [lessons] = await Promise.all([
      API.graphql(graphqlOperation(ListLessonsByUser,  { user3Card3User3Id: user.attributes.sub })) as Promise<any>
    ])

    lessons.data.listLesson3s.items.map((lesson: any) => {
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
      } as any})
    .entries(temp);

    this.toDo = (this.myScore[0].value.tally) ? this.myScore[0].value.tally : 0;
    this.doing = (this.myScore[1].value.tally) ? this.myScore[1].value.tally : 0;
    this.doingScore = (this.myScore[1].value.total) ? this.myScore[1].value.total : 0;
    this.done = (this.myScore[2].value.tally) ? this.myScore[2].value.tally : 0;
    this.doneScore = (this.myScore[2].value.total) ? this.myScore[2].value.total : 0;
    this.myTotalArray = [this.done, this.doing, this.toDo];
    this.myScoreArray = [this.done, this.doing];
    this.total = this.myTotalArray.reduce((a, b) => a + b, 0);
    this.score = this.myScoreArray.reduce((a, b) => a + b, 0)

    return [this.done/this.total,this.doing/this.total,this.score,this.total]
  }

  async getScores1() {
    await Auth.currentAuthenticatedUser({
      bypassCache: false
    }).then(async user => {
      this.user = user;
    });
    //console.log('userMMMMMM', user);
    this.appsync.hc().then(client => {
      client.query({
        query: ListLessonsByUser,
        fetchPolicy: 'network-only',
        variables: { user3Card3User3Id: this.user.attributes.sub },
        __typename: "ModelUser3Card3Connection"
      }).then(data => {
        data.data.listLesson3s.items.map((lesson: any) => {
          lesson.cards3.items.map((card: any) => {
            this.temp.push({
              'name': lesson.name,
              'cardId': card.id,
              'status': (card.users3.items.length > 0) ? card.users3.items[0].status : 0,
              'score': (card.users3.items.length > 0) ? card.users3.items[0].score : 0
            })
          })
        })
      })
    })
    // console.log('llkl',this.temp)
    return this.temp

  

    // d3Collection.nest()
    //   .key(function (d: any) { return d['status']; })
    //   .rollup(function (leaves: any) {
    //     return {
    //       total: d3Array.sum(leaves, function (d) {
    //         return d['score'];
    //       }), tally: leaves.length
    //     } as any
    //   }).entries(temp)
  }

  async getScores() {
    await Auth.currentAuthenticatedUser({
      bypassCache: false
    }).then(async user => {
      this.user = user;
    });

    // this.appsync.hc().then(client => {
    //   client.watchQuery({
    //     query: getMe,
    //     fetchPolicy: 'cache-only'
    //   }).subscribe(({data}) => {
    //     // console.log('register user, fetch cache', data);
    //     if (data) { this.me = data.me; }
    //   });
    // });

    this.appsync.hc().then(client => {
      const observable = client.watchQuery({
        query: ListLessonsByUser,
        fetchPolicy: 'cache-and-network',
        variables: { user3Card3User3Id: this.user.attributes.sub },
        __typename: "ModelUser3Card3Connection"
      });

      observable.subscribe(({ data }) => {
        if (!data) {
          return console.log('User3Card3 - no data');
        }

        data.listLesson3s.items.map((lesson: any) => {
          lesson.cards3.items.map((card: any) => {
            this.temp.push({
              'name': lesson.name,
              'cardId': card.id,
              'status': (card.users3.items.length > 0) ? card.users3.items[0].status : 0,
              'score': (card.users3.items.length > 0) ? card.users3.items[0].score : 0
            })
          })
        })
      });

      //   observable.subscribeToMore({
      //     document: subscribeToNewUserUsers,
      //     updateQuery: (prev: UsersQuery, {subscriptionData: {data: {subscribeToNewUsers: user }}}) => {
      //       console.log('updateQuery on convo subscription', user, prev);
      //       return this._user.id === user.id ? prev : addUser(prev, user);
      //     }
      //   });
      // });

      this.observedQuery = observable;
      return observable;
    })

    //return this.someFunction(this.temp);
  }

  async someFunction(temp) {
    // return "hello2"
    console.log('rr length', temp.length);
    let temp2 = [];
    await d3Collection.nest()
      .key(function (d: any) { return d['status']; })
      .rollup(function (leaves: any) {
        return {
          total: d3Array.sum(leaves, function (d) {
            return d['score'];
          }), tally: leaves.length
        } as any
      }).entries(temp).map((d: any) => {
        for (let key in d) {
          if (d[key] === "0") {
            return this.toDoScore = d['value']
            // console.log('this.toDoScore???',d['value'])//, d[key] === "done", d['value'].total, d['value'].tally)
          }
          if (d[key] === "done") {
            //console.log('done???', d[key] === "done", d['value'].total, d['value'].tally)
            return this.doneScore = d['value']
          }
          if (d[key] === "doing") {
            //console.log('done???', d[key] === "doing", d['value'].total, d['value'].tally)
            return this.doingScore = d['value']
          }
        }
        temp2.push({ "a": this.toDoScore })
      });
    console.log('somefunc temp2', temp2);
    return temp2;
  }
}

import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { AppsyncService } from '../appsync.service';
import { Auth, Storage } from 'aws-amplify';
import * as d3Array from 'd3-array';
import * as d3Collection from 'd3-collection';
import { CardsPage } from '../../cards/cards.page';


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
  doingScore: any;
  doneScore: any;
  user: any;
  totalScore: any;
  totalTally: any;

  constructor(private appsync: AppsyncService) { }

  async getScores() {
    await Auth.currentAuthenticatedUser({
      bypassCache: false
    }).then(async user => {
      //console.log('user',user)
      this.user = user;
    })

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


        //         {listLesson3s: {…}}
        // listLesson3s:
        // items: Array(17)
        // 0:
        // cards3: {items: Array(33),
        data.listLesson3s.items.map((lessons: any) => {
          lessons.cards3.items.map((cards: any) => {
            // console.log('jdj??',cards.users3.items)
            cards.users3.items.map((usercards: any) => {
              console.log("kl",usercards)
            })
          })
        })

        // console.log('lkj', data);
        // d3Collection.nest()
        //   .key(function (d: any) { return d['status']; })
        //   .rollup(function (leaves: any) {
        //     return {
        //       total: d3Array.sum(leaves, function (d) {
        //         return d['score'];
        //       }), tally: leaves.length
        //     } as any
        //   })
        //   .entries(((data.listLesson3s.items)?data.listLesson3s.items:0)).map((d: any) => {
        //     for (let key in d) {
        //       if (d[key] === "done") {
        //         //console.log('done???', d[key] === "done", d['value'].total, d['value'].tally)
        //         this.doneScore = d['value']
        //       }
        //       if (d[key] === "doing") {
        //         //console.log('done???', d[key] === "doing", d['value'].total, d['value'].tally)
        //         this.doingScore = d['value']
        //       }
        //     }

        //     this.totalScore = this.doneScore.total + this.doingScore.total
        //     this.totalTally = this.doneScore.tally + this.doingScore.tally
        // console.log('this.totalScore',this.totalScore, this.doneScore.total)
        // });
      });
    })
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import gql from 'graphql-tag';
import { API, graphqlOperation } from "aws-amplify";
import { Auth } from 'aws-amplify';
import { AppsyncService } from '../../providers/appsync.service';

// import { AppsyncService } from '../appsync.service';
// import { Auth, Storage } from 'aws-amplify';
// import * as d3Array from 'd3-array';
// import * as d3Collection from 'd3-collection';
// import { CardsPage } from '../../cards/cards.page';
// import { ObservableQuery } from 'apollo-client';
// 

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
  name: 'videoScore'
})
export class VideoScorePipe implements PipeTransform {
  constructor(private appsync: AppsyncService){}
  user: any;
  result: any;
  lesson: any;
  cachedData: any;
  async transform(lesson: any, type?: any) {
    this.lesson = Object.assign({}, lesson);


    Auth.currentAuthenticatedUser({
      bypassCache: false
    }).then(user => {
      this.user = user;
   
    

    this.appsync.hc().then(client => {
      const observable = client.watchQuery({
        query: GetUser3Video3,
        variables: { user3Video3User3Id: this.user.attributes.sub, user3Video3Video3Id: this.lesson.video },
        fetchPolicy: 'cache-and-network'
      });

      observable.subscribe(result => this.cachedData = result);
    })
  })

      // this.cachedData = null;
      // API.graphql(graphqlOperation(GetUser3Video3, { user3Video3User3Id: this.user.attributes.sub, user3Video3Video3Id: this.lesson.video }))
  

    return this.cachedData;


    // this.lesson = Object.assign({}, lesson);
    // //     // this.result = 0;
    // Auth.currentAuthenticatedUser({
    //   bypassCache: false
    // }).then(user => {
    //   this.user = user;
    // })

    // if (this.user) {
    //   const userVideo = await Promise.all([
    //     API.graphql(graphqlOperation(GetUser3Video3, { user3Video3User3Id: this.user.attributes.sub, user3Video3Video3Id: this.lesson.video })) as Promise<any>
    //   ]).then(data => {
    //     this.result = (data[0].data.listUser3Video3s.items.length > 0) ? data[0].data.listUser3Video3s.items[0].score : 0.1
    //   })
    // }

    // return this.result

    //console.log('userVideo comfirming this.result?',result);

    //     let result;




    //     if (lesson) {
    //       // console.log('in video score, what is lesson (updated??),type?',lesson, type)
    //       if (lesson.cards3.items.length < 0) {
    //         result = 0;
    //       }
    //       if (lesson.cards3.items.length > 0) {

    //         for (let i = 0; i < lesson.cards3.items.length; i++) {

    //           //if (lesson.cards3.items.users3.items[0] != null) {

    //           if (lesson.cards3.items[i].lesson3.id == type) {

    //             if (lesson.cards3.items[i].users3.items.length>0) {

    //               //lesson.video
    // console.log('videso',lesson.video, lesson.cards3.items[i].users3.items[0].user3.videos3.items)


    //               result = (lesson.cards3.items[i].users3.items[0].user3.videos3.items[0]) ?lesson.cards3.items[i].users3.items[0].user3.videos3.items[0].score:0;
    //               // if (lesson.cards3.items[i].users3.items[0].user3.videos3.items.length == 0) {
    //               //   result = 1001
    //               // }else{
    //               //   result = lesson.cards3.items[i].users3.items[0].user3.videos3.items[0].score;
    //               // }
    //             }

    //           }

    //           //}
    //         }
    //       }
    //     }
    //     return result;
  }
}

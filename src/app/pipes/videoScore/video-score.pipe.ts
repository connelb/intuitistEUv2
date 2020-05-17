import { Pipe, PipeTransform } from '@angular/core';
import gql from 'graphql-tag';
// import { API, graphqlOperation } from "aws-amplify";
// import { Auth } from 'aws-amplify';
import { AppsyncService } from '../../providers/appsync.service';
import { iif } from 'rxjs';
import { MyAPIService } from '../../API.my';
import { graphqlOperation, API } from 'aws-amplify';
import { skipWhile, tap, mergeMap, filter } from 'rxjs/operators';

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
  constructor(private appsync: AppsyncService, private api: MyAPIService) { }

  lesson: any;
  cachedData: any;
  async transform(lesson: any, userId: any) {

    // async firstTimeCaller(userId, username) {
      const [videoScore] = await Promise.all([
        API.graphql(graphqlOperation(`
        query ListLessonsByUserByLesson($user3Video3Video3Id: ID!, $user3Card3User3Id: ID) {
          getVodAsset(id: $user3Video3Video3Id) {
            users3(filter: {user3Video3User3Id: {eq: $user3Card3User3Id}}) {
              items {
                id
                score
              }
            }
          }
        }
        `, {
          "user3Card3User3Id": userId,
          "user3Video3Video3Id": lesson.video
        })) as Promise<any>
      ])

      if(videoScore.data.getVodAsset){
        for (let key in videoScore.data.getVodAsset){
          if (key == 'users3'){
            console.log('key',key);
            for (let i=0;i<videoScore.data.getVodAsset[key].items.length;i++){
              if(videoScore.data.getVodAsset[key].items[i]){
                this.cachedData = videoScore.data.getVodAsset[key].items[i].score
              }
            }
            // this.cachedData = (videoScore.data.getVodAsset[key].items.length>0)?videoScore.data.getVodAsset[key].items[0].score:0
            // this.cachedData = (videoScore.data.getVodAsset.users3.items.length>0)?videoScore.data.getVodAsset.users3.items[0].score:0
          }
        }
      }
      console.log('videoScore',this.cachedData,this.cachedData/30 || 0)
      return this.cachedData/30 as Number || 0;
    // }

    // const source = this.appsync.getVideos2(userId, lesson.video);
    // //ignore everything but error
    // const example = source.pipe(filter(data => data['getVodAsset']['users3'].items.length>0))
  
    // example.subscribe(
    //   val => this.cachedData = val['getVodAsset']['users3']['items'][0]['score'],
    //   // val => {
    //   //   if (val['getVodAsset']['users3']['items'].length > 0) {
    //   //     val['getVodAsset']['users3']['items'][0]['score']
    //   //   }
    //   // },
    //   val => console.log(`ERROR`),
    //   () => console.log('SECOND COMPLETE!')
    // );

    // return this.cachedData

    //output: 5...6...7...8........
    // const subscribe = example.subscribe(val => 
    //   (val['getVodAsset']['users3'].items.length>0)?val['getVodAsset']['users3'].items[0].score:0
    // );
    // return subscribe



    //   })
    // ).subscribe(next=>

    //   (next)=>next['data']['getVodAsset']
    //   // error:()=>(console.log("error"))
    //   // complete:()=>(console.log("complete??"))
    // )

    // if (lesson.video) {
    //   // console.log(lesson.video)
    //   this.appsync.getVideos2(userId, lesson.video).toPromise
    //   .then(d => {
    //     if (d) {
    //       if (d.users3.items.length > 0) {
    //         let temp
    //         temp = (d.users3.items[0]['score']) ? d.users3.items[0]['score'] : 0
    //         // console.log('d', d.users3.items[0]['score']);d
    //         return temp
    //       }
    //     }
    //   })
    // }
  }
}


  //   return this.appsync.getVideos2(userId, lesson.video).subscribe(d => {
  //     d:()=>(d['data']['getVodAsset']['users3']['items'].length>0) ? 8: 0
  //     error:()=>(console.log("error"))
  //     complete:()=>(console.log("complete??"))
  //   })
  //   return this.cachedData;
  // }
  //     this.cachedData = 0;
  //     this.lesson = Object.assign({}, lesson);
  //     return this.appsync.hc().then(client => {
  //       return client.watchQuery({
  //         query: GetUser3Video3,
  //         variables: { user3Video3User3Id: userId, user3Video3Video3Id: this.lesson.video },
  //         // fetchPolicy: 'cache-only'
  //         fetchPolicy: 'cache-and-network'
  //       })
  //       .subscribe(result => {

  //          {
  //           console.log('result?',result.data.listUser3Video3s.items)
  //           if (!result) {};

  //           result: (anything:any) => {
  //             console.log('anything??',anything)
  //           }


  //           if (result.data.listUser3Video3s) {
  //             this.cachedData = (result.data.listUser3Video3s.items.length > 0) ? result.data.listUser3Video3s.items[0].score : 0.1
  //             // console.log('result of videoScore pipe?',this.cachedData)
  //             }
  //         });
  //       // })
  //       console.log('return this.cachedData', this.cachedData)


  //     // })
  //   // })
  // // }
  // })
  //     })




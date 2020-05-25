import { Component, ViewChild, ElementRef, ChangeDetectorRef, ViewEncapsulation, Input } from '@angular/core';
import { Platform, ModalController, AlertController, ToastController } from '@ionic/angular';
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { Router } from '@angular/router';
import { Auth, Storage } from 'aws-amplify';
//import * as d3 from 'd3';
import { AmplifyService } from 'aws-amplify-angular';
import { AppsyncService } from '../providers/appsync.service';
//import { Lesson3 } from "./../../models";
//import * as subscriptions from './../../graphql/subscriptions'
//import { APIService } from '../API.service';
import { ObservableQuery } from 'apollo-client';
// import {OnCreateLesson3Subscription} from './../API.service';
import gql from 'graphql-tag';
//import { rollup, group } from 'd3-array';
import * as d3Array from 'd3-array';
import * as d3Hierachy from 'd3-hierarchy';
import * as d3Collection from 'd3-collection';

import { DataStore, Predicates } from "@aws-amplify/datastore";
import { User3Card3, Lesson3, Card3, User3, User3Video3 } from "./../../models";
import { from } from 'rxjs';
import { Network } from '@ngx-pwa/offline';
import { ScoreService } from '../providers/score/score.service';
import { TotalScorePipe } from '../pipes/totalScore/total-score.pipe';

import { MyAPIService } from '../API.my';
import {ModelUser3Video3FilterInput} from "../API.service";
import { filter } from 'rxjs/operators';
import { ReviewModalPage } from '../review-modal/review-modal.page';
import { TestModalPage } from '../test-modal/test-modal.page';
import { VideoModalPage } from '../video-modal/video-modal.page';


//import Amplify from "@aws-amplify/core";


const ListLessonsNames1 = gql`  
  query listLesson3 {
    listLesson3s {
      items {
        id
        name
        description
        level
      }
    }
  }
`;

const ListLessonsNames = `  
  query listLesson3 {
    listLesson3s {
      items {
        id
        name
        description
        level
      }
    }
  }
`;

const Progress = `
query getUserCardStatus ($id: ID!) {
  getUser3(id: $id) {
    cards3 {
      items {
        id
        status
        score
      }
    }
  }
}`;

const SubscriptionOnCreateLesson3 =
  gql`
subscription OnCreateLesson3 {
  onCreateLesson3 {
    id
    name
    section
    subSection
    level
    video
    keywords
    cards3 {
      items {
        id
        question
        answer
        audio
        video
        level
        keywords
      }
      nextToken
    }
  }
}`;


const ListLessonsData = gql`
query ListLessonsData ($user3Card3User3Id: ID!){
  listLesson3s {
    items {
      id
      name
      description
      section
      subSection
      video
      cards3 {
        items {
          id
          users3(filter:{user3Card3User3Id:{eq:$user3Card3User3Id}}) {
            items {
              id
              score 
              status
            }
          }
        }
      }
    }
  }
}
`

// query ListVideos {
//   listUser3Video3s(filter: {user3Video3User3Id: ""}) {
//     items {
//       id
//       video3 {
//         id
//         users3(filter:{id:{eq:""}}) {
//           items {
//             id
//           }
//         }
//       }
//     }
//   }
// }

const ListVideosData = gql`
query ListVideosData($user3Video3User3Id: ID!) {
  listUser3Video3s(filter:{user3Video3User3Id:{eq:$user3Video3User3Id}}) {
    items {
      id
      score
      user3 {
        id
      }
      video3{id}
    }
  }
}
`

const GetUser3Video3Score =
  `query GetUser3Video3 ($user3Video3Video3Id: ID!,$user3Video3User3Id: ID!) {
  listUser3Video3s(filter: {user3Video3Video3Id:{eq:$user3Video3Video3Id}, user3Video3User3Id: {eq: $user3Video3User3Id}}) {
    items {
      id
      score
      status
    }
  }
}
`

const getMe = gql`
query getMe {
  me {
    username
    id
  }
}`;

const getScores = gql`
query getUser3($id:ID!) {
  getUser3(id: $id) {
    cards3 {
      items {
        card3 {
          id
          lesson3 {
            id
          }
        }
        id
        score
        status
      }
    }
    videos3 {
      items {
        score
        status
        video3 {
          video {
            id
          }
        }
      }
    }
  }
}`

const ListLessonsByUser = gql`
query ListLessonsByUser($user3Card3User3Id: ID!) {
  listLesson3s {
    __typename
    items {
      __typename
      id
      name
      description
      section
      subSection
      level
      video
      keywords
      _version
      _deleted
      _lastChangedAt
      cards3(limit:60) {
        __typename
        items {
          id
          question
          answer
          audio
          order
          lesson3 {
            __typename
            id
            name
            description
            section
            subSection
            level
            video
            keywords
            _version
            _deleted
            _lastChangedAt
          }
          users3(filter: {user3Card3User3Id: {eq: $user3Card3User3Id}}) {
            __typename
            items {
              user3 {
                id
                videos3 {
                  __typename
                  items {
                    id
                    status
                    score
                  }
                }
              }
              id
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

// `query ListLesson3s($filter: ModelLesson3FilterInput, $limit: Int, $nextToken: String) {
//   listLesson3s(filter: $filter, limit: $limit, nextToken: $nextToken) {
//     __typename
//     items {
//       __typename
//       id
//       name
//       description
//       section
//       subSection
//       level
//       video
//       keywords
//       cards3 {
//         __typename
//         nextToken
//         startedAt
//       }
//       _version
//       _deleted
//       _lastChangedAt
//     }
//     nextToken
//     startedAt
//   }
// }`

const ListLessonsByUserInitial = gql`
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
      cards3 {
        items {
          id
          question
          answer
          audio
          lesson3 {
            id
            video
          }
          users3(filter: {user3Card3User3Id: {eq: $user3Card3User3Id}}) {
            items {
              id
              score
              status
            }
          }
        }
      }
    }
  }
}
`

@Component({
  selector: 'app-lessons',
  templateUrl: 'lessons.page.html',
  styleUrls: ['lessons.page.scss']
})
export class LessonsPage {
  // data$ = from(DataStore.query(User3Card3, Predicates.ALL));
  online$ = this.network.onlineChanges;

  observedQuery: ObservableQuery;
  subscription: () => void;

  authState: any;
  public lessons;

  public width: number = 0;
  public height: number = 0;


  // public flashCardFront: string = "Front text";
  // public flashCardBack: string = "Back text";
  image: any;
  //showPhoto: boolean;
  profile: String;
  video_1: any;
  id: any;
  progress: any;
  progress1: any;
  doing: any;
  done: any;
  lessons3: any;
  data: any;
  reduceFn: any;
  groupingFns: any;
  hierarchyData: any;
  videoSummary: any;
  lessons1: any[];
  idAdmin: boolean = false;
  User3Card3: any;
  user: any;
  currentScores: any;

  doneScore: any;
  doingScore: any;
  currentScore: any;
  totalScore: any;
  videoScore: any;
  doneScore1: any;
  doingScore1: any;
  currentScore1: any;
  totalScore1: any;
  videoScore1: any;

  constructor(
    protected network: Network,
    protected amplifyService: AmplifyService,
    private appsync: AppsyncService,
    private modalController: ModalController,
    private router: Router, private platform: Platform,
    public toastController: ToastController,
    private score1: ScoreService,
    private myApi: MyAPIService ) {

  }

  async ngOnInit() {

    await Auth.currentAuthenticatedUser({
      bypassCache: false
    }).then(async user => {
      this.user = user;
    });

    this.idAdmin = this.user.signInUserSession.accessToken.payload["cognito:groups"][0] == 'Admin';
    this.upDateScores();
    // setTimeout(() => {
      this.ListLessonsByUser()

      //getVideoByLesson(userId,videoId)
      // this.appsync.getVideos("e12517c0-479f-4088-aa10-a2cf57a24ba2", "8dedf06d-79d0-40b4-a65e-a3ca6812ded6")
      // .subscribe(d=>d)

      // this.appsync.ListUser3Card3s("e12517c0-479f-4088-aa10-a2cf57a24ba2").subscribe(d=>console.log(d))

    // const cognitUser = await Auth.currentAuthenticatedUser();
    // const videStuu: ModelUser3Video3FilterInput ={
    //   'id': "285219b3-062c-4a63-968e-04e10fdbff6a"
    // }
    // const loginedUser = await this.myApi.ListUser3Video3s(filter:{videStuu})//GetUser(cognitUser.username);
    // console.log('loginedUser',loginedUser.items);
    //this.user007 = loginedUser;
    // }, 500);



    // let subscription = DataStore.observe(User3Card3, '0524f4f6-b9d7-4fe2-80a7-4bb242b17851').subscribe(msg => {
    //   console.log("subscription",msg.model, msg.opType, msg.element);
    // });

    
    // const post = await DataStore.query(User3Card3, "02311b36-75f8-4fe3-9d94-9bba395d017d");
    // console.log('post',post);

    // await DataStore.save(
    //   new Lesson3({
    //     "name": "testingDatamodels",
    //     "description": "testingDatamodels"
    //   })
    // );


    // id: ID
    // status: videoStatus
    // score: Int
    // user3: User3! @connection(name:"UserVideos3")
    // video3: vodAsset! @connection(name:"VideoUsers3")
    
    // id:ID!
    // title:String!
    // description:String!
    // users3: [User3Video3] @connection(name:"VideoUsers3")
  
    // #DO NOT EDIT
    // video:videoObject @connection

    // await DataStore.save(
    //   new Post({
    //     title: "My First Post",
    //     rating: 10,
    //     status: PostStatus.ACTIVE
    //   })
    // );

  }

  // counter;
  // constructor(private appsyncService: AppsyncService) {}
  // ngOnInit() {
  //   this.getVote();
  //   this.subscriptionVote();
  // }
  // getVote(): void {
  //   this.appsyncService.getAppsyncVote().subscribe(result => {
  //     this.counter = result;
  //   });
  // }
  // subscriptionVote(): void {
  //   this.appsyncService.onUpdateAppsyncVote().subscribe(result => {
  //     this.counter = result['value']['data']['onUpdateAppsyncVote']['vote'];
  //   });
  // }


  async upDateScores(){
    this.score1.getGlobalScores(this.user).then(data => {
      if (!data) { () => console.log("no data") }

      console.log('lessons refresh scores',data);

      this.doneScore1 = data[0];//includes video
      this.totalScore1 = data[1];
      // this.donePercent = data[2];
      // this.doingPercent = data[3];
      // this.videoPercent = data[4];
     
    })
  }

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.width = this.platform.width();
      this.height = this.platform.height();
    });
  }

  async presentVideo(lesson) {

    // async getModelVideo(lesson) {
    //   const [modelVideo] = await Promise.all([
    //     API.graphql(graphqlOperation(GetModelVideo, { id: lesson.video })) as Promise<any>
    //   ])
    //   // console.log('modelVideo',modelVideo)
    //   this.modelVideoId = modelVideo.data.getVodAsset.video.id;
    // }
  
    // async presentVideo() {
    //   const modal = await this.modalController.create({
    //     component: VideoModalPage,
    //     componentProps: {
    //       id: this.modelVideoId,
    //       name: this.lesson.name
    //     }
    //   });


    const modal = await this.modalController.create({
      component: VideoModalPage,
      componentProps: {
        lesson: lesson
      }
    });
    await modal.present();

    modal.onDidDismiss().then((data) => {
      // this.videoStatus = data['data'];

      // var x = d3Scale.scaleLinear()
      //   .domain([0, this.videoStatus.duration])
      //   .range([0, 30]);

      // let videoScore = Math.ceil(x(this.videoStatus.currentTime));
      // // this.videoScoreUpdate(videoScore);
      // this.updateVideoPWA(videoScore);

    }).then(() => {
      // perhaps open test modal??
      // or update score?
     
    } );
  }
  
  async presentTestModal(lesson,i){
    const modal = await this.modalController.create({
      component: TestModalPage,
      componentProps: {
        // id: this.modelVideoId,
        lesson: lesson
      }
    });
    await modal.present();
    modal.onDidDismiss().then((data) => {

      

      console.log('this is the array to update', data)

    }).then(() => console.log('modal closed'));
  }

  async presentModal(lesson,i){
    const modal = await this.modalController.create({
      component: ReviewModalPage,
      componentProps: {
        // id: this.modelVideoId,
        lesson: lesson
      }
    });
    await modal.present();
    modal.onDidDismiss().then((data) => {



      console.log('this is the array to update', data)

    }).then(() => console.log('modal closed'));
  }


  // getTotal(res) {
  //   return res.data.getUser3.cards3.items.reduce(function (tot, record) {
  //     return tot + record['score'];
  //   }, 0);
  // }


  // getProgress(res) {
  //   return d3Collection.nest()
  //     .key(function (d: any) { return d['status']; })
  //     .rollup(function (leaves: any) {
  //       return {
  //         total: d3Array.sum(leaves, function (d) {
  //           return d['score'];
  //         }), tally: leaves.length
  //       } as any
  //     })
  //     .entries(res.data.getUser3.cards3.items);
  // }

  showCards(lessonId) {
    // this.router.navigate(['/cards', deck.id]);
    this.router.navigate(['/app/tabs/lessons/', lessonId]);
    //this.router.navigate(['/app/tabs/lessons']);
    // this.router.navigate(['app','tabs','lessons', lesson.id]);
    //this.router.navigateByUrl(`/app/tabs/lessons:${lesson.id}`,{ replaceUrl: true });
  }

  // async presentToast() {
  //   const toast = await this.toastController.create({
  //     message: 'Your settings have been saved.',
  //     duration: 2000
  //   });
  //   toast.present();
  // }

  async ListLessonsByUser() {
    // await Auth.currentAuthenticatedUser({
    //   bypassCache: false
    // }).then(async user => {
    //   this.user = user;
    // });

    // ListLessonsByUserInitial

    await this.appsync.hc().then(client => {
      const observable: ObservableQuery = client.watchQuery({
        query: ListLessonsByUser,
        variables: { user3Card3User3Id: this.user.attributes.sub },
        fetchPolicy: 'cache-and-network'
      });

      observable.subscribe(({ data }) => {
        if (!data) { return console.log('ListLessonsByUser: no data'); }
        
        this.lessons = data.listLesson3s.items.sort((a, b) => +a.level - +b.level);
        console.log('this.lessons',this.lessons)
        //this.formatListLessonsByUser(data);
      });


      // observable.subscribeToMore({
      //   document: subscribeToNewUserUsers,
      //   updateQuery: (prev: UsersQuery, {subscriptionData: {data: {subscribeToNewUsers: user }}}) => {
      //     console.log('updateQuery on convo subscription', user, prev);
      //     // return this._user.id === user.id ? prev : addUser(prev, user);
      //   }
      // });

      this.observedQuery = observable;
      return observable;
    });
  }

  public signOut() {
    this.amplifyService.auth().signOut();
  }

  // reloadItems(refresher): void {
  //   //this.getData().then(refresher.target.complete());
  // }

}


    // const reduceFn = data => d3Array.sum(data, d => d['score']);

    // const rollupData = d3Array.rollup(myData, reduceFn, d => d['name']);

    // console.log('rollupData:',rollupData);

    // const childrenAccessorFn = ([key, value]) => value.size && Array.from(value)

    // this.hierarchyData = d3Hierachy.hierarchy([null, rollupData], childrenAccessorFn)
    //   .sum(([key, value]) => value)
    //  .sort((a, b) => b.value — a.value)
    //console.log(' this.hierarchyData.children?', this.hierarchyData.children)

    // const root = d3Hierachy.pack()
    //   .size([200, 200])
    //   .padding(3)
    //   (this.hierarchyData
    //     .sum(d => d.value)
    //     .sort((a, b) => b.value - a.value))

  // join(lookupTable, mainTable, lookupKey, mainKey, select) {
  //   var l = lookupTable.length,
  //     m = mainTable.length,
  //     lookupIndex = [],
  //     output = [];
  //   for (var i = 0; i < l; i++) { // loop through l items
  //     var row = lookupTable[i];
  //     lookupIndex[row[lookupKey]] = row; // create an index for lookup table
  //   }
  //   for (var j = 0; j < m; j++) { // loop through m items
  //     var y = mainTable[j];
  //     var x = lookupIndex[y[mainKey]]; // get corresponding row from lookupTable
  //     output.push(select(y, x)); // select only the columns you need
  //   }
  //   return output;
  // };


// how to get lessons data like this?
// data = {
//   "name": "flare",
//   "children": [
//    {
//     "name": "Chapter 1",
//     "children": [
//      {
//       "name": "section 1",
//       "children": [
//        {"name": "subsection 1a", "value": 1},
//        {"name": "subsection 1b", "value": 1},
//        {"name": "subsection 1c", "value": 1},
//        {"name": "subsection 1d", "value": 1}
//       ]
//      },
//      {
//       "name": "section 2",
//       "children": [
//        {"name": "subsection 2a", "value": 1},
//        {"name": "subsection 2b", "value": 1},
//        {"name": "subsection 2c", "value": 1},
//        {"name": "subsection 2d", "value": 1}
//       ]
//      },
//      {
//       "name": "section 3",
//       "children": [
//        {"name": "subsection 3a", "value": 1},
//        {"name": "subsection 3b", "value": 1},
//        {"name": "subsection 3c", "value": 2},
//        {"name": "subsection 4d", "value": 2}
//       ]
//      }
//     ]
//    },
//    {
//     "name": "Chapter 2",


    // console.log(summary.data.listLesson3s.items.map(d => {
      //  return  d.cards3.items.map(dd => {return dd.id})}))


      // this.formatData(this.data);


      // how to get lessons data like this?
      // data = {
      //   "name": "flare",
      //   "children": [
      //    {
      //     "name": "Chapter 1",
      //     "children": [
      //      {
      //       "name": "section 1",
      //       "children": [
      //        {"name": "subsection 1a", "value": 1},
      //        {"name": "subsection 1b", "value": 1},
      //        {"name": "subsection 1c", "value": 1},
      //        {"name": "subsection 1d", "value": 1}
      //       ]


      //? 
// Node {data: Array(2), height: 1, depth: 0, parent: null, children: Array(1), …}
// data: Array(2)
// 0: null
// 1: Map(1)
// [[Entries]]
// 0: {"lesson_1" => 20}
// size: (...)
// __proto__: Map
// length: 2
// __proto__: Array(0)
// height: 1
// depth: 0
// parent: null
// children: Array(1)
// 0: Node
// data: Array(2)
// 0: "lesson_1"
// 1: 20
// length: 2
// __proto__: Array(0)
// height: 0
// depth: 1
// parent: Node
// data: Array(2)
// 0: null
// 1: Map(1)
// [[Entries]]
// 0: {"lesson_1" => 20}
// size: (...)
// __proto__: Map
// length: 2
// __proto__: Array(0)
// height: 1
// depth: 0
// parent: null
// children: Array(1)
// 0: Node
// data: (2) ["lesson_1", 20]
// height: 0
// depth: 1
// parent: Node
// data: (2) [null, Map(1)]
// height: 1
// depth: 0
// parent: null
// children: [Node]
// value: 20
// __proto__: Object
// value: 20
// __proto__: Object
// length: 1
// __proto__: Array(0)
// value: 20
// __proto__: Object
// value: 20
// __proto__: Object
// length: 1
// __proto__: Array(0)
// value: 20
// __proto__: Object
      // name: String!
      // section: String
      // subSection: String
      // level:String

      // const data = [
      //   {name: "jim",   amount: "34.0",   date: "11/12/2015"},
      //   {name: "carl",  amount: "120.11", date: "11/12/2015"},
      //   {name: "carl",  amount: "10.31", date: "11/12/2015"},
      //   {name: "stacy", amount: "12.01",  date: "01/04/2016"},
      //   {name: "stacy", amount: "1233.01",  date: "01/04/2016"},
      //   {name: "stacy", amount: "34.05",  date: "01/04/2016"}
      // ];


      // {
      //   "data": {
      //     "listLesson3s": {
      //       "items": [
      //         {
      //           "id": "5db0d538-35e9-429b-80e4-98f5a91ca228",
      //           "section": null,
      //           "subSection": null,
      //           "cards3": {
      //             "items": [
      //               {
      //                 "id": "3f4fb79e-8d69-4b05-b516-208bcadacc0a",  //card
      //                 "users3": {
      //                   "items": [
      //                     {
      //                       "id": "070ab387-c4d5-492d-890a-a88d515a7142", //usercard
      //                       "score": null,
      //                       "status": "doing"
      //                     }
      //                   ]
      //                 }
      //               },
      //               {
      //                 "id": "90432934

      // {id:"", question:"", answer:"",status:"",score:Int}
      // { "key": "doing", "value": { "total": 10, "tally": 1 } }
      // [ { "id": "5db0d538-35e9-429b-80e4-98f5a91ca228", "name": "lesson_1", "level": null } ]

      //data.listLesson3s.items.length === number of lessons
      //data.listLesson3s.items.map(d=>{d.cards3.items.length}) === no. of cards per lesson
      // data.listLesson3s.items.map(d=>{d.cards3.items.map(dd=>{dd.users3.items.map(ddd=>{console.log(
      //  return ({lessonId:d.id, name: d.name, section:d.section, cardId:dd.id, userCardId:ddd.id, score:ddd.score, status:ddd.status})

      //))})}) 

      //score a tally of summation of cards
      // number of doing
      // number of done
      // total number of cards

      // lesssons
      // cards- sum cards? for total
      // users
      // usercards - filter by?

      //d3.sum(this.data.map(d => d)[0], d => {return +d[0]['score']})

      //console.log(group(this.data.map(d => d)[0], d => d['name']))
      //)//,this.data[0], group(this.data[0], d => d['name']))

      // let nest = d3.nest()
      // .key(d => d['name'])
      // .entries(this.data)

      //   console.log('nest',this.data,rollup(
      //     this.data,
      //     d => d.length, // reducerFn
      //     d => d['name']    // keyToGroupBy
      //  ))




      // let reduceFn = d3.sum(this.data, d => d['score']);

      // let groupingFns = [d => d['name']]
      //let rollupData = d3.rollup(this.data.map(d => d)[0], reduceFn, groupingFns);
      // const childrenAccessorFn = ([ key, value ]) => value.size && Array.from(value)

      // const hierarchyData = d3.hierarchy([null, rollupData], childrenAccessorFn)
      //  .sum(([key, value]) => value)
      //  .sort((a, b) => b.value — a.value)

      //  console.log('hierarchyData',hierarchyData);


      // rollupData = d3.rollup(this.lessons, reduceFn, …groupingFns);

       // async saveToDatastore(data) {


  //   // const original = await DataStore.query<User3Card3>(User3Card3, "d26e05c0-9d1c-40be-9191-8508faf76872");

  //   // await DataStore.save(
  //   //   User3Card3.copyOf(original, updated => {
  //   //     updated.status = 'DONE';
  //   //     updated.score = 10;
  //   //   })
  //   // );

  //   // await DataStore.save(
  //   //   new Lesson3({
  //   //     //id: summary.data.listLesson3s.items[i].id,
  //   //     name: summary.data.listLesson3s.items[i].description as string ||"test",
  //   //     description: summary.data.listLesson3s.items[i].description || "",
  //   //     cards3: summary.data.listLesson3s.items[i].cards3,
  //   //     // videoId: (summary.data.listLesson3s.items[i].video == videoSummary.data.listUser3Video3s.items[j].video3.id) ? videoSummary.data.listUser3Video3s.items[j].id : null,
  //   //     // videoScore: (summary.data.listLesson3s.items[i].video == videoSummary.data.listUser3Video3s.items[j].video3.id) ? videoSummary.data.listUser3Video3s.items[j].score : null,
  //   //   })
  //   // );

  //   // lessonId: d.id,
  //   // name: d.name,
  //   // section: d.section,
  //   // cardId: dd.id,
  //   // userCardId: ddd.id,
  //   // score: ddd.score,
  //   // status: ddd.status
  //   // await DataStore.delete(Lesson3, Predicates.ALL);
  //   // for (let i = 0; i < data.length; i++) {
  //   //   //console.log(data[i]);
  //   //   await DataStore.save(
  //   //     new Lesson3({
  //   //       // readonly id: string;
  //   //       // readonly name: string;
  //   //       // readonly description?: string;
  //   //       // readonly section?: string;
  //   //       // readonly subSection?: string;
  //   //       // readonly level?: string;
  //   //       // readonly video?: string;
  //   //       // readonly keywords?: string;
  //   //       // readonly cards3?: Card3[];
  //   //       //
  //   //       name: data[i].name,
  //   //       section: data[i].section,
  //   //       //card3:{}
  //   //     })
  //   //   )

  //   // }
  // }


    // await DataStore.save(
    //   new User3({
    //     username: "chuck"
    //   })
    // )

    // DataStore.observe(Lesson3 as any).subscribe(msg => {
    //   if (msg.opType === "INSERT") {
    //     console.log('SUBSCRIPTION_of Lessons UPDATE', msg.opType);
    //     //       this.state.todos.unshift(task);
    //   }
    //   // this.User3Card3 = await DataStore.query(User3Card3 as any);
    //   // console.log(this.User3Card3);
    // });

    // DataStore.observe(User3Video3 as any).subscribe(msg => {
    //   if (msg.opType === "INSERT") {
    //     console.log('SUBSCRIPTION_UPDATE, ', msg.opType);
    //     //       this.state.todos.unshift(task);
    //   }

      // this.User3Card3 = c
      // console.log(this.User3Card3);
    //});

    // subscription = DataStore.observe(Post).subscribe(msg => {
    //   console.log('SUBSCRIPTION_UPDATE', msg);
    //   this.onQuery();
    // });


  // subscription$() {
  //   DataStore.observe(User3Card3 as any).subscribe(msg => {
  //     this.list();
  //     console.log(msg);
  //   });
  // }

  // async create() {
  //   //await DataStore.delete(User3 as any, Predicates.ALL);

  //   await DataStore.query(User3 as any, "e43827eb-32e3-4787-8754-b44162a0bc91").then((res) => {
  //     const myUser3 = res

  //   console.log('res?',res);
  //   //const myCard3 = from(DataStore.query(Card3 as any, ""));

  //   // const myUser3 = await DataStore.query(
  //   //   new User3({
  //   //     id: "e43827eb-32e3-4787-8754-b44162a0bc91",
  //   //   })
  //   // ).then(
  //   //   (res) => {
  //   //     console.log('model.id', res[0], res[0].id);
  //   //   });

  //   DataStore.save(
  //     new User3Card3({
  //       score: 333,
  //       status: "DONE",
  //       user3: {id:res.id,username:res.username},
  //       //user3: "e43827eb-32e3-4787-8754-b44162a0bc91",
  //       //card3: "fd332bc3-9af5-407e-9626-170ad3634501"
  //       card3: {id: "fd332bc3-9af5-407e-9626-170ad3634501", question: "uheh", answer: "llskks"},
  //     })
  //   ).then(
  //     (res) => {
  //       console.log('model.id', res[0], res[0].id);

  //       // DataStore.save(
  //       //   User3Card3.copyOf(res[0], updated => {
  //       //     updated.id = "fd332bc3-9af5-407e-9626-170ad3634501";
  //       //     updated.score = 45;
  //       //   })
  //       // )

  //       //_version: undefined
  //       // _lastChangedAt: undefined
  //       // _deleted: undefined
  //     }
  //   );
  // });
  // }

  // list() {
  //   this.data$ = from(DataStore.query(User3Card3, Predicates.ALL));
  // }

  // delete(id: string) {
  //   this.fetch(id).subscribe(item => DataStore.delete(item));
  // }

  // fetch(id: string) {
  //   return from(DataStore.query(User3Card3 as any, id));
  // }







    // const original = await DataStore.query<User3Card3>(User3Card3, "d26e05c0-9d1c-40be-9191-8508faf76872");

    // await DataStore.save(
    //   User3Card3.copyOf(original, updated => {
    //     updated.status = 'DONE';
    //     updated.score = 10;
    //   })
    // );

    // const subscription = DataStore.observe<User3Card3>(User3Card3).subscribe(msg => {
    //   console.log('model:',msg.model, 'opType:',msg.opType, 'element:', msg.element);
    // });



    //this.saveToDatastore(temp);






    // const original = await DataStore.query<User3Card3>(User3Card3, "d26e05c0-9d1c-40be-9191-8508faf76872");

    // await DataStore.save(
    //   User3Card3.copyOf(original, updated => {
    //     updated.status = 'DONE';
    //     updated.score = 10;
    //   })
    // );

    // const subscription = DataStore.observe<User3Card3>(User3Card3).subscribe(msg => {
    //   console.log('model:',msg.model, 'opType:',msg.opType, 'element:', msg.element);
    // });


    // const reduceFn = data => d3Array.sum(data, d => d['score']);

    // const rollupData = d3Array.rollup(myData, reduceFn, d => d['name']);

    // console.log('rollupData:',rollupData);

    // const childrenAccessorFn = ([key, value]) => value.size && Array.from(value)

    // this.hierarchyData = d3Hierachy.hierarchy([null, rollupData], childrenAccessorFn)
    //   .sum(([key, value]) => value)
    //  .sort((a, b) => b.value — a.value)
    //console.log(' this.hierarchyData.children?', this.hierarchyData.children)

    // const root = d3Hierachy.pack()
    //   .size([200, 200])
    //   .padding(3)
    //   (this.hierarchyData
    //     .sum(d => d.value)
    //     .sort((a, b) => b.value - a.value))

    //this.saveToDatastore(temp);

        //sub to User3Card3 changes
    //this.subscription$();

    //await this.getData();

    //this.API.OnCreateUser3Card3Subscription

    // await API.OnCreateUser3Card3Subscription.subscribe(event => {
    //   const newUser3Card3 = event.value.data.OnCreateUser3Card3Subscription;
    //   this.myUser3Card3 = [newUser3Card3, ...this.myUser3Card3];
    // });

    // async getData() {
  //   await Auth.currentAuthenticatedUser({
  //     bypassCache: false
  //   }).then(async user => {


  //     const [lessons, progress, summary, videoSummary] = await Promise.all([
  //       API.graphql(graphqlOperation(ListLessonsNames)) as Promise<any>,
  //       API.graphql(graphqlOperation(Progress, { id: user.attributes.sub })) as Promise<any>,
  //       API.graphql(graphqlOperation(ListLessonsData, { user3Card3User3Id: user.attributes.sub })) as Promise<any>,
  //       API.graphql(graphqlOperation(ListVideosData, { user3Video3User3Id: user.attributes.sub })) as Promise<any>
  //     ])

  //     if (progress.data.getUser3) {
  //       this.progress = this.getProgress(progress);
  //       this.progress['total'] = this.getTotal(progress);
  //     }

  //     // this.lessons = lessons.data.listLesson3s.items;


  //     // let myLessons:any  = await DataStore.query<User3>(User3);
  //     // // let todos:any = await DataStore.query<Todo>(Todo);
  //     // console.log('myLessons: ', myLessons)

  //     // if (summary) {
  //     //   // console.log('videoSummary', videoSummary)
  //     //   // this.lessons = summary.data.listLesson3s.items;
  //     //   this.formatData(summary);
  //     // }

  //     this.formatVideoData(summary, videoSummary)
  //   });
  // }


  // async formatVideoDataOld(summary, videoSummary) {
  //   let temp = [];
  //   if (videoSummary.data.listUser3Video3s.items.length < 1) {
  //     for (let i = 0; i < summary.data.listLesson3s.items.length; i++) {
  //       temp.push(
  //         {
  //           id: summary.data.listLesson3s.items[i].id,
  //           name: summary.data.listLesson3s.items[i].name,
  //           description: summary.data.listLesson3s.items[i].description,
  //           cards3: summary.data.listLesson3s.items[i].cards3
  //         }
  //       )
  //     }
  //   } else {
  //     for (let i = 0; i < summary.data.listLesson3s.items.length; i++) {
  //       for (let j = 0; j < videoSummary.data.listUser3Video3s.items.length; j++) {
  //         temp.push(
  //           {
  //             id: summary.data.listLesson3s.items[i].id,
  //             name: summary.data.listLesson3s.items[i].name,
  //             description: summary.data.listLesson3s.items[i].description,
  //             cards3: summary.data.listLesson3s.items[i].cards3,
  //             videoId: (summary.data.listLesson3s.items[i].video == videoSummary.data.listUser3Video3s.items[j].video3.id) ? videoSummary.data.listUser3Video3s.items[j].id : null,
  //             videoScore: (summary.data.listLesson3s.items[i].video == videoSummary.data.listUser3Video3s.items[j].video3.id) ? videoSummary.data.listUser3Video3s.items[j].score : null,
  //           }
  //         )
  //       }
  //     }
  //   }
  //   this.lessons = temp;
  // }

  // async formatVideoData(summary, videoSummary) {
  //   console.log('summary.listLesson3s.items.length...:', summary.listLesson3s.items, videoSummary);
  //   let temp = [];
  //   if (videoSummary.data.listUser3Video3s.items.length < 1) {
  //     for (let i = 0; i < summary.listLesson3s.items.length; i++) {
  //       temp.push(
  //         {
  //           id: summary.listLesson3s.items[i].id,
  //           name: summary.listLesson3s.items[i].name,
  //           description: summary.listLesson3s.items[i].description,
  //           cards3: summary.listLesson3s.items[i].cards3
  //         }
  //       )
  //     }
  //   } else {
  //     for (let i = 0; i < summary.listLesson3s.items.length; i++) {
  //       for (let j = 0; j < videoSummary.data.listUser3Video3s.items.length; j++) {
  //         temp.push(
  //           {
  //             id: summary.listLesson3s.items[i].id,
  //             name: summary.listLesson3s.items[i].name,
  //             description: summary.listLesson3s.items[i].description,
  //             cards3: summary.listLesson3s.items[i].cards3,
  //             videoId: (summary.listLesson3s.items[i].video == videoSummary.data.listUser3Video3s.items[j].video3.id) ? videoSummary.data.listUser3Video3s.items[j].id : null,
  //             videoScore: (summary.listLesson3s.items[i].video == videoSummary.data.listUser3Video3s.items[j].video3.id) ? videoSummary.data.listUser3Video3s.items[j].score : null,
  //           }
  //         )
  //       }
  //     }
  //   }
  //   this.lessons = temp;
  // }


  // async formatVideoData(data, lessons) {
  //   let temp = [];
  //   await data.data.listUser3Video3s.items.map(d => {
  //     temp.push({
  //       id: d.id,
  //       score: d.score,
  //       userId: d.user3.id,
  //       videoId: d.video3.id
  //     })
  //   })
  //   this.videoSummary = temp;

  //   this.lessons = await this.join(temp, lessons, "video", "videoId", function (temp2, temp3) {
  //     return {
  //       id: temp2.id,
  //       name: temp2.name,
  //       description: temp2.description,
  //       cards3: temp2.cards3,
  //       videoId: (temp3.id) ? temp3.id : null,
  //       videoScore: (temp3.score) ? temp3.score : null,
  //     };
  //   })
  // }


  // async formatData(data) {
  //   let temp = [];
  //   await data.data.listLesson3s.items.map(d => {
  //     return d.cards3.items.map(dd => {
  //       return dd.users3.items.map(ddd => {
  //         temp.push({
  //           lessonId: d.id,
  //           name: d.name,
  //           section: d.section,
  //           cardId: dd.id,
  //           userCardId: ddd.id,
  //           score: ddd.score,
  //           status: ddd.status
  //         })
  //       })
  //     })
  //   })
  //   this.data = temp;

  // }


  // async getScores() {
  //   await Auth.currentAuthenticatedUser({
  //     bypassCache: false
  //   }).then(async user => {
  //     this.user = user;
  //   });

  //   this.appsync.hc().then(client => {
  //     const observable: ObservableQuery = client.watchQuery({
  //       query: getScores,
  //       variables: { id: this.user.attributes.sub },
  //       fetchPolicy: 'cache-and-network'
  //     });

  //     observable.subscribe(({ data }) => {
  //       if (!data) { return console.log('getScores: no data'); }
  //       this.formatGetScores(data);
  //     });

  //     this.observedQuery = observable;
  //     return observable;
  //   });
  // }


  // async getLessons() {
  //   this.appsync.hc().then(client => {
  //     const observable: ObservableQuery = client.watchQuery({
  //       query: ListLessonsData,
  //       variables: { user3Card3User3Id: this.user.attributes.sub },
  //       fetchPolicy: 'cache-and-network'
  //     });

  //     observable.subscribe(({ data }) => {
  //       if (!data) { return console.log('getScores: no data'); }
  //       this.lessons = data.listLesson3s.items;
  //     });

  //     this.observedQuery = observable;
  //     return observable;
  //   });
  // }
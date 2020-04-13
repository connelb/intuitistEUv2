import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, Platform, ToastController, Config } from '@ionic/angular';
import { API, graphqlOperation } from "aws-amplify";
import { Auth, Storage } from 'aws-amplify';
import { AppsyncService } from '../providers/appsync.service';
import { ObservableQuery } from 'apollo-client';
import gql from 'graphql-tag';
import { Observer, of } from 'rxjs';
//import OnUpdateUser3Card3 from './../../graphql/subscriptions/OnUpdateUser3Card3';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { forkJoin } from 'rxjs';
import awsconfig from './../../aws-exports';
//import { VgAPI } from 'videogular2/compiled/src/core/services/vg-api';
//import {VgAPI} from 'videogular2/core';
import { IonSlides } from '@ionic/angular';
//import * as d3 from 'd3';
import * as d3Array from 'd3-array';
import * as d3Hierachy from 'd3-hierarchy';
import * as d3Collection from 'd3-collection';
import videojs from 'video.js';
import { VideoModalPage } from './../video-modal/video-modal.page'
// import { AgeValidator } from '../validators/age';
import { Howl, Howler } from 'howler';
import * as d3Scale from 'd3-scale';
import { ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic';
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { User3Card3, Card3, User3, User3Video3 } from "./../../models";

// $user3Card3User3Id: ID!, $user3Card3Card3Id:ID, $status:cardStatus, $score:Int

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

const GetUser3Video3ById =
  gql`query GetUser3Video3Id($id: ID!){
  getUser3Video3(id:$id){
      id
      score
      status
      _version
  }
}`

const CreateUser3Video3 =
  `mutation CreateUser3Video3($user3Video3User3Id: ID!,$user3Video3Video3Id: ID!,$status:videoStatus, $score:Int )  {
    createUser3Video3(input:{user3Video3User3Id:$user3Video3User3Id, user3Video3Video3Id:$user3Video3Video3Id,status:$status,score:$score}){
      id
      score
      status
      _version
    }
 }`

const UpdateUser3Video3 =
  gql`mutation UpdateUser3Video3($id: ID!,$status:videoStatus, $score:Int, $_version:Int )  {
    updateUser3Video3(input:{id:$id, status:$status, score:$score, _version:$_version}){
      id
      score
      status
      _version
    }
 }`

const GetStatus =
  `query getLessonCardsUserId($user3Card3User3Id: ID!)  {
  listUser3Card3s(filter: {user3Card3User3Id: {eq: $user3Card3User3Id}}) {
    items {
      card3{id}
      status
    }
  }
}`

const GetStatus1 =
  gql`query getLessonCardsUserId($user3Card3User3Id: ID!)  {
  listUser3Card3s(filter: {user3Card3User3Id: {eq: $user3Card3User3Id}}) {
    items {
      id
      score
      status
    }
  }
}`

// create getVideoStatus
const CreateVideoStatus =
  gql`
mutation CreateVideoStatus($user3Card3User3Id: ID!, $user3Card3Card3Id:ID, $status:cardStatus, $score:Int){
  createUser3Card3(input: {user3Card3User3Id: $user3Card3User3Id, user3Card3Card3Id: $user3Card3Card3Id, status: $status, score:$score}) {
    id
    status
  }
}
`
// input: {user3Card3User3Id: "a214b698-1579-4ccb-8711-b11e32ab2b20", user3Card3Card3Id: "5b3f8bf3-f839-4a2a-982e-d490551949ef", status: video}

// use lessionId to getVideo status
const GetVideoStatus =
  gql`
  query GetVideoStatus($user3Card3User3Id: ID!, $user3Card3Card3Id:ID)  {
    getUser3Card3(user3Card3User3Id: $user3Card3User3Id, user3Card3Card3Id: $user3Card3Card3Id) {
      id
      status
    }
}
`

// use lessionId to getVideo status
const UpdateVideoStatus =
  gql`
  query UpdateVideoStatus($user3Card3User3Id: ID!, $user3Card3Card3Id:ID, $score:Int)  {
    updateUser3Card3(user3Card3User3Id: $user3Card3User3Id, user3Card3Card3Id: $user3Card3Card3Id,score:$score) {
      id
      status
    }
}
`



// use lessionId to getVideo status

const UsersActiveCards = `
query getLessonCardsUserId($id: ID!) {
  listUser3Card3s(filter: {user3Card3User3Id: {eq: $id}}) {
    items {
      card3{
        lesson3{id name}
        id
        question
        answer
        users3{
          items{status}
        }
      }
    }
  }
}
`


const ListAllLessonCards = gql`
  query getAllLessonCards($id: ID!) {
    listLesson3s(filter: {
      id: {
        eq: $id
      }
    }) {
      items {
        cards3 {
          items {
            id
            question
            answer
            audio
          }
        }
      }
    }
  } 
`

const getLesson = gql`
  query getLesson ($id: ID!){
    getLesson3(id:$id){
      id
      name
      video
      description
    }
  }
`
const ListAllLessonCardsPWA = gql`  
query getAllLessonCards($id: ID!) {
  listLesson3s(filter: {
    id: {
      eq: $id
    }
  }) {
    items {
      cards3 {
        items {
          id
          question
          answer
          audio
        }
      }
    }
  }
} 
`;

const OnUpdateUser3Card3 = `
subscription OnUpdateUser3Card3 {
  onUpdateUser3Card3 {
    id
    status
    score
    user3 {
      id
      username
      firstName
      lastName
      email
      image
      level
      progress
      createdAt
      updatedAt
      userState
      cards3 {
        nextToken
      }
      owner
    }
    card3 {
      id
      question
      answer
      audio
      video
      level
      keywords
      lesson3 {
        id
        name
        section
        subSection
        level
        video
        keywords
      }
      users3 {
        nextToken
      }
    }
  }
}
`;

const getUserCardId =
  gql`query getCardsUserId($user3Card3User3Id: ID!, $user3Card3Card3Id: ID!)  {
  listUser3Card3s(filter: {user3Card3User3Id: {eq: $user3Card3User3Id}, user3Card3Card3Id: {eq: $user3Card3Card3Id} }) {
    items {
      id
      _version
      status
      score
      user3 {
        id
        videos3 {
          items {
            id
            status
            score
          }
        }
      }
    }
  }
}
`
const createUserCardId = gql`
mutation createUser3Card3($user3Card3User3Id: ID,$user3Card3Card3Id: ID, $status:cardStatus, $score:Int) {
    createUser3Card3(input: {user3Card3User3Id: $user3Card3User3Id, user3Card3Card3Id: $user3Card3Card3Id, status: $status, score:$score}) {
      id
      status
      score
      user3 {
        id
        videos3 {
          items {
            id
            status
            score
          }
        }
      }
    }
}
`

// mutation createUser3Card3 {
//   createUser3Card3(input: {user3Card3User3Id: "b79bcfaf-86b8-470a-8f92-b0441da1bbe3", user3Card3Card3Id: "bc671a73-3bd5-408c-b69f-dc9c570e4c7c", status: done, score: 9}) {
//     id
//     status
//     score
//   }
// }

const createUserCardId1 = gql`
mutation createUser3Card3($user3Card3User3Id: ID!,$user3Card3Card3Id: ID!, $status:cardStatus, $score:Int) {
    createUser3Card3(input: {user3Card3User3Id: $user3Card3User3Id, user3Card3Card3Id: $user3Card3Card3Id, status: $status, score:$score}) {
      id
      status
      score
    }
}
`

// mutation createUser3Card3 {
//   createUser3Card3(input: {user3Card3User3Id: "e12517c0-479f-4088-aa10-a2cf57a24ba2", user3Card3Card3Id: "bc671a73-3bd5-408c-b69f-dc9c570e4c7c", status: done, score: 9}) {
//     id
//     status
//     score
//   }
// }

const createUserCard = gql`
mutation createUser3Card3($user_version: Int!, $user3Card3User3Id: ID, $user3Card3Card3Id: ID!, $username: String!, $user_lastChangedAt: AWSTimestamp!, $card_lastChangedAt: AWSTimestamp!, $card_version: Int!, $question: String!, $answer: String!, $score: Int,$status:cardStatus) {
  createUser3Card3(input: {user3: {id: $user3Card3User3Id, username: $username, _version: $user_version, _lastChangedAt: $user_lastChangedAt}, card3: {_lastChangedAt: $card_lastChangedAt, _version: $card_version, id: $user3Card3Card3Id, question: $question, answer: $answer}, score: $score, status:$status}) {
    id
  }
}
`

const updateUserCardtoDone = `
mutation updateUserCardtoDone ($id: ID!, $score: Int){
  updateUser3Card3(input:{id: $id, status:done, score:$score}) {
    status
  }
}
`

const updateUserCard = gql`
mutation updateUserCardtoDone ($id: ID, $status: cardStatus, $score: Int, $_version:Int){
  updateUser3Card3(input:{id: $id, status:done, status: $status, score: $score,_version:$_version}) {

    status
    score
    id
    _version
  }
}
`

// mutation UpdateUser3Card3{
//   updateUser3Card3(input:{id: "d772d71a-46bf-438e-aae0-42681a994551",user3Card3User3Id:"85d94615-4c5c-4f56-9e83-066118512c9d"}){
//     id
//     user3 {
//       id
//     }
//   }
// }

const updateUserCardtoDoing = `
mutation updateUserCardtoDoing ($id: ID!, $score: Int){
  updateUser3Card3(input:{id: $id, status:doing, score:$score}) {
    status
    score
  }
}
`

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

const GetModelVideo = `
query GetVideo ($id:ID!){
  getVodAsset(id:$id){
    video {
      id
    }
  }
}`

const ListLessonsByUserByLesson = gql`
query ListLessonsByUserByLesson($id:ID!,$user3Card3User3Id:ID){
  listLesson3s(filter:{id:{eq:$id}}) {
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
          question
          answer
          users3(filter: {user3Card3User3Id: {eq: $user3Card3User3Id}}) {
            items {
              id
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
          }
        }
      }
    }
  }
}
`


@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss']
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsPage implements OnInit {
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  @ViewChild('video', { static: false }) videoElement: ElementRef;
  //subscription: () => void;
  ios: boolean;
  subscription: any;
  observedQuery: ObservableQuery;

  public width: number = 0;
  public height: number = 0;

  public lessonId;
  //@Input() lesson;
  lessonCards: any;
  @Input() card: any;
  video_1: any;
  id: any;
  video_2: Object | String;
  video_3: Object | String;
  lesson1: any;
  cards3: any;
  userId: any;
  temp: any;
  @Input() temp2: any;
  @Input() temp3: any;
  temp4: any;
  subject = new Subject<any>();
  obs = this.subject.asObservable();
  temp2$: any;
  status$: any;
  cards$: any;
  myCards: any;
  myStatus: any;
  lessonPlan: any;
  video_4: Object | String;
  userCardId: any;
  score: any;
  progress: any;

  //preload: string = 'auto';
  options: any;
  sources: any;
  // question: any;
  // answer: any;
  cardForm: FormGroup;
  forbiddenUserNames: any;
  urlAudio: Object | String;

  public audioPlaying: Boolean;
  private visible: boolean = true;
  videoStatus: any;
  videoScore: number;
  status: any;
  userVideo: any;
  lesson: any;
  modelVideoId: any;
  user: any;
  lessonCardsArr: any = [];
  user3card3Arr: any = [];

  public slideOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: true,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction"
    }
  };


  constructor(
    private formBuilder: FormBuilder,
    private platform: Platform,
    private modalController: ModalController,
    private router: Router,
    private route: ActivatedRoute,
    private appsync: AppsyncService,
    public toastController: ToastController,
    public config: Config
  ) { }

  async ngOnInit() {
    await Auth.currentAuthenticatedUser({
      bypassCache: false
    }).then(async user => {
      this.user = user;
    })

    //this.audioPlaying = false;
    // this.cardForm = this.formBuilder.group({
    //   'answer': new FormControl("")
    // })

    this.ios = this.config.get('mode') === 'ios';

    this.route.params.subscribe(p => {
      setTimeout(() => {
        this.ListLessonsByUserByLesson(p.id);
      }, 700);

    })

    // this.options = {
    //   preload: "metadata",
    //   controls: true,
    //   autoplay: false,
    //   overrideNative: true,
    //   techOrder: ["html5"],
    //   html5: {
    //     nativeVideoTracks: false,
    //     nativeAudioTracks: false,
    //     nativeTextTracks: false,
    //     hls: {
    //       withCredentials: false,
    //       overrideNative: true,
    //       debug: true
    //     }
    //   }
    // };


  }

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.width = this.platform.width() / 2;
      this.height = this.platform.height() / 2;
    });

    this.slides.slideTo(0);
  }

  ListLessonsByUserByLesson(lessonId) {
    // console.log(lessonId,this.user.attributes.sub )
    this.appsync.hc().then(client => {
      const observable = client.watchQuery({
        query: ListLessonsByUserByLesson,
        variables: { id: lessonId, user3Card3User3Id: this.user.attributes.sub },
        fetchPolicy: 'cache-and-network'
      });

      observable.subscribe(({ data }) => {
        if (!data) {
          return console.log('ListLessonsByUserByLesson - no data');
        }
        //lessonCards
        //lesson.cards3.items.length

        this.lesson = data.listLesson3s.items[0];
        this.lessonCards = data.listLesson3s.items[0].cards3.items;
        //console.log('ListLessonsByUserByLesson????', data)

        // console.log('this.lesson',data.listLesson3s.items[0]);
        // console.log('this.lessonCards',data.listLesson3s.items[0].cards3.items);
        this.getModelVideo(this.lesson);

        this.getUserVideoId(this.lesson);

      });
    })
    // .then(()=>{
    //           // what is this for again?
    //           this.getModelVideo(this.lesson);

    //           this.getUserVideoId(this.lesson);
    // })
  }




  // async getLesson(lessonId) {
  //   const [lesson] = await Promise.all([
  //     API.graphql(graphqlOperation(getLessonTitle, { id: lessonId })) as Promise<any>
  //   ])
  //   this.lesson = lesson;
  //   // this.sources = [{
  //   //   // "awsInputVideo": "myvodstreams-dev-input-hgbnm075",
  //   //   // "awsOutputVideo": "dv6ey2dghperj.cloudfront.net"

  //   //   src: `https://myvodstreams-dev-output-nsaua79s.s3.amazonaws.com/output/${this.lesson.video}.m3u8`,
  //   //   type: 'application/x-mpegURL',
  //   // }]
  // }

  // toggleAnswer() {
  //   this.visible = !this.visible;
  // }

  // async getUserCardId(userId, cardId) {

  //   const [userCard] = await Promise.all([
  //     API.graphql(graphqlOperation(getUserCardId, { user3Card3User3Id: userId, user3Card3Card3Id: cardId })) as Promise<any>
  //   ])

  //   if (!userCard.data.listUser3Card3s.items[0]) {
  //     const [userCard] = await Promise.all([
  //       API.graphql(graphqlOperation(createUserCardId, { user3Card3User3Id: userId, user3Card3Card3Id: cardId, status: "toDo" })) as Promise<any>
  //     ])
  //     this.userCardId = userCard.data.createUser3Card3.id;
  //   } else {
  //     this.userCardId = userCard.data.listUser3Card3s.items[0].id;
  //   }
  // }

  // geturlAudio(audio){
  //   Storage.get(`audio/${audio}${'.mp3'}`,{contentType: "audio/mpeg"})
  //   .then(result => {
  //     // this.urlAudio = `https://${awsconfig.aws_user_files_s3_bucket}.s3.amazonaws.com/public/audio/${this.myUuid}.mp3`
  //     this.urlAudio = result;
  //   })
  //     .catch(err => console.log(err));
  // }

  //c05d8dc6-151f-40a7-88e1-1fa1290fa7fe.m3u8 

  // get video from lesson and finds vodAssest video id - seems circular?
  async getModelVideo(lesson) {
    const [modelVideo] = await Promise.all([
      API.graphql(graphqlOperation(GetModelVideo, { id: lesson.video })) as Promise<any>
    ])
    // console.log('modelVideo',modelVideo)
    this.modelVideoId = modelVideo.data.getVodAsset.video.id;
  }

  async presentVideo() {
    const modal = await this.modalController.create({
      component: VideoModalPage,
      componentProps: {
        id: this.modelVideoId,
        name: this.lesson.name
      }
    });
    await modal.present();

    modal.onDidDismiss().then((data) => {
      this.videoStatus = data['data'];

      var x = d3Scale.scaleLinear()
        .domain([0, this.videoStatus.duration])
        .range([0, 10]);

      let videoScore = Math.ceil(x(this.videoStatus.currentTime));
      this.videoScoreUpdate(videoScore);

    }).then(() => this.slides.slideTo(1));
  }

  // TO DO - must be a better way
  playAudioToggle() {
    this.visible = !this.visible;
  }

  async toggleBgMusicPlaying(event, card) {
    this.playAudioToggle();

    await Storage.get(`audio/${card.audio}${'.mp3'}`, { contentType: "audio/mpeg" })
      .then(result => {
        this.urlAudio = result;
      })
      .catch(err => console.log(err));
    //   if (this.bgMusicPlaying){
    //     this.bgMusicPlayer.pause();
    // }else{
    //     this.bgMusicPlayer.play();

    //console.log(`https://${awsconfig.aws_user_files_s3_bucket}.s3.amazonaws.com/public/audio/${this.id}.mp3`,"https://intuitist53b02b3475654d4bb2b5df4edb81424372056-dev.s3.amazonaws.com/public/audio/023867a3-46ea-404e-9577-33cedf90081d.mp3",)

    //https://intuitist53b02b3475654d4bb2b5df4edb81424372056-dev.s3.amazonaws.com/public/audio/023867a3-46ea-404e-9577-33cedf90081d.mp3
    let sound = new Howl({
      src: this.urlAudio
    })

    sound.once('load', function () {
      sound.play();
    });

    sound.on('end', function () {
    })

  }

  // createCardForm() {
  //   if (this.card) {
  //     this.cardForm.setValue(this.card.answer);
  //     // this.cardForm = this.formBuilder.group({
  //     //   'answer': new FormControl(this.card.answer),
  //     //   //'answerArray': new FormControl(this.lesson.answerArray)
  //     // })
  //     //this.addValidator();
  //   }
  // }

  // async getData(lessonId) {

  //   const [progress] = await Promise.all([
  //     //API.graphql(graphqlOperation(GetVideoStatus, { user3Card3User3Id: this.userId, user3Card3Card3Id:lessonId})) as Promise<any>,
  //     //API.graphql(graphqlOperation(GetStatus1, { user3Card3User3Id: this.user.attributes.sub })) as Promise<any>,
  //     //API.graphql(graphqlOperation(ListAllLessonCards, { id: lessonId })) as Promise<any>,
  //     // API.graphql(graphqlOperation(getLesson, { id: lessonId })) as Promise<any>,
  //     API.graphql(graphqlOperation(Progress, { id: this.user.attributes.sub })) as Promise<any>
  //   ])

  //   //const user3card3 = user3card3Arr.data.listUser3Card3s.items.map(d => { return ({ id: d.id, status: d.status ? d.status : 'toDo', score: d.score ? d.score : 0 }) });
  //   //const lessonCards = lessonCardsArr.data.listLesson3s.items[0].cards3.items;

  //   //ListAllLessonCards
  //   this.appsync.hc().then(client => {
  //     const observable = client.watchQuery({
  //       query: ListAllLessonCards,
  //       variables: { id: lessonId },
  //       fetchPolicy: 'cache-and-network'
  //     });

  //     observable.subscribe(({ data }) => {
  //       if (!data) {
  //         return console.log('ListAllLessonCards - no data');
  //       }
  //       this.lessonCardsArr = data.listLesson3s.items[0].cards3.items;
  //     });
  //   })

  //   this.appsync.hc().then(client => {
  //     const observable = client.watchQuery({
  //       query: GetStatus1,
  //       variables: { user3Card3User3Id: this.user.attributes.sub },
  //       fetchPolicy: 'cache-and-network'
  //     });

  //     observable.subscribe(({ data }) => {
  //       if (!data) {
  //         return console.log('GetStatus1 - no data');
  //       }
  //       this.user3card3Arr = data.listUser3Card3s.items.map(d => { return ({ id: d.id, status: d.status ? d.status : 'toDo', score: d.score ? d.score : 0 }) });
  //     });
  //   })


  //   // this.lesson = lesson.data.getLesson3;

  //   // populate videoId?
  //   //this.getModelVideo(this.lesson);

  //   //creates userVideoId
  //   //this.getUserVideoId(this.userId, this.lesson);

  //   if (progress.data.getUser3) {
  //     this.progress = this.getProgress(progress);
  //     this.progress['total'] = this.getTotal(progress);
  //   }

  //   //console.log("join",this.user3card3Arr, this.lessonCardsArr)

  //   //console.log(" this.lessonCards", user3card3Arr, lessonCardsArr,this.lessonCards);

  //   // this.createCardForm();
  // }

  getTotal(res) {
    return res.data.getUser3.cards3.items.reduce(function (tot, record) {
      return tot + record['score'];
    }, 0);
  }

  // part of uservard update
  // async getUserCardId(user, card) {
  //   const [userCard] = await Promise.all([
  //     API.graphql(graphqlOperation(getUserCardId, { user3Card3User3Id: this.user.attributes.sub, user3Card3Card3Id: card.id })) as Promise<any>
  //   ])
  // }

  // user3Video3User3Id: ModelIDInput
  // user3Video3Video3Id: ModelIDInput

  async getUserVideoId(lesson) {
    const [userVideo] = await Promise.all([
      API.graphql(graphqlOperation(GetUser3Video3, { user3Video3User3Id: this.user.attributes.sub, user3Video3Video3Id: lesson.video })) as Promise<any>
    ]);
    // console.log('make false or true',userVideo, userVideo.data.listUser3Video3s.items.length==0, userVideo.data.listUser3Video3s.items.length)
    if (userVideo.data.listUser3Video3s.items.length==0) {
      const [userVideo1] = await Promise.all([
        API.graphql(graphqlOperation(CreateUser3Video3, { user3Video3User3Id: this.user.attributes.sub, user3Video3Video3Id: lesson.video, score: 0, status: 'doing' })) as Promise<any>
      ]);
      this.userVideo = userVideo1.data.createUser3Video3.items;
      console.log('new this.userVideo',this.userVideo)
    } else {
      this.userVideo = userVideo.data.listUser3Video3s.items[0];
      console.log('existing this.userVideo',this.userVideo)
    }
  }



  async updateCardStatusDoneToast() {
    const toast = await this.toastController.create({
      message: 'Great Job!',
      duration: 1000,
      position: 'top',
      cssClass: "toast-mess-success"
    });

    //this.getData(this.lessonId);
    toast.present();
  }

  async updateCardStatusDoingToast() {
    const toast = await this.toastController.create({
      message: 'practice, practice :)',
      duration: 2000,
      position: 'top',
      cssClass: "toast-mess"
    });

    //this.getData(this.lessonId);
    toast.present();
  }

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


  segmentChanged(ev: any, card, i) {
    this.segmentUpdatePWA(ev, card, i);
  }

  // async segmentUpdate(ev: any, card, i) {

  //   //get userCard  NOT NEEDED???
  //   await this.getUserCardId(this.user, card);

  //   //score based on event
  //   if (ev.detail.value == "done") {
  //     this.score = 2;
  //     this.status = ev.detail.value;
  //   } else if (ev.detail.value == "doing") {
  //     this.score = 1;
  //     this.status = ev.detail.value;
  //   } else {
  //     this.score = 0;
  //     this.status = "toDo"
  //   }

  //   if (ev.detail.value == "done") {
  //     this.updateCardStatusDoneToast()
  //   } else if (ev.detail.value == "doing") {
  //     this.updateCardStatusDoingToast()
  //   }
  // }

  async segmentUpdatePWA(ev: any, card, i) {
    //score based on event
    if (ev.detail.value == "done") {
      this.score = 2;
      this.status = ev.detail.value;
    } else if (ev.detail.value == "doing") {
      this.score = 1;
      this.status = ev.detail.value;
    } else {
      this.score = 0;
      this.status = "toDo"
    }

    const myUser3Card3 = {
      user3Card3User3Id: this.user.attributes.sub,
      user3Card3Card3Id: card.id,
      status: this.status,
      score: this.score
    }

    await Promise.all([
      API.graphql(graphqlOperation(getUserCardId, { user3Card3User3Id: this.user.attributes.sub, user3Card3Card3Id: card.id })) as Promise<any>
    ]).then((res) => {
      const UserCard = res[0].data.listUser3Card3s.items;
      if (res[0].data.listUser3Card3s.items.length < 1) {
        //create wt subscription
        this.appsync.hc().then(client => {
          client.mutate({
            mutation: createUserCardId,
            variables: myUser3Card3,

            optimisticResponse: () => ({
              createUser3Card3: {
                ...myUser3Card3,
                __typename: 'User3Card3'
              }
            }),
            update: (proxy, { data: { createUser3Card3: _myUser3Card3 } }) => {

              const options = {
                query: getUserCardId,
                variables: { user3Card3User3Id: this.user.attributes.sub, user3Card3Card3Id: card.id }//{ conversationId: this.conversation.id, first: constants.messageFirst }
              };

              //console.log('options??', options)
              //

              const data = proxy.readQuery(options);
              //console.log('whats data, current local usercards??', data);
              // const _tmp = unshiftMessage(data, _myUser3Card3);
              // proxy.writeQuery({...options, data: _tmp});
            }
          }).then(({ data }) => {
            console.log('mutation complete', data);
          }).catch(err => console.log('Error creating message', err));
        })
      } else {

        const UserCardToUpdate = {
          id: res[0].data.listUser3Card3s.items[0].id,
          status: this.status,
          score: this.score,
          User3: { id: this.user.attributes.sub, username: this.user.username },
          _version: +res[0].data.listUser3Card3s.items[0]._version,
          user3Card3User3Id: this.user.attributes.sub,
          user3Card3Card3Id: card.id
        }

        //update wt subscription
        this.appsync.hc().then(client => {
          client.mutate({
            mutation: updateUserCard,
            variables: {
              id: res[0].data.listUser3Card3s.items[0].id,
              User3: { id: this.user.attributes.sub, username: this.user.username },
              _version: res[0].data.listUser3Card3s.items[0]._version,
              status: this.status,
              score: this.score,
              user3Card3User3Id: this.user.attributes.sub,
              user3Card3Card3Id: card.id
            },

            optimisticResponse: () => ({
              updateUser3Card3: {
                // updateUserCard: {
                ...UserCardToUpdate,
                __typename: 'User3Card3'
              }
            }),
            update: (proxy, { data: { updateUser3Card3: _myUser3Card3 } }) => {
              //   // console.log('what is proxy??',proxy, );

              //   const options = {
              //     query: getUserCardId,
              //     variables: { user3Card3User3Id: this.user.attributes.sub, user3Card3Card3Id: card.id }//{ conversationId: this.conversation.id, first: constants.messageFirst }
              //   };

              //   const data = proxy.readQuery(options);
              //   console.log('whats data, current local usercards??', data);
              // //   // const _tmp = unshiftMessage(data, _myUser3Card3);
              // //   // proxy.writeQuery({...options, data: _tmp});
            }
          }).then(({ data }) => {
            console.log('mutation complete', data);
          }).catch(err => console.log('Error updating User3Card3', err));
        })
      }

      if (ev.detail.value == "done") {
        this.updateCardStatusDoneToast()
      } else if (ev.detail.value == "doing") {
        this.updateCardStatusDoingToast()
      } else {
        this.updateCardStatusDoingToast()
      }

    });
    this.slides.slideTo(i + 1);
  }

  async videoScoreUpdate(videoScore) {
    // console.log('videoScore',videoScore)
    // if (this.userVideo) {
    //   //   await API.graphql(graphqlOperation(UpdateUser3Video3, { id: this.userVideo.id, _version:this.userVideo._version, status: 'done', score: videoScore }))
    //   // }

    //   const User3Video3ToUpdate = { id: this.userVideo.id, _version: this.userVideo._version, status: 'done', score: videoScore }

    //   this.appsync.hc().then(client => {
    //     client.mutate({
    //       mutation: UpdateUser3Video3,
    //       variables: { id: this.userVideo.id, _version: this.userVideo._version, status: 'done', score: videoScore },

    //       //updateUser3Video3
    //       optimisticResponse: () => ({
    //         updateUser3Video3: {
    //           // updateUserCard: {
    //           ...User3Video3ToUpdate,
    //           __typename: 'User3Card3'
    //         }
    //       }),
    //       update: (proxy, { data: { updateUser3Card3: _myUser3Card3 } }) => {
    //         // //   // console.log('what is proxy??',proxy, );
    //         // //getUser3Video3s

    //         const options = {
    //           query: GetUser3Video3ById,
    //           variables: { id: this.userVideo.id }
    //         };

    //         //   //console.log('options',options);

    //         const data = proxy.readQuery(options);
    //         //    console.log('whats data, current local usercards??', data);
    //         // // //   // const _tmp = unshiftMessage(data, _myUser3Card3);
    //         proxy.writeQuery({ ...options, data: _myUser3Card3 });
    //       }
    //     }).then(({ data }) => {
    //       console.log('mutation complete', data);
    //     }).catch(err => console.log('Error updating User3Video3', err));
    //   })
    // }


    //video
    console.log('does a userVideo exist????',this.userVideo);


    if (this.userVideo) {

      const User3Video3ToCreate = {
        user3Video3User3Id:this.user.attributes.sub,
        user3Video3Video3Id: this.userVideo.id,
        // _version: this.userVideo._version,
        status: 'done',
        score: videoScore
      }

      // const myUser3Card3 = {
      //   user3Card3User3Id: this.user.attributes.sub,
      //   user3Card3Card3Id: card.id,
      //   status: this.status,
      //   score: this.score
      // }
      console.log('does a userVideo exist????',this.userVideo);
      await Promise.all([
        API.graphql(graphqlOperation(GetUser3Video3ById, { id: this.userVideo.id })) as Promise<any>
      ]).then((res) => {
        //console.log('does a userVideo exist????',res)
        
        //getUser3Video3
        //const UserVideo = res[0].data.getUser3Video3;
        if (!res[0].data.getUser3Video3) {
          console.log('CreateUser3Video3')
          //create wt subscription
          this.appsync.hc().then(client => {
            client.mutate({
              mutation: CreateUser3Video3,
              variables: User3Video3ToCreate,

              optimisticResponse: () => ({
                createUser3Video3: {
                  ...User3Video3ToCreate,
                  __typename: 'User3Card3'
                }
              }),
              update: (proxy, { data: { createUser3Video3: _User3Video3ToCreate } }) => {

                const options = {
                  query: GetUser3Video3ById,
                  variables: { id: this.userVideo.id }//{ conversationId: this.conversation.id, first: constants.messageFirst }
                };

                //console.log('options??', options)
                //

                const data = proxy.readQuery(options);
                //console.log('whats data, current local usercards??', data);
                // const _tmp = unshiftMessage(data, _myUser3Card3);
                proxy.writeQuery({ ...options, data: data });
              }
            }).then(({ data }) => {
              console.log('mutation complete', data);
            }).catch(err => console.log('Error creating CreateUser3Video3', err));
          })
        } else {
          console.log('UpdateUser3Video3')

          const User3Video3ToUpdate = {
            id: this.userVideo.id,
            user3Video3User3Id:this.user.attributes.sub,
            user3Video3Video3Id: this.userVideo.id,
            _version: res[0].data.getUser3Video3._version,
            // _version: this.userVideo._version,
            status: 'done',
            score: videoScore
          }

          console.log('res[0].data.getUser3Video3',res[0].data.getUser3Video3);

          //update wt subscription
          this.appsync.hc().then(client => {
            client.mutate({
              mutation: UpdateUser3Video3,
              variables: {
                id: this.userVideo.id,
                user3Video3User3Id:this.user.attributes.sub,
                user3Video3Video3Id: this.userVideo.id,
                _version: res[0].data.getUser3Video3._version,
                status: 'done',
                score: videoScore
              },

              optimisticResponse: () => ({
                updateUser3Video3: {
                  // updateUserCard: {
                  ...User3Video3ToUpdate,
                  __typename: 'User3Card3'
                }
              }),
              update: (proxy, { data: { updateUser3Video3: _User3Video3ToUpdate } }) => {
                //   // console.log('what is proxy??',proxy, );

                //   const options = {
                //     query: getUserCardId,
                //     variables: { user3Card3User3Id: this.user.attributes.sub, user3Card3Card3Id: card.id }//{ conversationId: this.conversation.id, first: constants.messageFirst }
                //   };

                //   const data = proxy.readQuery(options);
                //   console.log('whats data, current local usercards??', data);
                // //   // const _tmp = unshiftMessage(data, _myUser3Card3);
                // //   // proxy.writeQuery({...options, data: _tmp});
              }
            }).then(({ data }) => {
              console.log('mutation complete', data);
            }).catch(err => console.log('Error updating UpdateUser3Video3', err));
          })
        }
        //to do video toast
        //this.updateCardStatusVideoToast()

      })
    }
  }

}






  // getLessonPWA(lessonId) {
  //   this.appsync.hc().then(client => {
  //     const observable = client.watchQuery({
  //       query: getLesson,
  //       variables: { id: lessonId },
  //       fetchPolicy: 'cache-and-network'
  //     });

  //     observable.subscribe(({ data }) => {
  //       if (!data) {
  //         return console.log('getLesson - no data');
  //       }
  //       this.lesson = data.getLesson3;

  //       // populate videoId
  //       this.getModelVideo(this.lesson);
  //     });
  //   })
  // };


      //this.getData(p.id)

      // .then(
      //   ()=>{
      //     console.log('this.user3card3Arr, this.lessonCardsArr',this.user3card3Arr, this.lessonCardsArr);
      //     // setInterval(function(){
      //       // if(this.user3card3Arr.length>0&&this.lessonCardsArr.length>0){
      //         this.lessonCards = this.join(this.user3card3Arr, this.lessonCardsArr, "id", "id", function (temp2, temp3) {
      //           return {
      //             id: temp2.id,
      //             question: temp2.question,
      //             answer: temp2.answer,
      //             audio: temp2.audio,
      //             answerArray: _.words(temp2.answer, /[^, ]+/g),
      //             status: (temp3 !== undefined) ? temp3.status : null,
      //             score: (temp2 !== undefined) ? temp2.score : 0
      //           };
      //         });
      //       // }
      //     //  }, 1000);
      //   }
      // )
      // this.getLessonPWA(p.id)

//}

//ev.detail.value == "done"
//   async segmentDone(ev: any, card, i) {
//     let index = i + 1;

//     const userId = await Auth.currentAuthenticatedUser({
//       bypassCache: false
//     }).then(async user => {
//       return user.attributes.sub
//     });

//     //get userCard
//     await this.getUserCardId(userId, card.id);
//     //update UserCard
//     await this.updateCardStatusDone(index)
//   }

//   async segmentDoing(ev: any, card, i) {
//     let index = i + 1;

//     const userId = await Auth.currentAuthenticatedUser({
//       bypassCache: false
//     }).then(async user => {
//       return user.attributes.sub
//     });

//     //get userCard
//     await this.getUserCardId(userId, card.id);
//     //update UserCard
//     await this.updateCardStatusDoing(index)
//   }
// }


// getLessonCardsPWA(): Observable<any> {
//   this.cards$;
//   this.appsync.hc().then(client => {

//     const observable: ObservableQuery = client.watchQuery({
//       query: ListAllLessonCardsPWA,
//       variables: { id: this.lessonId },
//       fetchPolicy: 'cache-and-network'
//     });

//     observable.subscribe(({ data }) => {
//       if (!data) { return console.log('ListLessonsNames: no data'); }
//       this.myCards = data.listLesson3s.items[0].cards3.items;
//     });

//     // this.subscription = observable.subscribeToMore({
//     //       document: SubscriptionOnCreateLesson3,
//     //       //updateQuery:{prev:CreateLesson3Mutation}
//     //       updateQuery: (prev, {subscriptionData}) => {
//     //         if (!subscriptionData.data) {
//     //           return prev;
//     //         }

//     //         const newFeedItem = subscriptionData.data;

//     //         return {
//     //           ...prev,
//     //           entry: {
//     //             comments: [newFeedItem, ...prev.entry]
//     //           }
//     //         };
//     //       }
//     //     });

//     this.observedQuery = observable;
//     this.cards$ = observable
//     return observable;
//   });
//   return this.cards$;
// }


// getStatusPWA() {
//   this.status$;
//   this.appsync.hc().then(client => {

//     const observable: ObservableQuery = client.watchQuery({
//       query: GetStatus1,
//       variables: { user3Card3User3Id: "05970c18-eb1c-4641-991f-d32593849a58" },
//       fetchPolicy: 'cache-and-network'
//     });

//     observable.subscribe(({ data }) => {
//       if (!data) { return console.log('ListLessonsNames: no data'); }
//       this.myStatus = data.listUser3Card3s.items.map(d => { return ({ id: d.card3.id, status: d.status }) });
//     });

//     // this.subscription = observable.subscribeToMore({
//     //       document: SubscriptionOnCreateLesson3,
//     //       //updateQuery:{prev:CreateLesson3Mutation}
//     //       updateQuery: (prev, {subscriptionData}) => {
//     //         if (!subscriptionData.data) {
//     //           return prev;
//     //         }

//     //         const newFeedItem = subscriptionData.data;

//     //         return {
//     //           ...prev,
//     //           entry: {
//     //             comments: [newFeedItem, ...prev.entry]
//     //           }
//     //         };
//     //       }
//     //     });

//     this.observedQuery = observable;
//     this.status$ = observable
//     return observable;
//   });
//   return this.status$
// }


    //console.log('this.userCardId ', user, card, this.userCardId);

    //await API.graphql(graphqlOperation(updateUserCard, { id: this.userCardId, status: this.status, score: this.score })) as Promise<any>;

    // if (!this.userCardId) {
    //   const [myUserCard1] = await Promise.all([
    //     API.graphql(graphqlOperation(createUserCardId, { id: this.userCardId, status: this.status, score: this.score })) as Promise<any>
    //   ]);
    //   console.log('new card, need to update score',myUserCard1 )
    // }else{


    // , user_version: 1,
    // user_lastChangedAt: new Date().getTime()
    // , card_lastChangedAt: new Date().getTime(),
    //     card_version: 1


    // const myUser3 = await DataStore.save(new User3({
    //   //id: user.id,
    //   username: user.username
    // })
    // )

    // const myCard3 = await DataStore.save(new Card3({
    //   //id: card.id,
    //   question: card.question,
    //   answer: card.answer
    // })
    // )

    //creating a new UserCard using datastore, x
    // const myUser3Card3 = await DataStore.save(
    //   new User3Card3({
    //     user3: { id: user.id, username: user.username },
    //     //card3: myCard3,
    //     // user3: {id: user.id, username: user.username},
    //     card3: { id: card.id, question: card.question, answer: card.answer },
    //     status: "DONE",
    //     score: 222
    //   })
    // )

    // console.log("myUser3Card3", myUser3Card3);

    //const original = await DataStore.save(myUser3Card3)

    // for (let i = 0; i < 2; i++) {
    //   DataStore.save(
    //     new User3Card3({
    //       score: 333,
    //       status: "DONE",
    //       user3: {id: user.id, username: user.username},
    //       card3: {id: card.id, question: card.question, answer: card.answer},
    //     })
    //   );
    // };

    // DataStore.observe(original).subscribe(msg => {
    //   console.log('SUBSCRIPTION_UPDATE', msg);
    // });
    // await DataStore.save(
    //   User3Card3.copyOf(original, updated => {
    //     updated.score = 101
    //   })
    // )

    // const original = await DataStore.save(
    //   new User3Card3({
    //     status: 'TO_DO',
    //     score: 100,
    //     user3: userId,
    //     card3: card.id
    //   })

    //console.log(await DataStore.query<User3Card3>(User3Card3, this.userCardId))

    // await DataStore.save(
    //   User3Card3.copyOf(original, updated => {
    //     updated.status = 'TO_DO';
    //     //updated.user3 = 
    //     // updated.score = this.score;
    //     // updated.title = `title ${Date.now()}`;
    //     // updated.status =
    //     //   updated.status === PostStatus.ACTIVE
    //     //     ? PostStatus.INACTIVE
    //     //     : PostStatus.ACTIVE;
    //   })
    // );


    // const [myUserCard] = await Promise.all([
    //   API.graphql(graphqlOperation(updateUserCard, { id: this.userCardId, status: this.status, score: this.score })) as Promise<any>
    // ]);
    //   console.log('new card, need to update score',myUserCard )
    // }

    // const original = await DataStore.query(User3Card3, this.userCardId);

    //const original = await DataStore.query<User3Card3>(User3Card3, this.userCardId);
    //let todos:any = await DataStore.query<Todo>(Todo);

    //console.log("agh",original)

    // const posts = await DataStore.query(User3Card3);

    // const original = await DataStore.save(
    //   new User3({
    //     name:"fred"

    //   // })
    //   // new User3Card3({
    //   //   status: 'TO_DO',
    //   //   score: 100,
    //   //   user3:userId,
    //   //   card3:card.id
    //   }),"4d5a08f3-d0ac-42bd-a19e-170991a4d79b"
    // );

    //   readonly id: string;
    // readonly status?: CardStatus | keyof typeof CardStatus;
    // readonly score?: number;
    // readonly user3: User3;
    // readonly card3: Card3;

    // DataStore.delete(original);


    // await DataStore.save(
    //   User3Card3.copyOf(original, updated => {
    //      console.log('updated???',updated);
    // // //     updated.score = 33
    // // //     // updated.title = `title ${Date.now()}`;
    // // //     // updated.status =
    // // //     //   updated.status === PostStatus.ACTIVE
    // // //     //     ? PostStatus.INACTIVE
    // // //     //     : PostStatus.ACTIVE;
    //   })
    //   })
    // );

          //console.log('this.userVideoId,videoScore ', this.userVideoId, videoScore);


      // readonly id: string;
      // readonly status?: VideoStatus | keyof typeof VideoStatus;
      // readonly score?: number;
      // readonly user3: User3;
      // readonly video3: vodAsset;
      //
      // console.log("called: await DataStore.save<User3Video3>");



      // await DataStore.save<User3Video3>(
      //   new User3Video3({
      //     // user3: { id: user.id, username: user.username },
      //     // card3: { question: card.question, answer: card.answer, id: card.id },
      //     status: 'DONE',
      //     score: videoScore,
      //     //creates new user_User3??
      //     user3: { id: user.id, username: user.username },
      //     //creates new user_vodAsset??
      //     video3: { id: this.userVideoId, title: "", description: "" }
      //   })
      // );

        // playVideo() {
  //   const video = videojs(this.videoElement.nativeElement, this.options);
  //   video.responsive(true);
  //   // // https://myvodstreams-dev-output-nsaua79s.s3.amazonaws.com/output/8e1e32d5-7a1d-4c7f-a928-bb2edc213d80.m3u8
  //   this.sources = [{
  //     //8e1e32d5-7a1d-4c7f-a928-bb2edc213d80

  //     // "awsInputVideo": "myvodstreams-dev-input-hgbnm075",
  //     // "awsOutputVideo": "dv6ey2dghperj.cloudfront.net"
  //     src: `https://myvodstreams-dev-output-nsaua79s.s3.amazonaws.com/output/${this.lesson.video}.m3u8`,
  //     //src: `https://myvodstreams-dev-output-nsaua79s.s3.amazonaws.com/output/${this.lesson.video}.m3u8`,
  //     type: 'application/x-mpegURL',
  //   }]
  //   //this.sources = [{ "type": "application/x-mpegURL", "src": `https://myvodstreams-dev-output-yri7i44c.s3.amazonaws.com/output/${this.lesson.video}.m3u8", withCredentials: false }];

  //   video.src(
  //     this.sources
  //     //this.videoUrl = "https://myvodstreams-dev-output-yri7i44c.s3.amazonaws.com/output/89cbab3b-dcd0-4ffa-a4d9-487193e51641.m3u8"
  //   );
  //   video.play();
  // }


    //UpdateUser3Video3 


    //this.userCardId = this.getUserCardId(userId, lessonId)

    //score based on event
    // if(ev.detail.value == "done"){
    //   this.score = 2;
    //   this.status = ev.detail.value;
    // }else if(ev.detail.value == "doing"){
    //   this.score = 1;
    //   this.status = ev.detail.value;
    // }else{
    //   this.score = 0;
    // }


    // get the getUserVideo get id
    // if null then createUserVideo
    // update UserVideo
    // updateUser3Video3(input:{id:"",score:1}){

    //await API.graphql(graphqlOperation(updateUserCard, { id: this.userCardId, status: 'video', score: videoScore  })) as Promise<any>;


  // async showCard(card) {
  //   return this.router.navigate(['tabs/card', card.id]);

  //   //return this.loadModal(card);
  // }

  // async showNewCard() {
  //   //return this.loadModal(null);
  // }



  // someFunction(myStatus, myCards) {
  //   this.lesson = this.join(myStatus, myCards, "id", "id", function (temp2, temp3) {
  //     return {
  //       id: temp2.id,
  //       question: temp2.question,
  //       answer: temp2.answer,
  //       status: (temp3 !== undefined) ? temp3.status : null
  //     };
  //   });
  // }

    // topSegmentChanged(event) {
  //   if (event.detail.value == "video") {
  //     //this.segmentDone(ev, card, i);
  //     //this.slides.slideTo(1);
  //     console.log("video selected can I play video??")
  //     // this.presentVideo();
  //     // this.playVideo();
  //     // this.slides.slideTo(0);

  //   } else {
  //     //this.segmentDone(ev, card, i);
  //     //this.slides.slideTo(2);
  //     this.slides.slideTo(0);
  //   }
  // }


    // make card and user? in oder to save UserCard???

    // await DataStore.delete(User3Card3, Predicates.ALL);


    // user3Card3User3Id: user.id,
    // username: user.username,
    // user_version: 1,
    // user_lastChangedAt: new Date().getTime(),
    // user3Card3Card3Id: card.id,
    // question: card.question,
    // answer: card.answer,
    // card_lastChangedAt: new Date().getTime(),
    // card_version: 1,
    // status: "done",
    // score: 101

    // const user31 =  await DataStore.save(
    //   new User3({
    //      username: user.username
    //   })
    // );

    // readonly id: string;
    // readonly username: string;

    //user31.map(d=>console.log('d',d))

    //console.log('user31',user31);

    //   await DataStore.save(
    //     user31[0].copyOf(user31[0], updated => {
    //     // updated.id = original.id;
    //     updated.id = user.id;
    //     //updated.username = user31.username;
    //     // updated.card3 = original.card3;

    //   })
    // )

    //console.log('user31',user31);


    // const comments = (await DataStore.query<User3>(User3)).filter(c => {console.log('c',c)});
    // //const Cards = await DataStore.query<Card3>(Card3, c => c.id("contains", user31));
    // console.log(comments);

    // const card31 =  await DataStore.save(
    //   new Card3({
    //     question: card.question,
    //      answer: card.answer,
    //      //id: card.id
    //   })
    // );

    // await DataStore.save(
    //   new User3Card3({
    //     user3:{id:user31.id,username:user31.username},
    //     card3:card31,
    //     status: 'TO_DO',
    //     score: 106
    //   })
    // );

    // await DataStore.save<User3Card3>(
    //   new User3Card3({
    //     user3: { id: user.id, username: user.username },
    //     card3: { question: card.question, answer: card.answer, id: card.id },
    //     status: 'TO_DO',
    //     score: 105
    //   })
    // );

    //await DataStore.save<User3Card3>(
    //   User3Card3.copyOf(original, updated => {
    //     // updated.id = original.id;
    //     updated.score = 13;
    //     // updated.user3 = original.user3;
    //     // updated.card3 = original.card3;

    //   })
    // )

    //const userCards = await DataStore.query<User3Card3>(User3Card3);
    // const Cards = await DataStore.query<Card3>(Card3);
    //console.log('userCards: ', userCards)
    // console.log('Cards: ', Cards)
    //c7b0456d-b85f-430f-a534-d67bbb8403f4
    // const original = await DataStore.query<User3Card3>(User3Card3, "18dda855-3246-41a2-a1c2-6ad254a8bb53");
    // const originalCard = await DataStore.query<Card3>(Card3, "9ed9e3fa-2c4b-466c-a676-47c519cbd974");

    //  User3Card3?  fa8584b7-7869-4d8c-bf1b-c5ba25ead62a has  Card3, "c7b0456d-b85f-430f-a534-d67bbb8403f4"

    // core.js:4002 ERROR Error: Uncaught (in promise): Object: {"data":{"updateUser3Card3":null},"errors":[{"path":["updateUser3Card3"],
    //"data":{"status":"toDo","score":2,"id":"fa8584b7-7869-4d8c-bf1b-c5ba25ead62a"},"errorType":"ConflictUnhandled",
    //"errorInfo":null,"locations":[{"line":2,"column":3,"sourceName":null}],"message":"Conflict resolver rejects mutation."}]}


    // console.log('userCards: ', userCards)
    // readonly id: string;
    // readonly question: string;
    // readonly answer: string;
    // readonly audio?: string;
    // readonly video?: string;
    // readonly level?: string;
    // readonly order?: number;
    // readonly keywords?: string;
    // readonly lesson3?: Lesson3;
    // readonly users3?: User3Card3[];

     // async updateCard(status, score, i) {
  //   let userCardId = this.getUserCardId(userId, cardId)
  //   await API.graphql(graphqlOperation(updateUserCard, { id: this.userCardId,status:status, score: this.score })) as Promise<any>;

  //   this.updateCardStatusDoingToast()
  //   this.slides.slideTo(i);
  // }


  // async updateCardStatusDoing(i) {

  //   // if (this.score) {
  //   //   this.score = this.score + 1;
  //   // } else {
  //   //   this.score = 1;
  //   // }

  //   await API.graphql(graphqlOperation(updateUserCardtoDoing, { id: this.userCardId, score: this.score })) as Promise<any>;

  //   this.updateCardStatusDoingToast()
  //   this.slides.slideTo(i);
  // }

  // async updateCardStatusDone(i) {
  //   //to do : increment the score by 2x
  //   if (this.score) {
  //     this.score = this.score + 2;
  //   } else {
  //     this.score = 1;
  //   }
  //   await API.graphql(graphqlOperation(updateUserCardtoDone, { id: this.userCardId, score: this.score })) as Promise<any>;

  //   this.updateCardStatusDoneToast()
  //   this.slides.slideTo(i);
  // }

    // if (!userCard.data.listUser3Card3s.items[0]) { //if if no userCard, create one

    // // await DataStore.delete(User3Card3, Predicates.ALL);

    // // readonly id: string;
    // // readonly status?: CardStatus | keyof typeof CardStatus;
    // // readonly score?: number;
    // // readonly user3: User3;
    // // readonly card3: Card3;

    // // await DataStore.save(User3Card3,{
    // //   user3: {id:user.id,username: user.username},
    // //   // user_version: 1,
    // //   // user_lastChangedAt: new Date().getTime(),
    // //  Card3: {id:card.id,question: card.question,answer: card.answer},
    // //   // card_lastChangedAt: new Date().getTime(),
    // //   // card_version: 1,
    // //   status: "DONE",
    // //   score: 111111
    // // })

    // const [userCard] = await Promise.all([
    //   // API.graphql(graphqlOperation(createUserCardId, { user3Card3User3Id: user.id, user3Card3Card3Id: card.id, status: 'toDo', score: 0 })) as Promise<any>


    // //   API.graphql(graphqlOperation(createUserCard, {
    // //     user3Card3User3Id: user.id,
    // //     username: user.username,
    // //     user_version: 1,
    // //     user_lastChangedAt: new Date().getTime(),
    // //     user3Card3Card3Id: card.id,
    // //     question: card.question,
    // //     answer: card.answer,
    // //     card_lastChangedAt: new Date().getTime(),
    // //     card_version: 1,
    // //     status: "done",
    // //     score: 101
    // //   })) as Promise<any>
    // ])

    // // console.log("userCard???? created by ", userCard)



    // this.userCardId = userCard.data.createUser3Card3.id;
    // } else {
    // this.userCardId = userCard.data.listUser3Card3s.items[0].id;
    // }
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { ToastController, AlertController, ModalController, LoadingController } from '@ionic/angular';
import { ObservableQuery } from 'apollo-client';
import gql from 'graphql-tag';
import { AppsyncService } from '../providers/appsync.service';
import { UpdateUser3Card3Input } from './../API.service';
import { cardStatus } from './../API.service';
import awsconfig from './../../aws-exports';
import Predictions from '@aws-amplify/predictions';
import { TextToSpeechOutput } from '@aws-amplify/predictions/lib/types';
import { Howl, Howler } from 'howler';
import { trigger, state, group, transition, animate, style } from '@angular/animations';

const getAnswer = `
query getAnswer($id: ID!) {
  getCard3(id: $id) {
    answer
    question
    audio
    lesson3 {name id}
  }
}
`
const getUserCardId2 = `
query getUserCardId($id: ID!) {
  getCard3(id: $id){
    users3 {
      items{
        id
        status
      }
    }
  }
}`

const getUserCardId =
  `query getCardsUserId($user3Card3User3Id: ID!,$user3Card3Card3Id: ID!)  {
  listUser3Card3s(filter: {user3Card3User3Id: {eq: $user3Card3User3Id}, user3Card3Card3Id: {eq: $user3Card3Card3Id}}) {
    items {
      id
    }
  }
}
`
const createUserCardId =
  `mutation createUser3Card3($user3Card3User3Id: ID!,$user3Card3Card3Id: ID!, $status:cardStatus) {
    createUser3Card3(input: {User3: $user3Card3User3Id, Card3: $user3Card3Card3Id, status: $status}) {
      id
      status
    }
}`

const createUserCard =
`mutation createUser3Card3($username: String, $question: String, $answer: String){
  createUser3Card3(input:{user3:{username:$username}, card3:{question:$question, answer:$answer}}){
    id
  }
}`

const getUserCardIdPWA = gql`
query getUserCardId($id: ID!) {
  getCard3(id: $id){
    users3 {
      items{
        id
        status
        score
      }
    }
  }
}`

const updateUserCardtoDone = `
mutation updateUserCardtoDone ($id: ID!, $score: Int){
  updateUser3Card3(input:{id: $id, status:done, score:$score}) {
    status
    score
  }
}
`

const updateUserCardPWA = gql`
mutation updateUserCardtoDone ($id: ID!, $status:cardStatus){
  updateUser3Card3(input:{id: $id, status: $status}) {
    status
  }
}
`

const updateUserCardtoDoing = `
mutation updateUserCardtoDoing ($id: ID!, $score: Int){
  updateUser3Card3(input:{id: $id, status:doing, score:$score}) {
    status
    score
  }
}
`

const subscriptionOnUpdateUser3Card3 = `gql
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
}`;

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
  animations: [
    trigger('testYourselfTrigger2', [
      state('from', style({
        opacity: 0
      })),
      state('to', style({
        opacity: 1
      })),
      transition('from => to', [
        animate('1s ease', style({ opacity: 0.8 })),
        animate('1s ease', style({ textShadow: '2px 2px 5px #5ba7e4' })),
        animate('1s ease', style({ textShadow: '2px 2px 5px #FA4556', })),
      ]),
    ]),
    trigger('animateTrigger', [
      state('from', style({
        backgroundColor: 'green',
        transform: 'scale(1)'
      })),
      state('to', style({
        backgroundColor: 'red',
        transform: 'scale(1.5)'
      })),
      transition('from => to', animate('1000ms')),
      transition('to=> from', animate('1500ms'))
    ])
  ]
})
export class CardPage implements OnInit {

  @Input() card: any;
  visible: boolean = false;

  srcLang="fr";
  targetLang="en";
  public textToTranslate  = "Hello";
  public translateResult  = "";
  public voiceId          = "Brian";
  public speechUrl:string;
  public speakResult:boolean;



  subscription: () => void;
  observedQuery: ObservableQuery;

  success = false;
  //cardId: any;
  public flashCardFront: string = "Front text";
  public flashCardBack: string = "Back text";

  cardId: any;
  userCardId: any;
  audio: any;
  badge: any;
  lessonName: any;
  done: any;
  toDo: any;
  id: any;
  audio_file: any;
  cards3: any;
  lessonId: any;
  userId: any;
  preferences: string;
  submitted: boolean;
  score: any;


  constructor(
    public modalController: ModalController,
    public loadingController: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
    public toastController: ToastController,
    private appsync: AppsyncService,
    public alertController: AlertController) { }

  ngOnInit() {

    Auth.currentAuthenticatedUser({
      bypassCache: false
    }).then(async user => {
      this.userId = user.attributes.sub;
      

      this.route.params.subscribe(p => {


        // this.cardId = p.id;
        // const query = API.graphql(graphqlOperation(getAnswer, { id: this.cardId })) as Promise<any>;
  
        // query.then(res => {
        //   //console.log(res,this.cardId);
        //   this.textToTranslate = res.data.getCard3.question;
        //   this.flashCardFront = res.data.getCard3.question;
        //   this.flashCardBack = res.data.getCard3.answer;
        //   this.audio = res.data.getCard3.audio || null;
        //   this.lessonName = res.data.getCard3.lesson3.name
        //   this.lessonId = res.data.getCard3.lesson3.id
        // });

        // this.getUserCardId(user.attributes.sub,p.id);
      });
    })

  }

  async getUserCardId(userId, cardId) {
    
    const [userCard] = await Promise.all([
      API.graphql(graphqlOperation(getUserCardId, { user3Card3User3Id: userId, user3Card3Card3Id: cardId })) as Promise<any>
    ])

    if (!userCard.data.listUser3Card3s.items[0]) {
      const [userCard] = await Promise.all([
        API.graphql(graphqlOperation(createUserCardId, { user3Card3User3Id: userId, user3Card3Card3Id: cardId, status: "toDo" })) as Promise<any>
      ])
      this.userCardId = userCard.data.createUser3Card3.id;
    } else {
      this.userCardId = userCard.data.listUser3Card3s.items[0].id;
    }
  }

  async updateCardStatusDoing() {
    this.score = 1;
    await API.graphql(graphqlOperation(updateUserCardtoDoing, { id: this.userCardId, score:this.score  })) as Promise<any>;
    this.badge = "Later"
    this.updateCardStatusDoingToast()
  }

  async updateCardStatusDone() {
    this.score = 2;
    await API.graphql(graphqlOperation(updateUserCardtoDone, { id: this.userCardId, score:this.score })) as Promise<any>;
    this.badge = "Mastered"
    this.updateCardStatusDoneToast()
  }

  // async playAudio() {
  //   Storage.configure({
  //     AWSS3: {
  //       bucket: awsconfig.aws_user_files_s3_bucket,//Your bucket name;
  //       region: awsconfig.aws_appsync_region//Specify the region your bucket was created in;
  //     }
  //   });

  //   console.log('calls audio..')
  //   Storage.get("audio/fl1a_6.m4a", {
  //     level: 'public',
  //     identityId: this.id
  //   })
  //     .then(result => this.audio_file = result)
  //     .catch(err => console.log(err));
  //   this.playAudioToast()
  // }

  // async playAudioToast() {
  //   const toast = await this.toastController.create({
  //     message: 'plays audio file...',
  //     duration: 3000,
  //     position: 'top'
  //   });
  //   toast.present();
  // }

  async updateCardStatusDoneToast() {
    const toast = await this.toastController.create({
      message: 'Great Job!',
      duration: 1000,
      position: 'top',
      cssClass: "toast-mess-success"
    });

    toast.present();
    this.router.navigate(['app/tabs/lessons/', this.lessonId]);
  }

  async updateCardStatusDoingToast() {
    const toast = await this.toastController.create({
      message: 'practice, practice :)',
      duration: 2000,
      position: 'top',
      cssClass: "toast-mess"
    });
    toast.present();
    this.router.navigate(['app/tabs/lessons/', this.lessonId]);
  }

  updateCardStatusDoingPWA() {
    const userCard: UpdateUser3Card3Input = {
      id: this.cardId,
      status: cardStatus.done,
      score: 0,
      user3Card3User3Id: '',
      user3Card3Card3Id: ''
    };
    //To Do- PWA way?
    this.appsync.hc().then(client => {
      const observable: ObservableQuery = client.mutate({
        mutation: updateUserCardPWA,
        variables: { id: this.cardId, status: "done", __typename: 'userCard' },
        optimisticResponse: () => ({
          updateUserCardPWA: {
            ...userCard,
            __typename: 'userCard'
          }
        }),
        update: (proxy, { data: { updateUserCardPWA: _userCard } }) => {
          const options = {
            query: getUserCardIdPWA,
            variables: { id: this.cardId, status: "done", __typename: 'userCard' }
          };

          const data = proxy.readQuery(options);
          console.log("what is proxy data??", options, data)
          // const _tmp = unshiftMessage(data, _message);
          proxy.writeQuery({ ...options, data: { getCard3: { users3: { items: { ..._userCard } } } } });
        }
      }).then(({ data }) => {
        console.log('mutation complete', data);
        this.router.navigate(['tabs/lessons', this.lessonId]);
      }).catch(err => console.log('Error creating message', err));
    });
  }

  // translateValue(event) {
  //   console.log(event.target.value);
  // }

  // public async handleLastNameValue(event){
  //   console.log("handleLastNameValue??", event)
  // }

  // public async processForm(event) {
  //   event.preventDefault();
  //   console.log(event)
  // }

  // addProduct() {
  //   this.textToTranslate = this.preferences
  //   this.translate();
  // }

  // ionChange() {
  //   console.log("ionChange fired");
  //   this.submitted = false;
  // }


  // ionInput() {
  //   this.submitted = true;
  //   if(this.preferences){
  //     this.translate();
  //     console.log("this.preferences & ionInput fired");
  //   }
  //   console.log("ionInput fired");
  // }

  // public async translate() {
  //   const result = await Predictions.convert({
  //     translateText: {
  //       source: {
  //         text: this.preferences,
  //         language : this.srcLang
  //       },
  //       targetLanguage: this.targetLang
  //     }
  //   });
  //   this.translateResult = result.text || "Error";
  //   if (this.speakResult) {
  //     this.generateSpeech(result.text);
  //   }
  // }


  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: 'dots',
      // message: 'Please wait...',
      duration: 50
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Incompatible Browers',
      message: '"Sorry, but the Web Audio API is not supported by your browser. Please, consider downloading Google Chrome or Mozilla Firefox"',
      buttons: ['OK']
    });

    await alert.present();
  }

  // public async generateSpeech(textToGenerateSpeech: string) {
  //   const result:TextToSpeechOutput = await Predictions.convert({
  //     textToSpeech: {
  //       source: {
  //         text: textToGenerateSpeech,
  //       },
  //       voiceId: this.voiceId
  //     }
  //   });
  //   const audioCtx = new ((window as any).AudioContext || (window as any).webkitAudioContext)();

  //   if (audioCtx) {
  //     const source = audioCtx.createBufferSource();
  //     audioCtx.decodeAudioData(result.audioStream, (buffer) => {
  //       source.buffer = buffer;
  //       source.connect(audioCtx.destination);
  //       source.start(audioCtx.currentTime);
  //     }, (err) => console.log({err}));
  // } else {
  //   this.presentAlert();
  // }

  // }
  dismiss(data) {
    // let data = { userCardID: x, userCardCardId: this.cardId, status: this.status, score: this.score }

    // this.modalController.dismiss(data);
    this.modalController.dismiss(data);
  }

  myDoing(card){
    let data = {
      answer:card.answer,
      audio:card.audio,
      question:card.question,
      order:card.order,
      cardId: card.cardId,
      userCardCardId: card.userCardCardId,
      status:'doing',
      score:0
    }

    this.dismiss(data);
  
    // for (var i = 0; i < this.myCards.length; i++) {
    //   if (this.myCards[i].cardId == data['cardId']) {
    //     if (data['status'] == "done") {
    //       this.myCards[i].status = "done";
    //       this.myCards[i].score = 1;
    //       this.myCards[i].toUpdate = true;
    //     } else {
    //       this.myCards[i].status = "doing";
    //       this.myCards[i].score = 0;
    //       this.myCards[i].toUpdate = true;
    //     }
    //   }
    // }
    // this.visible = false;
    // this.slides.slideNext();
  
  }
  
  myDone(card){
        let data = {
          answer:card.answer,
          audio:card.audio,
          question:card.question,
          order:card.order,
          cardId: card.cardId,
          userCardCardId: card.userCardCardId,
          status:'done',
          score:1
        }

        this.dismiss(data);

        // for (var i = 0; i < this.myCards.length; i++) {
        //   if (this.myCards[i].cardId == data['cardId']) {
        //     if (data['status'] == "done") {
        //       this.myCards[i].status = "done";
        //       this.myCards[i].score = 1;
        //       this.myCards[i].toUpdate = true;
        //     } else {
        //       this.myCards[i].status = "doing";
        //       this.myCards[i].score = 0;
        //       this.myCards[i].toUpdate = true;
        //     }
        //   }
        // }
        // this.visible = false;
        // this.slides.slideNext();
  }

  

  segmentChanged(event,card){
    console.log('event.detail.value',event.detail.value,'done?;',event.detail.value == "done",event.detail.value == "doing");
    if(event.detail.value == "done"){
      let data = {
        answer:card.answer,
        audio:card.audio,
        question:card.question,
        order:card.order,
        cardId: card.cardId,
        userCardCardId: card.userCardCardId,
        status:'done',
        score:1
      }
      this.dismiss(data);
    }
    
    if(event.detail.value == "doing"){
      let data = {
        answer:card.answer,
        audio:card.audio,
        question:card.question,
        order:card.order,
        cardId: card.cardId,
        userCardCardId: card.userCardCardId,
        status:'doing',
        score:0
      }
      this.dismiss(data);
    }
  }


  async toggleBgMusicPlaying(event, card) {
    this.visible = true;
 
    let sound = new Howl({
      src: `https://d1lutvvxmfx9wo.cloudfront.net/public/audio/${card.audio}${'.mp3'}`,
      onend: function () {
        this.visible = false;
      }
    })

    sound.once('load', function () {
      this.visible = true;//show answer
      sound.play();
    })

    sound.on('end', function () {
      this.visible = false;//don't show answer??
    })
  }

}

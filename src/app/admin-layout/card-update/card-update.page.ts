import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import gql from 'graphql-tag';
import { AppsyncService } from '../../providers/appsync.service';
import { ObservableQuery } from 'apollo-client';

import { API, graphqlOperation } from "aws-amplify";
import { IonSelect, ModalController } from '@ionic/angular';
import { UpdateCard3Input } from './../../API.service';
import Amplify from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Lesson3, Card3 } from "./../../../models";
import { AlertController, ToastController } from '@ionic/angular';
import { FileUploader } from 'ng2-file-upload';

import { AudioService } from '../../providers/audio/audio.service';
import { Howl, Howler } from 'howler';
import { Auth, Storage } from 'aws-amplify';
import awsconfig from "./../../../aws-exports";
import { v4 as uuid } from 'uuid';
import { IonReorderGroup } from '@ionic/angular';
//import { UpdateCardComponent } from './../modals/update-card/update-card.component'
import { CardModalPage } from './../card-modal/card-modal.page';
import * as _ from 'lodash';
import { red } from 'color-name';


const ListLessons = gql`  
  query listLesson3 {
    listLesson3s {
      items {
        id
        name
        level
      }
    }
  }
`;

const ListCards = `
query ListCards($card3Lesson3Id: ID)  {
  listCard3s(filter: {card3Lesson3Id: {eq: $card3Lesson3Id}},limit:600) {
    items{
      id
      question
      answer
      audio
      video
      level
      order
      keywords
      _version
    }
  }
}
`

const GetCard = `
  query getCard($id: ID!)  {
    getCard3(id: $id) {
      question
      answer
      audio
      video
      level
      order
      keywords
      _version
  }
}
`

const DeleteCard = `
  mutation deleteCard($id: ID!, $_version: Int)  {
    deleteCard3(input:{id:$id, _version:$_version}) {
      question
      answer
      audio
      video
      level
      order
      keywords
      _version
  }
}
`

// id: ID!
// question: String
// answer: String
// audio: String
// video: String
// level: String
// order: Int
// keywords: String
// lesson3: Lesson3Input
// _version: Int
// card3Lesson3Id: ID


const UpdateCard = gql`
mutation updateCard(
  $id: ID!,
  $question:String,
  $answer:String,
  $audio:String,
  $video:String,
  $level:String,
  $order:Int,
  $keywords:String,
  $card3Lesson3Id:ID
  $_version:Int
 ) {
  updateCard3(input: {
    id: $id,
    question: $question,
    answer: $answer,
    audio: $audio,
    video :$video,
    level: $level,
    order: $order,
    keywords: $keywords,
    card3Lesson3Id: $card3Lesson3Id,
    _version: $_version
  }) {
    id
  }
}`;

const SortCard = gql`
mutation updateCard( $id: ID!, $order: Int, $_version:Int) {
  updateCard3(input: {
    id: $id, order: $order, _version:$_version
  }) {
    id
  }
}`;


const URL = 'http://localhost:3000/fileupload/';


@Component({
  selector: 'app-card-update',
  templateUrl: './card-update.page.html',
  styleUrls: ['./card-update.page.scss'],
})
export class CardUpdatePage implements OnInit {
  @ViewChild(IonReorderGroup, { static: true }) reorderGroup: IonReorderGroup;

  @ViewChild(IonSelect, { static: true }) select: IonSelect;

  bgMusicPlaying: boolean;
  bgMusicPlayer: AudioService;

  progress: number;

  public uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: false,
    autoUpload: true,
    method: 'post',
    itemAlias: 'attachment'

  });

  // public onFileSelected1(event: EventEmitter<File[]>) {
  //   const file: File = event[0];
  //   console.log(file);

  // }

  // uploader = new FileUploader({
  //   //url: this.url,
  //   maxFileSize: 1024 * 1024 * 1
  //   });




  // Storage.put('test.txt', 'Hello')
  //   .then (result => console.log(result)) // {key: "test.txt"}
  //   .catch(err => console.log(err));

  // public onFileSelected(event: EventEmitter<File[]>) {
  //   const file: File = event[0];
  //   //this.processVideo(file)
  // }


  //aws_user_files_s3_bucket_region

  // public uploader: FileUploader = new FileUploader({
  //   url: `http://${awsconfig.aws_user_files_s3_bucket}.s3-website-us-east-1.amazonaws.com`,
  //   disableMultipart: false,
  //   autoUpload: true,
  //   method: 'post',
  //   itemAlias: 'attachment',
  //   allowedFileType: ['audio']
  // });


  selectcategory: any;
  cardForm: FormGroup;
  public lessons;
  lesson: any;
  public cards;
  card: any;
  observedQuery: ObservableQuery;
  selectedCardQuestion: any;
  selectedLesson: any;
  myUuid: any;
  fileName: string;
  fileExtension: string[];
  urlAudio: any;

  constructor(public modalController: ModalController, private formBuilder: FormBuilder, private appsync: AppsyncService, public toastCtrl: ToastController) { //,public toastCtrl: ToastController 
    this.createCardForm();
    uploader: FileUploader;
    // if(this.urlAudio){
    this.bgMusicPlayer = new AudioService([
      this.urlAudio])
    this.bgMusicPlaying = false;

    this.bgMusicPlayer.onPlay().subscribe(progress => {
      this.progress = progress.position;
    });
    // }
    // this.uploader.onAfterAddingFile = (file) => {
    //   console.log('***** onAfterAddingFile ******')
    //   console.log('file ', file)
    // }
  }

  ngOnInit() {
    // this.uploader.onAfterAddingFile = (file) => {
    //   console.log('***** onAfterAddingFile ******')
    //   console.log('file ', file)
    // }

    this.uploader.onAfterAddingFile = (fileItem) => {
      if (this.uploader.queue.length > 1) {
        this.uploader.removeFromQueue(this.uploader.queue[0]);
      }
      console.log(fileItem);
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
    };

    this.uploader.onCompleteAll = () => {
      console.log('******* onCompleteAll *********')
    }

    this.uploader.onWhenAddingFileFailed = (item: any, filter: any, options: any) => {
      console.log('***** onWhenAddingFileFailed ********')
    }
  }

  // change(event:any) {
  //   console.log('blah, blah',event.target.files)

  //   Auth.configure({
  //     identityPoolId: awsconfig.aws_cognito_identity_pool_id,
  //     region: awsconfig.aws_cognito_region
  //   });
  //   // "arn:aws:s3:::'myvodstreams-dev-output-yri7i44c/${cognito-identity.amazonaws.com:sub}/*"

  //   Storage.configure({
  //     AWSS3: {
  //       bucket: awsconfig.aws_user_files_s3_bucket,
  //       region: "us-east-1"
  //     },
  //   });


  //   Storage.put('test', event.target.files,{contentType: "audio/mpeg"})
  //   .then (result => console.log("it worked?", result))
  //   .catch(err => console.log(err));
  //   }

  ngAfterViewInit() {
    this.getLessons();
    //this.geturlAudio();
    //  this.dataStore();


  }


  getSelectedCard(event) {
    this.findCard(event.detail.value);
  }

  async delete(card) {

    // input DeleteCard3Input {
    //   id: ID
    //   _version: Int
    // }
    
    // console.log('card to be deleted?ard',card)
    // await this.getCard(card.id).then(res=>{res
    //   console.log('res version?',res._version, card._version);
      Promise.all([
        API.graphql(graphqlOperation(DeleteCard, { id: card.id, _version:card._version })) as Promise<any>
      ]).then(res=> {
        //console.log('res??, deleted???',res)


        //this.getCards(this.lesson.id);
        var index = _.findIndex(this.cards, { id: res[0]['data'].deleteCard3.id });
        //console.log('ok?',index)
        // // Replace item at index using native splice
        // this.cards.shift(index, 1, card);

        this.createToast();
      })
    // });
  }

  // uploader1() {
  //   console.log("what???",event);
  // }

  findCard(cardQuestion) {
    this.card = this.cards.find(function (element) {
      return element.question == cardQuestion;
    });
    this.upDateForm();
    this.geturlAudio(this.card.audio);
  }

  upDateForm() {

    this.cardForm.patchValue({
      selectedLesson: this.lesson.name,
      selectedQuestion: this.card.question,
      answer: this.card.answer,
      audio: this.card.audio,
      video: this.card.video,
      level: this.card.level,
      keywords: this.card.keywords
    })
  }

  //   onChange(e) {
  //     const file = e.target.files[0];
  //     Storage.put('example.png', {
  //         contentType: 'image/png'
  //     })
  //     .then (result => console.log(result))
  //     .catch(err => console.log(err));
  // }



  async  onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];
    this.myUuid = uuid();

    // const [createVideo, createVodAsset] = await Promise.all([
    //   await API.graphql(graphqlOperation(CreateVideo, { id: this.myUuid })) as Promise<any>,
    //   await API.graphql(graphqlOperation(CreateVodAsset, {
    //     title: this.lesson.name,
    //     description: this.lesson.description,
    //     vodAssetVideoId: this.myUuid
    //   })) as Promise<any>
    // ])

    this.fileName = file.name;
    this.fileExtension = this.fileName.toLowerCase().split('.');

    Auth.configure({
      identityPoolId: awsconfig.aws_cognito_identity_pool_id,
      region: awsconfig.aws_cognito_region
    });

    Storage.configure({
      AWSS3: {
        bucket: awsconfig.aws_user_files_s3_bucket,
        region: awsconfig.aws_user_files_s3_bucket_region
      },
    });

    Storage.put(`${this.myUuid}.${this.fileExtension[this.fileExtension.length - 1]}`, file, {
      contentType: 'audio/*'
    })
      .then(() => {
        this.cardForm.patchValue({
          audio: this.myUuid
        })
        //https://myvodstreams-dev-output-nsaua79s.s3.amazonaws.com/output/8e1e32d5-7a1d-4c7f-a928-bb2edc213d80.m3u8
        this.urlAudio = `https://${awsconfig.aws_user_files_s3_bucket}.s3-us-east-1.amazonaws.com/audio/${this.myUuid}.mp3`

        console.log(`Successfully Uploaded: ${this.myUuid}`)
      })
      .catch((err) => console.log(`Error: ${err}`));


    // Storage.put('test1.mp3', file,{contentType: "audio/mpeg"})
    // .then (result => console.log(result))
    // .catch(err => console.log(err));

    // console.log('onFileSelected called',event)
    ///this.processVideo(file)


  }

  getSelectedLesson(event) {
    this.card = "";
    this.lesson = this.lessons.find(function (element) {
      return element.name == event.detail.value;
    });
    this.getCards(this.lesson.id);
  }

  async getCards(card3Lesson3Id) {
    const [cards] = await Promise.all([
      API.graphql(graphqlOperation(ListCards, { card3Lesson3Id: card3Lesson3Id })) as Promise<any>
    ])
    this.cards = cards.data.listCard3s.items.sort((a, b) => +a.order - +b.order);
  }

  // onChanges(): void {

  // }

  createCardForm() {
    this.cardForm = this.formBuilder.group({
      selectedLesson: [""],
      selectedQuestion: [""],
      answer: [""],
      audio: [""],
      video: [""],
      level: [""],
      order: [""],
      keywords: [""]
    });
  }

  onSubmit() {
    let card = {
      id: this.card.id,
      question: this.card.question,
      answer: this.cardForm.value.answer,
      audio: this.cardForm.value.audio,
      video: this.cardForm.value.video,
      level: this.cardForm.value.level,
      order: this.card.order,
      keywords: this.cardForm.value.keywords,
      card3Lesson3Id: this.lesson.id,
      _version: this.card._version
    }

    this.updateCard(card)
  }

  async getLessons() {
    const [lessons] = await Promise.all([
      API.graphql(graphqlOperation(ListLessons)) as Promise<any>
    ])
    this.lessons = lessons.data.listLesson3s.items.sort((a, b) => +a.level - +b.level);
  }

  async getCard(cardId) {
    const [card] = await Promise.all([
      API.graphql(graphqlOperation(GetCard, { id: cardId })) as Promise<any>
    ])
    return card.data.getCard3
  }

  // ******* TO DO **********
  geturlAudio(audio) {
    console.log('what is audio??', audio, `${audio}${'.mp3'}`)
    Storage.get(`${audio}${'.mp3'}`, { contentType: "audio/mpeg" })
      .then(result => {
        // this.urlAudio = `https://${awsconfig.aws_user_files_s3_bucket}.s3-us-east-1.amazonaws.com/audio/${this.myUuid}.m3u8`
        //console.log("it worked? but check audio", result); this.urlAudio = result;
      })
      .catch(err => console.log(err));
  }


  async updateCard(card) {

    const [card1] = await Promise.all([
      API.graphql(graphqlOperation(GetCard, { id: card.id })) as Promise<any>
    ])

    //console.log('card1', card1)

    //console.log("what is card???", card)
    const updateCard: UpdateCard3Input = {
      id: card.id,
      question: card.question,
      answer: card.answer,
      audio: card.audio,
      video: card.video,
      level: card.level,
      order: card.order,
      keywords: card.keywords,
      card3Lesson3Id: card.card3Lesson3Id,
      _version: card._version
    };

    // this.appsync.hc().then(client => {
    //   const observable: ObservableQuery = client.mutate({
    //     mutation: UpdateCard,
    //     variables: {
    //       id: card.id,
    //       question: card.question,
    //       answer: card.answer,
    //       audio: (card.audio)?card.audio:"",
    //       video: (card.video)?card.video:"",
    //       level: (card.level)?card.level:"",
    //       order: (card.order)?card.order:0,
    //       keywords: (card.keywords)?card.keywords:"",
    //       card3Lesson3Id: card.card3Lesson3Id,
    //       _version: card._version,
    //       __typename: 'UpdateCard3Input'
    //     },
    //     // optimisticResponse: () => ({
    //     //   UpdateCard: {
    //     //     ...updateCard,
    //     //     __typename: 'UpdateCard3Input'
    //     //   }
    //     // }),
    //     // update: (proxy, { data: { updateUserCardPWA: _userCard } }) => {
    //     //   const options = {
    //     //     query: UpdateCard,
    //     //     variables: { id: this.cardId, status: "done", __typename: 'UpdateCard3Input' }
    //     //   };

    //     //   const data = proxy.readQuery(options);
    //     //   console.log("what is proxy data??", options, data)
    //     //   // const _tmp = unshiftMessage(data, _message);
    //     //   proxy.writeQuery({ ...options, data: { getCard3: { users3: { items: { ..._userCard } } } } });
    //     // }
    //   }).then(({ data }) => {
    //     console.log('mutation complete', data);
    //     this.cardForm.reset();
    //     this.createToast();
    //     // const toast = this.toastCtrl.create({
    //     //   message: 'card updated',
    //     //   duration: 3000
    //     // });
    //     // toast.present();
    //     //this.router.navigate(['tabs/lessons', this.lessonId]);
    //   }).catch(err => console.log('Error creating message', err));
    // });
  }

  async createToast() {
    const toast = await this.toastCtrl.create({
      message: 'card updated',
      duration: 1000
    });
    await toast.present();
  }


  toggleBgMusicPlaying(): void {
    if (this.bgMusicPlaying)
      this.bgMusicPlayer.pause();
    else
      this.bgMusicPlayer.play();

    let sound = new Howl({
      src: [this.urlAudio]
    });

    sound.play();
    this.bgMusicPlaying = !this.bgMusicPlaying;
  }

  skipBackward() {
    this.bgMusicPlayer.skip('prev');
  }

  skipForward() {
    this.bgMusicPlayer.skip('next');
  }

  rewind(): void {
    this.bgMusicPlayer.rewind();
  }

  fastForward(): void {
    this.bgMusicPlayer.fastforward();
  }


  doReorder(ev: any) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    //console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete(this.cards);
    //console.log("re-ordered???:", this.cards, "changed odered?", ev.detail.complete(this.cards))

    //Array(3) [ {…}, {…}, {…} ]
    ev.detail.complete(this.cards).forEach((d, i) => {

      const query = API.graphql(graphqlOperation(SortCard, { id: d.id, order: i, _version: d._version })) as Promise<any>;

      query.then(res => { console.log('this.lesson.id', this.lesson.id); this.getCards(this.lesson.id) })

      //console.log('d',i)
      //  const [cards] = await Promise.all([
      //      API.graphql(graphqlOperation(SortCard, { id: d.id, order: i, _version: d._version }) as Promise<any>
      //   ])


    });
  }

  updateCardOrder() {

  }

  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }


  async presentModal(card, i) {
    console.log("what is modal card?", card)

    const modal = await this.modalController.create({
      component: CardModalPage,
      componentProps: {
        id: card.id,
        question: card.question,
        answer: card.answer,
        audio: card.audio,
        level: card.level,
        order: card.order,
        keywords: card.keywords,
        card3Lesson3Id: this.lesson.id,
        _version: card._version
      }
    });



    modal.onDidDismiss()
      .then((data) => {
        this.getCard(data.data.data).then(d => {
          d.id = data.data.data;
          const card = d;

          // Find item index using _.findIndex (thanks @AJ Richardson for comment)
          var index = _.findIndex(this.cards, { id: data.data.data });

          // Replace item at index using native splice
          this.cards.splice(index, 1, card);
        });
      });

    return await modal.present();
  }


  // openModal(): void {
  //   let data = {
  //     'merchant_id': '12345',
  //     'item_id': ['item_1', 'item_2']
  //   }
  //   let myModal = this.modal.create(UpdateCardComponent,data);
  //   myModal.onDidDismiss(data => {
  //     console.log(data);
  //   })
  //   myModal.present();
  // }

  // getCardSelected(){
  //   console.log('question selected')
  // }


  // async getCards1(card3Lesson3Id) {
  //   await this.appsync.hc().then(client => {
  //     const observable: ObservableQuery = client.watchQuery({
  //       query: ListCards,
  //       variables: card3Lesson3Id,
  //       fetchPolicy: 'cache-and-network'
  //     });

  //     observable.subscribe(({ data }) => {
  //       if (!data) { return console.log('ListCard3s: no data'); }
  //       //console.log('data', data)
  //       this.cards = data.ListCard3s.items;
  //       //this.lessons.pop({name:"new"});

  //     });

  //     // this.subscription = observable.subscribeToMore({
  //     //   document: SubscriptionOnCreateLesson3,
  //     //   //updateQuery:{prev:CreateLesson3Mutation}
  //     //   updateQuery: (prev, { subscriptionData }) => {
  //     //     if (!subscriptionData.data) {
  //     //       return prev;
  //     //     }

  //     //     const newFeedItem = subscriptionData.data;

  //     //     return {
  //     //       ...prev,
  //     //       entry: {
  //     //         comments: [newFeedItem, ...prev.entry]
  //     //       }
  //     //     };
  //     //   }
  //     // });

  //     this.observedQuery = observable;
  //     return observable;
  //   });
  // }

}

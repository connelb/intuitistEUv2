import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import gql from 'graphql-tag';
import { AppsyncService } from '../../providers/appsync.service';
import { ObservableQuery } from 'apollo-client';
import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { CreateCard3Input } from './../../API.service';
import { AudioService } from '../../providers/audio/audio.service';
import { Howl, Howler } from 'howler';
import { FileUploader } from 'ng2-file-upload';
import awsconfig from "./../../../aws-exports";


const CreateCard = gql`
mutation createCard3(
  $card3Lesson3Id:ID,
  $question:String!,
  $answer:String!,
   $audio:String,
   $level:String,
   $order:Int,
   $keywords:String
 ) {
  createCard3(input: {
    card3Lesson3Id:$card3Lesson3Id,
    question:$question,
    answer:$answer,
    audio:$audio,
    level:$level,
    order:$order,
    keywords:$keywords
  }) {
    id
  }
}`;


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

const UpdateCard = gql`
mutation updateCard(
  $id: ID!,
  $audio:String,
 $_version:Int
 ) {
  updateCard3(input: {
    id: $id,
    audio: $audio,
  _version:$_version
  }) {
    id
  }
}`;

const URL = 'http://localhost:8100/fileupload/';

@Component({
  selector: 'app-card-create',
  templateUrl: './card-create.page.html',
  styleUrls: ['./card-create.page.scss'],
})
export class CardCreatePage implements OnInit {

  public uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: false,
    autoUpload: true,
    method: 'post',
    itemAlias: 'attachment'
  });

  cardForm: FormGroup;
  observedQuery: ObservableQuery;
  lessons: any;
  lesson: any;
  bgMusicPlaying: boolean;
  bgMusicPlayer: AudioService;
  fileName: string;
  fileExtension: string[];
  urlAudio: any;
  cardId: any;


  constructor(private formBuilder: FormBuilder, private appsync: AppsyncService, public toastCtrl: ToastController,
    public loadingController:LoadingController) {
    this.createCardForm();

    // this.bgMusicPlayer = new AudioService([`https://${awsconfig.aws_user_files_s3_bucket}.s3-us-east-1.amazonaws.com/audio/${this.cardId}.mp3`])
    //this.bgMusicPlaying = false;
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.getLessons();
    //this.geturlAudio(this.cardId);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async  geturlAudio(audio) {
    //console.log("what is audio again??", audio)

    this.appsync.hc().then(client => {
      const observable: ObservableQuery = client.mutate({
        mutation: UpdateCard,
        variables: {
          id: audio,
          // question: this.cardForm.value.question,
          // answer: this.cardForm.value.answer,
          audio: this.cardId,
          // level: this.cardForm.value.level,
          // keywords: this.cardForm.value.keywords,
          // card3Lesson3Id: this.lesson.id,
          _version: 1,
          __typename: 'UpdateCard3Input'
        },
        // optimisticResponse: () => ({
        //   UpdateCard: {
        //     ...updateCard,
        //     __typename: 'UpdateCard3Input'
        //   }
        // }),
        // update: (proxy, { data: { updateUserCardPWA: _userCard } }) => {
        //   const options = {
        //     query: UpdateCard,
        //     variables: { id: this.cardId, status: "done", __typename: 'UpdateCard3Input' }
        //   };

        //   const data = proxy.readQuery(options);
        //   console.log("what is proxy data??", options, data)
        //   // const _tmp = unshiftMessage(data, _message);
        //   proxy.writeQuery({ ...options, data: { getCard3: { users3: { items: { ..._userCard } } } } });
        // }
      }).then(({ data }) => {
        console.log('mutation complete', data);
        //this.cardForm.reset();
        // this.updateToast();
        this.audioCreatedToast();

        //this.router.navigate(['tabs/lessons', this.lessonId]);
      }).catch(err => console.log('Error creating message', err));
    });



    // const [updateCard] = await Promise.all([
    //   await API.graphql(graphqlOperation(UpdateCard, {
    //     id: audio,
    //     question: this.cardForm.value.question,
    //     answer: this.cardForm.value.answer,
    //     card3Lesson3Id: this.lesson.id
    //     })) as Promise<any>
    // ])

    Storage.get(`audio/${audio}${'.mp3'}`, { contentType: "audio/mpeg" })
      .then(result => {
        // this.urlAudio = `https://${awsconfig.aws_user_files_s3_bucket}.s3.amazonaws.com/public/audio/${this.myUuid}.mp3`
        this.urlAudio = result;
      })
      .catch(err => console.log(err));

    this.bgMusicPlayer = new AudioService([this.urlAudio]);
  }


  toggleBgMusicPlaying(): void {
    // if (this.bgMusicPlaying)
    //   this.bgMusicPlayer.pause();
    // else
    //   this.bgMusicPlayer.play();

    let sound = new Howl({
      src: this.urlAudio
      // src: [`https://${awsconfig.aws_user_files_s3_bucket}.s3-us-east-1.amazonaws.com/audio/${this.cardId}.mp3`]
    });

    sound.play();
    //this.bgMusicPlaying = !this.bgMusicPlaying;
  }

  async getLessons() {
    const [lessons] = await Promise.all([
      API.graphql(graphqlOperation(ListLessons)) as Promise<any>
    ])
    this.lessons = lessons.data.listLesson3s.items.sort((a, b) => +a.level - +b.level);
  }

  createCardForm() {
    this.cardForm = this.formBuilder.group({
      lesson: [''],
      question: [''],
      answer: [''],
      audio: [''],
      level: [''],
      keywords: ['']
    });
  }

  getSelectedLesson(event) {
    this.lesson = this.lessons.find(function (element) {
      return element.name == event.detail.value;
    });
  }


  onSubmit() {
    let temp = this.cardForm.value.lesson

    this.lesson = this.lessons.find(function (element) {
      console.log('Your form data : ', element);
      return element.name == temp;
    });

    this.createCard(this.cardForm.value)

  }

  createCard(card) {
    console.log( 'card values: ',{card3Lesson3Id: this.lesson.id,
      question: card.question,
      answer: card.answer,
      audio: (card.audio)?card.audio:"na" ,
      level: (card.level)?card.level:"na",
      order: 0,
      keywords: (card.keywords)?card.keywords:"na"})

    this.appsync.hc().then(client => {
      const observable: ObservableQuery = client.mutate({
        mutation: CreateCard,
        variables: {
          card3Lesson3Id: this.lesson.id,
          question: card.question,
          answer: card.answer,
          audio: (card.audio)?card.audio:"na" ,
          level: (card.level)?card.level:"na",
          order: 0,
          keywords: (card.keywords)?card.keywords:"na",
          __typename: 'CreateCard3Input'
        },
        // optimisticResponse: () => ({
        //   UpdateCard: {
        //     ...updateCard,
        //     __typename: 'UpdateCard3Input'
        //   }
        // }),
        // update: (proxy, { data: { updateUserCardPWA: _userCard } }) => {
        //   const options = {
        //     query: UpdateCard,
        //     variables: { id: this.cardId, status: "done", __typename: 'UpdateCard3Input' }
        //   };

        //   const data = proxy.readQuery(options);
        //   console.log("what is proxy data??", options, data)
        //   // const _tmp = unshiftMessage(data, _message);
        //   proxy.writeQuery({ ...options, data: { getCard3: { users3: { items: { ..._userCard } } } } });
        // }
      }).then(({ data }) => {
        //this.card = data.
        console.log('mutation complete', data);
        this.cardForm.reset();
        this.createToast();

        //this.router.navigate(['tabs/lessons', this.lessonId]);
      }).catch(err => console.log('Error creating message', err));
    });
  }

  async createToast() {
    const toast = await this.toastCtrl.create({
      message: 'card created',
      duration: 1000
    });
    await toast.present();
  }

  // async updateToast() {
  //   const toast = await this.toastCtrl.create({
  //     message: 'card updated',
  //     duration: 1000
  //   });
  //   await toast.present();
  // }

  async audioCreatedToast() {
    const toast = await this.toastCtrl.create({
      message: 'Audio file uploaded',
      duration: 1000
    });
    await toast.present();
  }

  async onFileSelected(event: EventEmitter<File[]>) {
    this.presentLoading();
    const file: File = event[0];

    const [createCard] = await Promise.all([
      await API.graphql(graphqlOperation(CreateCard, {
        question: this.cardForm.value.question,
        answer: this.cardForm.value.answer,
        card3Lesson3Id: this.lesson.id,
        audio: (this.cardForm.value.audio)?this.cardForm.value.audio:"na" ,
        level: (this.cardForm.value.level)?this.cardForm.value.level:"na",
        order: 0,
        keywords: (this.cardForm.value.keywords)?this.cardForm.value.keywords:"na",

      })) as Promise<any>
    ])

    //console.log('createCard:??', createCard, createCard.data.createCard3.id)

    this.cardId = createCard.data.createCard3.id

    this.fileName = file.name;
    this.fileExtension = this.fileName.toLowerCase().split('.');

    Auth.configure({
      identityPoolId: awsconfig.aws_cognito_identity_pool_id,
      region: awsconfig.aws_cognito_region
    });

  //   Auth.configure(
  //     // To get the aws credentials, you need to configure 
  //     // the Auth module with your Cognito Federated Identity Pool
  //     identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',
  //     region: 'XX-XXXX-X',
  // );
  
  // Storage.configure({
  //     AWSS3: {
  //         bucket: '',//Your bucket name;
  //         region: ''//Specify the region your bucket was created in;
  //     }
  // });
//aws_user_pools_id
    //userPoolId: "eu-west-1_5Ieij0FKG"

    // "aws_cognito_identity_pool_id": "eu-west-1:306a8427-73f8-4068-b6d3-19cad50aa36c",
    // "aws_cognito_region": "eu-west-1",
    // "aws_user_pools_id": "eu-west-1_5Ieij0FKG",
    // "aws_user_pools_web_client_id": "3hhmma3vbaptvj2kr10qftfder",

    Storage.configure({
      AWSS3: {
        bucket: awsconfig.aws_user_files_s3_bucket,
        region: awsconfig.aws_user_files_s3_bucket_region
      },
    });

    // "aws_user_files_s3_bucket": "intuitisteuc85246d9d3644fd3868f842cfbbd038f142305-dev",
    // "aws_user_files_s3_bucket_region": "eu-west-1"

    //console.log(awsconfig.aws_user_files_s3_bucket,awsconfig.aws_user_files_s3_bucket_region,awsconfig.aws_cognito_identity_pool_id,awsconfig.aws_cognito_region )

    // Storage.put('test.txt', 'Protected Content', {
    //   level: 'protected',
    //   contentType: 'text/plain'
    // })
    //   .then(result => console.log(result))
    //   .catch(err => console.log(err));



    Storage.put(`audio/${this.cardId}.${this.fileExtension[this.fileExtension.length - 1]}`, file, {
      // level: 'protected',
      contentType: 'audio/*'
    })
      .then(() => {
        this.cardForm.patchValue({ audio: this.cardId });
        //this.urlAudio = `https://${awsconfig.aws_user_files_s3_bucket}.s3-us-east-1.amazonaws.com/audio/${createCard.id}.mp3`

        //https://myvodstreams-dev-output-nsaua79s.s3.amazonaws.com/output/8e1e32d5-7a1d-4c7f-a928-bb2edc213d80.m3u8
        //this.urlAudio = `https://${awsconfig.aws_user_files_s3_bucket}.s3.amazonaws.com/public/audio/${this.cardId}.mp3`;
        // this.urlAudio = `https://${awsconfig.aws_user_files_s3_bucket}.s3.amazonaws.com/public/audio/${this.id}.mp3`
        this.geturlAudio(this.cardId);



        //console.log(`Successfully Uploaded: ${this.myUuid}`)
      })
      .catch((err) => console.log(`Error: ${err}`));




    // Storage.put('test1.mp3', file,{contentType: "audio/mpeg"})
    // .then (result => console.log(result))
    // .catch(err => console.log(err));

    // console.log('onFileSelected called',event)
    ///this.processVideo(file)


  }


}

import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastController, ModalController } from '@ionic/angular';
import gql from 'graphql-tag';
import { UpdateCard3Input } from './../../API.service';
import { AppsyncService } from '../../providers/appsync.service';
import { ObservableQuery } from 'apollo-client';
import { AudioService } from '../../providers/audio/audio.service';
import { Howl, Howler } from 'howler';
import { FileUploader } from 'ng2-file-upload';
import { Auth, Storage } from 'aws-amplify';
import awsconfig from "./../../../aws-exports";
import { v4 as uuid } from 'uuid';

const UpdateCard = gql`
mutation updateCard(
  $id: ID!,
  $question:String!,
  $answer:String,
  $audio:String,
  $level:String,
  $keywords:String,
  $card3Lesson3Id:ID
 ) {
  updateCard3(input: {
    id: $id,
    question: $question,
    answer: $answer,
    audio: $audio,
    level:$level,
    keywords:$keywords,
    card3Lesson3Id:$card3Lesson3Id
  }) {
    id
  }
}`;

const URL = 'http://localhost:8102/fileupload/';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.page.html',
  styleUrls: ['./card-modal.page.scss'],
})
export class CardModalPage implements OnInit {

  public uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: false,
    autoUpload: true,
    method: 'post',
    itemAlias: 'attachment'
  });


  cardForm: FormGroup;
  @Input() id: string;
  @Input() question: string;
  @Input() answer: string;
  @Input() audio: string;
  @Input() level: string;
  @Input() keywords: string;
  @Input() card3Lesson3Id: string;
  @Input() _version: number;
  bgMusicPlaying: boolean;
  bgMusicPlayer: AudioService;
  urlAudio: any;
  myUuid: any;
  fileName: string;
  fileExtension: string[];



  constructor(public modalController: ModalController, private formBuilder: FormBuilder, public toastCtrl: ToastController, private appsync: AppsyncService) {
    uploader: FileUploader;
    this.bgMusicPlayer = new AudioService([this.urlAudio])
    this.bgMusicPlaying = false;

  }

  ngOnInit() {
    this.createCardForm();
    this.geturlAudio(this.audio);
  }

  ngAfterViewInit() {
   
    
  }
  

  geturlAudio(audio){
    Storage.get(`audio/${audio}${'.mp3'}`,{contentType: "audio/mpeg"})
    .then(result => {
      // this.urlAudio = `https://${awsconfig.aws_user_files_s3_bucket}.s3.amazonaws.com/public/audio/${this.myUuid}.mp3`
      this.urlAudio = result;
    })
      .catch(err => console.log(err));
  }

  toggleBgMusicPlaying(): void {
  //   if (this.bgMusicPlaying){
  //     this.bgMusicPlayer.pause();
  // }else{
  //     this.bgMusicPlayer.play();

      //console.log(`https://${awsconfig.aws_user_files_s3_bucket}.s3.amazonaws.com/public/audio/${this.id}.mp3`,"https://intuitist53b02b3475654d4bb2b5df4edb81424372056-dev.s3.amazonaws.com/public/audio/023867a3-46ea-404e-9577-33cedf90081d.mp3",)

      //https://intuitist53b02b3475654d4bb2b5df4edb81424372056-dev.s3.amazonaws.com/public/audio/023867a3-46ea-404e-9577-33cedf90081d.mp3
    let sound = new Howl({
      src: this.urlAudio
      //src: [`https://${awsconfig.aws_user_files_s3_bucket}.s3.amazonaws.com/public/audio/${this.id}.mp3`]
    });

    sound.play();
    //this.bgMusicPlaying = !this.bgMusicPlaying;
  //}
  }

  createCardForm() {
    this.cardForm = this.formBuilder.group({
      question: this.question,
      answer: this.answer,
      audio: this.audio,
      level: this.level,
      keywords: this.keywords
    });
  }

  upDateForm() {
    this.cardForm.patchValue({
      question: this.question,
      answer: this.answer,
      audio: this.audio,
      level: this.level,
      keywords: this.keywords
    })
  }

  onSubmit() {
    this.updateCard();
    //   let card = {
    //     id: this.card.id,
    //     question: this.card.question,
    //     answer: this.cardForm.value.answer || "n/a",
    //     audio: this.cardForm.value.audio || "n/a",
    //     video: this.cardForm.value.video || "n/a",
    //     level: this.cardForm.value.level || "n/a",
    //     keywords: this.cardForm.value.keywords || "n/a",
    //     card3Lesson3Id: this.lesson.id
    //   }

    //this.updateCard(card)
  }

  updateCard() {
    const updateCard: UpdateCard3Input = {
      id: this.id,
      question: this.cardForm.value.question,
      answer: this.cardForm.value.answer,
      audio: this.cardForm.value.audio,
      level: this.cardForm.value.level,
      keywords: this.cardForm.value.keywords
    };

    this.appsync.hc().then(client => {
      const observable: ObservableQuery = client.mutate({
        mutation: UpdateCard,
        variables: {
          id: this.id,
          question: this.cardForm.value.question,
          answer: this.cardForm.value.answer,
          audio: this.cardForm.value.audio,
          level: this.cardForm.value.level,
          keywords: this.cardForm.value.keywords,
          card3Lesson3Id: this.card3Lesson3Id,
          _version:this._version +1,
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

        this.createToast();
        this.dismiss();
        // const toast = this.toastCtrl.create({
        //   message: 'card updated',
        //   duration: 3000
        // });
        // toast.present();
        //this.router.navigate(['tabs/lessons', this.lessonId]);
      }).catch(err => console.log('Error creating message', err));
    });
  }

  async createToast() {
    const toast = await this.toastCtrl.create({
      message: 'card updated',
      duration: 1000
    });
    await toast.present();
  }


  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async  onFileSelected(event: EventEmitter<File[]>) {
    console.log("select called")
    const file: File = event[0];
    //this.myUuid = uuid();

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

    Storage.put(`audio/${this.id}.${this.fileExtension[this.fileExtension.length - 1]}`, file, {
      contentType: 'audio/*'
    })
      .then(() => {
        console.log('patch value???')
        this.cardForm.patchValue({audio: this.id});
        //intuitist53b02b3475654d4bb2b5df4edb81424372056-dev.s3.amazonaws.com/public/*
        //https://myvodstreams-dev-output-nsaua79s.s3.amazonaws.com/output/8e1e32d5-7a1d-4c7f-a928-bb2edc213d80.m3u8
        this.urlAudio = `https://${awsconfig.aws_user_files_s3_bucket}.s3.amazonaws.com/public/audio/${this.id}.mp3`

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

import { Component, OnInit, AfterViewInit, EventEmitter, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertController, ToastController, Platform } from '@ionic/angular';
import { UpdateLesson3Input } from './../../API.service';
import gql from 'graphql-tag';
import { AppsyncService } from '../../providers/appsync.service';
import { ObservableQuery } from 'apollo-client';
//import { API, graphqlOperation } from "aws-amplify";
//import { Auth, Storage } from 'aws-amplify';

import awsconfig from "./../../../aws-exports";
//import Amplify from 'aws-amplify';

//import { VgAPI } from 'videogular2/compiled/src/core/services/vg-api';
import { PlayerStateService } from '../../providers/player-state.service';
import { Observable } from 'rxjs';
import Amplify, {
  Auth, API, graphqlOperation, Storage,
} from 'aws-amplify';
import awsvideoconfig from '../../../aws-video-exports';
//import { CreateVideoObject, createVodAsset} from '../../API.service'; //CreateVideoObject,CreateVodAsset 
//import createUser from '../graphql/mutations/createUser';
//import {createVodAsset,createVideoObject} from '../../../graphql/mutations.graphql';

//import {createVideoObject} from './../../.'
import { v4 as uuid } from 'uuid';
import { APIService } from '../../API.service';
//import { FileUploader } from 'ng2-file-upload';
//import { FileUploader } from 'ng2-file-upload';
import { FileUploader, FileItem } from 'ng2-file-upload';
//import 'video.js/dist/video-js.css';
//import * as videojs from 'video.js';
//import 'videojs-contrib-hls';
//import { videojs } from "video.js";

import videojs from 'video.js';
// import 'videojs-contrib-hls';
// import { ResizeService } from '../../providers/size-detector/size-detector.service';
// import { SCREEN_SIZE } from '../../providers/size-detector/screen-size.enum';


const CreateVodAsset = gql`
mutation CreateVodAsset($title:String!,$description:String!,$vodAssetVideoId:ID){
  createVodAsset(input:{title:$title,description:$description,vodAssetVideoId:$vodAssetVideoId}){
    id
  }
}
`

const CreateVideo = gql`
mutation CreateVideo($id:ID){
  createVideoObject(input:{id:$id}){
    id
  }
}
`

const ListLessons = gql`  
  query listLesson3 {
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
      }
    }
  }
`;

const GetLesson = `
  query getLesson3($id: ID!)  {
    getLesson3(id: $id) {
      id
      name
      description
      section
      subSection
      level
      video
      keywords
  }
}
`

const UpdateLesson = gql`
mutation updateLesson3(
  $id:ID!,
  $name:String!,
  $description:String,
  $section:String,
  $subSection:String,
  $level:String,
  $video:String,
  $keywords:String
 ) {
  updateLesson3(input: {
    id:$id,
    name:$name,
    description:$description,
    section:$section,
    subSection:$subSection,
    level:$level,
    video:$video,
    keywords:$keywords
  }) {
    id
  }
}`;

//const uploadAPI = 'http://localhost:4000/api/upload';
const URL = 'http://localhost:3002/api/upload';


@Component({
  selector: 'app-lesson-update',
  templateUrl: './lesson-update.page.html',
  styleUrls: ['./lesson-update.page.scss'],
})
export class LessonUpdatePage implements OnInit {
  public width: number = 0;
  public height: number = 0;
  // public uploader: FileUploader = new FileUploader({ url: uploadAPI, itemAlias: 'file' });

  //public uploader: FileUploader;
  // @ViewChild('video', { static: false }) videoElement: ElementRef;

  // "awsInputVideo": "myvodstreams-dev-input-hgbnm075",
  // "awsOutputVideo": "dv6ey2dghperj.cloudfront.net"
  //myvodstreams-dev-output-hgbnm075

  // public uploader: FileUploader = new FileUploader({
  //   url: "http://localhost:4000/api/upload",
  //   disableMultipart: false,
  //   autoUpload: true,
  //   method: 'post',
  //   itemAlias: 'attachment',
  //   allowedFileType: ['image', 'pdf','mp4']
  // });

  public uploader:FileUploader = new FileUploader({url: URL});

  path: Object | String;
  header: any;
  sources: any;
  videoUrl: Object | String;
  //options: any = {};
  options: { preload: string; controls: boolean; autoplay: boolean; overrideNative: boolean; techOrder: string[]; html5: { nativeVideoTracks: boolean; nativeAudioTracks: boolean; nativeTextTracks: boolean; hls: { withCredentials: boolean; overrideNative: boolean; debug: boolean; }; }; };

 

  playerState$: Observable<string>;
  lessonForm: FormGroup;
  selectedLesson: any;
  lessons: any;
  lesson: any;
  //api: VgAPI;
  setState: any;
  state: any;
  file: any;
  fileName: any;
  fileExtension: any;
  myUuid: any;
  ng2FileSelect: any;

  fileName1: string;
  file1: File;

  public files: any[];


  constructor(private platform: Platform, private elementRef: ElementRef, private apiService: APIService, private playerState: PlayerStateService, private formBuilder: FormBuilder, private appsync: AppsyncService, public toastCtrl: ToastController) {
    this.createLessonForm();

    //public uploader:FileUploader = new FileUploader({url: URL});

 
}

ngOnInit() {

  this.uploader.onAfterAddingFile = (fileItem: FileItem) => this.onAfterAddingFile(fileItem)

  this.getLessons();
}

onAfterAddingFile(fileItem: FileItem) {
  let latestFile = this.uploader.queue[this.uploader.queue.length-1]
  this.uploader.queue = []; 
  this.uploader.queue.push(latestFile);
}



onFileSelected(event: EventEmitter<File[]>) {
  const file: File = event[0];
  //console.log('this.files',file);
  this.processVideo(file)
}

// onFileSelected(event: any) {
//   this.files = event.target.files;
//   console.log('this.files',this.files);
//   this.processVideo(this.files);
// }

async processVideo(file) {
  this.myUuid = uuid();
  console.log('new id?', this.myUuid)

  const [createVideo, createVodAsset] = await Promise.all([
    await API.graphql(graphqlOperation(CreateVideo, { id: this.myUuid })) as Promise<any>,
    await API.graphql(graphqlOperation(CreateVodAsset, {
      title: this.lesson.name,
      description: this.lesson.description,
      vodAssetVideoId: this.myUuid
    })) as Promise<any>
  ])

  this.fileName = file.name;
  this.fileExtension = this.fileName.toLowerCase().split('.');

  // "aws_cognito_identity_pool_id": "eu-west-1:306a8427-73f8-4068-b6d3-19cad50aa36c",
  // "aws_cognito_region": "eu-west-1",
  // "aws_user_pools_id": "eu-west-1_5Ieij0FKG",


//   Auth: {
//     identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab', //REQUIRED - Amazon Cognito Identity Pool ID
//     region: 'XX-XXXX-X', // REQUIRED - Amazon Cognito Region
//     userPoolId: 'XX-XXXX-X_abcd1234', //OPTIONAL - Amazon Cognito User Pool ID
//     userPoolWebClientId: 'XX-XXXX-X_abcd1234', //OPTIONAL - Amazon Cognito Web Client ID
// },
// Storage: {
//     AWSS3: {
//         bucket: '', //REQUIRED -  Amazon S3 bucket
//         region: 'XX-XXXX-X', //OPTIONAL -  Amazon service region
//     }
// }

// "aws_user_pools_id": "eu-west-1_5Ieij0FKG",
// "aws_user_pools_web_client_id": "3hhmma3vbaptvj2kr10qftfder",

  Auth.configure({
    identityPoolId: awsconfig.aws_cognito_identity_pool_id,
    region: awsconfig.aws_cognito_region
    // userPoolId: "eu-west-1_5Ieij0FKG",//'XX-XXXX-X_abcd1234', //OPTIONAL - Amazon Cognito User Pool ID
    // userPoolWebClientId: "3hhmma3vbaptvj2kr10qftfder"//'XX-XXXX-X_abcd1234', //OPTIONAL - Amazon Cognito Web Client ID
  });
  // "arn:aws:s3:::'myvodstreams-dev-output-yri7i44c/${cognito-identity.amazonaws.com:sub}/*"

  Storage.configure({
    AWSS3: {
      bucket: awsvideoconfig.awsInputVideo,
      region: awsconfig.aws_cognito_region//"eu-west-1"  "aws_user_files_s3_bucket_region"
    },
  });

  //https://myvodstreams-dev-input-hgbnm075.s3-eu-west-1.amazonaws.com/French+Level+One+Track+1.mp4

  // Amplify.configure({
  //   //   Auth: {
  //console.log(`${this.myUuid}.${this.fileExtension[this.fileExtension.length - 1]}`,file)

  Storage.put(`${this.myUuid}.${this.fileExtension[this.fileExtension.length - 1]}`, file, {
    contentType: 'video/*'
  })
    .then(() => {
      this.lessonForm.patchValue({
        video: this.myUuid
      })
      //https://myvodstreams-dev-output-nsaua79s.s3.amazonaws.com/output/8e1e32d5-7a1d-4c7f-a928-bb2edc213d80.m3u8

      //dv6ey2dghperj.cloudfront.net
      //myvodstreams-dev-output-hgbnm075

      this.sources = [{
        src: `https://myvodstreams-dev-output-hgbnm075.s3.amazonaws.com/output/${this.myUuid}.m3u8`,
        type: 'application/x-mpegURL',
      }]
      console.log(`Successfully Uploaded: ${this.myUuid}`,"source",this.sources )
    })
    .catch((err) => console.log(`Error: ${err}`));
}


ngAfterViewInit() {
  this.options = {
    preload: "metadata",
    controls: true,
    autoplay: false,
    overrideNative: true,
    techOrder: ["html5"],
    html5: {
      nativeVideoTracks: false,
      nativeAudioTracks: false,
      nativeTextTracks: false,
      hls: {
        withCredentials: false,
        overrideNative: true,
        debug: true
      }
    }
  };

  this.platform.ready().then(() => {
    this.width = this.platform.width();
    this.height = this.platform.height();
  });

 


}

async getLessons() {
  const [lessons] = await Promise.all([
    API.graphql(graphqlOperation(ListLessons)) as Promise<any>
  ])
  console.log('lessons',lessons);
  this.lessons = lessons.data.listLesson3s.items;
}

// async getLesson() {
//   const [lesson] = await Promise.all([
//     API.graphql(graphqlOperation(GetLesson)) as Promise<any>
//   ])
//   this.lesson = lesson.data.getLesson3s.items;
// }

getSelectedLesson(event) {
  //console.log(event)
  this.lesson = this.lessons.find(function (element) {
    return element.name == event.detail.value;
  });

  this.upDateLesson();
}

upDateLesson() {
  this.lessonForm.patchValue({
    selectedLesson: this.lesson.name,
    description: this.lesson.description,
    section: this.lesson.section,
    subSection: this.lesson.subSection,
    level: this.lesson.level,
    video: this.lesson.video,
    keywords: this.lesson.keywords
  })


  //this.playVideo();
}

// playVideo(){

//   const video = videojs(this.videoElement.nativeElement, this.options);
//   video.responsive(true);
//   // // https://myvodstreams-dev-output-nsaua79s.s3.amazonaws.com/output/8e1e32d5-7a1d-4c7f-a928-bb2edc213d80.m3u8
//   this.sources = [{
//     src: `https://dv6ey2dghperj.cloudfront.net/${this.lesson.video}.m3u8`,
//     type: 'application/x-mpegURL',
//   }]
//   //this.sources = [{ "type": "application/x-mpegURL", "src": `https://myvodstreams-dev-output-yri7i44c.s3.amazonaws.com/output/${this.lesson.video}.m3u8", withCredentials: false }];

//   video.src(
//     this.sources
//     //this.videoUrl = "https://myvodstreams-dev-output-yri7i44c.s3.amazonaws.com/output/89cbab3b-dcd0-4ffa-a4d9-487193e51641.m3u8"
//   );
//   video.play();
// }

createLessonForm() {
  this.lessonForm = this.formBuilder.group({
    selectedLesson: [''],
    description: [''],
    section: [''],
    subSection: [''],
    level: [''],
    video: [''],
    keywords: ['']
  });
}

onSubmit() {
  //console.log('Your form data : ', this.lessonForm.value);
  this.updateLesson(this.lessonForm.value);


}

updateLesson(lesson) {
  this.appsync.hc().then(client => {
    const observable: ObservableQuery = client.mutate({
      mutation: UpdateLesson,
      variables: {
        id: this.lesson.id,
        name: lesson.selectedLesson,
        description: lesson.description,
        section: lesson.section,
        subSection: lesson.subSection,
        level: lesson.level,
        video: lesson.video,
        keywords: lesson.keywords,
        __typename: 'UpdateLesson3Input'
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
      this.lessonForm.reset();
      this.getLessons();
      this.createToast();
      // const toast = this.toastCtrl.create({
      //   message: 'lesson created',
      //   duration: 3000
      // });
      // toast.present();
      //this.router.navigate(['tabs/lessons', this.lessonId]);
    }).catch(err => console.log('Error creating message', err));
  });
}

async createToast() {
  const toast = await this.toastCtrl.create({
    message: 'Lesson updated',
    duration: 1000
  });
  await toast.present();
}

  // getSelectedVideo(e) {
  //   const file = e.target;
  //   // Storage.put('example.png', file, {
  //   //     contentType: 'image/png'
  //   // })
  //   // .then (result => console.log(result))
  //   // .catch(err => console.log(err));
  // }

  // async onImageUploaded(e) {
  //   console.log('e',e)
  //   // this.user.imageUrl = e.key;
  //   // if (this.userCreated) {
  //   //   await this.api.UpdateUser({
  //   //     id: this.userId,
  //   //     image: this.user.imageUrl
  //   //   });
  //   // }
  //   //this.showPhoto = true;
  // }

  // async onImageLoaded(e) {
  //   console.log('e on loaded', e.name);
  // }

  // async onImagePicked(e) {
  //   console.log('e on picked??', e.name);
  // this.image = e.name;
  // //console.log('what is onImageUploaded??', this.member)
  // if (this.userCreated) {
  //   const user = {
  //     id: this.id,
  //     username: this.profileForm.value.userData.userName,
  //     firstname: this.profileForm.value.userData.firstName,
  //     lastname: this.profileForm.value.userData.lastName,
  //     registered: this.registered,
  //     bio: this.profileForm.value.userData.goal,
  //     image: 'profile/'+this.image
  //   }

  //   this.userProfile = user;
  //   console.log('what is updateProfile??', this.getType(), user)
  //   await this.api[this.getType()](user);
  // }
  // this.showPhoto = true;
  // this.presentToast();
  // }

  // const toast = await this.toastCtrl.create({
  //   message: 'card created',
  //   duration: 3000
  // });
  // await toast.present();

}

 //     const video = document.getElementById('video');
    // const consoleElement = document.getElementById('console');
    // const src = 'https://s3.eu-central-1.amazonaws.com/vlakken/media-convert/output/RenzoPiano_2018-480p.m3u8';

    // if (video.canPlayType('application/vnd.apple.mpegURL')) {
    //   consoleElement.innerHTML = 'Using native';
    //   video.src = src;
    // }
    // else if(Hls.isSupported()) {
    //   if (Hls.isSupported()) {
    //     var hls = new Hls({debug:false});
    //     // bind them together
    //     hls.attachMedia(video);
    //     hls.on(Hls.Events.MEDIA_ATTACHED, () => {

    //       //hls.loadLevel = 3;

    //       hls.loadSource(src);

    //       hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
    //         console.log("manifest loaded", data);
    //         //console.log(hls.levels, hls.currentLevel, hls.loadLevel, hls.levels[hls.loadLevel]);
    //       });

    //       hls.on(Hls.Events.LEVEL_SWITCHING, (event, data) => {
    //         //console.log('LEVEL_SWITCHING', data);
    //       });
    //     });
    //     consoleElement.innerHTML = 'Using hls.js';
    //     video.play();
    //   }
    // }

      //   ngAfterViewInit() {

  // }

  //upload() {

    // Supports MediaSource API
    // if(Hls.isSupported()) {
    // 	var hls = new Hls();
    // 	hls.loadSource('myvodstreams-dev-output-yri7i44c.s3.us-east-1.amazonaws.com');
    // 	hls.attachMedia(this.player);
    // 	hls.on(Hls.Events.MANIFEST_PARSED, (() => {
    // 		this.player.play();
    // 	}).bind(this));
    // // Safari Mobile Detected
    // } else if (this.player.canPlayType('application/vnd.apple.mpegurl')) {
    // 	this.player.src = this.state.src;
    // 	this.player.addEventListener('loadedmetadata', (() => {
    // 		this.player.play();
    // 	}).bind(this));
    // }

 // }


    // Storage.configure({
    //   AWSS3: {
    //     bucket: awsvideoconfig.awsOutputVideo,//,"myvodstreams-dev-input-yri7i44c",
    //     region: "us-east-1"
    //   },
    // });
    // Auth.currentSession()
    //   .then((data) => {

    //     console.log('data', data);

    //     // this.header = {(`${data['idToken'].payload.sub}`)}
    //     // "arn:aws:s3:::'myvodstreams-dev-output-yri7i44c/${cognito-identity.amazonaws.com:sub}/*"
    //     // this.header  = ({ "cognito-identity.amazonaws.com":data['idToken'].payload.sub, groups: data['idToken'].payload['cognito:groups'] });
    //     this.header = data['idToken'].payload.sub;
    //     //https://myvodstreams-dev-output-yri7i44c.s3.amazonaws.com/output/French+Level+One+Track+1.m3u8

    //     // Storage.put('test.txt', 'Private Content')
    //     //   .then(result => console.log(result))
    //     //   .catch(err => console.log(err));


    //     //https://myvodstreams-dev-output-yri7i44c.s3.amazonaws.com/output/89cbab3b-dcd0-4ffa-a4d9-487193e51641.m3u8

    //     this.sources = [{
    //       src: "https://myvodstreams-dev-output-yri7i44c.s3-us-east-1.amazonaws.com/output/89cbab3b-dcd0-4ffa-a4d9-487193e51641.m3u8",
    //       type: 'application/x-mpegURL',
    //     }]


    //     Storage.get("track1.mp4",
    //       {
    //         level: 'public',
    //         identityId: "a214b698-1579-4ccb-8711-b11e32ab2b20" // the identityId of that user
    //       }
    //     )
    //       .then(result => {
    //         console.log(result);
    //         // replce public with output and change extension
    //         const regex = /public/gi;
    //         const regex1 = /mp4/gi;
    //         const regex2 = /track1/gi;

    //         let videoUrl = result.toString().replace(regex, 'output');
    //         let videoUrl1 = videoUrl.toString().replace(regex1, 'm3u8');
    //         this.videoUrl = videoUrl1.toString().replace(regex2, '89cbab3b-dcd0-4ffa-a4d9-487193e51641');
    //         console.log(this.videoUrl);
    //         this.videoUrl = "https://myvodstreams-dev-output-yri7i44c.s3.amazonaws.com/output/89cbab3b-dcd0-4ffa-a4d9-487193e51641.m3u8"
    //         //this.videoUrl = "https://myvodstreams-dev-output-yri7i44c.s3-us-east-1.amazonaws.com/output/89cbab3b-dcd0-4ffa-a4d9-487193e51641.m3u8"
    //         this.path = result;
    //       })
    //       .catch((err) => console.log(`Error: ${err}`));
    //   })





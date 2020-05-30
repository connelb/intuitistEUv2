import { Component, OnInit, ElementRef, ViewChild, Input, ViewEncapsulation } from '@angular/core';
import { ModalController, Platform, LoadingController } from '@ionic/angular';
import videojs from 'video.js';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import gql from 'graphql-tag';
import * as d3Scale from 'd3-scale';
import { AppsyncService } from '../providers/appsync.service';

const GetModelVideo = `
query GetVideo ($id:ID!){
  getVodAsset(id:$id){
    video {
      id
    }
  }
}`

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

const CreateUser3Video3 =
  `mutation CreateUser3Video3($user3Video3User3Id: ID!,$user3Video3Video3Id: ID!,$status:videoStatus, $score:Int )  {
    createUser3Video3(input:{user3Video3User3Id:$user3Video3User3Id, user3Video3Video3Id:$user3Video3Video3Id,status:$status,score:$score}){
      __typename
      id
      score
      status
      user3 {
        id
        __typename
     }
      _version
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

const UpdateUser3Video3 =
  gql`mutation UpdateUser3Video3($id: ID!,$status:videoStatus, $score:Int, $_version:Int )  {
    updateUser3Video3(input:{id:$id, status:$status, score:$score, _version:$_version}){
      __typename
      id
      score
      status
      user3 {
        id
        __typename
     }
       _version
    }
 }`


@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.page.html',
  styleUrls: ['./video-modal.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VideoModalPage implements OnInit {
  // player: videojs.Player;

  @ViewChild('video', { static: false }) videoElement: ElementRef;
  @Input() lesson;

  seekbarTracker: any = {
    duration: 0,
    time: 0,
    seekPercent: 0,
    hasDVR: false,
  };

  options: any;
  sources: any;
  public width: number = 0;
  public height: number = 0;
  duration: number;
  currentTime: any;
  userVideo: any;
  modelVideoId: any;
  user: any;

  constructor(
    public modalController: ModalController,
    private platform: Platform,
    public loadingController: LoadingController,
    private appsync: AppsyncService
  ) { }

  async ngOnInit() {
    // this.player = videojs(this.videoElement.nativeElement, this.options, function onPlayerReady() {
    //   console.log('onPlayerReady', this);
    // });

    setTimeout(() => {
      this.getModelVideo(this.lesson);
      this.getUserVideoId(this.lesson);
    }, 1000)

    await Auth.currentAuthenticatedUser({
      bypassCache: false
    }).then(async user => {
      this.user = user;
    })

    // set modelVideoId



    this.options = {
      preload: "metadata",
      controls: true,
      autoplay: true,
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
  }

  ngAfterViewInit() {



    this.platform.ready().then(() => {
      this.width = this.platform.width();
      this.height = this.platform.height();
    });

    // setTimeout(() => {
    //   console.log('modelVideo', this.modelVideoId)

    // }, 2000);
    setTimeout(() => {
      this.playVideo();
    }, 2000);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: 'dots',
      // message: 'Please wait...',
      duration: 300
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  async getModelVideo(lesson) {
    const [modelVideo] = await Promise.all([
      API.graphql(graphqlOperation(GetModelVideo, { id: lesson.video })) as Promise<any>
    ])

    this.modelVideoId = modelVideo.data.getVodAsset.video.id;
  }

  // to update score
  async getUserVideoId(lesson) {
    const [userVideo] = await Promise.all([
      API.graphql(graphqlOperation(GetUser3Video3, { user3Video3User3Id: this.user.attributes.sub, user3Video3Video3Id: lesson.video })) as Promise<any>
    ]);
    // console.log('make false or true',userVideo, userVideo.data.listUser3Video3s.items.length==0, userVideo.data.listUser3Video3s.items.length)
    if (userVideo.data.listUser3Video3s.items.length == 0) {
      const [userVideo1] = await Promise.all([
        API.graphql(graphqlOperation(CreateUser3Video3, { user3Video3User3Id: this.user.attributes.sub, user3Video3Video3Id: lesson.video, score: 0, status: 'doing' })) as Promise<any>
      ]);
      this.userVideo = userVideo1.data.createUser3Video3.items;
      //console.log('new this.userVideo',this.userVideo)
    } else {
      this.userVideo = userVideo.data.listUser3Video3s.items[0];
      //console.log('existing this.userVideo',this.userVideo)
    }
  }

  dismiss() {
    //this.getUserVideoId(this.lesson);
    let data = { duration: this.duration, currentTime: this.currentTime }
    // updateOrCreate()

    // this.videoStatus = data['data'];

    var x = d3Scale.scaleLinear()
      .domain([0, data.duration])
      .range([0, 30]);

    let videoScore = Math.ceil(x(data.currentTime));
    // // this.videoScoreUpdate(videoScore);
    this.updateVideoPWA(videoScore);

    this.modalController.dismiss(data);
  }


  async updateVideoPWA(videoScore) {
    // console.log('what is the video score?',videoScore)
    this.presentLoading();

    this.appsync.hc().then(client => {
      client.query({
        query: GetUser3Video3ById,
        variables: { id: this.userVideo.id },
        fetchPolicy: 'network-only'
      })
        .then(data => {
          console.log('GetUser3Video3ById data ???', (data.data.getUser3Video3) ? true : false)
          if ((data.data.getUser3Video3) ? true : false) {
            this.myUpdateUserVideo(data, videoScore)
          } else {
            this.myCreateUserVideo(videoScore);
          }
        })
        .catch(console.error);
    });
  }



  playVideo() {
    this.presentLoading();
    const video = videojs(this.videoElement.nativeElement, this.options);
 

    // video.scrubbing. 

    //     var player = videojs('player');

    // player.ready(function() {
    //   var promise = player.play();

    //   if (promise !== undefined) {
    //     promise.then(function() {
    //       // Autoplay started!
    //     }).catch(function(error) {
    //       // Autoplay was prevented.
    //     });
    //   }
    // });



    // Register the middleware with the player
    // videojs.use('*', this.disableForwardScrubbing);


    // if (player.browser.IS_IOS ) {
    //   console.log ("video on iOS device")
    //   // fullScreenElement.parentNode.removeChild(fullScreenElement);
    // }
    //  src: `https://d1lutvvxmfx9wo.cloudfront.net/public/audio/${card.audio}${'.mp3'}`,
    this.sources = [{
      // src: `https://dv6ey2dghperj.cloudfront.net/output/${this.modelVideoId}.m3u8`,
      src: `https://myvodstreams-dev-output-hgbnm075.s3.amazonaws.com/output/${this.modelVideoId}.m3u8`,
      type: 'application/x-mpegURL',
    }]

    video.src(
      this.sources
    );

    // video.on('', (e) => { e.preventDefault() },{passive: false});

    // video.ready(function() {
    //   video.requestFullscreen();
    // });

    // video.on('touchstart', (e) => { e.preventDefault() },{passive: false});
    video.on('timeupdate', () => {
      let hasDVR = false;
      this.duration = Math.floor(this.getDuration(video));
      this.currentTime = Math.floor(video.currentTime());
      let time;
      let seekPercent;
    });

    var autoPlayEvents = ['loadedmetadata', 'durationchange'];
    video.on(autoPlayEvents, autoplayableListener);

    function autoplayableListener(event) {
      console.log('video event? even working??',event);
      // event.preventDefault();
     
      if (event.type === 'durationchange' && video.duration() === Infinity) {
        attemptAutoplay();
        video.off(autoPlayEvents, autoplayableListener);
      }
      if (event.type === 'loadedmetadata') {
        attemptAutoplay();
        video.off(autoPlayEvents, autoplayableListener);
      }
    }



    function attemptAutoplay() {
      var promise = video.play();
      if (promise !== undefined) {

        promise.then(function () {
          // Autoplay started!
          console.log("video attemptAutoplay()??")
          video.ready(function () {
            // console.log("video ready OK??")
            // this.play();
          });
        }).
          catch(function (error) {
            // Autoplay was prevented.
          });
      }
    }
  }

  disableForwardScrubbing (player) {
    return {
      // +++ Implement setSource() +++
      setSource: function setSource(srcObj, next) {
        next(null, srcObj);
      },
      // +++ Alter the setCurrentTime method +++
      setCurrentTime: function setCurrentTime(ct) {
        var percentAllowForward = 50,
          // Determine percentage of video played
          percentPlayed = player.currentTime() / player.duration() * 100;
        // Check if the time scrubbed to is less than the current time
        // or if passed scrub forward percentage
        if (ct < player.currentTime() || percentPlayed > percentAllowForward) {
          // If true, move playhead to desired time
          return ct;
        }
        // If time scrubbed to is past current time and not passed percentage
        // leave playhead at current time
        return player.currentTime();
      }
    }
  };

  getDuration(player) {
    var seekable = player.seekable();
    return seekable && seekable.length ? seekable.end(0) - seekable.start(0) : 0;
  }

  myCreateUserVideo(videoScore) {

    const User3Video3ToCreate = {
      user3Video3User3Id: this.user.attributes.sub,
      user3Video3Video3Id: this.userVideo.id,
      status: 'done',
      score: videoScore,
      user3: { id: this.user.attributes.sub, username: this.user.username, __typename: "User3" },
      video3: { id: this.userVideo.id, __typename: "vodAsset" },
      _version: 1
    }

    this.appsync.hc().then(client => {
      client.mutate({
        mutation: CreateUser3Video3,
        variables: User3Video3ToCreate,

        optimisticResponse: () => ({
          createUser3Video3: {
            ...User3Video3ToCreate,
            __typename: "User3Video3"
          }
        }),

        update: (proxy, { data: { createUser3Video3: _User3Video3ToCreate } }) => {

          const options = {
            //   //getUserVideo
            query: GetUser3Video3,
            fetchPolicy: 'network-only',
            variables: { user3Video3User3Id: this.user.id, user3Video3Video3Id: this.userVideo.id },
            //__typename: "ModelUser3Card3Connection"//{ conversationId: this.conversation.id, first: constants.messageFirst }
          };
          proxy.writeQuery({
            ...options, data: {
              listUser3Video3s: {
                items: [{ ..._User3Video3ToCreate }],
                "__typename": "ModelUser3Video3Connection"
              }
            }
          });
        }


      }).then(({ data }) => {
        console.log("created a new User3Video3")

      }).catch(err => console.log('Error creating UserVideo', err));
    })

  }




  myUpdateUserVideo(res, videoScore) {

    const UserVideoToUpdate = {
      id: res.data.getUser3Video3.id,
      status: 'done',
      score: videoScore,
      user3: { id: this.user.attributes.sub, __typename: "User3" },
      video3: { id: this.userVideo.id, __typename: "vodAsset" },
      _version: +res.data.getUser3Video3._version,
      user3Video3User3Id: this.user.attributes.sub,
      user3Video3Video3Id: this.userVideo.id,
      __typename: "User3Video3"
    }

    console.log(" updateUserVideo in progress...")

    this.appsync.hc().then(client => {
      client.mutate({
        mutation: UpdateUser3Video3,
        variables: UserVideoToUpdate,

        optimisticResponse: () => ({
          updateUser3Video3: {
            ...UserVideoToUpdate,
            __typename: "User3Video3"
          }
        }),
        update: (proxy, { data: { updateUser3Video3: _UserVideoToUpdate } }) => {

          const options = {
            query: GetUser3Video3,
            fetchPolicy: 'network-only',
            variables: { user3Video3User3Id: this.user.id, user3Video3Video3Id: this.userVideo.id },
            __typename: "ModelUser3Video3Connection"
          };

          proxy.writeQuery({
            ...options, data: {
              listUser3Video3s: {
                items: [{ ..._UserVideoToUpdate }],
                "__typename": "ModelUser3Video3Connection"
              }
            }
          });
        }
      }).then(({ data }) => {
        console.log("updated a User3Video3")

      }).catch(err => console.log('Error updating User3Video3', err));
    })
  }

}

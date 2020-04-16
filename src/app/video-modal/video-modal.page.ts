import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import videojs from 'video.js';

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.page.html',
  styleUrls: ['./video-modal.page.scss'],
})
export class VideoModalPage implements OnInit {
  @ViewChild('video', { static: false }) videoElement: ElementRef;
  @Input() id: string;
  @Input() name: string;

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

  constructor(public modalController: ModalController, private platform: Platform) { }

  ngOnInit() {
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
    this.sources = [{
      src: `https://dv6ey2dghperj.cloudfront.net/output/${this.id}`,
      type: 'application/x-mpegURL',
    }]
    this.playVideo();
  }

  dismiss() {
    let data = { duration: this.duration, currentTime: this.currentTime }
    this.modalController.dismiss(data);
  }

  playVideo() {
    const video = videojs(this.videoElement.nativeElement, this.options);
    video.responsive(true);
    this.sources = [{
      src: `https://myvodstreams-dev-output-hgbnm075.s3.amazonaws.com/output/${this.id}.m3u8`,
      type: 'application/x-mpegURL',
    }]

    video.src(
      this.sources
    );

    //video.play();

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
      //console.log(event.type);
      // for live videos we want to listen for durationchange
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
        }).
        catch (function (error) {
          // Autoplay was prevented.
        });
      }
    }
  }

  getDuration(player) {
    var seekable = player.seekable();
    return seekable && seekable.length ? seekable.end(0) - seekable.start(0) : 0;
  }

}

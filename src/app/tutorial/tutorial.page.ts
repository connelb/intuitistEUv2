import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AmplifyService } from 'aws-amplify-angular';
//import { Events } from '@ionic/angular';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})

export class TutorialPage implements OnInit {
  showSkip = true;
  seen = false;
  repeat = false;
  isLoggedIn;
  authState: any;
  user;

  public slideOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: true,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction"
    }
  };

  @ViewChild('slides', {static: true}) slides: IonSlides;
 
  viewed: any;

  constructor(
    private amplifyService: AmplifyService,
    public menu: MenuController,
    public router: Router,
    public storage: Storage,
    //public events: Events,
  ) {
    Auth.currentSession()
    .then(data => {
      this.authState = data;
      this.isLoggedIn = this.authState.idToken.payload.email_verified;
      this.storage.set('hasLoggedIn', true).then(res => this.isLoggedIn = true);
      this.storage.set('hasSignedUp', this.authState.idToken.payload.email_verified);
    }).catch(err => {
      this.storage.set('hasLoggedIn', false).then(res => this.isLoggedIn = false);
      this.router.navigateByUrl('/login', { replaceUrl: true });
      console.log("tutorial constructor err:", err)
    });
}

ngOnInit() {
  this.storage.set('ion_did_tutorial', false).then(res => this.seen = res);
}


startApp() {
  this.storage.get('ion_tutorialViewed').then(res => this.viewed = res);

  if (!this.viewed) {
    this.storage.set('ion_tutorialViewed', 1);
  } else {
    this.storage.set('ion_tutorialViewed', this.viewed + 1);
  }


  this.storage.set('ion_did_tutorial', true).then(res => this.seen = res);

  if (this.isLoggedIn === false) {
    this.router.navigateByUrl('/login', { replaceUrl: true });
  } else if (this.isLoggedIn === true) {
    this.router.navigateByUrl('/app/tabs/lessons', { replaceUrl: true });
  }
}

onSlideChangeStart(event) {
  event.target.isEnd().then(isEnd => {
    this.storage.set('ion_did_tutorial', true).then(res => this.seen = res);
    this.showSkip = !isEnd;
  });
}

ionViewWillEnter() {
  this.storage.get('hasLoggedIn').then(res => this.isLoggedIn = res);

  this.storage.get("ion_repeat_tutorial").then(res => {
    if (res === false && this.isLoggedIn == true) {
      this.router.navigateByUrl('/app/tabs/lessons', { replaceUrl: true });
    }
  });

  this.menu.enable(false);
}

ionViewDidLeave() {
  // enable the root left menu when leaving the tutorial page
  this.menu.enable(true);
}
}

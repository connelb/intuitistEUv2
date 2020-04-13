// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { Events } from '@ionic/angular'

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuardService implements CanActivate {

//   signedIn = false;

//   constructor(public router: Router, public events: Events) {
//     this.events.subscribe('data:AuthState', async (data) => {
//       this.signedIn = data.signedIn;
//     })
//   }

//   canActivate() {
//     if (!this.signedIn) {
//       this.router.navigate(['/tabs/login']);
//     }
//     console.log('canActivate()?',this.signedIn)
//     return this.signedIn;
//   }
// }

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AmplifyService } from 'aws-amplify-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private storage: Storage, private amplifyService: AmplifyService, private router: Router) { }

  // canActivate() {
  //   return this.amplifyService.auth().currentAuthenticatedUser()
  //     .then(user => true)
  //     .catch(err => {
  //       this.storage.get('ion_tutorialViewed').then(res => {
  //         //   this.storage.set('ion_tutorialViewed', res+1);
  //         if (res > 3) {
  //           this.router.navigate(['/login']);
  //           return true;
  //         } else {
  //           this.router.navigate(['/tutorial']);
  //           return true;
  //         }

  //       })
  //     })
  // }


  canActivate() {
    //console.log('AuthGuard#canActivate called');
    return this.amplifyService.auth().currentAuthenticatedUser()
      .then(user => true)
      .catch(err => {
        //this.router.navigate(['/login']);
        return false;
    });
   }
}

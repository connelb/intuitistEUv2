import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class CheckTutorial implements CanLoad {
  viewed: any;
  constructor(private storage: Storage, private router: Router) {}

  canLoad() {
    return this.storage.get('ion_tutorialViewed').then(res => {
      this.storage.set('ion_tutorialViewed', res+1);
      if (res>30) {
         this.router.navigate(['/app','tabs','lessons']);     
        return false;
      } else {
        return true;
      }
    });
  }
}

// export class CheckTutorial implements CanLoad {
//   constructor(private storage: Storage, private router: Router) {}

//   canLoad() {
//     return this.storage.get('ion_did_tutorial').then(res => {
//       if (res) {
//         this.router.navigate(['/app', 'tabs', 'schedule']);
//         return false;
//       } else {
//         return true;
//       }
//     });
//   }
// }

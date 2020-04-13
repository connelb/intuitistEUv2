import { Component } from '@angular/core';
import { PopoverController} from '@ionic/angular';

@Component({
  template: `
    <ion-list>
      <ion-item button (click)="close('http://www.facebook.com/intuitist.languages')">
        <ion-label>Facebook</ion-label>
      </ion-item>
      <ion-item button (click)="close('http://www.linkedin.com/pub/intuitist-languages/108/2aa/160')">
        <ion-label>LinkedIn</ion-label>
      </ion-item>
      <ion-item button (click)="close('//twitter.com/intuitist')">
        <ion-label>Twitter</ion-label>
      </ion-item>
    </ion-list>
  `
})
export class PopoverPage {
  constructor(public popoverCtrl: PopoverController) {} //, private app: App

  support() {
    // this.app.getRootNavById[0].push('/support');
  
    this.popoverCtrl.dismiss();
  }

  close(url: string) {
    window.open(url, '_blank');
    this.popoverCtrl.dismiss();
  }
}
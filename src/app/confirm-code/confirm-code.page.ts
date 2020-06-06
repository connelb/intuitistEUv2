// import { Component } from '@angular/core';
// import { AuthGuard } from '../providers/auth-guard.service'
// import { AmplifyService } from 'aws-amplify-angular';
// import { Router } from '@angular/router';
import Amplify, { API, graphqlOperation } from "aws-amplify";
// import { FormFieldTypes } from '@aws-amplify/ui-components';
// import { Storage } from '@ionic/storage';
// import { Hub } from '@aws-amplify/core';

// import { AppsyncService } from '../../providers/appsync.service';
// import { Auth } from 'aws-amplify';

import { Component, OnInit, AfterContentInit, NgZone } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AmplifyService } from 'aws-amplify-angular';
import { AuthGuard } from './../providers/auth-guard.service'
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
// import User from 'src/app/types/user';

import { AppsyncService } from './../providers/appsync.service';
// import { Auth } from 'aws-amplify';
import { Hub } from '@aws-amplify/core';
import Auth, { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from "src/environments/environment";
import { AuthService } from '../providers/auth/auth.service';
import { NotificationService } from '../providers/notification/notification.service';


@Component({
  selector: 'app-confirm-code',
  templateUrl: './confirm-code.page.html',
  styleUrls: ['./confirm-code.page.scss'],
})
export class ConfirmCodePage implements OnInit {
  
  email = environment.confirm.email;
  username = environment.confirm.username;

  confirmForm: FormGroup = new FormGroup({
    email: new FormControl({value: this.email, disabled: true}),
    username: new FormControl({value: environment.confirm.username, disabled: true}),
    code: new FormControl('', [ Validators.required, Validators.min(3) ])
  });
  
  get codeInput() { return this.confirmForm.get('code'); }

  constructor( private _router: Router, private _notification: NotificationService,public toastCtrl: ToastController ) { }

  ngOnInit() {
    if (!this.email) {
      this._router.navigate(['/signup']);
    } else {
      Auth.resendSignUp(this.email);
    }
  }

  sendAgain() {
    Auth.resendSignUp(this.username)
      .then(() => this._notification.show('A code has been emailed to you'))
      .catch(() => this._notification.show('An error occurred'));
  }

  confirmCode() {
    console.log('what is username, and code?',environment.confirm.username, this.username, this.codeInput.value)
    Auth.confirmSignUp(environment.confirm.username, this.codeInput.value)
      .then((data: any) => {
        console.log('Auth.confirmSignUp  SUCCESS??',data);
        if (data === 'SUCCESS' &&
            environment.confirm.username &&
            environment.confirm.email && 
            environment.confirm.password) {
          Auth.signIn(this.username, environment.confirm.password)
            .then(() => {
              this._router.navigate(['']);


            }).catch((error: any) => {
              this._router.navigate(['/login']);
            })
        }
      })
      .catch((error: any) => {
        console.log(error);
        this._notification.show(error.message);
      })
  }

  async createToast() {
    // console.log('what is message',error)
    const toast = await this.toastCtrl.create({
      message: 'Thanks for registering, creating your new account now',
      duration: 4000
    });
    await toast.present();
  }

}
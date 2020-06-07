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
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  email;
  username;

  // signupForm: FormGroup = new FormGroup({
  //   email: new FormControl("", [Validators.email, Validators.required]),
  //   username: new FormControl("", [Validators.required]),
  //   password: new FormControl("", [Validators.required, Validators.minLength(8)]),
  //   phone: new FormControl("", [Validators.min(10)]),
  //   fname: new FormControl("", [Validators.min(2)]),
  //   lname: new FormControl("", [Validators.min(2)])
  // });


  forgotForm: FormGroup = new FormGroup({
    email: new FormControl("", ),
    username: new FormControl("", )
    // code: new FormControl('', [ Validators.required, Validators.min(3) ])
  });

  // get codeInput() { return this.forgotForm.get('code'); }
  get emailInput() { return this.forgotForm.get('email'); };
  get usernameInput() { return this.forgotForm.get('username'); };

  constructor(private _router: Router, private _notification: NotificationService, public toastCtrl: ToastController) { }

  ngOnInit() {

    this.forgotForm = new FormGroup({
      'email': new FormControl('email'),
      'username': new FormControl('username')
    });

    this.forgotForm.setValue({
      'email': environment.confirm.email,
      'username': environment.confirm.username
    })

    // this.forgotForm.setValue(value:{email:""}) //email = environment.confirm.email;
    // this.username = environment.confirm.username;
    // if (!this.email) {
    //   this._router.navigate(['/signup']);
    // } else {
    //   Auth.resendSignUp(this.email);
    // }
  }

  sendAgain() {
    console.log('a', this.usernameInput.value, this.emailInput.value)

    Auth.forgotPassword(this.emailInput.value)
      .then(() => this._notification.show('A code has been emailed to you'))
      .catch(() => this._notification.show('An error occurred'));
  }

  resetPassword() {
    console.log('a', environment, this.usernameInput.value, this.emailInput.value)

    Auth.forgotPassword(
      this.emailInput.value
      // this.forgotForm.get()
      // this.usernameInput.value
    )
      .then((data: any) => {

        console.log('resetPassword()', data)

      })
  }

  // confirmCode() {
  //   console.log('what is username, and code?', environment.confirm.username, this.username, this.codeInput.value)
  //   Auth.confirmSignUp(environment.confirm.username, this.codeInput.value)
  //     .then((data: any) => {
  //       console.log('Auth.confirmSignUp SUCCESS??',data);
  //       if (data === 'SUCCESS' &&
  //           environment.confirm.username &&
  //           environment.confirm.email && 
  //           environment.confirm.password) {
  //         Auth.signIn(this.username, environment.confirm.password)
  //           .then(() => {
  //             this._router.navigate(['']);

  //           }).catch((error: any) => {
  //             this._router.navigate(['/login']);
  //           })
  //       }
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //       this._notification.show(error.message);
  //     })
  // }

  async createToast() {
    const toast = await this.toastCtrl.create({
      message: 'Thanks for registering, creating your new account now',
      duration: 4000
    });
    await toast.present();
  }

}
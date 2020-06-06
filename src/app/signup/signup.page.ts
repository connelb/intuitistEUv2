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
import { ToastController, ActionSheetController, ModalController } from '@ionic/angular';
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
import { CountryCodeModalPage } from '../country-code-modal/country-code-modal.page';


// import { ModalpagePage } from './signup.page';

// import { ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic';


const FirstTimeCaller = `
  mutation createUser($id:ID,$username:String!){
    createUser3(input:{id:$id, username:$username}){
      id
      username
    }
  }`

const registeredUserCheck = `
query getUser($id:ID!){
  getUser3(id:$id){
    id
  }
}`

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  hide = true;
  submitted = false;
  signupForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.min(10)]),
    fname: new FormControl("", [Validators.min(2)]),
    lname: new FormControl("", [Validators.min(2)])
  });

  countryCode = "+353";

  get emailInput() {
    return this.signupForm.get("email");
  }
  get usernameInput() {
    return this.signupForm.get("username");
  }
  get passwordInput() {
    return this.signupForm.get("password");
  }
  get fnameInput() {
    return this.signupForm.get("fname");
  }
  get lnameInput() {
    return this.signupForm.get("lname");
  }
  get phoneInput() {
    return this.signupForm.get("phone");
  }

  constructor(
    protected amplifyService: AmplifyService,
    //private _bottomSheet: MatBottomSheet,
    private _authService: AuthService,
    private _router: Router,
    private modalCtrl: ModalController,
    public toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  async selectCountryCode(){
    const presentModel = await this.modalCtrl.create({
      component: CountryCodeModalPage,
      componentProps: {
        title: 'Country Codes',
        type:'billing',
      },
      showBackdrop: true,
      mode: "ios",
      cssClass: 'change-address-shipping-modal'
    });

    presentModel.onWillDismiss().then((data)=>{
      // console.log(data.data.dial_code);
      this.countryCode = data.data ? data.data['dial_code'] : this.countryCode;
      //custom code
    });

    return await presentModel.present();
  }


  // selectCountryCode() {
  //   // this._bottomSheet
  //   //   .open(CountryCodeSelectComponent)
  //   //   .afterDismissed()
  //   //   .subscribe((data: CountryCode) => {
  //   //     this.countryCode = data ? data.dial_code : this.countryCode;
  //   //   });
  // }

  getEmailInputError() {
    if (this.emailInput.hasError("email")) {
      return "Please enter a valid email address.";
    }
    if (this.emailInput.hasError("required")) {
      return "An Email is required.";
    }
  }

  getPasswordInputError() {
    if (this.passwordInput.hasError("required")) {
      return "A password is required.";
    }
  }

  shouldEnableSubmit() {
    return (
      !this.emailInput.valid ||
      !this.usernameInput.valid ||
      !this.passwordInput.valid ||
      !this.fnameInput.valid ||
      !this.lnameInput.valid ||
      !this.phoneInput.valid
    );
  }

  signUp() {
    this.submitted = true;
    this._authService
      .signUp({
        email: this.emailInput.value,
        username: this.usernameInput.value,
        password: this.passwordInput.value,
        // firstName: this.fnameInput.value,
        // lastName: this.lnameInput.value,
        phone: this.countryCode + this.phoneInput.value
      })
      .then(data => {
        environment.confirm.username = this.usernameInput.value;
        environment.confirm.email = this.emailInput.value;
        environment.confirm.password = this.passwordInput.value;
        this._router.navigate(["confirm"]);
      })
      .catch(error => this.createToast(error));
  }

  async createToast(error) {
    // console.log('what is message',error)
    const toast = await this.toastCtrl.create({
      message: error.message,
      duration: 4000
    });
    await toast.present();
  }
}
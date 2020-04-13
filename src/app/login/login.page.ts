// import { Component } from '@angular/core';
// import { AuthGuard } from '../providers/auth-guard.service'
// import { AmplifyService } from 'aws-amplify-angular';
// import { Router } from '@angular/router';
import Amplify, { API, graphqlOperation } from "aws-amplify";
// import { Storage } from '@ionic/storage';
// import { Hub } from '@aws-amplify/core';

// import { AppsyncService } from '../../providers/appsync.service';
import { Auth } from 'aws-amplify';

import { Component, OnInit, AfterContentInit,NgZone } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AmplifyService } from 'aws-amplify-angular';
import { AuthGuard } from './../providers/auth-guard.service'
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
// import User from 'src/app/types/user';

import { AppsyncService } from './../providers/appsync.service';
// import { Auth } from 'aws-amplify';
import { Hub } from '@aws-amplify/core';

import { ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic';



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
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  authState: any;
  registered: any;
  // authState: any;
  authService: AuthGuard

  public signUpConfig = {
    header: 'Sign up to get access code via email',
    defaultCountryCode: '1',
    hideAllDefaults: true,
    signUpFields: [
      {
        label: 'Username',
        key: 'username',
        required: true,
        displayOrder: 1,
        type: 'string',
      },
      {
        label: 'Password  (>8 letters, incl. upper & lowercase)',
        key: 'password',
        required: true,
        displayOrder: 2,
        type: 'password',
      },
      {
        label: 'Email',
        key: 'email',
        required: true,
        displayOrder: 3,
        type: 'email',
      }
    ]
  };
  user: any;
  userId: any;
  username: any;
  isLoggedIn = false;

  signedIn: boolean;
  greeting: string;

  constructor(
    // public authService: AuthGuard,
    protected amplifyService: AmplifyService,
    public router: Router,
    public storage: Storage,
    public guard: AuthGuard,
    public amplify: AmplifyService,
  ) {

    this.authState = { loggedIn: false };
    this.authService = guard;
    this.amplifyService = amplify;
    this.amplifyService.authStateChange$
      .subscribe(authState => {
        this.authState.loggedIn = authState.state === 'signedIn';
        //this.events.publish('data:AuthState', this.authState)

        if(authState.state === 'signedIn'){
          this.router.navigateByUrl('/app/tabs/lessons', { replaceUrl: true });
        }

        if(authState.state !== 'signedIn' && !authState.user){
          this.router.navigateByUrl('/login', { replaceUrl: true });
        }
      });



    //this.authState = { signedIn: false };


   
    //constructor( private amplifyService: AmplifyService ) {
        // this.amplifyService.authStateChange$
        //     .subscribe(authState => {
        //         this.signedIn = authState.state === 'signedIn';
        //         console.log("login called")
        //         if (!authState.user) {
        //             this.user = null;
        //             this.router.navigateByUrl('/tutorial', { replaceUrl: true })
        //         } else {
        //           console.log("should be logged in and route to home page")
        //             this.user = authState.user;
        //             this.greeting = "Hello " + this.user.username;
        //             //this.router.navigate(['/tabs/home']);
        //             this.router.navigateByUrl('/app/tabs/home', { replaceUrl: true })
        //         }
        // });
    //}

    // this.amplifyService.authStateChange$.subscribe(authState => {
    //   //this.events.publish('data:AuthState', this.authState);
    //   //console.log("waht is authState???", authState)
    //   //this.storage.get('hasLoggedIn').then(res => this.isLoggedIn = res);

    //   if (authState.state === 'confirmSignIn') {
    //     this.firstTimeCaller(authState.user.attributes.sub, authState.user.username);
    //     this.isLoggedIn = authState.state === 'confirmSignIn';
    //     this.registered = true;
    //   }

    //   const isLoggedIn = authState.state === 'signedIn';
    //   console.log('signedIn go to /tabs/home', !this.isLoggedIn, isLoggedIn);
    //   console.log('signedIn go to /tabs/login', this.isLoggedIn, !isLoggedIn)

    //   if (this.isLoggedIn && !isLoggedIn) {
    //     this.router.navigate(['']);
    //   } else if (!this.isLoggedIn && isLoggedIn) {
    //   //} else if (!this.isLoggedIn && isLoggedIn) {
    //       this.router.navigate(['/tabs/home']);
    //   }
    //   //this.isLoggedIn = isLoggedIn;
    // });

  }

  async firstTimeCaller(userId, username) {
    const [user] = await Promise.all([
      API.graphql(graphqlOperation(FirstTimeCaller, { id: userId, username: username })) as Promise<any>
    ])
  }

  cancel() {
    this.amplifyService.auth().signOut().then(() => {
        return this.router.navigateByUrl('/tutorial', { replaceUrl: true });
        // return this.router.navigateByUrl('/app/tabs/schedule');
      });

    // this.userData.logout().then(() => {
    //   return this.router.navigateByUrl('/signup');
    //   // return this.router.navigateByUrl('/app/tabs/schedule');
    // });
  }
}

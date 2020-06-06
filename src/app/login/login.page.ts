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
import Auth, { CognitoHostedUIIdentityProvider, CognitoUser } from '@aws-amplify/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '../providers/notification/notification.service';
import { AuthService } from '../providers/auth/auth.service';
import { environment } from '../../environments/environment';

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
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  
  signinForm: FormGroup = new FormGroup({
    // email: new FormControl('',[ Validators.email, Validators.required ]),
    username: new FormControl('',[ Validators.required, Validators.required ]),
    password: new FormControl('', [ Validators.required, Validators.min(6) ])
  });
  
  hide = true;


  // get emailInput() { return this.signinForm.get('email'); }
  get usernameInput() { return this.signinForm.get('username'); }
  get passwordInput() { return this.signinForm.get('password'); }


  authState: any;
  registered: any;
  // authState: any;
  authService: AuthGuard
  // formFields: FormFieldTypes;
  // formFields1: FormFieldTypes;

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
    public auth: AuthService, 
    private _notification: NotificationService, 
    private _router: Router,
  ) {

    Hub.listen('auth', (data) => {
      const { payload } = data
      console.log('A new auth event has happened: ', data)
      if (payload.event === 'signIn') {
        console.log('a user has signed in!')
        this.router.navigateByUrl('/app/tabs/lessons');
      }
      if (payload.event === 'signOut') {
        console.log('a user has signed out!')
        this.router.navigateByUrl('/login');
      }
    })

    // export interface FormFieldType {
    //   type: string;
    //   label?: string;
    //   placeholder?: string;
    //   hint?: string | FunctionalComponent | null;
    //   required?: boolean;
    //   handleInputChange?: (inputEvent: Event) => void;
    //   value?: string;
    //   inputProps?: object;
    //   disabled?: boolean;
    // }

    // this.formFields = [
    //   {
    //     type: "username",
    //     label: "User name",
    //     placeholder: "username",
    //     required: true,
    //   },
    //   {
    //     type: "password",
    //     label: "Password",
    //     placeholder: "create a password",
    //     required: true,
    //   }
    // ];

    // this.formFields1 = [
    //   {
    //     type: "username",
    //     label: "User name",
    //     placeholder: "username",
    //     required: true,
    //   },
    //   {
    //     type: "password",
    //     label: "Password",
    //     placeholder: "password",
    //     required: true,
    //   }
    // ];



    // constructor( public amplify:AmplifyService ) {
    //   // handle auth state changes
    //   this.amplify.authStateChange$
    //     .subscribe(authState => {
    //       this.authenticated = authState.state === 'signedIn';
    //       if (!authState.user) {
    //         this.user = null;
    //       } else {
    //         this.user = authState.user;
    //       }
    //   });
    // }





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

  ngOnInit() {
    this.authState = { loggedIn: false };
    this.authService = this.guard;
    this.amplifyService = this.amplify;
    this.amplifyService.authStateChange$
      .subscribe(authState => {
        console.log('authState??????',authState);
        this.authState.loggedIn = authState.state === 'signedIn';
        //this.events.publish('data:AuthState', this.authState)
        if (!authState.user) {
          this.user = null;
        }
        if (authState.state === 'signedIn') {
          this.router.navigateByUrl('/app/tabs/lessons', { replaceUrl: true });
        }

        if (authState.state !== 'signedIn' && !authState.user) {
          this.router.navigateByUrl('/login', { replaceUrl: true });
        }
      });
  }

  async firstTimeCaller(userId, username) {
    const [user] = await Promise.all([
      API.graphql(graphqlOperation(FirstTimeCaller, { id: userId, username: username })) as Promise<any>
    ])
  }

  cancel() {
    this.amplifyService.auth().signOut().then(() => {
      return this.router.navigateByUrl('/login');
      // return this.router.navigateByUrl('/app/tabs/schedule');
    });

    // this.userData.logout().then(() => {
    //   return this.router.navigateByUrl('/signup');
    //   // return this.router.navigateByUrl('/app/tabs/schedule');
    // });
  }

  async signInWithFacebook() {
    const socialResult = await this.socialSignIn(CognitoHostedUIIdentityProvider.Facebook);
    console.log('fb Result:', socialResult);
  }

  socialSignIn(provider: CognitoHostedUIIdentityProvider): Promise<any> {
    return Auth.federatedSignIn({
      'provider': provider
    });
  }


  // getEmailInputError() {
  //   if (this.emailInput.hasError('email')) {
  //     return 'Please enter a valid email address.';
  //   }
  // }
  // getEmailInputError() {
  //   if (this.emailInput.hasError('required')) {
  //     return 'An Email is required.';
  //   }
  // }

  getPasswordInputError() {
    if (this.passwordInput.hasError('required')) {
      return 'A password is required.';
    }
  }

  getUsernameInputError() {
    if (this.usernameInput.hasError('required')) {
      return 'A username is required.';
    }
  }

  signIn() {
    // this._loader.show();
    this.auth.signIn(this.usernameInput.value, this.passwordInput.value)
      .then((user: CognitoUser|any) => {
        // this._loader.hide();
        this._router.navigate(['']);
      })
      .catch((error: any) => {
        // this._loader.hide();
        this._notification.show(error.message);
        switch (error.code) {
          case "UserNotConfirmedException":
            environment.confirm.username= this.usernameInput.value;
            environment.confirm.password = this.passwordInput.value;
            this._router.navigate(['confirm']);
            break;
          case "UsernameExistsException":
            this._router.navigate(['signin']);
            break;
        }
      })
  }

  async signInWithFacebook1() {
    const socialResult = await this.auth.socialSignIn(AuthService.FACEBOOK);
    console.log('fb Result:', socialResult);
  }

  // async signInWithGoogle() {
  //   const socialResult = await this.auth.socialSignIn(AuthService.GOOGLE);
  //   console.log('google Result:', socialResult);
  // }
}





// import { Component } from '@angular/core';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { AuthService } from '../auth.service';
// import { CognitoUser } from '@aws-amplify/auth';
// import { NotificationService } from 'src/app/services/notification.service';
// import { Router } from '@angular/router';
// import { environment } from 'src/environments/environment';
// import { LoaderService } from 'src/app/loader/loader.service';

// @Component({
//   selector: 'app-sign-in',
//   templateUrl: './sign-in.component.html',
//   styleUrls: ['./sign-in.component.scss']
// })
// export class SignInComponent {

//   signinForm: FormGroup = new FormGroup({
//     email: new FormControl('',[ Validators.email, Validators.required ]),
//     password: new FormControl('', [ Validators.required, Validators.min(6) ])
//   });

//   hide = true;

//   get emailInput() { return this.signinForm.get('email'); }
//   get passwordInput() { return this.signinForm.get('password'); }

//   constructor( 
//     public auth: AuthService, 
//     private _notification: NotificationService, 
//     private _router: Router,
//     private _loader: LoaderService ) { }

//   getEmailInputError() {
//     if (this.emailInput.hasError('email')) {
//       return 'Please enter a valid email address.';
//     }
//     if (this.emailInput.hasError('required')) {
//       return 'An Email is required.';
//     }
//   }

//   getPasswordInputError() {
//     if (this.passwordInput.hasError('required')) {
//       return 'A password is required.';
//     }
//   }

//   signIn() {
//     this._loader.show();
//     this.auth.signIn(this.emailInput.value, this.passwordInput.value)
//       .then((user: CognitoUser|any) => {
//         this._loader.hide();
//         this._router.navigate(['']);
//       })
//       .catch((error: any) => {
//         this._loader.hide();
//         this._notification.show(error.message);
//         switch (error.code) {
//           case "UserNotConfirmedException":
//             environment.confirm.email = this.emailInput.value;
//             environment.confirm.password = this.passwordInput.value;
//             this._router.navigate(['auth/confirm']);
//             break;
//           case "UsernameExistsException":
//             this._router.navigate(['auth/signin']);
//             break;
//         }
//       })
//   }

//   async signInWithFacebook() {
//     const socialResult = await this.auth.socialSignIn(AuthService.FACEBOOK);
//     console.log('fb Result:', socialResult);
//   }

//   async signInWithGoogle() {
//     const socialResult = await this.auth.socialSignIn(AuthService.GOOGLE);
//     console.log('google Result:', socialResult);
//   }
// }

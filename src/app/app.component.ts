import { Component, OnInit, ViewEncapsulation } from '@angular/core';

//import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AmplifyService } from 'aws-amplify-angular';

import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { Storage } from '@ionic/storage';

import { MenuController, Platform, ToastController } from '@ionic/angular';
import Auth from '@aws-amplify/auth';

import gql from 'graphql-tag';
import { AppsyncService } from './providers/appsync.service';
import User from './types/user';



// export default gql`
// mutation createUser($username: String!) {
//   createUser(username: $username) {
//     __typename
//     cognitoId
//     username
//     registered
//     id
//   }
// }`;

// const updateUserCardtoDoing = `
// mutation updateUserCardtoDoing ($id: ID!, $score: Int){
//   updateUser3Card3(input:{id: $id, status:doing, score:$score}) {
//     status
//     score
//   }
// }
// `

// mutation CreateUser{
//   createUser3(input:{username:"test"}){
//     id
//   }
// }


const createUser = gql`
  mutation createUser($id:ID, $username:String!){
    createUser3(input:{id:$id, username:$username}){
      id
      username
    }
  }`

const getMe =  gql`
query getMe {
  me {
    username
    id
  }
}`;



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  appPages = [
    {
      title: 'Lessons',
      url: '/app/tabs/lessons',
      icon: 'calendar'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'information-circle'
    }
  ];



  loggedIn = false;
  dark = false;
  isAdmin: boolean = false;
  me: User;
  session;

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    protected amplifyService: AmplifyService,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    private appsync: AppsyncService
  ) {
    this.initializeApp();

    // this.amplifyService.authStateChange$.subscribe(authState => {
    //   const isLoggedIn = authState.state === 'signedIn' || authState.state === 'confirmSignIn';
    //   if (this.isLoggedIn && !isLoggedIn) {
    //     router.navigate(['']);
    //   } else if (!this.isLoggedIn && isLoggedIn) {
    //     router.navigate(['/chat']);
    //   }
    //   this.isLoggedIn = isLoggedIn;
    // });

    this.amplifyService.authStateChange$.subscribe(authState => {
      const isLoggedIn = authState.state === 'signedIn' || authState.state === 'confirmSignIn';
      if (this.loggedIn && !isLoggedIn) {
        router.navigate(['']);
      } else if (!this.loggedIn && isLoggedIn) {
        router.navigateByUrl('/app/tabs/lessons');
      }
      this.loggedIn = isLoggedIn;
    });

    // this.router.navigateByUrl('/tutorial');
  }

  async ngOnInit() {


    Auth.currentSession().then(session => {
      this.logInfoToConsole(session);
      this.session = session;
      this.register();
      setImmediate(() => this.createUser());
    });


    await Auth.currentAuthenticatedUser({
      bypassCache: false
    }).then(async user => {
      this.isAdmin = user.signInUserSession.accessToken.payload["cognito:groups"][0] == 'Admin';
    });

    // After retrieving the confirmation code from the user
// Auth.confirmSignUp(username, code, {
//   // Optional. Force user confirmation irrespective of existing alias. By default set to True.
//   forceAliasCreation: true    
// }).then(data => console.log(data))
// .catch(err => console.log(err));

    // this.checkLoginStatus();
    // this.listenForLoginEvents();

    // this.swUpdate.available.subscribe(event => {
    //   console.log('[App] Update available: current version is', event.current, 'available version is', event.available);
    //   this.update = true;
    // });

    this.swUpdate.available.subscribe(async res => {
      const toast = await this.toastCtrl.create({
        message: 'Update available!',
        position: 'bottom',
        buttons: [
          {
            role: 'cancel',
            text: 'Reload'
          }
        ]
      });

      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });
  }

  logInfoToConsole(session) {
    // console.log(session);
    // console.log(`ID Token: <${session.idToken.jwtToken}>`);
    // console.log(`Access Token: <${session.accessToken.jwtToken}>`);
    // console.log('Decoded ID Token:');
    // console.log(JSON.stringify(session.idToken.payload, null, 2));
    // console.log('Decoded Acess Token:');
    // console.log(JSON.stringify(session.accessToken.payload, null, 2));
  }

  createUser() {
    //createUser3
    const user: User = {
      username: this.session.idToken.payload['cognito:username'],
      id: this.session.idToken.payload['sub'],
      // cognitoId: this.session.idToken.payload['sub'],
      // registered: false
    };
    // console.log('creating user', user);
    this.appsync.hc().then(client => {
      client.mutate({
        mutation: createUser,
        variables: {id: user.id, username: user.username},

        optimisticResponse: () => ({
           createUser3: {
            ...user,
            __typename: 'User3'
         }
        }),

        update: (proxy, {data: { createUser3: _user }}) => {
          //  console.log('createUser update with:', proxy, _user);
           proxy.writeQuery({query: getMe, data: {me: {..._user}}});
         }
      }).catch(err => console.log('Error registering user', err));
    })
  }

  register() {
    this.appsync.hc().then(client => {
      client.watchQuery({
        query: getMe,
        fetchPolicy: 'cache-only'
  // fetchPolicy: 'cache-and-network'
      }).subscribe(({data}) => {
        //console.log('register user, fetch cache', data);
        if (data) { this.me = data.me; }
      });
    });
  }

  // async checkLoginStatus() {
  //   this.amplifyService.authStateChange$
  //     .subscribe(authState => {
  //       this.loggedIn = authState.state === 'signedIn';
  //     });

  //   // return this.userData.isLoggedIn().then(loggedIn => {
  //   //   return this.updateLoggedInStatus(loggedIn);
  //   // });
  // }

  // updateLoggedInStatus(loggedIn: boolean) {
  //   setTimeout(() => {
  //     this.loggedIn = loggedIn;
  //   }, 300);
  // }

  // listenForLoginEvents() {
  //   window.addEventListener('user:login', () => {
  //     this.updateLoggedInStatus(true);
  //   });

  //   window.addEventListener('user:signup', () => {
  //     this.updateLoggedInStatus(true);
  //   });

  //   window.addEventListener('user:logout', () => {
  //     this.updateLoggedInStatus(false);
  //   });
  // }

  logout() {
    this.amplifyService.auth().signOut().then(() => {
      return this.router.navigateByUrl('/about');
    });

    // this.userData.logout().then(() => {
    //   return this.router.navigateByUrl('/signup');
    //   // return this.router.navigateByUrl('/app/tabs/schedule');
    // });
  }

  //   signOut() {
  //   this.amplifyService.auth().signOut();
  // }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', false);
    this.router.navigateByUrl('/tutorial');
  }

}


// isLoggedIn = false;

// constructor(private amplifyService: AmplifyService, public router: Router) {
//   this.amplifyService.authStateChange$.subscribe(authState => {
//     const isLoggedIn = authState.state === 'signedIn' || authState.state === 'confirmSignIn';
//     if (this.isLoggedIn && !isLoggedIn) {
//       router.navigate(['']);
//     } else if (!this.isLoggedIn && isLoggedIn) {
//       router.navigate(['/chat']);
//     }
//     this.isLoggedIn = isLoggedIn;
//   });
// }

// public signOut() {
//   this.amplifyService.auth().signOut();
// }
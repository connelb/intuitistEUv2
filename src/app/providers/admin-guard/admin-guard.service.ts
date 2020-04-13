import { Injectable } from '@angular/core';
import { Router, CanLoad } from '@angular/router';
import { AmplifyService } from 'aws-amplify-angular';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanLoad {

  constructor(private amplifyService: AmplifyService, private router: Router) { }

  canLoad() {
    return this.amplifyService.auth().currentAuthenticatedUser()
      .then(user => {
        return user.signInUserSession.accessToken.payload["cognito:groups"][0]=='Admin';
      })
      .catch(err => {})
  }

}

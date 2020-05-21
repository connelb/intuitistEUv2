import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

import { AmplifyAngularModule, AmplifyIonicModule, AmplifyService } from 'aws-amplify-angular'
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmplifyUIAngularModule,
    AmplifyIonicModule, 
    LoginPageRoutingModule
  ],
  declarations: [LoginPage],
  providers: [AmplifyService]
})
export class LoginPageModule {}

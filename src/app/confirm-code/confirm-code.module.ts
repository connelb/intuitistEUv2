import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './confirm-code-routing.module';

import { ConfirmCodePage } from './confirm-code.page';

import { AmplifyAngularModule, AmplifyIonicModule, AmplifyService } from 'aws-amplify-angular'
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AmplifyUIAngularModule,
    AmplifyIonicModule, 
    SignupPageRoutingModule
  ],
  declarations: [ConfirmCodePage],
  providers: [AmplifyService]
})
export class LoginPageModule {}

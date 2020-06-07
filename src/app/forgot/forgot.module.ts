import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './forgot-routing.module';

import { ForgotPage } from './forgot.page';

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
  declarations: [ForgotPage],
  providers: [AmplifyService]
})
export class ForgotPageModule {}

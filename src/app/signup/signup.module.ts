import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SignupPageRoutingModule } from './signup-routing.module';
import { SignupPage } from './signup.page';

import { AmplifyAngularModule, AmplifyIonicModule, AmplifyService } from 'aws-amplify-angular'
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { CountryCodeModalPage } from '../country-code-modal/country-code-modal.page';


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
  declarations: [SignupPage],
  entryComponents: [CountryCodeModalPage],
  providers: [AmplifyService]
})
export class SignupPageModule {}

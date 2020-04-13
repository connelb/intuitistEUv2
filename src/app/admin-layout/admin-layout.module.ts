import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmplifyAngularModule, AmplifyService} from 'aws-amplify-angular';

import { IonicModule } from '@ionic/angular';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';

import { AdminLayoutComponent } from './admin-layout.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CardModalPage } from './card-modal/card-modal.page';
import {  CardModalPageModule } from './card-modal/card-modal.module';
//import {FileUploadModule} from 'ng2-file-upload';


@NgModule({
  declarations: [AdminLayoutComponent],
  entryComponents: [CardModalPage],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AmplifyAngularModule,
    AdminLayoutRoutingModule,
    CardModalPageModule
    //UpdateCardModule
    //FileUploadModule
  ]
})
export class AdminLayoutModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardUpdatePageRoutingModule } from './card-update-routing.module';

import { CardUpdatePage } from './card-update.page';
import { FileUploadModule } from 'ng2-file-upload';
//import { UpdateCardComponent } from '../modals/update-card/update-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    CardUpdatePageRoutingModule,
    FileUploadModule
  ],
  declarations: [CardUpdatePage]
})
export class CardUpdatePageModule { }

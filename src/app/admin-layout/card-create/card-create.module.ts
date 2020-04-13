import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardCreatePageRoutingModule } from './card-create-routing.module';

import { CardCreatePage } from './card-create.page';
import { FileUploadModule } from "ng2-file-upload"; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    CardCreatePageRoutingModule,
    FileUploadModule
  ],
  declarations: [CardCreatePage]
})
export class CardCreatePageModule {}

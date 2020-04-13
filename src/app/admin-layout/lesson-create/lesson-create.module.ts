import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LessonCreatePageRoutingModule } from './lesson-create-routing.module';

import { LessonCreatePage } from './lesson-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    LessonCreatePageRoutingModule
  ],
  declarations: [LessonCreatePage]
})
export class LessonCreatePageModule {}

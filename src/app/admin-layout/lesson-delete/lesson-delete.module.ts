import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LessonDeletePageRoutingModule } from './lesson-delete-routing.module';

import { LessonDeletePage } from './lesson-delete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LessonDeletePageRoutingModule
  ],
  declarations: [LessonDeletePage]
})
export class LessonDeletePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';
import { ChartDirective } from './../directives/chart/chart.directive';
import { ProgressBarDirective } from './../directives/progress-bar/progress-bar.directive';

import { ProfilePage } from './profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule
  ],
  declarations: [ProfilePage,ChartDirective,ProgressBarDirective]
})
export class ProfilePageModule {}

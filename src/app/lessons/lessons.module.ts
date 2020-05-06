import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LessonsPage } from './lessons.page';

//import { ChartDirective } from './../directives/chart/chart.directive';

import { AmplifyAngularModule, AmplifyService, AmplifyIonicModule } from 'aws-amplify-angular';
import { SumScorePipe } from './../pipes/sumScore/sum-score.pipe';

import { TotalCardsPipe } from './../pipes/totalCards/total-cards.pipe';
import { VideoScorePipe } from './../pipes/videoScore/video-score.pipe';
import { TotalScorePipe } from '../pipes/totalScore/total-score.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmplifyAngularModule,
    AmplifyIonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: LessonsPage
      }
    ])
  ],
  declarations: [LessonsPage,SumScorePipe,TotalCardsPipe,VideoScorePipe,TotalScorePipe ]
})
export class LessonsPageModule {}

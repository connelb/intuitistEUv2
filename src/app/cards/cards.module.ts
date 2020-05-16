import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CardsPageRoutingModule } from './cards-routing.module';
import { CardsPage } from './cards.page';
// import { TotalScorePipe } from './../pipes/totalScore/total-score.pipe';
import { TotalCardsPipe } from '../pipes/totalCards/total-cards.pipe';
import { VideoScoreCardsPipe } from '../pipes/videoScoreCards/video-score-cards.pipe';
import { ScoreComponent } from '../score/score.component';
// import { AudioContextModule } from 'angular-audio-context/build/es2019/audio-context.module';
//import { AudioContextModule } from 'angular-audio-context';
// import { AudioContextModule } from 'angular-audio-context';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CardsPageRoutingModule
  ],
  declarations: [CardsPage,TotalCardsPipe,VideoScoreCardsPipe,ScoreComponent]
})
export class CardsPageModule{}

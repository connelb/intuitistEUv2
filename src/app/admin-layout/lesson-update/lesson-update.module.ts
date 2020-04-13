import {NgModule} from '@angular/core'
import {CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { LessonUpdatePage } from './lesson-update.page';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
// import { VgCoreModule } from 'videogular2/compiled/core';
// import { VgControlsModule } from 'videogular2/compiled/controls';
// import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';
// import { VgBufferingModule } from 'videogular2/compiled/buffering';
import {FileUploadModule} from 'ng2-file-upload';
import { IonicModule } from '@ionic/angular';
import { LessonUpdatePageRoutingModule } from './lesson-update-routing.module';
//import { VgStreamingModule } from 'videogular2/complied/streaming';
//import {  HlsjsPlyrDriver} from './../../components/video/video.component';
//declare const videojs: any;


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
     ReactiveFormsModule,
    IonicModule,
    LessonUpdatePageRoutingModule,
    AmplifyAngularModule,
    // VgCoreModule,
    // VgControlsModule,
    // VgOverlayPlayModule,
    // VgBufferingModule,
    FileUploadModule
  ],
  declarations: [LessonUpdatePage]
})
export class LessonUpdatePageModule {}

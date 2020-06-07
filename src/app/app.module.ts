import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import Auth from '@aws-amplify/auth';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppsyncService } from './providers/appsync.service';
import { AmplifyAngularModule, AmplifyService, AmplifyModules } from 'aws-amplify-angular';
import { IonicStorageModule } from '@ionic/storage';
import { AdminLayoutModule } from './admin-layout/admin-layout.module';
import { VideoModalPage } from './video-modal/video-modal.page'
import { VideoModalPageModule } from './video-modal/video-modal.module';
import { ReviewModalPageModule } from './review-modal/review-modal.module';
import { TestModalPageModule } from './test-modal/test-modal.module';
import { CountryCodeModalPageModule } from './country-code-modal/country-code-modal.module';
//import { VideoScorePipe } from './pipes/videoScore/video-score.pipe';
import { AuthGuard } from './providers/auth-guard.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { APIService } from './API.service';
import { MyAPIService } from './API.my';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { ScoreComponent } from './score/score.component';
// import { VideoScoreCardsPipe } from './pipes/videoScoreCards/video-score-cards.pipe';
// import { TotalScorePipe } from './pipes/totalScore/total-score.pipe';
// import { ProgressBarDirective } from './directives/progress-bar/progress-bar.directive';
//import { AudioContextModule} from 'angular-audio-context';
//import { VideoJSRecordComponent } from './cards/cards.page';
// import { TotalScorePipe } from './pipes/totalScore/total-score.pipe';

//import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';

@NgModule({
  declarations: [AppComponent],
  //entryComponents: [VideoModalPage],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    //AudioContextModule.forRoot("balanced"),
    AppRoutingModule,
    FormsModule,
    // AmplifyAngularModule,
   
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AdminLayoutModule,
    //AmplifyUIAngularModule, 
    VideoModalPageModule,
    ReviewModalPageModule,
    TestModalPageModule,
    CountryCodeModalPageModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    
  ],
  providers: [
    // AmplifyService,
    // {
    //   provide: AmplifyService,
    //   useFactory: () => {
    //     return AmplifyModules({
    //       Auth,
    //       Storage
    //     });
    //   }
    // },
    InAppBrowser, SplashScreen, StatusBar,
    AmplifyService,
    APIService,
    MyAPIService,
    AppsyncService,
    AuthGuard,


    // StatusBar,
    // AmplifyService,
    // SplashScreen,
    // AppsyncService,
    // AuthGuard,

    //Friday afternnon, decided to review???
    // {
    //   // provide: RouteReuseStrategy, useClass: IonicRouteStrategy, useFactory: () => {
    //   provide: RouteReuseStrategy, useClass: IonicRouteStrategy, useFactory: () => {
    //     return AmplifyModules({
    //       Auth
    //     });
    //   }
    // },

  ],
  // providers: [AmplifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }


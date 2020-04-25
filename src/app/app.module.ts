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
//import { VideoScorePipe } from './pipes/videoScore/video-score.pipe';
import { AuthGuard } from './providers/auth-guard.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { APIService } from './API.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [AppComponent],
  //entryComponents: [VideoModalPage],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    AmplifyAngularModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AdminLayoutModule,
    VideoModalPageModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AmplifyService,
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
    //AmplifyService,
    APIService,
    AppsyncService,
    AuthGuard,

    // StatusBar,
    // AmplifyService,
    // SplashScreen,
    // AppsyncService,
    // AuthGuard,
    {
      provide: RouteReuseStrategy, useClass: IonicRouteStrategy, useFactory: () => {
        return AmplifyModules({
          Auth
        });
      }
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

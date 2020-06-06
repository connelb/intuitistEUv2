import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CheckTutorial } from './providers/check-tutorial.service';
import { AdminGuardService } from './providers/admin-guard/admin-guard.service';
import { AuthGuard } from './providers/auth-guard.service'
// import { SignInComponent } from './auth/sign-in/sign-in.component';
// import { SignUpComponent } from './auth/sign-up/sign-up.component';
// import { ConfirmCodeComponent } from './auth/confirm-code/confirm-code.component';
// import { ProfileComponent } from './auth/profile/profile.component';
// import { AuthComponent } from './auth/auth.component';
// import { UnauthGuard } from './auth/unauth.guard';
// import { authAuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/tutorial',
    pathMatch: 'full'
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'lesson-create',
    loadChildren: () => import('./admin-layout/lesson-create/lesson-create.module').then(m => m.LessonCreatePageModule),
    canActivate: [AuthGuard]
    //loadChildren: './lesson-create/lesson-create.module#LessonCreatePageModule'
  },
  {
    path: 'card-create',
    loadChildren: () => import('./admin-layout/card-create/card-create.module').then(m => m.CardCreatePageModule),
    canActivate: [AuthGuard]
    //loadChildren: './card-create/card-create.module#CardCreatePageModule'
  },
  {
    path: 'card-update',
    loadChildren: () => import('./admin-layout/card-update/card-update.module').then(m => m.CardUpdatePageModule),
    canActivate: [AuthGuard]
    //loadChildren: './card-update/card-update.module#CardUpdatePageModule'
  },
  {
    path: 'lesson-update',
    loadChildren: () => import('./admin-layout/lesson-update/lesson-update.module').then(m => m.LessonUpdatePageModule),
    canActivate: [AuthGuard]
    //loadChildren: './lesson-update/lesson-update.module#LessonUpdatePageModule'
  },
  {
    path: 'lesson-delete',
    loadChildren: () => import('./admin-layout/lesson-delete/lesson-delete.module').then(m => m.LessonDeletePageModule),
    canActivate: [AuthGuard]
    //loadChildren: './lesson-update/lesson-update.module#LessonUpdatePageModule'
  }
  ,
  {
    path: 'card-modal',
    loadChildren: () => import('./admin-layout/card-modal/card-modal.module').then( m => m.CardModalPageModule),
    canActivate: [AuthGuard]
    //loadChildren: '../admin-layout/card-modal/card-modal.module#CardModalPageModule'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule),
    // canActivate: [AuthGuard] 
  },
  {
    path: 'confirm',
    loadChildren: () => import('./confirm-code/confirm-code.module').then(m => m.LoginPageModule),
    // canActivate: [AuthGuard]
  },
  
  // { path: 'auth', component: AuthComponent, children: [
  //   {
  //     path: 'signin',
  //     // loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  //     component: SignInComponent,
  //     canActivate: [UnauthGuard]
  //   },
  //   {
  //     path: 'signup',
  //     component: SignUpComponent,
  //     canActivate: [UnauthGuard]
  //   },
  //   {
  //     path: 'confirm',
  //     component: ConfirmCodeComponent,
  //     canActivate: [UnauthGuard]
  //   },
  //   {
  //     path: 'profile',
  //     component: ProfileComponent,
  //     canActivate: [authAuthGuard]
  //   }
  // ]}
  
  {
    path: 'admin',
    loadChildren: () => import('./admin-layout/admin-layout.module').then(m => m.AdminLayoutModule),
    canLoad: [AdminGuardService]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'app',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./tutorial/tutorial.module').then(m => m.TutorialPageModule),
    canLoad: [CheckTutorial]
  }
];



// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: '/tutorial',
//     pathMatch: 'full'
//   },
//   {
//     path: 'home',
//     loadChildren: () => import('./pages/home/.module').then(m => m.HomePageModule),
//     canActivate: [AuthGuard]
//   },
//   {
//     path: 'login',
//     loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
//   },
//   {
//     path: 'app',
//     loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule),
//     canActivate: [AuthGuard]
//   },
//   {
//     path: 'tutorial',
//     loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialModule),
//     canLoad: [CheckTutorial]
//   },
//   { path: 'run', loadChildren: './pages/run/run.module#RunPageModule' },
//   { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
//   { path: 'calendar', loadChildren: './pages/calendar/calendar.module#CalendarPageModule' }
// ]


// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: '/tutorial',
//     pathMatch: 'full'
//   },
//   {
//     path: 'account',
//     loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule)
//   },
//   {
//     path: 'support',
//     loadChildren: () => import('./pages/support/support.module').then(m => m.SupportModule)
//   },
//   {
//     path: 'login',
//     loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
//   },
//   {
//     path: 'signup',
//     loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignUpModule)
//   },
//   {
//     path: 'app',
//     loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule)
//   },
//   {
//     path: 'tutorial',
//     loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialModule),
//     canLoad: [CheckTutorial]
//   }
// ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

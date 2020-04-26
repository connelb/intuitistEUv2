import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CheckTutorial } from './providers/check-tutorial.service';
import { AdminGuardService } from './providers/admin-guard/admin-guard.service';
import { AuthGuard } from './providers/auth-guard.service'


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
    loadChildren: () => import('./admin-layout/lesson-create/lesson-create.module').then(m => m.LessonCreatePageModule)
    //loadChildren: './lesson-create/lesson-create.module#LessonCreatePageModule'
  },
  {
    path: 'card-create',
    loadChildren: () => import('./admin-layout/card-create/card-create.module').then(m => m.CardCreatePageModule)
    //loadChildren: './card-create/card-create.module#CardCreatePageModule'
  },
  {
    path: 'card-update',
    loadChildren: () => import('./admin-layout/card-update/card-update.module').then(m => m.CardUpdatePageModule)
    //loadChildren: './card-update/card-update.module#CardUpdatePageModule'
  },
  {
    path: 'lesson-update',
    loadChildren: () => import('./admin-layout/lesson-update/lesson-update.module').then(m => m.LessonUpdatePageModule)
    //loadChildren: './lesson-update/lesson-update.module#LessonUpdatePageModule'
  },
  {
    path: 'lesson-delete',
    loadChildren: () => import('./admin-layout/lesson-delete/lesson-delete.module').then(m => m.LessonDeletePageModule)
    //loadChildren: './lesson-update/lesson-update.module#LessonUpdatePageModule'
  }
  ,
  {
    path: 'card-modal',
    loadChildren: () => import('./admin-layout/card-modal/card-modal.module').then( m => m.CardModalPageModule)
    //loadChildren: '../admin-layout/card-modal/card-modal.module#CardModalPageModule'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin-layout/admin-layout.module').then(m => m.AdminLayoutModule),
    canLoad: [AdminGuardService]
  },
  {
    path: 'app',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./tutorial/tutorial.module').then(m => m.TutorialPageModule),
    canLoad: [CheckTutorial]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
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

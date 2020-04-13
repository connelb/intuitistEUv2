import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../providers/auth-guard.service';
import { AdminGuardService } from '../providers/admin-guard/admin-guard.service';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      // {
      //   path: 'speakers',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: () => import('../speaker-list/speaker-list.module').then(m => m.SpeakerListModule)
      //     },
      //     {
      //       path: 'session/:sessionId',
      //       loadChildren: () => import('../session-detail/session-detail.module').then(m => m.SessionDetailModule)
      //     },
      //     {
      //       path: 'speaker-details/:speakerId',
      //       loadChildren: () => import('../speaker-detail/speaker-detail.module').then(m => m.SpeakerDetailModule)
      //     }
      //   ]
      // }
      {
        path: 'lessons',
        children: [
          {
            path: '',
            loadChildren: () => import('./../lessons/lessons.module').then(m => m.LessonsPageModule),
            canActivate: [AuthGuard]
          },
          // {
          //   path: 'lessons/:id',
          //   loadChildren: () => import('./../cards/cards.module').then(m => m.CardsPageModule)
          // }
        ]
      },
      {
        path: 'lessons/:id',
        children: [
          {
            path: '',
            loadChildren: () => import('./../cards/cards.module').then(m => m.CardsPageModule)
          }
        ]
      },

      // {
      //   path: 'schedule',
      //   children: [
      //     {
      //       path: '',
      //       component: SchedulePage,
      //     },
      //     {
      //       path: 'session/:sessionId',
      //       loadChildren: () => import('../session-detail/session-detail.module').then(m => m.SessionDetailModule)
      //     }
      //   ]
      // }



      // {
      //   path: 'card/:id',
      //   children: [
      //     {
      //       path: '',
      //       //loadChildren: './../card/card.module#CardPageModule'
      //       loadChildren: () => import('./../card/card.module').then(m => m.CardPageModule)
      //     }
      //   ]
      // },
      // {
      //   path: 'admin',
      //   children: [
      //     {
      //       path: '',
      //       //loadChildren: './../admin-layout/admin-layout.module#AdminLayoutModule',
      //       loadChildren: () => import('./../admin-layout/admin-layout.module').then(m => m.AdminLayoutModule),
      //       canLoad: [AdminGuardService]
      //     }
      //   ]
      // },
      {
        path: '',
        redirectTo: '/tabs/lessons',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/about',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }


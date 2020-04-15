import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';

//import {} from './card-create/card-create.module#CardCreatePageModule'

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [

      // {
      //   path: 'customers',
      //   loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)
      // }
      {
        path: 'card-create',
        loadChildren: () => import('./card-create/card-create.module').then(m => m.CardCreatePageModule)
        //loadChildren: './card-create/card-create.module#CardCreatePageModule'
      },
      {
        path: 'card-update',
        loadChildren: () => import('./card-update/card-update.module').then(m => m.CardUpdatePageModule)
        //loadChildren: './card-update/card-update.module#CardUpdatePageModule'
      },
      {
        path: 'lesson-create',
        loadChildren: () => import('./lesson-create/lesson-create.module').then(m => m.LessonCreatePageModule)
        //loadChildren: './lesson-create/lesson-create.module#LessonCreatePageModule'
      },
      {
        path: 'lesson-update',
        loadChildren: () => import('./lesson-update/lesson-update.module').then(m => m.LessonUpdatePageModule)
        //loadChildren: './lesson-update/lesson-update.module#LessonUpdatePageModule'
      },
      {
        path: 'lesson-delete',
        loadChildren: () => import('./lesson-delete/lesson-delete.module').then( m => m.LessonDeletePageModule)
      }
      ,
      {
        path: 'card-modal',
        loadChildren: () => import('./card-modal/card-modal.module').then( m => m.CardModalPageModule)
        //loadChildren: '../admin-layout/card-modal/card-modal.module#CardModalPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }

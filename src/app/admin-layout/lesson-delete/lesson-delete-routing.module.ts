import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LessonDeletePage } from './lesson-delete.page';

const routes: Routes = [
  {
    path: '',
    component: LessonDeletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessonDeletePageRoutingModule {}

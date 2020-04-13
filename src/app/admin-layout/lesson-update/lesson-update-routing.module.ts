import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LessonUpdatePage } from './lesson-update.page';

const routes: Routes = [
  {
    path: '',
    component: LessonUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessonUpdatePageRoutingModule {}

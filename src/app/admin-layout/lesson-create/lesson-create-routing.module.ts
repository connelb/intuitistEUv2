import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LessonCreatePage } from './lesson-create.page';

const routes: Routes = [
  {
    path: '',
    component: LessonCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessonCreatePageRoutingModule {}

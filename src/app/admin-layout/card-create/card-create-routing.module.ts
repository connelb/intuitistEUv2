import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardCreatePage } from './card-create.page';

const routes: Routes = [
  {
    path: '',
    component: CardCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardCreatePageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardUpdatePage } from './card-update.page';

const routes: Routes = [
  {
    path: '',
    component: CardUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardUpdatePageRoutingModule {}

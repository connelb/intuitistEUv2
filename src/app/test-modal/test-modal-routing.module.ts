import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestModalPage } from './test-modal.page';

const routes: Routes = [
  {
    path: '',
    component: TestModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestModalPageRoutingModule {}

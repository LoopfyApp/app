import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdditemscartPage } from './additemscart.page';

const routes: Routes = [
  {
    path: '',
    component: AdditemscartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdditemscartPageRoutingModule {}

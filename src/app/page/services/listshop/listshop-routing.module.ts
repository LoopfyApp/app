import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListshopPage } from './listshop.page';

const routes: Routes = [
  {
    path: '',
    component: ListshopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListshopPageRoutingModule {}

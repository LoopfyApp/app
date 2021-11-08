import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListservicesPage } from './listservices.page';

const routes: Routes = [
  {
    path: '',
    component: ListservicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListservicesPageRoutingModule {}

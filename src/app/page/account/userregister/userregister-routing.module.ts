import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserregisterPage } from './userregister.page';

const routes: Routes = [
  {
    path: '',
    component: UserregisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserregisterPageRoutingModule {}

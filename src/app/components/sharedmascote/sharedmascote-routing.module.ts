import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedmascotePage } from './sharedmascote.page';

const routes: Routes = [
  {
    path: '',
    component: SharedmascotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedmascotePageRoutingModule {}

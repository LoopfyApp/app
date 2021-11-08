import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MascotePage } from './mascote.page';

const routes: Routes = [
  {
    path: '',
    component: MascotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MascotePageRoutingModule {}

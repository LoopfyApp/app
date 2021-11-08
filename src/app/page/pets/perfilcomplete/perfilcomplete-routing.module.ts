import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilcompletePage } from './perfilcomplete.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilcompletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilcompletePageRoutingModule {}

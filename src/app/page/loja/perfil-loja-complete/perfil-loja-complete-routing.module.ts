import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilLojaCompletePage } from './perfil-loja-complete.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilLojaCompletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilLojaCompletePageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicosLojaPage } from './servicos-loja.page';

const routes: Routes = [
  {
    path: '',
    component: ServicosLojaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicosLojaPageRoutingModule {}

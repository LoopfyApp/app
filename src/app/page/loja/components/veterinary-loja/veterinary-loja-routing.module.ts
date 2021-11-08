import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VeterinaryLojaPage } from './veterinary-loja.page';

const routes: Routes = [
  {
    path: '',
    component: VeterinaryLojaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VeterinaryLojaPageRoutingModule {}

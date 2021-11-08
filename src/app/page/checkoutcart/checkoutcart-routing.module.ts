import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutcartPage } from './checkoutcart.page';

const routes: Routes = [
  {
    path: '',
    component: CheckoutcartPage
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutcartPageRoutingModule {}

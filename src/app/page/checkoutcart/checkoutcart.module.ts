import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutcartPageRoutingModule } from './checkoutcart-routing.module';

import { CheckoutcartPage } from './checkoutcart.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PaymentOptionsPage } from './payment-options/payment-options.page';
import { PaymentOptionsPageModule } from './payment-options/payment-options.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckoutcartPageRoutingModule,
    ComponentsModule,
    PaymentOptionsPageModule
  ],
  declarations: [CheckoutcartPage]
})
export class CheckoutcartPageModule {}

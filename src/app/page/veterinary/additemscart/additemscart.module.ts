import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdditemscartPageRoutingModule } from './additemscart-routing.module';

import { AdditemscartPage } from './additemscart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdditemscartPageRoutingModule
  ],
  declarations: [AdditemscartPage]
})
export class AdditemscartPageModule {}

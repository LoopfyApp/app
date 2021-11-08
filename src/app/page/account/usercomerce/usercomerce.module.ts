import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsercomercePageRoutingModule } from './usercomerce-routing.module';

import { UsercomercePage } from './usercomerce.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsercomercePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UsercomercePage]
})
export class UsercomercePageModule {}

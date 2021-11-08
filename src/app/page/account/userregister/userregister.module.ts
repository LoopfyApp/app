import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserregisterPageRoutingModule } from './userregister-routing.module';

import { UserregisterPage } from './userregister.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UserregisterPageRoutingModule,
    ComponentsModule
  ],
  declarations: [UserregisterPage]
})
export class UserregisterPageModule {}

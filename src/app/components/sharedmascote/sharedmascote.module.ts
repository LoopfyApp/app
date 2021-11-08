import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedmascotePageRoutingModule } from './sharedmascote-routing.module';

import { SharedmascotePage } from './sharedmascote.page';
import { ComponentsModule } from '../components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedmascotePageRoutingModule,
    ComponentsModule
  ],
  declarations: [SharedmascotePage]
})
export class SharedmascotePageModule {}

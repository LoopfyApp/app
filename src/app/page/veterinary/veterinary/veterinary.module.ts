import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VeterinaryPageRoutingModule } from './veterinary-routing.module';

import { VeterinaryPage } from './veterinary.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VeterinaryPageRoutingModule,
    ComponentsModule
  ],
  declarations: [VeterinaryPage]
})
export class VeterinaryPageModule {}

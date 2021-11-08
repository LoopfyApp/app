import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VeterinaryLojaPageRoutingModule } from './veterinary-loja-routing.module';

import { VeterinaryLojaPage } from './veterinary-loja.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VeterinaryLojaPageRoutingModule
  ],
  declarations: [VeterinaryLojaPage],
  exports: [VeterinaryLojaPage]
})
export class VeterinaryLojaPageModule {}

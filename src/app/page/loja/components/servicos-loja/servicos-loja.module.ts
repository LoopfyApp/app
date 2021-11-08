import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicosLojaPageRoutingModule } from './servicos-loja-routing.module';

import { ServicosLojaPage } from './servicos-loja.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicosLojaPageRoutingModule
  ],
  declarations: [ServicosLojaPage],
  exports: [ServicosLojaPage]
})
export class ServicosLojaPageModule {}

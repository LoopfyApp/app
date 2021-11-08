import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilLojaCompletePageRoutingModule } from './perfil-loja-complete-routing.module';

import { PerfilLojaCompletePage } from './perfil-loja-complete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilLojaCompletePageRoutingModule
  ],
  declarations: [PerfilLojaCompletePage]
})
export class PerfilLojaCompletePageModule {}

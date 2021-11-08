import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilLojaPageRoutingModule } from './perfil-loja-routing.module';

import { PerfilLojaPage } from './perfil-loja.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ProdutosLojaModule } from '../components/produtos-loja/produtos-loja.module';
import { ServicosLojaPageModule } from '../components/servicos-loja/servicos-loja.module';
import { VeterinaryLojaPage } from '../components/veterinary-loja/veterinary-loja.page';
import { VeterinaryLojaPageModule } from '../components/veterinary-loja/veterinary-loja.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilLojaPageRoutingModule,
    ComponentsModule,
    ProdutosLojaModule,
    ServicosLojaPageModule,
    VeterinaryLojaPageModule
  ],
  declarations: [PerfilLojaPage]
})
export class PerfilLojaPageModule {}

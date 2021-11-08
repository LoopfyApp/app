import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilcompletePageRoutingModule } from './perfilcomplete-routing.module';

import { PerfilcompletePage } from './perfilcomplete.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilcompletePageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [PerfilcompletePage]
})
export class PerfilcompletePageModule {}

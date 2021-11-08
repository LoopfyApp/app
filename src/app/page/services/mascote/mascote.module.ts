import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MascotePageRoutingModule } from './mascote-routing.module';

import { MascotePage } from './mascote.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MascotePageRoutingModule,
    ComponentsModule,
    Ng2SearchPipeModule
  ],
  declarations: [MascotePage]
})
export class MascotePageModule {}

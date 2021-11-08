import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivacityPageRoutingModule } from './privacity-routing.module';

import { PrivacityPage } from './privacity.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivacityPageRoutingModule,
    ComponentsModule,
    Ng2SearchPipeModule
  ],
  declarations: [PrivacityPage]
})
export class PrivacityPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListservicesPageRoutingModule } from './listservices-routing.module';

import { ListservicesPage } from './listservices.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListservicesPageRoutingModule,
    ComponentsModule,
    Ng2SearchPipeModule
  ],
  declarations: [ListservicesPage]
})
export class ListservicesPageModule {}

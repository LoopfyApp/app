import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListshopPageRoutingModule } from './listshop-routing.module';

import { ListshopPage } from './listshop.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListshopPageRoutingModule,
    ComponentsModule,
    Ng2SearchPipeModule
     
  ],
  declarations: [ListshopPage]
})
export class ListshopPageModule {}

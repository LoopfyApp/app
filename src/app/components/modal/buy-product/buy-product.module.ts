import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../components.module';
import { HomePageModule } from 'src/app/home/home.module';
import { BuyProductPage } from './buy-product.page';



@NgModule({
  declarations: [BuyProductPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule    
  ],
  exports: [BuyProductPage]
})
export class BuyProductModule { }

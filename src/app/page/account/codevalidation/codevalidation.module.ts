import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodevalidationPageRoutingModule } from './codevalidation-routing.module';

import { CodevalidationPage } from './codevalidation.page';
import { CodeInputModule } from 'angular-code-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodevalidationPageRoutingModule,
    CodeInputModule,
  ],
  declarations: [CodevalidationPage]
})
export class CodevalidationPageModule {}

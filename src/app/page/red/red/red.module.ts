import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RedPageRoutingModule } from './red-routing.module';

import { RedPage } from './red.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { CommentsModule } from 'src/app/components/modal/comments/comments.module';
import { ReportModule } from 'src/app/components/modal/report/report.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RedPageRoutingModule,
    ComponentsModule,
    CommentsModule,
    ReportModule
  ],
  declarations: [RedPage]
})
export class RedPageModule {}

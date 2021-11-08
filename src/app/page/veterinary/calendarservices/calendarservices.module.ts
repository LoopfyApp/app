import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarservicesPageRoutingModule } from './calendarservices-routing.module';

import { CalendarservicesPage } from './calendarservices.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgCalendarModule } from 'ionic2-calendar';
 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarservicesPageRoutingModule,
    ComponentsModule,
    NgCalendarModule
     
  ],
  declarations: [CalendarservicesPage]
})
export class CalendarservicesPageModule {}

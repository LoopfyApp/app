import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ionic4EmojiPickerModule } from 'ionic4-emoji-picker';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReportComponent } from './report.component';



@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    Ionic4EmojiPickerModule,
    IonicModule,
    FormsModule
  ],
  exports: [ReportComponent]
})
export class ReportModule { }

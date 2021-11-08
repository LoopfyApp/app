import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CommentsComponent } from './comments.component';
import { Ionic4EmojiPickerModule } from 'ionic4-emoji-picker';
import { FormsModule }   from '@angular/forms';

@NgModule({
  declarations: [CommentsComponent],
  imports: [
    CommonModule,
    Ionic4EmojiPickerModule,
    IonicModule,
    FormsModule
  ],
  exports: [CommentsComponent]
})
export class CommentsModule { }

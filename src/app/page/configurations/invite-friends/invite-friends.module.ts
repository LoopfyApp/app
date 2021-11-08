import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InviteFriendsPageRoutingModule } from './invite-friends-routing.module';

import { InviteFriendsPage } from './invite-friends.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InviteFriendsPageRoutingModule,
    ComponentsModule,
    Ng2SearchPipeModule
  ],
  declarations: [InviteFriendsPage]
})
export class InviteFriendsPageModule {}

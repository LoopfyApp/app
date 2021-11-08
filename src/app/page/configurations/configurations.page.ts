import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, IonContent, NavController } from '@ionic/angular';
import { EspeciesApp } from 'src/app/models/animals.models';
import { Categorys, storeVeterinary } from 'src/app/models/servicios.models';
import { ServerService } from 'src/app/services/server.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.page.html',
  styleUrls: ['./configurations.page.scss'],
})
export class ConfigurationsPage implements OnInit {

  objOptions: object;
  flagHeaderSticky: boolean = false;
  flagFilterSticky: boolean = false;
 
  constructor() {
  }


  ngOnInit() {
   this.objOptions = [{
    icon: 'person-add-outline',
    title: 'Convidar Amigos',
    url: 'invite-friends'
   },
   {
    icon: 'shield-checkmark-outline',
    title: 'Privacidade',
    url: 'privacity'
   },
   {
    icon: 'information-circle-outline',
    title: 'Minha Conta',
    url: 'my-account'
   }];

  }


 onScroll(event) {
  // used a couple of "guards" to prevent unnecessary assignments if scrolling in a direction and the var is set already:
  if (event.detail.deltaY > 0 && this.flagHeaderSticky) return;
  if (event.detail.deltaY < 0 && !this.flagHeaderSticky) return;
  if (event.detail.scrollTop != 0) {
    // console.log("scrolling");
    this.flagHeaderSticky = true;
    this.flagFilterSticky = true;
  } else if (event.detail.scrollTop == 0) {
    // console.log("scroll TOP");
    this.flagHeaderSticky = false;
    this.flagFilterSticky = false;
  }
}
}

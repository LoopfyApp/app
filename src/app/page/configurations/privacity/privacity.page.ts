import { Component, NgZone, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-privacity',
  templateUrl: './privacity.page.html',
  styleUrls: ['./privacity.page.scss'],
})
export class PrivacityPage implements OnInit {
  
  objOptions: object;
  flagHeaderSticky: boolean = false;
  flagFilterSticky: boolean = false;
  constructor() {}
  ngOnInit() {  
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

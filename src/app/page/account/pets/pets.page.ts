import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.page.html',
  styleUrls: ['./pets.page.scss'],
  providers: [NavParams]
})
export class PetsPage implements OnInit {

  constructor(public router:NavController) { }

  ngOnInit() {
  }

  cerrar(type: boolean) {
    if(type==true){
      this.router.navigateForward(['/home/red']);
    }
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title:string=''; 
  @Input() atras:boolean=false;  
  @Input() url:string=''; 
  @Input() transparente:boolean=false; 

  
  constructor(public navCtrl:NavController) { }

  ngOnInit() {}

  goBack() {
    if(this.url==''){
      this.navCtrl.back();
    }
    else{
      this.navCtrl.navigateBack(this.url)
    }
    }
    
    notificaciones(){
      this.navCtrl.navigateBack('home/notifications')
    }
}

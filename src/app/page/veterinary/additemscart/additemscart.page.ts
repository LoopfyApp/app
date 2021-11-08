import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-additemscart',
  templateUrl: './additemscart.page.html',
  styleUrls: ['./additemscart.page.scss'],
})
export class AdditemscartPage implements OnInit {

  constructor(public router:NavController,
    public route: ActivatedRoute,) {
 
     }

  ngOnInit() {
  }

  openurl(url){
  if(this.route.snapshot.paramMap.get('options') == '1'){
    if(url==1){
      this.router.navigateBack('home/veterinary')
      
    }
    else{
      this.router.navigateBack('home/checkoutcart')
    }
    
  }
  else{
    if(url==1){
      this.router.navigateBack('home/services')
      
    }
    else{
      this.router.navigateBack('home/checkoutcart')
    }
  }
 
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, ModalController } from '@ionic/angular';
import { NewpostsComponent } from 'src/app/components/newposts/newposts.component';
 import { Mascote } from 'src/app/models/animals.models';
import { ServerService } from 'src/app/services/server.service';
import { PerfilcompletePage } from '../perfilcomplete/perfilcomplete.page';
import { AuthService } from '../../../services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild(IonContent, { static: false, read: IonContent })
  content: IonContent;
  Infopets:Mascote;
  posts;
  flagHeaderSticky: boolean = false;
  flagFilterSticky: boolean = false;
  isLoadding: boolean = false;
  redeOption=2;
  idUser=0
  followerInfo:any = null
  constructor(  public route: ActivatedRoute,
    public server:ServerService,
    public auth:AuthService,
    public utils: UtilsService,
    public modal:ModalController) {
     
   }

 async ngOnInit() {
    this.idUser = await this.auth.usersId()
    this.selectMascote();
    this.getPostsMascote();
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

  selectMascote(){
    this.server.getMascoteDetails(this.route.snapshot.paramMap.get('id')).then( (info:any)=>{
      this.Infopets=info.data
      this.followerInfo=info.data.follower
      this.isLoadding=true
    }).catch( (error)=>{
      this.isLoadding=true
    })
  }
  
   
  redesValue(ev: any) {
    this.redeOption=ev.detail.value
    console.log('Segment changed', ev.detail);
  }

 async postNew(){
    const modal = await this.modal.create({
      component: NewpostsComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  
 async dataProfile(id_pets){
  const modal = await this.modal.create({
    component: PerfilcompletePage,     
     componentProps: {id_pets: id_pets},
    cssClass: 'my-custom-class'
  });
  modal.onDidDismiss().then((dataReturned) => {
    this.isLoadding=false
    this.selectMascote()
  })
  
  return await modal.present();
}

async getPostsMascote()
{
  this.server.GetPostPet(this.route.snapshot.paramMap.get('id')).then((response:any)=>{
this.posts = response.data;
  },
  (error)=>{  
console.log('PET ERROR', error);
  });
}

async follower(){
let param:any
param={'users_pets_follow_id':this.route.snapshot.paramMap.get('id') }
  this.server.Follow(param).then((data: any) => {
    console.log(data);
    this.followerInfo=data.data
    if (!data.error) {
      this.utils.showToast(data.message, 'bottom');
    }
  });
}

async unfollower(id){
  let param:any
param={'id':id}
  this.server.UnFollow(param).then((data: any) => {
   this.followerInfo=null
    if (!data.error) {
      this.utils.showToast(data.message, 'bottom');
    }
  });
}
}
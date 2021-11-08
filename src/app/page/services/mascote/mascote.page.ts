import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, ModalController, NavController } from '@ionic/angular';
import { SharedmascotePage } from 'src/app/components/sharedmascote/sharedmascote.page';
import { Mascote } from 'src/app/models/animals.models';
import { ServerService } from 'src/app/services/server.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-mascote',
  templateUrl: './mascote.page.html',
  styleUrls: ['./mascote.page.scss'],
})
export class MascotePage implements OnInit {

  
  @ViewChild(IonContent, { static: false, read: IonContent })
  content: IonContent;
  flagHeaderSticky: boolean = false;
  flagFilterSticky: boolean = false;
  
  isLoadding: boolean = false;
  id_especie = null;
  categorie = null;
  url = null;
  store=null
  search: string;
  mascote: Mascote[];
  constructor(
    public route: ActivatedRoute,
    public server: ServerService,
    public modal: ModalController,
    public util: UtilsService,
    public router:NavController,
  ) {
    this.id_especie = this.route.snapshot.paramMap.get('id');
    this.categorie = this.route.snapshot.paramMap.get('categoria');
    this.store= this.route.snapshot.paramMap.get('store');
    this.url = `home/services/listshop/${this.id_especie}/${this.categorie}`;
  }


  ngOnInit() {
   
  }
  ionViewWillEnter(){
    this.getmascoteraza();
  }

  
  doRefresh(event) {
    this.isLoadding=false
    this.getmascoteraza();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }


  async getmascoteraza() {
    this.server
      .getUserMascotesByRaza(this.id_especie)
      .then((data: any) => {
        this.isLoadding = true;
        this.mascote = data.data;
      })
      .catch((error) => {
        this.isLoadding = true;
      });
  }

  async newPets() {
    const modal = await this.modal.create({
      component: SharedmascotePage,
      cssClass: 'newMascoteModalClass',
      componentProps: {modaloptions: true}
    });

    modal.onDidDismiss().then((data: any) => {
        this.getmascoteraza();
      
    });
    return await modal.present();
  }

  getSelectMascote(data){
    let urls = `home/services/listservices/${this.id_especie}/${this.categorie}/${this.store}/${data.id}`;
    this.router.navigateBack(urls)
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
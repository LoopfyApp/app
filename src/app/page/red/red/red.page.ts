import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController, NavController } from '@ionic/angular';
import { BuyProductPage } from 'src/app/components/modal/buy-product/buy-product.page';
import { NewpostsComponent } from 'src/app/components/newposts/newposts.component';
import { ProductinfoComponent } from 'src/app/components/products/productinfo/productinfo.component';
import { PostCard } from 'src/app/models/rede.models';
import { AuthService } from 'src/app/services/auth.service';
import { ServerService } from 'src/app/services/server.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-red',
  templateUrl: './red.page.html',
  styleUrls: ['./red.page.scss'],
})
export class RedPage implements OnInit {

  @ViewChild(IonContent, { static: false, read: IonContent })
  content: IonContent;
  flagHeaderSticky: boolean = false;
  flagFilterSticky: boolean = false;
  DataProduct: any =[];
  redeOption=2;
  teste;
  post: PostCard;
  newpost: PostCard = {pets_id: '', description: '', photo: ''};
  loadings:boolean=false
  animales=0;
  typeUser:number
  constructor(public modal:ModalController, private server: ServerService,
    public authService:AuthService,
    public utils:UtilsService,
    public router:NavController) {
 
     
     }

  ngOnInit() {
 
  }


 async ionViewWillEnter(){
  await this.getPostsAll();
  await this.totalAnimals();
  this.typeUser=await this.server.typeUsers();
  
}

  
  async totalAnimals(){
    this.animales=await this.utils.getStorage('animales')
  }


  redesValue(ev: any) {
    this.redeOption=ev.detail.value;
    if(this.redeOption==1){
      this.getPosts()
    }
    if(this.redeOption==2){
      this.getPostsAll();
    }

    if(this.redeOption==3){
      this.allproducts()
    }
    
   
 
  }

 async postNew(){

  if(this.animales != 0){
    const modal = await this.modal.create({
      component: NewpostsComponent,
      cssClass: 'my-custom-class'
    });

    modal.onDidDismiss().then((datas:any)=>{
      if(!datas.error)
      {
        this.getPostsAll();
      }
    });
    return await modal.present();
  }
  else{
    this.utils.showToast("Você não pode passar sem registrar um pets","top");
  }

  }
  
  async getPostsAll()
  {
    await this.server.GetPostAll().then((data:any)=>{
        this.post = data.data;
        this.loadings=true;
      },
      (error:any)=>{
        this.loadings=false;
      });
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

  doRefresh(event) {
    this.loadings=false
    this.getPostsAll();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  profilePage(id){
    this.router.navigateBack('/home/red/pets/profile/'+id)
  }

  reloads(events:boolean){
    if(events==true){
      if(this.redeOption==1){
        this.getPosts()
      }
      if(this.redeOption==2){
        this.getPostsAll()
      }
      if(this.redeOption==3){
        this.allproducts()
      }
    }

  }

  async getPosts()
  {

      await this.server.GetPostsRecomendacoes().then((data:any)=>{
        this.post = data.data;
        this.loadings=true;
      },
      (error:any)=>{
        this.loadings=false;
      });
  } 

  async allproducts() {
    this.server.GetProductsOfferts().then((datos: any) => {
      console.log(datos.data);
      this.DataProduct = datos.data.products;
      this.loadings = true;
    },
    (error:any)=>{
      this.loadings=false;
    });
  }

  async openModal(x){
    const modal = await this.modal.create({
      component: ProductinfoComponent,
      cssClass: 'class-products',
      componentProps:{products: x}
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log('data', data.data.data);
        if(data.data.data !== null){
        this.buyProduct(data.data.data);}
      });
    return await modal.present();
  }

  async buyProduct(produto)
  {
    const modal = await this.modal.create({
      component: BuyProductPage,
      cssClass: 'my-custom-class',
      componentProps: {produto: produto}
    });
    return await modal.present();

  }
   
}

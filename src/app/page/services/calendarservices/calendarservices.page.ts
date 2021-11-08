import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, NavController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';
import { Mascote } from 'src/app/models/animals.models';
import { DataServiceHours } from 'src/app/models/servicios.models';
import { ServerService } from 'src/app/services/server.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-calendarservices',
  templateUrl: './calendarservices.page.html',
  styleUrls: ['./calendarservices.page.scss'],
})
export class CalendarservicesPage implements OnInit {

  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  @ViewChild(IonContent, { static: false, read: IonContent })
  content: IonContent;
  Infopets:Mascote
  calendar = {
    mode: 'month',
    currentDate: new Date(),

  };
  flagHeaderSticky: boolean = false;
  flagFilterSticky: boolean = false;
  selectedDate: Date;
  markDisabled
  currentDate
  dataList={
    store_id:  '',
    id_especie:   '',
    categorie:   '',
    pets:   '',
    service:   '',
  }
  SaveCarts = {
    cart_number:null,
    id_pet:  '',
    id_service:  '',
    date: '',
    hour:  '', 
   };
  isLoadding: boolean = false;
  viewTitle: string;
  url = null; 
  search: string;
  params:any
  datelisthour:DataServiceHours[]
  selecthours=null
  cart_number_services: any
  cart_number_productos: any
  constructor(public utils:UtilsService,
    public route: ActivatedRoute,
    public router:NavController,
    public server:ServerService) {
      this.dataList.id_especie = this.route.snapshot.paramMap.get('id');
      this.dataList.categorie = this.route.snapshot.paramMap.get('categoria');
      this.dataList.store_id= this.route.snapshot.paramMap.get('store');
      this.dataList.pets= this.route.snapshot.paramMap.get('idpets');
      this.dataList.service= this.route.snapshot.paramMap.get('idservice');
      this.url=`home/services/listservices/${ this.dataList.id_especie}/${this.dataList.categorie}/${this.dataList.store_id}/${this.dataList.pets}`;
      this.selectedDate = new Date();
      this.selectedDate = new Date(this.selectedDate.setDate(this.selectedDate.getDate() + 1));
      this.currentDate = this.selectedDate;
      this.markDisabled = (date: Date) => {
        var current = new Date();
        return date < current;
        };
      
     }

   ngOnInit() {
  
  }

  async ionViewWillEnter(){
    this.selectMascote()
    this.cart_number_services = await this.utils.getStorage('cartId');
    this.cart_number_productos = await this.utils.getStorage('CART_PRODUCTS_ID');
    this.SaveCarts.cart_number= await this.utils.getStorage("cartId");
    this.listhours(this.currentDate) 
  
  }
 

  doRefresh(event) {
    this.isLoadding=false
  
    this.listhours(this.selectedDate)
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  onCurrentDateChanged(event)
  { 
    this.currentDate = event;
    this.listhours(event)
  }
  onViewTitleChanged(title){
    console.log(title)
    this.viewTitle = title;
  }

  onEventSelected(event){
    console.log(event)
  }

  next() {
    this.myCal.slideNext();
  }
 
  back() {
    this.myCal.slidePrev();
  }
 
  selectMascote(){
    this.server.getMascoteDetails(this.route.snapshot.paramMap.get('idpets')).then( (info:any)=>{
      this.Infopets=info.data
      
    }).catch( (error)=>{
    })
  }

listhours(event){
  this.params = {
    service_id: this.dataList.service,
    date_service: formatDate(event, 'dd-MM-yyyy', 'pt-BR')
  };
  this.selecthours=null
  this.server.GetLojasServicesVeterinaryListData(this.params).then((data: any)=>{
    console.log(data);
    this.datelisthour=data.data
    this.isLoadding=true
  }).catch( (error)=>{
    this.isLoadding=true

  })
   
}

  async agendarData(data){
  this.selecthours=data.hours
  this.SaveCarts.hour=data.hours
  this.SaveCarts.id_pet=this.route.snapshot.paramMap.get('idpets')
  this.SaveCarts.id_service=this.route.snapshot.paramMap.get('idservice')
  this.SaveCarts.date=formatDate(this.currentDate, 'dd-MM-yyyy', 'pt-BR')
  this.SaveCarts.cart_number= await this.utils.getStorage("cartId");
}

verifycart(){
  if( this.cart_number_productos != null){
   this.cancelarProducto(this.cart_number_productos)
  }
  else{
    this.save()
  }
}

async cancelarProducto(infocarts){

  this.utils
    .showAlertConfirmAction(
      'Cancelar',
      'Você já tem um item de outra loja no carrinho. Deseja excluí-lo?',
      '',
      ['Não', 'Sim']
    )
    .then((data) => {
      if (!data) {
    this.server
          .deletecarproducts({'cart_number':infocarts})
          .then((datos: any) => {
            this.utils.removeStorage("CART_PRODUCTS_ID") 
            this.cart_number_productos =null
            this.save()
          })
          .catch((error) => {
    
            console.log(error);
          });
      }
    });
}

save(){
  this.utils.showLoading('Carregando...');
  console.log(this.SaveCarts);
  this.server.InsertItemCartService(this.SaveCarts).then((data:any)=>{

    this.utils.setStorage("cartId", data.data.cart.cart_number);
    this.utils.setStorage("cartData", JSON.stringify(data.data));
    this.utils.setStorage("cartStore", data.data.store.id_store);
    this.utils.setStorage("add_cart",true); 
    this.utils.dismissLoading();

    this.router.navigateBack('/home/confirmationcart/2');

  }).catch((error:any)=>{
    this.utils.dismissLoading();
    this.utils.showToast(error.error.message);
    this.cancelar();
  })
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


cancelar(){

  this.utils
    .showAlertConfirmAction(
      'Cancelar',
      'Você deseja realmente Cancelar compra?',
      '',
      ['Não', 'Sim']
    )
    .then((data) => {
      if (!data) {
       this.utils.showLoading('Carregando...');
        this.server
          .cancelCart(this.SaveCarts.cart_number)
          .then((datos: any) => {
            this.utils.removeStorage("cartId")
            this.utils.removeStorage("cartData")
            this.utils.removeStorage("cartStore")
            this.SaveCarts.cart_number=null
            this.utils.dismissLoading();
            this.save();
          })
          .catch((error) => {
            this.utils.dismissLoading();
          });
      }
    });
}

}

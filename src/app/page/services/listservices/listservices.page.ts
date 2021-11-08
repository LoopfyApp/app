import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, NavController } from '@ionic/angular';
import { Mascote } from 'src/app/models/animals.models';
import { ListServiceStoreVeterinary } from 'src/app/models/servicios.models';
import { ServerService } from 'src/app/services/server.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-listservices',
  templateUrl: './listservices.page.html',
  styleUrls: ['./listservices.page.scss'],
})
export class ListservicesPage implements OnInit {
  @ViewChild(IonContent, { static: false, read: IonContent })
  content: IonContent;
  flagHeaderSticky: boolean = false;
  flagFilterSticky: boolean = false;
  
  dataList={
    store_id:  '',
    id_especie:   '',
    categorie:   '',
  }
  isLoadding: boolean = false;
  pets
  url = null; 
  Infopets:Mascote
  search: string;
  ListService:ListServiceStoreVeterinary[]

  constructor(public utils:UtilsService,
    public route: ActivatedRoute,
    public router:NavController,
    public server:ServerService) {
      this.dataList.id_especie = this.route.snapshot.paramMap.get('id');
      this.dataList.categorie = this.route.snapshot.paramMap.get('categoria');
      this.dataList.store_id= this.route.snapshot.paramMap.get('store');
      this.pets= this.route.snapshot.paramMap.get('idpets');
      this.url=`home/services/mascote/${ this.dataList.id_especie}/${this.dataList.categorie}/${this.dataList.store_id}`;

     }


     ngOnInit() {
   
    }
    ionViewWillEnter(){
    this.selectMascote()
    this.listService()
  }

  doRefresh(event) {
    this.isLoadding=false
    this.listService()
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  async listService(){
    this.server.GetLojasServicesServicesList(this.dataList).then((data:any)=>{
      this.isLoadding=true
      this.ListService=data.data
    
    }).catch( (error)=>{
      this.isLoadding=true
    })
  }

  selectService(data){
    let url
    url=`home/services/calendarservices/${ this.dataList.id_especie}/${this.dataList.categorie}/${this.dataList.store_id}/${this.pets}/${data.id}`;
    this.router.navigateBack(url)
    
  }

  selectMascote(){
    this.server.getMascoteDetails(this.route.snapshot.paramMap.get('idpets')).then( (info:any)=>{
      this.Infopets=info.data
      
    }).catch( (error)=>{

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


}

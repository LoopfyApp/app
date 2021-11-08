import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EspeciesApp } from 'src/app/models/animals.models';
import { Categorys, LojasRequest, storeVeterinary } from 'src/app/models/servicios.models';
import { ServerService } from 'src/app/services/server.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ActionSheetController, IonContent, NavController } from '@ionic/angular';


@Component({
  selector: 'app-listshop',
  templateUrl: './listshop.page.html',
  styleUrls: ['./listshop.page.scss'],
})
export class ListshopPage implements OnInit {

  @ViewChild(IonContent, { static: false, read: IonContent })
  content: IonContent;
  flagHeaderSticky: boolean = false;
  flagFilterSticky: boolean = false;
  
  isLoadding:boolean=false
  search:string
  dataStore:storeVeterinary[]
  dataEspecie:EspeciesApp
  dataCategory:Categorys
  DataRequest={
    id_especie:'',
    categorie: '',
    location: {
      latitude:0,
      longitude:0
    }, 
  }

typeUser: number
  geolocation:any
  constructor(public server:ServerService,
    public route:ActivatedRoute,
    public router:NavController,
    public ActionSheet:ActionSheetController,
    public util:UtilsService,
    public ngZone:NgZone) { 
      this.DataRequest.id_especie =this.route.snapshot.paramMap.get('id');
      this.DataRequest.categorie =this.route.snapshot.paramMap.get('categoria');
  }


  ngOnInit() {
   
  }
 async ionViewWillEnter(){
   this.coordenadas();
   this.getList();
   this.typeUser=await this.server.typeUsers();
  }

  doRefresh(event) {
    this.isLoadding=false
    this.coordenadas();
    this.getList();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

 async getList(){
 console.log(this.DataRequest)
   this.server.GetLojasServicesVeterinary(this.DataRequest).then( (data:any)=>{
    this.dataStore=data.data
    this.dataEspecie=data.species
    this.dataCategory=data.category
    
    this.isLoadding=true
   }).catch( error =>{
    this.isLoadding=true
   });
 }

 async coordenadas(){
 this.util.geolocationapi().then(data=>{
  this.DataRequest.location.latitude=data.latitude
  this.DataRequest.location.longitude=data.longitude
 }).catch( error =>{
  this.DataRequest.location.latitude=null
  this.DataRequest.location.longitude=null
 });

  
 
 }
 
 async dataSheet(data){
   if(this.typeUser==1){
    let actionSheet = this.ActionSheet.create({
    header: data.razon,
    subHeader:data.description,
    mode:"ios",
    cssClass:"actionSheetClass",
    buttons: [
      {
        text:'Agendar consulta',
        role:'',
        cssClass:'botton-letf',
        handler:()=>{
          this.ngZone.run(() =>
          this.router.navigateBack('home/veterinary/mascote/'+this.DataRequest.id_especie+'/'+this.DataRequest.categorie+'/'+data.id)
          );
        },
        icon:'calendar-number-outline'
        },
        {
        text:'Perfil da loja ',
        role:'',
        cssClass:'botton-letf',
        handler:()=>{},
        icon:'paw-outline'
        }
    ]
    });

    (await actionSheet).present()
  }
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

import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { IonSlides, NavController } from '@ionic/angular';
import { EspeciesApp } from 'src/app/models/animals.models';
import { Categorys } from 'src/app/models/servicios.models';
import { ServerService } from 'src/app/services/server.service';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
  isLoadding:boolean=false
  especies:EspeciesApp[]
  idEspecies=''
  CargarData:boolean=false
  categorys:Categorys[]
  title=''
  EspeciesOption = {
    initialSlide: 0,
    slidesPerView: 6,
    centeredSlides: false,
    spaceBetween: 7,
    speed: 2000,
    loop: false,
 
    loopAdditionalSlides: 6,
    loopFillGroupWithBlank: true
  };


  constructor(
    public util:UtilsService,
    public server:ServerService,
    public router:NavController
  ) { }

  async ngOnInit() {
    await this.getDatos()
  }

  async getDatos(){
    this.server.especiesAll().then( (datos:any)=>{
      console.log(datos.data)
      this.especies=datos.data
      this.isLoadding=true
    }).catch(error=>{
      this.util.showToast("Erro ao carregar dados","top")
    })
  }

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  async servicesClick(data){
    this.idEspecies=data.id
    this.CargarData=true
    this.title=data.name
    await this.getInfo(this.idEspecies)
  }

  async getInfo(idCategoria){
    this.server.GetCategories(idCategoria).then((data:any)=>{
      this.CargarData = false;
      this.categorys=data.date
    }).catch(error=>{
      this.util.showToast("Erro ao carregar dados","top")
    })
  }
  
  clickCategory(idCategoria){
    this.router.navigateBack('home/services/listshop/'+this.idEspecies+'/'+idCategoria)
  }
}

import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { CameraService } from 'src/app/services/camera.service';
import { Keyboard } from '@capacitor/keyboard';
import { ActionSheetController, ModalController, PopoverController } from '@ionic/angular';
import { ListpetsComponent } from '../listpets/listpets.component';
import { Mascote } from 'src/app/models/animals.models';
import { ServerService } from 'src/app/services/server.service';
import { PostCard } from 'src/app/models/rede.models';
import { UtilsService } from 'src/app/services/utils.service';
 

@Component({
  selector: 'app-newposts',
  templateUrl: './newposts.component.html',
  styleUrls: ['./newposts.component.scss'],
})
export class NewpostsComponent implements OnInit {
  showEmojiPicker:boolean=false;
  newmessage=""
  photo="/assets/button/no-camaras.png"
  selectMascte:boolean=false;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  datamascote:Mascote;
  constructor(public photoService: CameraService,
    public _modal:ModalController,
    public actionSheet:ActionSheetController,
    public popover: PopoverController,
    public server: ServerService,
    private util: UtilsService,
    ) { }

  ngOnInit() {
    console.log('DATAMASCOTE', this.datamascote);
  }

  addEmoji(event) { 
    this.newmessage=this.newmessage+event.data;
  }
  
  async addmessage(){
    
    if(this.datamascote != undefined && (this.photo != "/assets/button/no-camaras.png" || this.newmessage != '')){
      await this.util.showLoading('Postando...');
      var params: PostCard = {
        photo: this.photo,
        pets_id: this.datamascote.id,
        description: this.newmessage
      };
      this.server.addPost(params).then((retorno:any)=>{
        this.util.dismissLoading();
        this.close(retorno);
      },
      (error)=>{
        this.util.dismissLoading();
        console.log(error);
        this.close(params);
      });

    }else{

      if(this.datamascote === undefined){
        this.util.showAlert('Você precisa escolher um Pet', ['Ok'], '');
        return;
      }

      if(this.photo === "/assets/button/no-camaras.png" && (this.newmessage === '' || this.newmessage === null)){
        this.util.showAlert('Você precisa digitar um texto e/ou escolher uma foto', ['Ok'], '');
        return;
      }

    }
    
  }

  keyboards(){
    this.showEmojiPicker = true;
    Keyboard.hide();
  }
  emojis(){
    this.showEmojiPicker = false;
  }

  
  cancelar(){
    this.photo="/assets/button/no-camaras.png"
    this.imageChangedEvent=''
  }

  async addPhotoToGallery(){
    this.photo = await this.photoService.addCamera();
    this.imageChangedEvent = this.photo;   
  }

  async imageCropped(event: ImageCroppedEvent) {
    this.photo = event.base64;
    return  this.croppedImage = event.base64;
  }
  
  async pickFromGallery(){
    this.photo = await this.photoService.addGallery();
    this.imageChangedEvent = this.photo;
  }

  cancelarfoto(){
    this.photo="/assets/button/no-camaras.png";
    this.imageChangedEvent="";
  }

  terminarfoto(){
    this.imageChangedEvent="";
  }

  async close(params?){
    this._modal.dismiss(params);
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheet.create({
      header:'Seleccione', 
      mode:"ios",
      cssClass:"actionSheetClass", 
      buttons: [{
        text: 'Galeria de fotos',
        role: 'destructive',
        icon:'images-outline',
        handler: () => {
          this.pickFromGallery();
        }
      }, 
      
      {
        text: 'Cancelar',
        icon:'close-circle-outline',
        role: 'cancel',
        handler: () => {
         
        }
      },
      {
        text: 'Câmera',
        icon:'camera-outline',
        handler: () => {
          this.addPhotoToGallery()
        }
      }]
    });
    await actionSheet.present();
  }
 
async  selectmascote(){
    const popover = await this.popover.create({
      component: ListpetsComponent,
      cssClass: 'customPopover', 
      translucent: true
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();
    console.log(data)
    if(data != null ){
      this.datamascote = data.data;
      this.selectMascte=true;
    } 
  }

}

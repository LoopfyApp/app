import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImageCroppedEvent } from 'ngx-image-cropper'; 
import { CameraService } from 'src/app/services/camera.service';
 

@Component({
  selector: 'app-photoprofile',
  templateUrl: './photoprofile.component.html',
  styleUrls: ['./photoprofile.component.scss'],
})
export class PhotoprofileComponent implements OnInit {

  public photo: any = null;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  constructor(public photoService: CameraService,
    public modal:ModalController) { }

  ngOnInit() {}

  cancelar(){
    this.photo=null
    this.imageChangedEvent=''
  }
  async addPhotoToGallery(){
    this.photo = await this.photoService.addCamera();
    this.imageChangedEvent = this.photo
   
  }

  async imageCropped(event: ImageCroppedEvent) {
    this.photo = event.base64;
    return  this.croppedImage = event.base64;
  }
  
  async pickFromGallery(){
    this.photo = await this.photoService.addGallery();
    this.imageChangedEvent = this.photo
  
  }
  
  async goBack(){
    if(this.photo != null){
      this.modal.dismiss({data:this.photo})
    }
    else{
    this.modal.dismiss({data:null})
    }
  
  }
  
}




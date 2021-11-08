import { Injectable } from '@angular/core';
import { Camera, CameraSource, CameraResultType } from '@capacitor/camera'; 
import { Photo } from '../models/photo.models';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  public photo:any= '';
  imageChangedEvent: any = '';
  croppedImage: any = '';
  
  constructor() { }

  public async addCamera() {
		const capturedPhoto = await Camera.getPhoto({
			resultType: CameraResultType.Base64,
			source: CameraSource.Camera,
			quality: 100,
      allowEditing:false
		});

    this.photo =  "data:image/jpeg;base64,"+capturedPhoto.base64String
    return this.photo;
	}

  public async addGallery() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
      allowEditing:false,
      quality: 100
    });

    this.photo =  "data:image/jpeg;base64,"+capturedPhoto.base64String
   

    return this.photo;
  }

  async fileChangeEvent(event: any): Promise<void> {
    return this.imageChangedEvent = event;
  }

  async imageCropped(event: ImageCroppedEvent) {
    return  this.croppedImage = event.base64;
  }

}

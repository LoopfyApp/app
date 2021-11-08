import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { LoginUserMain } from './models/users.models';
import { AuthService } from './services/auth.service';
import { UtilsService } from './services/utils.service';
import { SplashScreen } from '@capacitor/splash-screen';
import { ConnectionStatus, Network } from '@capacitor/network';
import { PluginListenerHandle } from '@capacitor/core';

import { environment } from 'src/environments/environment';
import OneSignal from 'onesignal-cordova-plugin';  
import { Device } from '@capacitor/device';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  userSesion: LoginUserMain;
  active: boolean;
  networkStatus: ConnectionStatus;
  networkListener: PluginListenerHandle;
  idUser = 0;
  uuid=null
  constructor(
    private storage: Storage,
    public authService: AuthService,
    private router: Router,
    private util: UtilsService,
    public platform: Platform, 
    private alertCtrl: AlertController, 
  ) {
    
  }

  async ngOnInit() {
    await this.storage.create();
   OneSignal.setAppId(environment.idOneSignal);
    this.uuidDispositivo();
    this.active = true;
    setTimeout(() => {
      this.active = false;
      this.setupPush();
    }, 5000);

    setTimeout(() => {
      this.usersid();
    }, 1000);

    this.usersid();
    this.platform.ready().then((info) => {
      SplashScreen.hide();
    });

 

    this.networkListener = await Network.addListener(
      'networkStatusChange',
      (status) => {
        this.networkStatus = status;
      }
    );

    this.networkStatus = await Network.getStatus();
    this.conexionError();
  }

  async usersid() {
    this.idUser = await this.authService.usersId();
  }

  async uuidDispositivo(){
    const info = await Device.getId();
    console.log(info);
    this.uuid=info.uuid
  }

  async setupPush() {

    
      OneSignal.setExternalUserId(this.uuid, (results) => {
        console.log(results)
      });
      let datos
      datos = { idUser: this.idUser, token: this.uuid, plataforma: 'Sin definir' };
      this.authService.actualizarPush(datos);
 
  }

  async showAlert(title, msg, task) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: `Action: ${task}`,
          handler: () => {
            // E.g: Navigate to a specific screen
          },
        },
      ],
    });
    alert.present();
  }

  conexionError() {
    if (this.networkStatus.connected !== true) {
      this.util.showToast('Conexão perdida', 'middle');
    }
  }
}

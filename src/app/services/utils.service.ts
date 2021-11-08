import { Injectable } from '@angular/core';
import {
  AlertController,
  LoadingController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { Clipboard } from '@capacitor/clipboard';
import { Geolocation } from '@capacitor/geolocation';
import {
  BackgroundColorOptions,
  StatusBar,
  Style,
} from '@capacitor/status-bar';
import { Share } from '@capacitor/share';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  isLoading: boolean = false;
  loading;
  public static version = '0.0.1';

  constructor(
    public toastController: ToastController,
    public loadingController: LoadingController,
    public storage: Storage,
    public alertController: AlertController,
    private platform: Platform
  ) {}

  async share(title, text, url, dialogTitle) {
    await Share.share({
      title: title,
      text: text,
      url: url,
      dialogTitle: dialogTitle,
    });
  }

  async colorstatusbar(colorrgb) {
    const opts: BackgroundColorOptions = {
      color: colorrgb,
    };
    this.platform.ready().then(async (info) => {
      console.log(info);
      if (info != 'dom') {
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor(opts);
      }
    });
  }

  async showLoading(msg = 'Por favor, aguarde...', duration = 109000) {
    this.isLoading = true;
    this.loading = await this.loadingController.create({
      message: msg,
      duration: duration,
      mode: 'ios',
    });
    await this.loading.present();
    if (!this.isLoading) {
      this.loading.dismiss().then(() => console.log('Cancelling Loading'));
    }
  }

  async geolocationapi() {
    return (await Geolocation.getCurrentPosition()).coords;
  }

  async dismissLoading() {
    try {
      this.isLoading = false;
      return await this.loadingController.getTop().then((a) => {
        if (a) a.dismiss().then(() => console.log('loading dismissed'));
      });
    } catch (error) {}
  }

  async showAlert(
    messageD,
    buttonsD = ['Aceitar'],
    headerD = 'INFORMAÇÃO',
    subHeaderD?
  ) {
    let data = { header: headerD, message: messageD };
    if (subHeaderD) data['subHeader'] = subHeaderD;

    if (buttonsD) data['buttons'] = buttonsD;

    const alert = await this.alertController.create(data);
    await alert.present();
  }

  async setStorage(key: string, val: any) {
    try {
      return this.storage.set(key, val);
    } catch (error) {
      return null;
    }
  }

  async getStorage(key: string) {
    try {
      return await this.storage.get(key);
    } catch (error) {
      return null;
    }
  }

  async clearStorage() {
    try {
      return this.storage.clear();
    } catch (error) {
      return null;
    }
  }

  async removeStorage(key: string) {
    try {
      return await this.storage.remove(key);
    } catch (error) {
      return null;
    }
  }

  async showAlertConfirmAction(
    header: string,
    subHeader: string,
    message: string = '',
    btnLabels: string[] = ['Aceitar', 'Cancelar']
  ): Promise<boolean> {
    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>((resolve) => {
      resolveFunction = resolve;
    });

    const alert = await this.alertController.create({
      cssClass: 'alert-custom',
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: [
        {
          text: btnLabels[0],
          cssClass: 'success-btn',
          handler: () => {
            resolveFunction(true);
          },
        },
        {
          text: btnLabels[1],
          role: 'cancel',
          cssClass: 'cancel-btn',
          handler: () => {
            resolveFunction(false);
          },
        },
      ],
    });

    await alert.present();
    return promise;
  }

  async showToast(
    message: string,
    position: 'bottom' | 'top' | 'middle' = 'bottom',
    duration: number = 5000
  ) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      color: 'dark',
      mode: 'ios',
      position: position,
    });
    toast.present();
  }

  isCordova() {
    return this.platform.is('cordova');
  }

  toFixedNumberString(amount: string) {
    return Number(amount).toFixed(2);
  }

  groupBy(list: any[], keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  removeSubscriptions(subscriptions: Subscription[]) {
    for (const iterator of subscriptions) {
      iterator.unsubscribe();
    }
  }

  getNumberFromString(value: string) {
    const confirmNaN = Number.isNaN(Number(value));
    return confirmNaN ? '' : Number(value).toFixed(2);
  }

  async copyToClipBoard(text: string) {
    Clipboard.write({ string: text }).then((data) => {
      this.showToast('Link copiado');
    });
  }
 
}

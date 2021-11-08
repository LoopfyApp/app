/* eslint-disable eol-last */
import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule, } from '@ionic/storage-angular';
import { ImageCropperModule } from 'ngx-image-cropper';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Drivers } from '@ionic/storage';
import { Ionic4EmojiPickerModule } from 'ionic4-emoji-picker';
import { NgCalendarModule  } from 'ionic2-calendar';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { pageTransition } from './services/router-animation';
import { BuyProductModule } from './components/modal/buy-product/buy-product.module';
registerLocaleData(localePT);


defineCustomElements(window);
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    NgCalendarModule,
    IonicModule.forRoot({
      scrollPadding: false,
      scrollAssist: true,
      inputShims:true,
      mode:'ios',
      animated:true,
      navAnimation: pageTransition
    }),
    IonicStorageModule.forRoot(
      {
        name:'__Loopy',
        driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage, Drivers.SecureStorage]
      }
    ),
    Ionic4EmojiPickerModule,
    AppRoutingModule,
    HttpClientModule,
    ImageCropperModule,
    FormsModule,
    BuyProductModule,
     ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: LOCALE_ID, useValue: 'pt-BR' },
    {provide:  DEFAULT_CURRENCY_CODE, useValue: 'BRL'}],
  bootstrap: [AppComponent],
  
})
export class AppModule {

}
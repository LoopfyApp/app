import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { EspeciesApp } from 'src/app/models/animals.models';
import { ServerService } from 'src/app/services/server.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss'],
})
export class SpeciesComponent implements OnInit {
  Espeies:EspeciesApp[]
  info:boolean=false
  
  constructor(   
    public server: ServerService,
    private util: UtilsService,
    private popover: PopoverController,
    private navParams:NavParams
    ) { }


  ngOnInit() {
    this.species();
  }

  async details(data) {

    this.popover.dismiss({ data: data });

  }

  async species() {
    console.log('data')
    await this.util.showLoading('Carregando...');
    this.server.especiesAll().then((response: any) => {
      this.util.dismissLoading();
      this.info = true
      this.Espeies = response.data

    }, (error) => {
      this.util.dismissLoading();
      console.log(error);

      this.info = false
      this.util.showToast(
        error.error && error.error.message
          ? error.error.message
          : 'Ocorreu um erro desconhecido, tente novamente'
      );
    })
  }

}

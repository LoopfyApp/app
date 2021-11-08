import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { RazasApp } from 'src/app/models/animals.models';
import { ServerService } from 'src/app/services/server.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-breed',
  templateUrl: './breed.component.html',
  styleUrls: ['./breed.component.scss'],
})
export class BreedComponent implements OnInit {
  filterData :RazasApp[]
  info:boolean=false
  filterTerm: string;
  
  constructor(
    public server: ServerService,
    private util: UtilsService,
    private popover: PopoverController,
    private navParams:NavParams
  ) { }

  ngOnInit() {
    this.razasAll();
  }

  async details(data) {
    this.popover.dismiss({ data: data });
  }

  async razasAll() {
    
    await this.util.showLoading('Carregando...');
    this.server.razasAll(this.navParams.get('id_species')).then((response: any) => {
      this.util.dismissLoading();
      this.info = true
      this.filterData  = response.data
    }, (error) => {
      this.util.dismissLoading();
      this.info = false
      this.util.showToast(
        error.error && error.error.message
          ? error.error.message
          : 'Ocorreu um erro desconhecido, tente novamente'
      );
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Mascote } from 'src/app/models/animals.models';
import { ServerService } from 'src/app/services/server.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-listpets',
  templateUrl: './listpets.component.html',
  styleUrls: ['./listpets.component.scss'],
})
export class ListpetsComponent implements OnInit {
  mascote: Mascote[];
  search:any
  constructor(public server:ServerService,
    public utils:UtilsService,
    public _popover:PopoverController) { }

  ngOnInit() {
    this.getmascote()
  }

  getSelectMascote(data){
    this._popover.dismiss({data:data})
    console.log(data)
  }

  getmascote(){
    this.server.getUserMascotes().then( (data:any)=>{
      this.mascote=data.data
    }).catch(()=>{
      this.utils.showToast("Erro ao obter resposta")
    })

  }

}

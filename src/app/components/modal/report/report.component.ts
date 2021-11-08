import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Mascote } from 'src/app/models/animals.models';
import { ServerService } from 'src/app/services/server.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ListpetsComponent } from '../../listpets/listpets.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  @Input() post;
  @Input() pet;
  comment: string = '';
  msgerror: string = '';
  datamascote: Mascote;
  selectMascte: boolean = false;

  constructor(
    public server: ServerService,
    public utils: UtilsService,
    public popover: PopoverController,
    public modalcontroller: ModalController
  ) {}

  ngOnInit() {
    console.log(this.post, this.pet);
  }

  async sendReport() {
    if (this.datamascote === undefined) {
      this.msgerror = 'Você precisa escolher um Mascote';
      this.utils.showToast(this.msgerror, 'top');
      return;
    }
    console.log(this.comment);
    if (this.post > 0 && this.datamascote.id > 0) {
      if (this.comment === '') {
        this.msgerror = 'Você precisa digitar um motivo!';
        this.utils.showToast(this.msgerror, 'top');
        return;
      } else {
        this.msgerror = '';
      }

      var params = {
        motive: this.comment,
        pets_id: this.datamascote.id,
        posts_id: this.post,
      };

      this.server.reportPost(params).then((data: any) => {
        console.log(data);
        if (data.error === false) {
          this.utils.showToast(data.message, 'top');
          this.close();
        }
      });
    }
  }

  close() {
    this.modalcontroller.dismiss();
  }

  async selectmascote() {
    const popover = await this.popover.create({
      component: ListpetsComponent,
      cssClass: 'customPopover',
      translucent: true,
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();
    if (data != null) {
      this.datamascote = data.data;
      this.selectMascte = true;
    }
  }
}

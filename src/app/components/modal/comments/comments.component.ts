import { Component, Input, OnInit } from '@angular/core';
import { Keyboard } from '@capacitor/keyboard';
import { ServerService } from 'src/app/services/server.service';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { Mascote } from 'src/app/models/animals.models';
import { ListpetsComponent } from '../../listpets/listpets.component';
import { ActionSheetController, ModalController, PopoverController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Input() id;
  @Input() post_user_id;
  comentarios;
  newmessage="";
  showEmojiPicker:boolean=false;
  datamascote: Mascote;
  user;
  selectMascte:boolean=false
  constructor(
    public server: ServerService,
    public popover: PopoverController,
    public utils: UtilsService,
    public modal: ModalController,
    public actionSheet: ActionSheetController,
    public auth: AuthService
    ) { }

  async ngOnInit() {
    console.log(this.showEmojiPicker);
    this.getComments();
    this.user = await this.auth.getUserData();
  }

  addEmoji(event) { 
    this.newmessage=this.newmessage+event.data;
  }
  keyboards(){
    this.showEmojiPicker = true;
    Keyboard.hide();
  }
  emojis(){
    this.showEmojiPicker = false;
  }
  
  async getComments()
  {
    this.server.getComments(this.id).then((comments:any)=>{
      this.comentarios = comments.data;
      console.log(this.comentarios);
    });
  }

  async addComment()
  {
    if(this.newmessage === '' && this.datamascote !== null ){
      this.utils.showToast('Você precisa escrever um comentário.','bottom');
      return;
    }
 
    var params = {
      comments: this.newmessage,
      posts_id: this.id,
      pets_id: this.datamascote.id
    }
    console.log(this.datamascote, params);
    this.server.postComments(params).then((retorno:any)=>{
      if(!retorno.error)
      {
        this.newmessage = null;
        this.datamascote = null;  
        this.selectMascte=false;
        this.emojis();
        this.getComments();
      }
    });
  
  }

  async  selectmascote(){
    const popover = await this.popover.create({
      component: ListpetsComponent,
      cssClass: 'customPopover', 
      translucent: true
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();
    if(data != null ){
      this.datamascote = data.data;
      this.selectMascte=true;
    } 
  }

  dismissModal()
  {
    this.modal.dismiss();
  }

  
  formatDate(date) {

    var date1 = moment(date);
    var date2 = moment();

    var diffInMinutes = date2.diff(date1, 'minutes');
    var diffInHours = date2.diff(date1, 'hours');
    var diffInDays = date2.diff(date1, 'days');
    var diffInSeconds = date2.diff(date1, 'seconds');

    if (diffInSeconds <= 59)
      return diffInSeconds+" segundo atrás"

    if (diffInMinutes <= 59)
      return diffInMinutes+" minutos atrás"  

    if (diffInHours <= 24)
      return diffInHours+" hora atrás"    

    if (diffInDays <= 7)
      return  diffInDays+" dias atrás"    


    return date1.format("DD/MM/YYYY")

  }

  commentsOptions(e)
  {
    console.log(e);
  }
  
  async presentActionSheet(
    postId,
    comment_id,
    commentUser,
    user_id    
  ) {

    if (commentUser === user_id) {
      
    } else{
      if(postId === user_id){

      }      
    };
    
    const actionSheets = await this.actionSheet.create({
      header: this.user.name,
      subHeader: 'Opções',
      mode: 'ios',
      cssClass: 'actionSheetClass',
      buttons: [
        {
          text: 'Apagar',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            var params = {
              id_comment: comment_id
            };
            this.utils.showAlertConfirmAction('Excluir','Deseja excluir esse comentário?',"",['Não','Sim']).then(
              (data)=>{
                console.log(data);
                if(!data)
                {
                  this.server.DeleteComment(params).then((data:any)=>{
                    this.utils.showToast(data.message);
                    this.getComments();
                  },
                  (error)=>{
                    console.log('error', error);
                  });
                }
              });
            
          },
        }
      ],
    });
    await actionSheets.present();
  }



}

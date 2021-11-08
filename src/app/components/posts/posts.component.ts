import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ActionSheetController,
  ModalController,
  PopoverController,
} from '@ionic/angular';
import { Mascote } from 'src/app/models/animals.models';
import { Keyboard } from '@capacitor/keyboard';
import { ServerService } from 'src/app/services/server.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ListpetsComponent } from '../listpets/listpets.component';
import { CommentsComponent } from '../modal/comments/comments.component';
import { Share } from '@capacitor/share';
import { AuthService } from 'src/app/services/auth.service';
import * as moment from 'moment';
import { ReportComponent } from '../modal/report/report.component';

@Component({
  selector: 'app-posts-rede',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  seeMore: boolean=false;
  datamascote: Mascote;
  comentarios = [];
  newmessage = '';
  user;
  animales = 0;
  @Input() posts;
  @Output() ProfileId = new EventEmitter<number>();
  @Output() EmitePost = new EventEmitter<boolean>();

  showEmojiPicker: boolean = false;
  constructor(
    public actionSheet: ActionSheetController,
    public popover: PopoverController,
    public utils: UtilsService,
    public server: ServerService,
    public modalController: ModalController,
    public auth: AuthService
  ) {}

  async ngOnInit() {
    this.user = await this.auth.getUserData();
    console.log(this.user);
    this.totalAnimals();
  }

  async ngOnChanges() {
    this.user = await this.auth.getUserData();
    console.log('POSTS', this.posts);

    if (this.posts != undefined) {
      this.posts.forEach((element, index) => {
        this.posts[index]['comments'] = this.posts[index]['comenets'];
        this.posts[index].seeAll = false;
      });
    }
  }

  addEmoji(event) {
    this.newmessage = this.newmessage + event.data;
  }

  keyboards() {
    this.showEmojiPicker = true;
    Keyboard.hide();
  }
  emojis() {
    this.showEmojiPicker = false;
  }

  toggleSeeMore() {
    this.seeMore = !this.seeMore;
    console.log(this.seeMore);
  }

  async presentActionSheet(
    title,
    subtitle,
    post,
    titlePost,
    text,
    texto,
    postUser,
    user_id,
    index,
    pet,
    infopost
  ) {
   
    let buttonUnfollow 
   
    if (postUser === user_id) {
      var button = {
        text: 'Apagar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.deletePost(post, index);
        },
      };
        buttonUnfollow = false;
    } else {
      buttonUnfollow = true;
      var button = {
        text: 'Denunciar',
        role: 'destructive',
        icon: 'newspaper-outline',
        handler: () => {
          this.reportPost(post, pet);
        },
      };

      if(infopost.followeroptions==null){
        var buttonUnfollows = {
          text: 'Seguir',
          icon: 'person-outline',
          handler: () => {
            this.follower(pet);
          },
        };
      }
      if(infopost.followeroptions !== null){
        var buttonUnfollows = {
          text: 'Deixar de seguir',
          icon: 'person-remove-outline',
          handler: () => {
            this.unfollow(infopost.followeroptions.id);
          },
        };
      }





    }
    const actionSheet = await this.actionSheet.create({
      header: title,
      subHeader: subtitle,
      mode: 'ios',
      cssClass: 'actionSheetClass',
      buttons: [
        button,

        {
          text: 'Copiar link',
          icon: 'link-outline',
          handler: () => {
            this.utils.copyToClipBoard(
              'https://loopfy.app/post-details/' + post
            );
          },
        },
        {
          text: 'Compartilhar',
          icon: 'share-social-outline',
          handler: () => {
            this.share(titlePost, text, post, texto);
          },
        },
        {
          text: 'Silenciar',
          icon: 'notifications-off-outline',
          handler: () => {
            console.log('Silenciar clicked');
          },
        },
        buttonUnfollow ? buttonUnfollows : '',
      ],
    });
    await actionSheet.present();
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
    }
  }

  async likePost(indice) {
    if (this.posts[indice].favorites_count === 0) {
      var params = {
        pets_id: this.posts[indice].pets.id,
        posts_id: this.posts[indice].id,
      };
      this.server.LikePost(params).then((data: any) => {
        console.log(data);
        if (!data.error) {
          this.utils.showToast(data.message, 'bottom');
          this.posts[indice].favorites_count = 1;
        }
      });
      return;
    }

    if (this.posts[indice].favorites_count === 1) {
      var param = {
        id: this.posts[indice].id_favorites,
      };
      this.server.UnLikePost(param).then((data: any) => {
        console.log(data);
        if (!data.error) {
          this.utils.showToast(data.message, 'bottom');
          this.posts[indice].favorites_count = 0;
        }
      });
      return;
    }
  }

  async seeComments(indice) {
    console.log(indice);
    this.server.getComments(this.posts[indice].id).then((data: any) => {
      this.posts[indice].comments = data.data;
    });
  }

  async AddComment(e, comentarios) {
    console.log(e, comentarios);
  }

  async openComments(id, post_user_id) {
    if (this.animales != 0) {
      const modal = await this.modalController.create({
        component: CommentsComponent,
        animated: true,
        backdropDismiss: true,
        swipeToClose: true,
        cssClass: 'my-custom-modal',
        componentProps: { id: id, post_user_id: post_user_id },
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      if (data) {
        this.EmitePost.emit(true);
      }
    } else {
      this.utils.showToast('Você não pode passar sem registrar um pets', 'top');
    }
  }

  seeAllComments(i) {
    this.posts[i].seeAll = true;
  }

  NotSeeAllComments(i) {
    this.posts[i].seeAll = false;
  }

  async share(title, text, id, texto) {
    await Share.share({
      title: title,
      text: text,
      url: 'https://loopfy.app/post-details/' + id,
      dialogTitle: texto,
    });
  }

  async deletePost(id, index) {
    var params = {
      id_post: id,
    };
    this.utils
      .showAlertConfirmAction(
        'Mensagem',
        'Você quer apagar permanentemente este post?',
        '',
        ['Não', 'Sim']
      )
      .then((data) => {
        if (!data) {
          this.server.deletePost(params).then((response: any) => {
            if (!response.error) {
              this.utils.showToast('Postagem removida com sucesso', 'bottom');
              this.EmitePost.emit(true);
            }
          });
        }
      });
  }

  async totalAnimals() {
    this.animales = await this.utils.getStorage('animales');
  }

  formatDate(date) {
    var date1 = moment(date);
    var date2 = moment();

    var diffInMinutes = date2.diff(date1, 'minutes');
    var diffInHours = date2.diff(date1, 'hours');
    var diffInDays = date2.diff(date1, 'days');
    var diffInSeconds = date2.diff(date1, 'seconds');

    if (diffInSeconds <= 59) return diffInSeconds + ' segundo atrás';

    if (diffInMinutes <= 59) return diffInMinutes + ' minutos atrás';

    if (diffInHours <= 24) return diffInHours + ' hora atrás';

    if (diffInDays <= 7) return diffInDays + ' dias atrás';

    return date1.format('DD/MM/YYYY');
  }

  profile(id) {
    this.ProfileId.emit(id);
  }

  async unfollow(id) {
    var params = {
      id: id,
    };
    this.server.UnFollow(params).then((response: any) => {
      console.log(response);
      if (!response.error) {
        this.utils.showToast(response.message, 'top');
        this.EmitePost.emit(true);
      }
    });
  }

  async follower(id){
    let param:any
    param={'users_pets_follow_id':id}
      this.server.Follow(param).then((data: any) => {
   
        this.EmitePost.emit(true);
        if (!data.error) {
          this.utils.showToast(data.message, 'bottom');
        }
      });
    }

  async reportPost(post, pet) {
    const modal = await this.modalController.create({
      component: ReportComponent,
      animated: true,
      backdropDismiss: true,
      swipeToClose: true,
      cssClass: 'my-custom-report',
      componentProps: { post: post, pet: pet },
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) {
      this.EmitePost.emit(true);
    }
  }

  async presentActionSheetComments(
    postId,
    comment_id,
    commentUser,
    user_id,
    index
  ) {
 
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
              id_comment: comment_id,
            };
            this.utils
              .showAlertConfirmAction(
                'Excluir',
                'Deseja excluir esse comentário?',
                '',
                ['Não', 'Sim']
              )
              .then((data) => {
                console.log(data);
                if (!data) {
                  this.server.DeleteComment(params).then(
                    (data: any) => {
                      this.utils.showToast(data.message);
                      this.seeComments(index);
                    },
                    (error) => {
                      console.log('error', error);
                    }
                  );
                }
              });
          },
        },
      ],
    });
    await actionSheets.present();
  }
}

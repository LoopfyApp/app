import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { PostCard } from 'src/app/models/rede.models';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit {
  @ViewChild(IonContent, { static: false, read: IonContent })
  content: IonContent;
  flagHeaderSticky: boolean = false;
  flagFilterSticky: boolean = false;
  loadings:boolean=false;
  post: PostCard;
  constructor(
    public server: ServerService,
    public route: ActivatedRoute,
    public router: Router
    ) { }

  ngOnInit() {
    this.getPostById();
  }

  onScroll(event) {
   
    // used a couple of "guards" to prevent unnecessary assignments if scrolling in a direction and the var is set already:
    if (event.detail.deltaY > 0 && this.flagHeaderSticky) return;
    if (event.detail.deltaY < 0 && !this.flagHeaderSticky) return;
    if (event.detail.scrollTop != 0) {
      // console.log("scrolling");
      this.flagHeaderSticky = true;
      this.flagFilterSticky = true;
    } else if (event.detail.scrollTop == 0) {
      // console.log("scroll TOP");
      this.flagHeaderSticky = false;
      this.flagFilterSticky = false;
    }
  }

  profilePage(id){
    this.router.navigate(['/home/red/pets/profile/'+id])
  }

  doRefresh(event) {
    this.loadings=false
    this.getPostById();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }


  async getPostById()
  {
    var id = this.route.snapshot.paramMap.get('id');
    console.log(id);
      this.server.getPostById(id).then((data:any)=>{
        console.log('POST', data.data);
        this.post = data.data;
        this.loadings=true;
      },
      (error:any)=>{
        this.loadings=false;
      });
  }


}

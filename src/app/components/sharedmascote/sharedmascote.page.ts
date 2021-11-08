import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sharedmascote',
  templateUrl: './sharedmascote.page.html',
  styleUrls: ['./sharedmascote.page.scss'],
})
export class SharedmascotePage implements OnInit {

  constructor(public modal:ModalController) { }

  ngOnInit() {
  }

  cerrar(type: boolean) {
    if(type==true){
      this.modal.dismiss()
    }
  }

}

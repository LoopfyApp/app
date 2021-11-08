import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BuyProductPage } from 'src/app/components/modal/buy-product/buy-product.page';
import { EspeciesApp } from 'src/app/models/animals.models';

@Component({
  selector: 'app-produtos-loja',
  templateUrl: './produtos-loja.component.html',
  styleUrls: ['./produtos-loja.component.scss'],
})
export class ProdutosLojaComponent implements OnInit {
  @Input() products;
  @Input() store;
  @Input() especies: EspeciesApp[];
  @Output() EmiteDetails= new EventEmitter<number>();
   
  EspeciesOption = {
    initialSlide: 0,
    slidesPerView: 6,
    centeredSlides: false,
    spaceBetween: 7,
    speed: 2000,
    loop: false,
    loopAdditionalSlides: 6,
    loopFillGroupWithBlank: true
  };

  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {
    console.log('STOREEEE', this.store);
  }

  modalDetails(x){
    this.EmiteDetails.emit(x);
  }

  async buyProduct(produto)
  {
    const modal = await this.modalController.create({
      component: BuyProductPage,
      cssClass: 'my-custom-class',
      componentProps: {produto: produto}
    });
    return await modal.present();

  }
}

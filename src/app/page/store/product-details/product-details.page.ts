/* eslint-disable object-shorthand */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { EspeciesApp } from 'src/app/models/animals.models';
import { Categorys } from 'src/app/models/servicios.models';
import { ServerService } from '../../../services/server.service';
import { ProductinfoComponent } from '../../../components/products/productinfo/productinfo.component';
import { BuyProductPage } from 'src/app/components/modal/buy-product/buy-product.page';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  url = '/home/product';
  DataRequest: any = {
    id_especie: '',
    categorie: '',
    location: {
      latitude: 0,
      longitude: 0,
    },
  };
  DataProduct: any;
  subcategory: any;
  marcas: any;
  filterDataProduct: any;
  search: string;
  isLoadding: boolean = false;
  flagHeaderSticky: boolean = false;
  flagFilterSticky: boolean = false;
  dataEspecie: EspeciesApp;
  dataCategory: Categorys;
  typeUser: number
  constructor(
    public server: ServerService,
    public route: ActivatedRoute,
    public router: NavController,
    public modal: ModalController
  ) {}

  ngOnInit() {
    this.DataRequest.id_especie = this.route.snapshot.paramMap.get('spcecies');
    this.DataRequest.categorie = this.route.snapshot.paramMap.get('categoria');
    this.allproducts();
  }

  async allproducts() {
    this.server.getProductAll(this.DataRequest).then((datos: any) => {
      console.log(datos.data);
      this.DataProduct = datos.data.products;
      this.filterDataProduct = datos.data.products;
      this.subcategory = datos.data.subcategory;
      this.dataEspecie = datos.data.species;
      this.dataCategory = datos.data.category;
      this.marcas = datos.data.marcas;

      this.isLoadding = true;
    });
  }



  onScroll(event) {
    // used a couple of "guards" to prevent unnecessary assignments if scrolling in a direction and the var is set already:
    if (event.detail.deltaY > 0 && this.flagHeaderSticky) return;
    if (event.detail.deltaY < 0 && !this.flagHeaderSticky) return;
    if (event.detail.scrollTop !== 0) {
      // console.log("scrolling");
      this.flagHeaderSticky = true;
      this.flagFilterSticky = true;
    } else if (event.detail.scrollTop === 0) {
      // console.log("scroll TOP");
      this.flagHeaderSticky = false;
      this.flagFilterSticky = false;
    }
  }

  filteritems(event) {
    console.log(event);
    if (event === 0) {
      this.DataProduct = this.filterDataProduct;
    } else {
      this.DataProduct = this.filterDataProduct;
      this.DataProduct = this.DataProduct.filter(
        (items) => items.idsubcatgoria === event
      );
    }
  }

  ordernar(event) {
    console.log(event);
    if (event === 0) {
      this.DataProduct = this.DataProduct.sort(function(a, b) {
        return a.price - b.price;
      });
    }
    if (event === 1) {
      this.DataProduct = this.DataProduct.sort(function(a, b) {
        return b.price - a.price;
      });
    }
  }

  filteritemsMarcas(event) {
    console.log(event);
    if (event === 0) {
      this.DataProduct = this.filterDataProduct;
    } else {
      this.DataProduct = this.filterDataProduct;
      this.DataProduct = this.DataProduct.filter(
        (items) => items.marca_id === event
      );
    }
  }

  async openModal(x){
    const modal = await this.modal.create({
      component: ProductinfoComponent,
      cssClass: 'class-products',
      componentProps:{products: x}
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log('data', data.data.data);
        if(data.data.data !== null){
          this.buyProduct(data.data.data);}
      });
    return await modal.present();
  }

  async buyProduct(produto)
  {
    const modal = await this.modal.create({
      component: BuyProductPage,
      cssClass: 'my-custom-class',
      componentProps: {produto: produto}
    });
    return await modal.present();

  }

  async ionViewWillEnter(){
    this.typeUser=await this.server.typeUsers();
  
  }


}

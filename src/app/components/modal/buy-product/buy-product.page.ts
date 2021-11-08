/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServerService } from 'src/app/services/server.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.page.html',
  styleUrls: ['./buy-product.page.scss'],
})
export class BuyProductPage implements OnInit,OnChanges {
@Input() produto;
quantidade: number = 1;
typeUser: number
cart_number_services: any
cart_number_productos: any
  constructor(
    public modalController: ModalController,
    public server: ServerService,
    public utils: UtilsService
  ) { console.log(this.produto);}

  ngOnInit() {
    console.log(this.produto);
  }

  async ionViewWillEnter(){
    this.cart_number_services = await this.utils.getStorage('cartId');
    this.cart_number_productos = await this.utils.getStorage('CART_PRODUCTS_ID');

    this.typeUser=await this.server.typeUsers();
  
  }

  ngOnChanges()
  {
    console.log(this.produto);
  }

  async dismissModal(response?)
  {
    this.modalController.dismiss(response);
  }

  add()
  {
    if(this.quantidade >= this.produto.cantidad){
      this.utils.showToast('Produto com estoque indisponivel no momento','bottom')
    }
    else{

      this.quantidade++;
    }

  }

  min()
  {
    if(this.quantidade>1)
    {
      this.quantidade--;
    }
  }

 verifycart(){
   if( this.cart_number_services != null){
    this.cancelar()
   }
   else{
     this.buyProduct()
   }
 }

  
 cancelar(){
   this.utils
     .showAlertConfirmAction(
       'Cancelar',
       'Você tem um carrinho com serviços que desejo excluí-lo?',
       '',
       ['Não', 'Sim']
     )
     .then((data) => {
       if (!data) {
        this.utils.showLoading('Carregando...');
         this.server
           .cancelCart(this.cart_number_services)
           .then((datos: any) => { 
             this.utils.removeStorage("cartId")
             this.utils.removeStorage("cartData")
             this.cart_number_services=null;
             this.buyProduct()
             this.utils.dismissLoading();
           })
           .catch((error) => {
            
          this.utils.dismissLoading();
             console.log(error);
           });
       }
     });
 }
  async buyProduct()
  {
    const cartId = await this.utils.getStorage('CART_PRODUCTS_ID');

    this.utils.showAlertConfirmAction('Comprar','Deseja adicionar esse produto ao carrinho?','',['Não','Sim']).then(
      ((data:any)=>{
     
        if(data===false)
        {
          this.utils.showLoading('Aguarde adicionando ao carrinho...');
          const params = {
            cart_number: cartId,
            id_product: this.produto.id,
            cantidad: this.quantidade,
            store_id: this.produto.store.id,
            amount: this.produto.offerts > 0 ? this.produto.amount_offerts : this.produto.price
          };
   
          this.server.AddProductCart(params).then((datos: any)=>{
            console.log(datos);
            if(!datos.error){
              this.utils.dismissLoading();
              const info = datos.data;
              this.utils.setStorage('CART_PRODUCTS_ID',info.cart_number);
            const response = {buy: true};
            this.dismissModal(response);
            this.utils.showToast('Produto adicionado ao carrinho','bottom')
            }
          }).catch( (error:any)=>{
            this.utils.dismissLoading();
            this.utils.showToast(error.error.message,'top')
            this.cancelarCompra(params)
          });
        }
      }));

  }

  
  async cancelarCompra(infocarts){

    this.utils
      .showAlertConfirmAction(
        'Cancelar',
        'Você já tem um item de outra loja no carrinho. Deseja excluí-lo?',
        '',
        ['Não', 'Sim']
      )
      .then((data) => {
        if (!data) {
      this.server
            .deletecarproducts({'cart_number':infocarts.cart_number})
            .then((datos: any) => {
              this.utils.removeStorage("cartId")
              this.utils.removeStorage("cartData")
              this.utils.removeStorage("CART_PRODUCTS_ID") 
              this.buyProduct()
            })
            .catch((error) => {
      
              console.log(error);
            });
        }
      });
  }

}

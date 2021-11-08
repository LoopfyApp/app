import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { DataCart, DataCartStore, ListCar } from 'src/app/models/servicios.models';
import { ServerService } from 'src/app/services/server.service';
import { UtilsService } from 'src/app/services/utils.service';
import { PaymentOptionsPage } from './payment-options/payment-options.page';

@Component({
  selector: 'app-checkoutcart',
  templateUrl: './checkoutcart.page.html',
  styleUrls: ['./checkoutcart.page.scss'],
})
export class CheckoutcartPage implements OnInit {
  isLoadding: boolean = false;
  url = 'home/services';
  cart_number: any;
  catchOnStore;
  freteEscolhido = 0;
  resultFrete = [];
  

  frete = {
    type: null,
    endereco: 'R. Jardins, 34 - Moema - São Paulo/SP',
    cep: ''
  };

  items: ListCar[];
  carts: DataCart;
  store: DataCartStore;
  accordion_expanded: boolean = false;
  id_items = 0;
  totalProducto=0;
  cart_cancel=false;
  product_mode:boolean=false;
  cepcalcular: string;
  product: any =null;
  itemsProductos: any;
  shippigMethod : number = 1
  enderezo:any

  shippigAMount : number = 0

  constructor(
    public utils: UtilsService,
    public route: ActivatedRoute,
    public router: NavController,
    public server: ServerService,
    public modal: ModalController
  ) {}

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.shippigAMount=0
    this.cart_number = await this.utils.getStorage('cartId');
    this.utils.setStorage('add_cart', false);

    this.product =  await this.utils.getStorage('CART_PRODUCTS_ID');

    console.log('CART NUMBER', this.cart_number);
    if(this.cart_number === null){
      this.product_mode = true;
          this.cart_number = this.product;
          this.product_mode = true;
          this.listItemProducts(this.cart_number);
    }
    else{
      this.product_mode=false;
      this.listItem(this.cart_number);
    }
   /*   setTimeout(async () => {
        if(this.product_mode)
        {
          this.listItemProducts(this.cart_number);
        }else{
          this.listItem(this.cart_number);
        }
      }, 2000);*/

  }

  ionViewDidLeave() {
    if(this.cart_cancel === false){
      this.utils.setStorage('add_cart', true);
    }
    else{
      this.utils.setStorage('add_cart', false);
    }
  }

  async listItemProducts(idCart) {
    const params = {
      cart_number: idCart
    };

    
    this.server
      .GetItensProductsCart(params)
      .then((data: any) => {
        console.log('DATA -------------', data);
        this.carts = data.data.cart_number;
        this.itemsProductos = data.data.products;
        this.store = data.data.store;
        this.isLoadding = true;
        console.log(this.itemsProductos);

        this.totalProducto = this.itemsProductos.reduce( function(a, b){
          return a + b['total_amount'];
      }, 0);
      
  console.log(this.totalProducto);


      })
      .catch((error: any) => {
        this.isLoadding = true;
      });
  }


  async listItem(idCart) {
    this.server
      .getListItems(idCart)
      .then((data: any) => {
        console.log('DATA -------------', data);
        this.carts = data.data.cart;
        this.items = data.data.items;
        this.store = data.data.store;
        this.isLoadding = true;
        console.log(this.items);
     
        this.totalProducto =  this.carts.total
      
  console.log(this.totalProducto);

      })
      .catch((error: any) => {
        this.isLoadding = true;
      });
  }

  toggle_accordion(data) {
    this.id_items = data.id_service;

    this.accordion_expanded = this.accordion_expanded === false;
  }

  deleteitemsProducts(id_item)
  {
    this.utils
      .showAlertConfirmAction(
        'Excluir',
        'Você deseja realmente excluir esse item?',
        '',
        ['Não', 'Excluir']
      )
      .then((data) => {
        if (!data) {
          this.isLoadding = false;

          let params = {
            id_details_cart: id_item,
            cart_number: this.cart_number
          };

          this.server
            .DeleteItemProductsCart(params)
            .then((datos: any) => {
              this.listItemProducts(this.cart_number);
            })
            .catch((error) => {
              this.isLoadding = true;
              console.log(error);
            });
        }
      });
  }


  deleteitems(infoItems) {
    this.utils
      .showAlertConfirmAction(
        'Excluir',
        'Você deseja realmente excluir esse item?',
        '',
        ['Não', 'Excluir']
      )
      .then((data) => {
        if (!data) {
          this.isLoadding = false;
          this.server
            .deleteItems(this.cart_number, infoItems.id_service)
            .then((datos: any) => {
              this.listItem(this.cart_number);
            })
            .catch((error) => {
              this.isLoadding = true;
              console.log(error);
            });
        }
      });
  }

  addservice(){
    this.utils
    .showAlertConfirmAction(
      'Mensagem',
      'O que você quer adicionar?',
      '',
      ['Consulta', 'Serviço']
    )
    .then((data) => {
      if (!data) {
        this.router.navigateBack("home/services")
      }
      else{
        this.router.navigateBack("home/veterinary")
      }
    });


     
  }


  cancelar(){

    this.utils
      .showAlertConfirmAction(
        'Cancelar',
        'Você deseja realmente Cancelar compra?',
        '',
        ['Não', 'Sim']
      )
      .then((data) => {
        if (!data) {
          this.isLoadding = false;
          this.server
            .cancelCart(this.cart_number)
            .then((datos: any) => {
              this.cart_cancel=true;
              this.utils.removeStorage("cartId")
              this.utils.removeStorage("cartData")
              this.utils.removeStorage("CART_PRODUCTS_ID")
              this.router.navigateBack(this.url)
            })
            .catch((error) => {
              this.isLoadding = true;
              console.log(error);
            });
        }
      });
  }

  async presentModal(x) {
    let cartnumbers
    if(x==1){
      cartnumbers=this.cart_number
    }
    if(x==2){
      cartnumbers=this.product
    }
    const modals = await this.modal.create({
      component: PaymentOptionsPage,
      cssClass: 'my-custom-class',
      componentProps: {total:this.totalProducto, idcart:cartnumbers, tipo:x}
    });
    modals.onDidDismiss().then(datas=>{console.log(datas);});
    return await modals.present();
  }

  totalAmout(){
    this.itemsProductos.forEach(element => {
      this.totalProducto=this.totalProducto+element.total_amount;
    });
  }

  calcFrete()
  {
    this.resultFrete = [
      {
        title: 'PAC',
        ammount: 35.55,
        deadline: '8 dias',
        type: 1
      },
      {
        title: 'SEDEX',
        ammount: 55.95,
        deadline: '3 dias',
        type: 2
      }
    ];
  }

  consolelog(e)
  {
    this.catchOnStore = e.detail.checked;
  }

  chooseFrete(e)
  {
    console.log(this.resultFrete[e]);
  }

  typeShipping(e){
   this.shippigMethod=e.detail.value;
  }

  datacep(e){
    console.log(e.detail.value)
    this.cepcalcular=e.detail.value;
  }

  async calcdistancia(){
    let datos={
      cep:this.cepcalcular,
      store:this.cart_number
    };
    this.server.distance(datos).then((response: any) => {
      
      this.shippigAMount=response.data
    }, (error) => {
      this.utils.dismissLoading();
      this.utils.showToast(
        error.error && error.error.message
          ? error.error.message
          : 'Ocorreu um erro desconhecido, tente novamente'
      );
    })
  }
  async caluclarfrete(){
 
    if(this.cepcalcular != ''){
        await this.utils.showLoading('Carregando...');
        this.server.GetCep(this.cepcalcular).then((response: any) => {
        
          this.utils.dismissLoading();
          if(response.error==true){
            this.utils.showToast(response.message);
            this.cepcalcular="";
          }
          else{
           if(response.data.state!=="SP"){
            this.utils.showToast("O erro do CEP está fora do alcance de envio");
            this.cepcalcular="";
           }
           else{
             this.enderezo=response.data.combinado
             this.calcdistancia();
            
           }
       
          }
         
        }, (error) => {
          this.utils.dismissLoading();
          this.utils.showToast(
            error.error && error.error.message
              ? error.error.message
              : 'Ocorreu um erro desconhecido, tente novamente'
          );
        })
    }

  }


  cancelarCompra(){

    this.utils
      .showAlertConfirmAction(
        'Cancelar',
        'Você deseja realmente Cancelar compra?',
        '',
        ['Não', 'Sim']
      )
      .then((data) => {
        if (!data) {
          this.isLoadding = false;
          this.server
            .deletecarproducts({'cart_number':this.cart_number})
            .then((datos: any) => {
              this.cart_cancel=true;
              this.utils.removeStorage("cartId")
              this.utils.removeStorage("cartData")
              this.utils.removeStorage("CART_PRODUCTS_ID")
              this.router.navigateBack("home/product")
            })
            .catch((error) => {
              this.isLoadding = true;
              console.log(error);
            });
        }
      });
  }
  
  //deletecarproducts

}

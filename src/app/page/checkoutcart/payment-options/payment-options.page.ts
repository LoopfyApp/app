import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import pagarme from 'pagarme/browser';
import { ServerService } from '../../../services/server.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-payment-options',
  templateUrl: './payment-options.page.html',
  styleUrls: ['./payment-options.page.scss'],
})
export class PaymentOptionsPage implements OnInit {
  creditToggle:boolean;
  botaoCredit: boolean = false;

  boletoToggle: boolean;
  botaoBoleto: boolean = false;


  card = {
    card_number: '4111111111111111',
    card_holder_name: 'abc',
    card_expiration_date: '1225',
    card_cvv: '123',
  };
  @ViewChild('mes') mes;
  @ViewChild('ano') ano;

  @ViewChild('firstCard') firstCard;
  @ViewChild('secondCard') secondCard;
  @ViewChild('thirdCard') thirdCard;
  @ViewChild('fourthCard') fourthCard;

  @ViewChild('name') name;

  total=0
  parcelamiento: any
  dateFecha:any
  customActionSheetOptions: any = {
    header: 'Selecione uma opção', 
  };
  birthday:any;
  cpf:any;
  idcart:any;
  tipo:any;
  phone:any;
 
  constructor(private modal: ModalController, public server:ServerService,
    public navParams:NavParams,
    public utils: UtilsService,)
  {
    this.total=this.navParams.get('total');
    this.idcart=this.navParams.get('idcart');
    this.tipo=this.navParams.get('tipo');
    
    this.parcelamientoCard()
    this.fecha()
 
  }

  ngOnInit()
  {
  }

  FunctionCreditToggle()
  {
    this.creditToggle = !this.creditToggle;
    this.botaoCredit = !this.botaoCredit;
    this.boletoToggle = false;
    this.botaoBoleto = false;
  }


  BoletoToggle()
  {
    this.boletoToggle = !this.boletoToggle;
    this.botaoBoleto = !this.botaoBoleto;
    this.creditToggle = false;
    this.botaoCredit = false;
  }

  onChangeTime(e)
  {
    if(e.length === 2){
      this.ano.setFocus();
    }
  }

  onChangeAno(e)
  {
    if(e.length === 4){
      this.name.setFocus();
    }
  }

  onChangeFirst(e)
  {
    if(e.length === 4){
      this.secondCard.setFocus();
    }
  }

  onChangeSecond(e)
  {
    if(e.length === 4){
      this.thirdCard.setFocus();
    }
  }

  onChangeThird(e)
  {
    if(e.length === 4){
      this.fourthCard.setFocus();
    }
  }


  dismissModal()
  {
  this.modal.dismiss();
  }
  
  async HashCard()
    {
      pagarme.client.connect({ encryption_key: 'ek_test_CUKvSbmSs4jvDSfeejgZdu0M1YikU0' })
    .then(client => client.security.encrypt(this.card))
    .then(card_hash => console.log('card Hash', card_hash));
    }


  async parcelamientoCard(){

    this.server.parcelamiento({'amount':this.total}).then((data:any) => {

      this.parcelamiento=data.data
      console.log(this.parcelamiento)
    });
  }

  fecha(){
    var fecha = new Date();
    var dias = 7;
    this.dateFecha= fecha.setDate(fecha.getDate() + dias);
    console.info(fecha)
  }

  emitirBoleto(){
    let datos
    datos={
      'data':this.birthday,
      'cpf':this.cpf,
      'tipo':this.tipo,
      'id_carts':this.idcart,
      'phone':this.phone
    }
    console.log(datos)
    if(this.phone===null || this.phone===undefined){
      this.utils.showToast("insira o número do telefone")
    }
    else{

    this.server.boletos(datos).then((data:any) => {
      console.log(data)
    });
  }
  }
}

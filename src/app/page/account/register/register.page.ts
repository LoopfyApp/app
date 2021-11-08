import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  seleccion=0
  botoes = [
    {
      ativo: false,
      icon: '../../assets/button/filled.svg',
      title: 'Usuário',
      type:1
    },
    {
      ativo: false,
      icon: '../../assets/button/filled2.svg',
      title: 'Loja',
      type:2
    },
    {
      ativo: false,
      icon: '../../assets/button/superfill.svg',
      title: 'Veterinário',
      type:3
    },
    {
      ativo: false,
      icon: '../../assets/button/superfill2.svg',
      title: 'Serviço',
      type:4
    }
  ];

  constructor( private router: Router) { }

  ngOnInit() {
  }

  
  fabclick(botao){
    for (let item of this.botoes){
      item.ativo = false;
    }
    botao.ativo = true;
  
    this.seleccion=botao.type
  }

  registerUser(){
    if(this.seleccion==1){
      this.router.navigate(['/register/user'], {
        replaceUrl: true,
      });
    }
    else{
      this.router.navigate(['/register/comerce/'+this.seleccion]) 
    }

  }

}

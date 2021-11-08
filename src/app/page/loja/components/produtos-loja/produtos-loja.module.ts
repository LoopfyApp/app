import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosLojaComponent } from './produtos-loja.component';



@NgModule({
  declarations: [ProdutosLojaComponent],
  imports: [
    CommonModule
  ],
  exports: [ProdutosLojaComponent]
})
export class ProdutosLojaModule { }

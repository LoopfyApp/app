/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-product-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss'],
})
export class SubcategoryComponent implements OnInit {

  @Input() subcategorias;
  @Input() marcas;
  @Output() EmiteMarcas = new EventEmitter<number>();
  @Output() EmiteSubcategoria = new EventEmitter<number>();
  @Output() EmiteOrder = new EventEmitter<number>();
  selectItem: number=0;
  selectItemMarcas: number=0;
  selectFilter: boolean=true;
  constructor(public actionSheetController: ActionSheetController) { }

  ngOnInit() {}

  selectItems(x){
    if(this.selectFilter){
        this.selectItem=x;
        this.EmiteSubcategoria.emit(x);
      }
      else{
        this.selectItemMarcas=x;
        this.EmiteMarcas.emit(x);
      }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Produtos de filtro',
      cssClass: 'actionSheetClass',
      buttons: [{
        text: 'Menor preço',
        role: 'destructive',
        icon: 'arrow-down-outline',
        handler: () => {
          this.EmiteOrder.emit(0);
        }
      }, {
        text: 'Preço mais alto',
        icon: 'arrow-up-outline',
        handler: () => {
          this.EmiteOrder.emit(1);
        }
      }, {
        text: 'Sub-Categorias',
        icon: 'caret-forward-outline',
        handler: () => {
          this.selectFilter=true;
          this.selectItem=0;
          this.EmiteSubcategoria.emit(0);
        }
      }, {
        text: 'Marcas Registradas',
        icon: 'caret-forward-outline',
        handler: () => {
          this.selectFilter=false;
          this.selectItemMarcas=0;
          this.EmiteMarcas.emit(0);
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}

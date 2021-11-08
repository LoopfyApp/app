import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavController, NavParams, PopoverController } from '@ionic/angular';
import { Mascote } from 'src/app/models/animals.models';
import { ServerService } from 'src/app/services/server.service';
import { UtilsService } from 'src/app/services/utils.service';
import { BreedComponent } from '../breed/breed.component';
import { PhotoprofileComponent } from '../photoprofile/photoprofile.component';
import { SpeciesComponent } from '../species/species.component';

@Component({
  selector: 'components-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss'],
})
export class PetsComponent implements OnInit {

  @Input() modaloptions:boolean=false; 
  @Output() saveData = new EventEmitter<boolean>();

  PetsForm: FormGroup;
  DatosMascote:Mascote
  photo='/assets/button/boton_foto.svg'
  constructor(    
    public router: NavController,  
    public server:ServerService,
    private util:UtilsService, 
    private modal:ModalController,
    private formBuilder: FormBuilder,
    public navParams : NavParams,
    public popoverController: PopoverController) { 
    
      this.PetsForm = this.formBuilder.group({
        name: ['',Validators.required],
        species: ['',Validators.required],
        raza: ['',Validators.required],
        description: ['',Validators.required],
        id_raza: ['',Validators.required],
        id_species: ['',[Validators.required]],
        photo: [this.photo,[Validators.required]],
        }
      );

    }

  ngOnInit() {}


  ionViewWillEnter(){
    this.PetsForm.reset()
  }

  async  goToCamera(){
	  const modales = await this.modal.create({
      component: PhotoprofileComponent,
      mode:'ios'
    });
    modales.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data.data !== null) {
        this.photo=dataReturned.data.data
        
        this.PetsForm.controls["photo"].setValue(dataReturned.data.data)
      }
      else{
        this.photo='/assets/button/boton_foto.svg';
        this.PetsForm.controls["photo"].setValue(this.photo)
      }
    });
    return await modales.present();
  };

  async presentPopoverBreed(id) {
    const popover = await this.popoverController.create({
      component: BreedComponent,
      cssClass: 'mascote',
      mode:'ios',
      componentProps: {id_species: id},
      translucent: true
    });
    await popover.present();
  
    const { data } = await popover.onDidDismiss();
     if(data){
    this.PetsForm.controls["id_raza"].setValue(data.data.id)
    this.PetsForm.controls["raza"].setValue(data.data.name)}
  }
  
  
  async presentPopover() {
    const popover = await this.popoverController.create({
      component: SpeciesComponent,
      cssClass: 'mascote',
      mode:'ios',
      translucent: true
    });
    await popover.present();
  
    const { data } = await popover.onDidDismiss();
     if(data){
    this.PetsForm.controls["id_species"].setValue(data.data.id)
    this.PetsForm.controls["species"].setValue(data.data.name)
    this.presentPopoverBreed(data.data.id);}
  }


  async saveInfo(value){  
   
   
    this.DatosMascote=value;
    await this.util.showLoading('Carregando...');
    this.server.saveMascote(this.DatosMascote).then((response: any) => {
      this.util.dismissLoading();
      if(!this.modaloptions){
        this.alertinfo()
      }
      else{
        this.emit()
      }
    
    }, (error) => {
      this.util.dismissLoading();
      this.util.showToast(
        error.error && error.error.message
          ? error.error.message
          : 'Ocorreu um erro desconhecido, tente novamente'
      );
    })
  
  }

  alertinfo(){
    this.util.showAlertConfirmAction('Mensagem','Você quer adicionar outro animal de estimação?',"",['Não','Sim']).then(
      (data)=>{
        if(!data){
          this.PetsForm.reset()
          this.photo='/assets/button/boton_foto.svg';
        }
        else{
          this.saveData.emit(true);
        }
      }
    )
  }
  
  pular(){
    this.saveData.emit(true);
  }

  emit() {
    this.saveData.emit(true);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController, NavParams, PopoverController } from '@ionic/angular';
import { BreedComponent } from 'src/app/components/breed/breed.component';
import { PhotoprofileComponent } from 'src/app/components/photoprofile/photoprofile.component';
import { SpeciesComponent } from 'src/app/components/species/species.component';
import { Mascote } from 'src/app/models/animals.models';
import { AuthService } from 'src/app/services/auth.service';
import { ServerService } from 'src/app/services/server.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-perfilcomplete',
  templateUrl: './perfilcomplete.page.html',
  styleUrls: ['./perfilcomplete.page.scss'],
})
export class PerfilcompletePage implements OnInit {
  Infopets: Mascote;
  isLoadding: boolean = false;
  user: any;
  edit: boolean = false;
  title = 'Dados Pets';
  vectornew: any;
  vector: any;
  PetsForm: FormGroup;
  DatosMascote: Mascote;
  photo = '/assets/button/boton_foto.svg';

  customActionSheetOptions: any = {
    title: 'Seleccione Porte',
    translucent: true,
    cssClass: 'mascoteshet',
    mode: 'ios',
  };
  customActionSheetOptionsGenero: any = {
    title: 'Seleccione Gênero',
    translucent: true,
    cssClass: 'mascoteshet',
    mode: 'ios',
  };

  customActionSheetOptionsIdentification: any = {
    title: 'Microchip de Identificação',
    translucent: true,
    cssClass: 'mascoteshet',
    mode: 'ios',
  };

  customActionSheetOptionsCastrado: any = {
    title: 'Castrado',
    translucent: true,
    cssClass: 'mascoteshet',
    mode: 'ios',
  };

  customActionSheetOptionsVaccines: any = {
    title: 'Seleccione vaccines',
    translucent: true,
    cssClass: 'mascoteshet',
    mode: 'ios',
  };
  idUser=0
  constructor(
    private navParams: NavParams,
    private _modal: ModalController,
    public server: ServerService,
    public route: ActivatedRoute,
    public auth: AuthService,
    public router: Router,
    public navc: NavController,
    private util: UtilsService,
    private formBuilder: FormBuilder,
    public popoverController: PopoverController
  ) {
    this.PetsForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      species: ['', Validators.required],
      raza: ['', Validators.required],
      description: ['', Validators.required],
      id_raza: ['', Validators.required],
      id_species: ['', [Validators.required]],
      photo: [this.photo],
      birthday: [''],
      size: [''],
      genero: [''],
      castrated: [''],
      identification: [''],
      vaccines: [''],
    });
  }

  async ngOnInit() {
    this.selectMascote();
    this.idUser = await this.auth.usersId()
  }
  addinfocampo() {
    this.PetsForm.controls['id'].setValue(this.Infopets.id);
    this.PetsForm.controls['name'].setValue(this.Infopets.name);
    this.PetsForm.controls['species'].setValue(this.Infopets.species.name);
    this.PetsForm.controls['raza'].setValue(this.Infopets.breed.name);
    this.PetsForm.controls['description'].setValue(this.Infopets.description);
    this.PetsForm.controls['id_raza'].setValue(this.Infopets.breed.id);
    this.PetsForm.controls['id_species'].setValue(this.Infopets.species.id);
    this.PetsForm.controls['photo'].setValue(null);

    if (this.Infopets.birthday != null) {
      this.PetsForm.controls['birthday'].setValue(this.Infopets.birthday);
    }
    if (this.Infopets.size != null) {
      this.PetsForm.controls['size'].setValue(this.Infopets.size);
    }
    if (this.Infopets.genero != null) {
      this.PetsForm.controls['genero'].setValue(this.Infopets.genero);
    }
    if (this.Infopets.castrated != null) {
      this.PetsForm.controls['castrated'].setValue(this.Infopets.castrated);
    }
    if (this.Infopets.identification != null) {
      this.PetsForm.controls['identification'].setValue(
        this.Infopets.identification
      );
    }
    if (this.Infopets.vaccines != null) {
      this.PetsForm.controls['vaccines'].setValue(this.vector);
    }

    this.photo = this.Infopets.photo;
  }

  selectMascote() {
    this.server
      .getMascoteDetails(this.navParams.get('id_pets'))
      .then((info: any) => {
        this.Infopets = info.data;
        this.user =info.data.users
        if(this.Infopets.vaccines != null){
        this.datavacuna(this.Infopets.vaccines);
        }
        this.addinfocampo();
        this.isLoadding = true;
      })
      .catch((error) => {
        this.isLoadding = true;
      });
  }

  closeModal() {
    this._modal.dismiss();
  }

  async goToCamera() {
    const modales = await this._modal.create({
      component: PhotoprofileComponent,
      mode: 'ios',
    });
    modales.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.photo = dataReturned.data.data;

        this.PetsForm.controls['photo'].setValue(dataReturned.data.data);
      } else {
        //  this.photo='/assets/button/boton_foto.svg';
        // this.PetsForm.controls["photo"].setValue(this.photo)
      }
    });
    return await modales.present();
  }

  async presentPopoverBreed(id) {
    const popover = await this.popoverController.create({
      component: BreedComponent,
      cssClass: 'mascote',
      mode: 'ios',
      componentProps: { id_species: id },
      translucent: true,
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();
    if (data) {
      this.PetsForm.controls['id_raza'].setValue(data.data.id);
      this.PetsForm.controls['raza'].setValue(data.data.name);
    }
  }

  async presentPopover() {
    const popover = await this.popoverController.create({
      component: SpeciesComponent,
      cssClass: 'mascote',
      mode: 'ios',
      translucent: true,
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();
    if (data) {
      this.PetsForm.controls['id_species'].setValue(data.data.id);
      this.PetsForm.controls['species'].setValue(data.data.name);
      this.presentPopoverBreed(data.data.id);
    }
  }

  async saveInfo(value) {
    this.DatosMascote = value;
    await this.util.showLoading('Carregando...');
    this.server.saveMascote(this.DatosMascote).then(
      (response: any) => {
        this.util.dismissLoading();
        this.closeModal();
      },
      (error) => {
        this.util.dismissLoading();
        this.util.showToast(
          error.error && error.error.message
            ? error.error.message
            : 'Ocorreu um erro desconhecido, tente novamente'
        );
      }
    );
  }

  portepets(id) {
    switch (id) {
        case '1':
          return 'Toy - até 5kg';
          case '2':
            return 'Pequeno 6 - 10kg';
        case '3':
          return 'Médio  11 - 20kg';
        case '4':
          return 'Grande 21 - 40kg';
        case '5':
          return 'Gigante + 40kg';
    }
  }

  generopets(id) {
    switch (id) {
      case '1':
        return 'Fêmea';
      case '2':
        return 'Macho';
    }
  }

  sinpets(id) {
    switch (id) {
      case '1':
        return 'Sim';
      case '2':
        return 'Não';
    }
  }

  datavacuna(dataVacuna) {
    var text = dataVacuna;
    this.vector = text.split(',');
  }

  Vaccinespets(id) {
    switch (id) {
      case '1':
        return 'Antirabica';
      case '2':
        return 'V8';
      case '3':
        return 'V10';
      case '4':
        return 'Contra a giardíase';
      case '5':
        return 'Contra a gripe canina';
    }
  }

  CalculateAge(): number {
    if (this.Infopets.birthday) {
        let timeDiff = Math.abs(Date.now() - <any>new Date(this.Infopets.birthday));
        return Math.ceil((timeDiff / (1000 * 3600 * 24)) / 365);
    } else {
        return 0;
    }
}

async delete(id){
console.log(id)

 this.util
.showAlertConfirmAction(
  'Cancelar',
  'Você deseja apagar Pets?',
  '',
  ['Não', 'Sim']
)
.then((data) => {
  if (!data) {
    this.util.showLoading('Carregando...');
 
    this.server
      .deletepets({'idPets':id})
      .then((datos: any) => {
  
        this.util.dismissLoading();
        this.closeModal();
        this.navc.navigateBack("home/red")
      })
      .catch((error) => {
        this.util.dismissLoading();
        this.util.showToast(
          error.error && error.error.message
            ? error.error.message
            : 'Ocorreu um erro desconhecido, tente novamente'
        );
      });
  }
});

}
}

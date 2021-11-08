import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PhotoprofileComponent } from './photoprofile/photoprofile.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { PetsComponent } from './pets/pets.component';
import { BreedComponent } from './breed/breed.component';
import { SpeciesComponent } from './species/species.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { PostsComponent } from './posts/posts.component';
import { NewpostsComponent } from './newposts/newposts.component';
import { Ionic4EmojiPickerModule } from 'ionic4-emoji-picker';
import { LoadingsComponent } from './loadings/loadings.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { AccordionComponent } from './accordion/accordion.component';
import { ListpetsComponent } from './listpets/listpets.component';
import { ProductcardComponent } from './products/productcard/productcard.component';
import { SubcategoryComponent } from './products/subcategory/subcategory.component';
import { ProductinfoComponent } from './products/productinfo/productinfo.component';

@NgModule({
  declarations: [
    ListpetsComponent,
    AccordionComponent,
    LoadingsComponent,
    PhotoprofileComponent,
    PetsComponent,
    BreedComponent,
    SpeciesComponent,
    HeaderComponent,
    PostsComponent,
    NewpostsComponent,
    SpinnerComponent,
    ProductcardComponent,
    SubcategoryComponent,
    ProductinfoComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    ImageCropperModule,
    Ng2SearchPipeModule,
    Ionic4EmojiPickerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ListpetsComponent,
    AccordionComponent,
    LoadingsComponent,
    PhotoprofileComponent,
    PetsComponent,
    BreedComponent,
    SpeciesComponent,
    HeaderComponent,
    PostsComponent,
    NewpostsComponent,
    SpinnerComponent,
    ProductcardComponent,
    SubcategoryComponent,
    ProductinfoComponent
  ],
  entryComponents: [
    ListpetsComponent,
    AccordionComponent,
    LoadingsComponent,
    PhotoprofileComponent,
    PetsComponent,
    BreedComponent,
    SpeciesComponent,
    HeaderComponent,
    PostsComponent,
    NewpostsComponent,
    SpinnerComponent,
    ProductcardComponent,
    SubcategoryComponent,
    ProductinfoComponent
  ],
})
export class ComponentsModule {}

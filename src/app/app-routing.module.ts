import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/red',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./page/account/login/login.module').then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./page/account/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'register/user',
    loadChildren: () =>
      import('./page/account/userregister/userregister.module').then(
        (m) => m.UserregisterPageModule
      ),
  },
  {
    path: 'register/validations',
    loadChildren: () =>
      import('./page/account/codevalidation/codevalidation.module').then(
        (m) => m.CodevalidationPageModule
      ),
  },
  {
    path: 'register/pets',
    loadChildren: () =>
      import('./page/account/pets/pets.module').then((m) => m.PetsPageModule),
    canActivate: [AuthGuard],
  },

  {
    path: 'sharedmascote',
    loadChildren: () =>
      import('./components/sharedmascote/sharedmascote.module').then(
        (m) => m.SharedmascotePageModule
      ),
  },
  {
    path: 'register/comerce/:id',
    loadChildren: () =>
      import('./page/account/usercomerce/usercomerce.module').then(
        (m) => m.UsercomercePageModule
      ),
  },
  {
    path: 'post-details/:id',
    loadChildren: () =>
      import('./page/red/post-details/post-details.module').then(
        (m) => m.PostDetailsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'configurations',
    loadChildren: () =>
      import('./page/configurations/configurations.module').then(
        (m) => m.ConfigurationsPageModule
      ),
  },
  {
    path: 'servicos-loja',
    loadChildren: () =>
      import('./page/loja/components/servicos-loja/servicos-loja.module').then(
        (m) => m.ServicosLojaPageModule
      ),
  },
  {
    path: 'veterinary-loja',
    loadChildren: () =>
      import(
        './page/loja/components/veterinary-loja/veterinary-loja.module'
      ).then((m) => m.VeterinaryLojaPageModule),
  },
  {
    path: 'perfil-loja-complete',
    loadChildren: () =>
      import(
        './page/loja/perfil-loja-complete/perfil-loja-complete.module'
      ).then((m) => m.PerfilLojaCompletePageModule),
  },
  {
    path: 'reset',
    loadChildren: () =>
      import('./page/account/reset/reset.module').then(
        (m) => m.ResetPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

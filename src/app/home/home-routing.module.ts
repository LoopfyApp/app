import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {


    path: '',
    component: HomePage,
    children: [
      {
        path: 'notifications',
        loadChildren: () => import('../page/notifications/notifications.module').then( m => m.NotificationsPageModule)
      },

      {
        path: 'listagenda',
        loadChildren: () => import('../page/services/agenda/agenda.module').then( m => m.AgendaPageModule)
      },

      {
        path: 'compras',
        loadChildren: () => import('../page/store/compras/compras.module').then( m => m.ComprasPageModule)
      },
      {
        path: 'red',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../page/red/red/red.module').then((m) => m.RedPageModule),
          }, 
          {
            path: 'pets/profile/:id',
            loadChildren: () => import('../page/pets/profile/profile.module').then( m => m.ProfilePageModule)
          },
          {
            path: 'pets/perfilcomplete/:id',
            loadChildren: () => import('../page/pets/perfilcomplete/perfilcomplete.module').then( m => m.PerfilcompletePageModule)
          },
          {
            path: 'loja/perfil-loja/:id',
            loadChildren: () => import('../page/loja/perfil-loja/perfil-loja.module').then( m => m.PerfilLojaPageModule)
          },
        ],
      },
      
      {
        path: 'confirmationcart/:options',
        loadChildren: () =>
          import('../page/veterinary/additemscart/additemscart.module').then(
            (m) => m.AdditemscartPageModule
          ),
      },
      {
        path: 'checkoutcart',
        loadChildren: () =>
          import('../page/checkoutcart/checkoutcart.module').then(
            (m) => m.CheckoutcartPageModule
          ),
      },
      {
        path: 'services',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../page/services/services/services.module').then(
                (m) => m.ServicesPageModule
              ),
          },
          {
            path: 'listshop/:id/:categoria',
            loadChildren: () =>
              import('../page/services/listshop/listshop.module').then(
                (m) => m.ListshopPageModule
              ),
          },
          {
            path: 'mascote/:id/:categoria/:store',
            loadChildren: () =>
              import('../page/services/mascote/mascote.module').then(
                (m) => m.MascotePageModule
              ),
          },
          {
            path: 'listservices/:id/:categoria/:store/:idpets',
            loadChildren: () =>
              import('../page/services/listservices/listservices.module').then(
                (m) => m.ListservicesPageModule
              ),
          },
          {
            path: 'calendarservices/:id/:categoria/:store/:idpets/:idservice',
            loadChildren: () =>
              import(
                '../page/services/calendarservices/calendarservices.module'
              ).then((m) => m.CalendarservicesPageModule),
          },

        ],
      },

      {
        path: 'veterinary',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../page/veterinary/veterinary/veterinary.module').then(
                (m) => m.VeterinaryPageModule
              ),
          },
          {
            path: 'listshop/:id/:categoria',
            loadChildren: () =>
              import('../page/veterinary/listshop/listshop.module').then(
                (m) => m.ListshopPageModule
              ),
          },
          {
            path: 'mascote/:id/:categoria/:store',
            loadChildren: () =>
              import('../page/veterinary/mascote/mascote.module').then(
                (m) => m.MascotePageModule
              ),
          },
          {
            path: 'listservices/:id/:categoria/:store/:idpets',
            loadChildren: () =>
              import(
                '../page/veterinary/listservices/listservices.module'
              ).then((m) => m.ListservicesPageModule),
          },
          {
            path: 'calendarservices/:id/:categoria/:store/:idpets/:idservice',
            loadChildren: () =>
              import(
                '../page/veterinary/calendarservices/calendarservices.module'
              ).then((m) => m.CalendarservicesPageModule),
          },
 
        ],
      },

      {
        path: 'product',
        children: [
          {
            path: 'store',
            loadChildren: () =>
              import('../page/store/store/store.module').then(
                (m) => m.StorePageModule
              ),
          },
          {
            path: '',
            loadChildren: () => import('../page/store/product/product.module').then( m => m.ProductPageModule)
          }, 
          {
            path: 'details/:spcecies/:categoria',
            loadChildren: () => import('../page/store/product-details/product-details.module').then( m => m.ProductDetailsPageModule)
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}

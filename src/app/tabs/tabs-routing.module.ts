import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'main',
        children: [
          {
            path: '',
            loadChildren: () => import('../main/main.module').then(m => m.MainPageModule)
          },
          {
            path: 'cardinside',
            loadChildren: () => import('../card-inside/card-inside.module').then(m => m.CardInsidePageModule)
          },
        ]
      },
      {
        path: 'main2',
        loadChildren: () => import('../main/main.module').then(m => m.MainPageModule)
      },
      {
        path: 'cardinside',
        loadChildren: () => import('../card-inside/card-inside.module').then(m => m.CardInsidePageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../search/search.module').then(m => m.SearchPageModule)
      },
      {
        path: 'statement',
        loadChildren: () => import('../statement/statement.module').then(m => m.StatementPageModule)
      },
      {
        path: 'myelitelife',
        loadChildren: () => import('../myelitelife/myelitelife.module').then(m => m.MyelitelifePageModule)
      },
      {
        path: 'address',
        loadChildren: () => import('../address/address.module').then(m => m.AddressPageModule)
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
          },
          {
            path: 'address',
            loadChildren: () => import('../address/address.module').then(m => m.AddressPageModule)
          },
          {
            path: 'statement',
            loadChildren: () => import('../statement/statement.module').then(m => m.StatementPageModule)
          },
          {
            path: 'privacy',
            loadChildren: () => import('../privacy/privacy.module').then(m => m.PrivacyPageModule)
          },
          {
            path: 'myelitelife',
            loadChildren: () => import('../myelitelife/myelitelife.module').then(m => m.MyelitelifePageModule)
          },
          {
            path: 'trmcndt',
            loadChildren: () => import('../trmcndt/trmcndt.module').then( m => m.TrmcndtPageModule)
          }
        ]
      },
      {
        path: 'privacy',
        loadChildren: () => import('../privacy/privacy.module').then(m => m.PrivacyPageModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('../chat/chat.module').then(m => m.ChatPageModule)
      },
      {
        path: 'trmcndt',
        loadChildren: () => import('../trmcndt/trmcndt.module').then( m => m.TrmcndtPageModule)
      },

      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonUserLayoutComponent } from './layouts/common-user-layout/common-user-layout.component';

import { PublicationsPageComponent } from './pages/publications-page/publications-page.component';
import { MyPublicationsPageComponent } from './pages/my-publications-page/my-publications-page.component';
import { AddPublicationPageComponent } from './pages/add-publication-page/add-publication-page.component';
import { ConfigAccountPageComponent } from '../shared/pages/config-account-page/config-account-page.component';
import { TransactionsPageComponent } from './pages/transactions-page/transactions-page.component';
import { denyRoleGuard } from '../auth/guards/deny-role.guard';
import { authGuard } from '../auth/guards/auth.guard';
import { checkRoleGuard } from '../auth/guards/check-role.guard';
import { CurrenciesPageComponent } from './pages/currencies-page/currencies-page.component';
import { EditPublicationPageComponent } from './pages/edit-publication-page/edit-publication-page.component';
import { publicationByIdResolver } from './resolvers/publicationById.resolver';
import { transactionsResolver } from './resolvers/transactions.resolver';


const routes: Routes = [
  {
    path: '',
    component: CommonUserLayoutComponent,
    children: [
      {
        path: 'publications',
        title: 'Publicaciones',
        component: PublicationsPageComponent,
        data: { role: 'Admin' },
        canActivate: [denyRoleGuard]
      },
      {
        path: 'my-publications',
        title: 'Mis Publicaciones',
        component: MyPublicationsPageComponent,
        data: { role: 'Comun' },
        canActivate: [authGuard, checkRoleGuard]
      },
      {
        path: 'add-publication',
        title: 'Agregar Publicación',
        component: AddPublicationPageComponent,
        data: { role: 'Comun' },
        canActivate: [authGuard, checkRoleGuard]
      },
      {
        path: 'edit/:id',
        title: 'Editar Publicación',
        component: EditPublicationPageComponent,
        resolve: { publication: publicationByIdResolver },
        data: { role: 'Comun' },
        canActivate: [authGuard, checkRoleGuard]
      },
      {
        path: 'currencies',
        title: 'Divisas',
        component: CurrenciesPageComponent,
        data: { role: 'Comun' },
        canActivate: [authGuard, checkRoleGuard]
      },
      {
        path: 'config-account',
        title: 'Mi Cuenta',
        component: ConfigAccountPageComponent,
        data: { role: 'Comun' },
        canActivate: [authGuard, checkRoleGuard]
      },
      {
        path: 'transactions',
        title: 'Transacciones',
        component: TransactionsPageComponent,
        resolve: { transactions: transactionsResolver },
        data: { role: 'Comun' },
        canActivate: [authGuard, checkRoleGuard]
      },
      {
        path: '**',
        redirectTo: 'publications'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonUserRoutingModule { }

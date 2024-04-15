import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ReportedPublicationsPageComponent } from './pages/reported-publications-page/reported-publications-page.component';
import { AddAdminPageComponent } from './pages/add-admin-page/add-admin-page.component';
import { ConfigAccountPageComponent } from '../shared/pages/config-account-page/config-account-page.component';
import { ReviewPublicationsPageComponent } from './pages/review-publications-page/review-publications-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'publications',
        title: 'Publicaciones',
        component: ReviewPublicationsPageComponent
      },
      {
        path: 'reported-publications',
        title: 'Publicaciones Reportadas',
        component: ReportedPublicationsPageComponent
      },
      {
        path: 'add-admin',
        title: 'Agregar Admin',
        component: AddAdminPageComponent
      },
      {
        path: 'config-account',
        title: 'Mi Cuenta',
        component: ConfigAccountPageComponent
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
export class AdminRoutingModule { }

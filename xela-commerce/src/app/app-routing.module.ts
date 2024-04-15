import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import Error404PageComponent from './shared/pages/error404-page/error404-page.component';
import { authGuard } from './auth/guards/auth.guard';
import { checkRoleGuard } from './auth/guards/check-role.guard';
import { authRoutesGuard } from './auth/guards/auth-routes.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [authRoutesGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    data: { role: 'Admin' },
    canActivate: [authGuard, checkRoleGuard]
  },
  {
    path: 'common',
    loadChildren: () => import('./common-user/common-user.module').then(m => m.CommonUserModule),
  },
  {
    path: '404',
    component: Error404PageComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'common',
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SharedModule } from '../shared/shared.module';
import { ReportedPublicationsPageComponent } from './pages/reported-publications-page/reported-publications-page.component';
import { AddAdminPageComponent } from './pages/add-admin-page/add-admin-page.component';
import { ReviewPublicationsPageComponent } from './pages/review-publications-page/review-publications-page.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ReasonsPageComponent } from './pages/reasons-page/reasons-page.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    ReportedPublicationsPageComponent,
    AddAdminPageComponent,
    ReviewPublicationsPageComponent,
    ReasonsPageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { ConfigAccountPageComponent } from './pages/config-account-page/config-account-page.component';
import { SetProfilePictureComponent } from './components/set-profile-picture/set-profile-picture.component';
import { SetPasswordFormComponent } from './components/set-password-form/set-password-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SetUserDataFormComponent } from './components/set-user-data-form/set-user-data-form.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { PublicationCardComponent } from './components/publication-card/publication-card.component';



@NgModule({
  declarations: [
    ToolbarComponent,
    ConfigAccountPageComponent,
    SetProfilePictureComponent,
    SetPasswordFormComponent,
    SetUserDataFormComponent,
    SnackBarComponent,
    PublicationCardComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    ToolbarComponent,
    PublicationCardComponent
  ]
})
export class SharedModule { }

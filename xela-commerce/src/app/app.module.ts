import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideNativeDateAdapter } from '@angular/material/core';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth/interceptors/auth.interceptor';
import { AuthService } from './auth/services/auth.service';
import { PublicationService } from './shared/services/publication.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideNativeDateAdapter(),
    AuthService,
    PublicationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

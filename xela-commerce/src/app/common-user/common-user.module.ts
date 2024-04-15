import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonUserRoutingModule } from './common-user-routing.module';
import { CommonUserLayoutComponent } from './layouts/common-user-layout/common-user-layout.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { MyPublicationsPageComponent } from './pages/my-publications-page/my-publications-page.component';
import { PublicationsPageComponent } from './pages/publications-page/publications-page.component';
import { AddPublicationPageComponent } from './pages/add-publication-page/add-publication-page.component';
import { TransactionsPageComponent } from './pages/transactions-page/transactions-page.component';
import { CoinCardComponent } from './components/coin-card/coin-card.component';
import { AddQuetzalsComponent } from './components/add-quetzals/add-quetzals.component';
import { ExchangeCurrenciesComponent } from './components/exchange-currencies/exchange-currencies.component';
import { CurrenciesPageComponent } from './pages/currencies-page/currencies-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PackCeibasComponent } from './components/pack-ceibas/pack-ceibas.component';
import { PublicationFormComponent } from './components/publication-form/publication-form.component';
import { EditPublicationPageComponent } from './pages/edit-publication-page/edit-publication-page.component';



@NgModule({
  declarations: [
    CommonUserLayoutComponent,
    MyPublicationsPageComponent,
    PublicationsPageComponent,
    AddPublicationPageComponent,
    TransactionsPageComponent,
    CoinCardComponent,
    AddQuetzalsComponent,
    ExchangeCurrenciesComponent,
    CurrenciesPageComponent,
    PackCeibasComponent,
    PublicationFormComponent,
    EditPublicationPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    CommonUserRoutingModule,
    ReactiveFormsModule
  ],
})
export class CommonUserModule { }

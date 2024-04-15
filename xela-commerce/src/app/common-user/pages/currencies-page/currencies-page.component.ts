import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { Subscription } from 'rxjs';
import { Coin, Currency } from '../../interfaces/currency.interface';


@Component({
  selector: 'app-currencies-page',
  templateUrl: './currencies-page.component.html',
  styles: ``
})
export class CurrenciesPageComponent implements OnInit, OnDestroy {

  private currencyService = inject(CurrencyService);
  private subs?: Subscription;

  public coins: Coin[] = [];

  constructor() { }

  ngOnInit(): void {
    this.subs = this.currencyService.currency().subscribe((curr: Currency|null) => {
      if (curr) {
        this.coins = [
          {
            name: 'ceibas',
            value: curr.ceibas
          },
          {
            name: 'quetzales',
            value: curr.quetzals
          },
          {
            name: 'penalización',
            value: curr.penalization
          }
        ];
      }
    });
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }

}

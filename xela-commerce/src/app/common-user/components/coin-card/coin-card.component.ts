import { Component, Input, OnInit } from '@angular/core';
import { Coin } from '../../interfaces/currency.interface';

@Component({
  selector: 'common-coin-card',
  templateUrl: './coin-card.component.html',
  styles: ``
})
export class CoinCardComponent implements OnInit {

  @Input({ required: true }) public coin!: Coin;
  public currencyIcon?: string;
  public subTitle?: string;

  ngOnInit(): void {
      if (this.coin) {
        this.currencyIcon = `../../../../assets/${this.coin.name}.png`
        this.subTitle = this.returnSubTitle(this.coin.name);
      }
  }

  public returnSubTitle(coinName: string) {
    if (coinName === 'ceibas') {
      return 'Moneda del Sistema';
    } else if (coinName === 'quetzales') {
      return 'Moneda Local';
    } else {
      return 'Restriccion al Retirar';
    }
  }

}

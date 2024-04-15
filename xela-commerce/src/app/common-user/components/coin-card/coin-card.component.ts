import { Component, Input } from '@angular/core';
import { Coin } from '../../interfaces/currency.interface';

@Component({
  selector: 'common-coin-card',
  templateUrl: './coin-card.component.html',
  styles: ``
})
export class CoinCardComponent {

  @Input({ required: true }) public coin!: Coin;

  public returnDesc(coinName: string) {
    if (coinName === 'ceibas') {
      return 'La Ceiba es el pilar de este sistema, con ella podras realizar todo tipo de transacciones.';
    } else if (coinName === 'quetzales') {
      return 'El Quetzal es la moneda local, podras utilizarla para comprar "Ceibas".';
    } else {
      return 'Gasta esta cantidad de "Ceibas" antes de cambiarlas por Quetzales.';
    }
  }

}

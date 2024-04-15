import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { PackCeibas } from '../../interfaces/pack-ceibas.interface';
import { CurrencyService } from '../../services/currency.service';
import { Subscription } from 'rxjs';
import { Currency } from '../../interfaces/currency.interface';
import { showError, showSuccess } from '../../../shared/utilities/showSnackBar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'common-pack-ceibas',
  templateUrl: './pack-ceibas.component.html',
  styles: ``
})
export class PackCeibasComponent implements OnInit, OnDestroy {

  @Input({ required: true }) public pack!: PackCeibas;

  private snackBar = inject(MatSnackBar);
  private currencyService = inject(CurrencyService);
  private subs?: Subscription;
  public disabled: boolean = false;

  ngOnInit(): void {
    this.subs = this.currencyService.currency().subscribe((currency: Currency|null) => {
      if (currency) {
        this.disabled = this.pack.value >= currency.quetzals;
      }
    })
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }

  public onBuyCeibas() {
    this.currencyService.buyCeibas(this.pack.ceibas, this.pack.value).subscribe({
      next: () => showSuccess(this.snackBar, 'Ceibas adquiridas con exito.'),
      error: (err) => showError(this.snackBar, err)
    })
  }

}

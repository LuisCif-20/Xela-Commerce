import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { PackCeibas } from '../../interfaces/pack-ceibas.interface';
import { CurrencyService } from '../../services/currency.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Currency } from '../../interfaces/currency.interface';
import { showError, showSuccess } from '../../../shared/utilities/showSnackBar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'common-exchange-currencies',
  templateUrl: './exchange-currencies.component.html',
  styles: ``
})
export class ExchangeCurrenciesComponent implements OnInit, OnDestroy {

  private snackBar = inject(MatSnackBar);
  private formBuilder = inject(FormBuilder);
  private currencyService = inject(CurrencyService);
  private subs?: Subscription;
  private valueSub?: Subscription;
  public ceibas: number = 0;
  public quetzals: number = 0.0;

  public eqQuetzals: number = 0;
  public formC: FormGroup = this.formBuilder.group({
    ceibas: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]]
  })
  public packs: PackCeibas[] = [
    {
      name: 'Ceibita',
      value: 50.00,
      ceibas: 100
    },
    {
      name: 'Media Ceiba',
      value: 150.00,
      ceibas: 350
    },
    {
      name: 'Ceiba',
      value: 300.00,
      ceibas: 700
    }
  ];

  ngOnInit(): void {
    this.subs = this.currencyService.currency().subscribe((currency: Currency|null) => {
      if (currency) {
        this.ceibas = currency.ceibas - currency.penalization;
      }
    })
    this.valueSub = this.formC.get('ceibas')?.valueChanges.subscribe((value: number) => {
      this.quetzals = value * 3/5;
    })    
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
    this.valueSub?.unsubscribe();
  }

  onExChangeCurrencies() {
    if (this.formC.valid) {
      const ceibas: number = this.formC.get('ceibas')?.value;
      this.currencyService.exChangeCurrency(ceibas, this.quetzals).subscribe({
        next: () => showSuccess(this.snackBar, 'Quetzales recibidos con exito'),
        error: (err) => showError(this.snackBar, err)
      })
    }
  }

}

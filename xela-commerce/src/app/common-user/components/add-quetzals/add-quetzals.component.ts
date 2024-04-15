import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fullNamePattern } from '../../../shared/validators/patterns';
import { CurrencyService } from '../../services/currency.service';
import { showError, showSuccess } from '../../../shared/utilities/showSnackBar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'common-add-quetzals',
  templateUrl: './add-quetzals.component.html',
  styles: ``
})
export class AddQuetzalsComponent {

  private snackBar = inject(MatSnackBar);
  private formBuilder = inject(FormBuilder);
  private currencyService = inject(CurrencyService);

  public formAdd: FormGroup = this.formBuilder.group({
    card_numer: ['', [Validators.required, Validators.minLength(19), Validators.maxLength(19), Validators.pattern(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/)]],
    titular: ['', [Validators.required, Validators.pattern(fullNamePattern)]],
    expires: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/(2[2-9]|3[0-9]|4[0-9]|5[0-9])$/)]],
    cvv: ['', [Validators.required, Validators.maxLength(3), Validators.pattern(/^[0-9]{3}$/)]],
    quetzals: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
  }); 

  constructor() { }

  public keyUpEvent(numeros: HTMLInputElement): void {
    numeros.value = numeros.value.replace(/\s/g, '');
    numeros.value = numeros.value.replace(/([0-9]{4})/g, '$1 ');
    numeros.value = numeros.value.trim();
  }

  public onAddQuetzals() {
    if (this.formAdd.valid) {
      this.currencyService.addQuetzals(this.formAdd.get('quetzals')?.value).subscribe({
        next: () => showSuccess(this.snackBar, 'Quetzales agregados.'),
        error: (err) => console.log(err)
      })
    }
  }

}

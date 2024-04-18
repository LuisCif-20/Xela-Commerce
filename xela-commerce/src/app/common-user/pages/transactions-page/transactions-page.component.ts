import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, filter, switchMap, take } from 'rxjs';
import { Transaction } from '../../interfaces/transaction.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicationService } from '../../../shared/services/publication.service';
import { Publication } from '../../../shared/interfaces/publication.interface';
import { States } from '../../interfaces/state.enum';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/auth.interface';
import { showError, showErrorMsg, showSuccess } from '../../../shared/utilities/showSnackBar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrencyService } from '../../services/currency.service';
import { Currency } from '../../interfaces/currency.interface';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styles: ``
})
export class TransactionsPageComponent implements OnInit, OnDestroy {

  private formB = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private pubService = inject(PublicationService);
  private tranService = inject(TransactionService);
  private currService = inject(CurrencyService);

  private tranSub?: Subscription;
  private pubsSub?: Subscription;
  private controlSub?: Subscription;
  private authSub?: Subscription;
  private currSub?: Subscription;
  public transactions: Transaction[] = [];
  private user?: User;

  public publications: Publication[] = [];
  public publication?: Publication;
  public currencies?: Currency;
  public message: string = '';
  public tranForm: FormGroup = this.formB.group({
    code: ['', [Validators.required, Validators.min(10000000), Validators.max(99999999)]],
    amount: ['', [Validators.required, Validators.min(0), Validators.max(9999)]],
    receiving_user_id: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.authSub = this.authService.currentUser().subscribe((user) => {
      if (user) {
        this.user = user;
      }
    })
    this.currSub = this.currService.currency().subscribe((curr) => {
      if (curr) {
        this.currencies = curr;
        this.tranForm.get('amount')?.setValidators(Validators.max(this.currencies.ceibas));
      }
    })
    this.tranSub = this.activatedRoute.data.pipe(
      filter(({ transactions }) => transactions === true),
      take(1),
      switchMap(() => this.tranService.myTransactions())
    ).subscribe((transactions) => {
      this.transactions = transactions;
      console.log(this.transactions)
    });
    this.pubsSub = this.pubService.publications().subscribe((publications) => {
      this.publications = publications.filter(pub => pub.state = States.approved);
    })
    this.controlSub = this.tranForm.get('code')!.statusChanges.subscribe((status) => {
      if (status === 'VALID') {
        this.publication = this.searchPublication(this.tranForm.get('code')!.value);
        if (this.publication) {
          
          if (this.user!.user_name === this.publication.user.user_name) {
            if (this.publication.category.name === 'Venta') {
              showErrorMsg(this.snackBar, 'No puedes realizar esta accion.');
              this.tranForm.reset();
            } else {
              this.tranForm.get('receiving_user_id')!.enable();
            }
          } else {
            if (this.publication.category.name === 'Voluntariado') {
              showErrorMsg(this.snackBar, 'No puedes realizar esta accion.');
              this.tranForm.reset();
            } else if (this.publication.category.name === 'Compra') {
              showErrorMsg(this.snackBar, 'No puedes realizar esta accion.');
              this.tranForm.reset();
            } else {
              this.tranForm.get('receiving_user_id')!.disable();
              this.tranForm.patchValue({ receiving_user_id: this.publication.user.user_name })
              this.message = this.tranForm.get('receiving_user_id')?.value;
            }
          }
          if (this.publication.category.name === 'Voluntariado') {
            this.tranForm.get('amount')!.disable();
            this.tranForm.get('amount')!.setValue(0);
          } else {
            this.tranForm.get('amount')!.enable();
          }
        }
      } else {
        this.publication = undefined;
      }
    });
    
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
    this.tranSub?.unsubscribe();
    this.pubsSub?.unsubscribe();
    this.controlSub?.unsubscribe()
  }

  searchPublication(code: number): Publication|undefined {
    return this.publications.find((pub) => pub.code === code);
  }

  onTransfer() {
    if (this.publication && this.tranForm.valid && this.user) {
      const formData = new FormData();
      const data = this.tranForm.value;
      formData.append('amount', data['amount'] || '0');
      formData.append('receiving_user_id', this.message);
      formData.append('issuing_user_id', this.user.id.toString());
      formData.append('category_id', this.publication.category.id.toString());
      console.log(formData.get('receiving_user_id'))
      this.tranService.makeTransaction(this.publication.id, formData).subscribe({
        next: () => {
          this.currService.getCurrencies().subscribe();
          this.router.navigateByUrl('/common/currencies')
          showSuccess(this.snackBar, 'Transaccion Realizada con exito.')
        },
        error: () => showErrorMsg(this.snackBar, 'Error al procesar la trasaccion.')
      });
    }
  }

  returnPD(date: string) {
    return new Date(date).toISOString().split('T')[0];
  }

}

import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TransactionService } from '../services/transaction.service';
import { AuthService } from '../../auth/services/auth.service';
import { filter, switchMap, take, tap } from 'rxjs';

export const transactionsResolver: ResolveFn<boolean> = (route, state) => {
  const authService = inject(AuthService);
  const tranService = inject(TransactionService);
  return authService.currentUser().pipe(
    filter(user => user !== null),
    take(1),
    switchMap((user) => tranService.getTransactions(user!.id))
  );
};

import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { Transaction, TransactionsResponse } from '../interfaces/transaction.interface';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private readonly baseUrl = `${environment.API_URL}/transaction`;

  private httpC = inject(HttpClient);

  private _myTransactions = new BehaviorSubject<Transaction[]>([]);

  constructor() { }

  private processRequest(request: Observable<TransactionsResponse>): Observable<boolean> {
    return request.pipe(
      tap(({transactions}) => this._myTransactions.next(transactions)),
      map(() => true),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  private makeHeader(token: string): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  public getTransactions(user_id: number): Observable<boolean> {
    const url: string = `${this.baseUrl}/my-transactions/${user_id}`;
    const headers = this.makeHeader(localStorage.getItem('token')!);
    return this.processRequest(this.httpC.get<TransactionsResponse>(url, { headers }));
  }

  public makeTransaction(pub_id: number, body: FormData): Observable<boolean> {
    const url: string = `${this.baseUrl}/make-transaction/${pub_id}`;
    const headers = this.makeHeader(localStorage.getItem('token')!);
    return this.processRequest(this.httpC.post<TransactionsResponse>(url, body, { headers }));
  }

  public myTransactions(): Observable<Transaction[]> {
    return this._myTransactions.asObservable();
  }

}

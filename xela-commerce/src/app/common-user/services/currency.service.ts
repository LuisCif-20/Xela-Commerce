import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { Currency, CurrencyResponse } from '../interfaces/currency.interface';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private readonly baseUrl: string = `${environment.API_URL}/currency`;

  private httpClient = inject(HttpClient);
  private _currency: BehaviorSubject<Currency|null> = new BehaviorSubject<Currency|null>(null);

  constructor() { }

  private makeHeader(token: string): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  private processRequest(request: Observable<CurrencyResponse>): Observable<boolean> {
    return request.pipe(
      map(({currency}) => {
        this._currency.next(currency);
        return true;
      }),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  public getCurrencies(): Observable<boolean> {
    const url: string =  `${this.baseUrl}/my-currency`;
    const headers: HttpHeaders = this.makeHeader(localStorage.getItem('token')!);
    return this.processRequest(this.httpClient.get<CurrencyResponse>(url, { headers }));
  }

  public addQuetzals(quetzals: number): Observable<boolean> {
    const url: string = `${this.baseUrl}/update/${this._currency.value?.id}`;
    const headers: HttpHeaders = this.makeHeader(localStorage.getItem('token')!);
    const body = {
      quetzals: (parseFloat(quetzals.toString()) + parseFloat(this._currency.value!.quetzals.toString())),
    };
    return this.processRequest(this.httpClient.post<CurrencyResponse>(url, body, { headers }));
  }

  public buyCeibas(ceibas: number, quetzals: number): Observable<boolean> {
    const url: string = `${this.baseUrl}/update/${this._currency.value?.id}`;
    const headers: HttpHeaders = this.makeHeader(localStorage.getItem('token')!);
    const body = {
      quetzals: (parseFloat(this._currency.value!.quetzals.toString()) - parseFloat(quetzals.toString())),
      ceibas: (parseInt(ceibas.toString()) + parseInt(this._currency.value!.ceibas.toString()))
    };
    return this.processRequest(this.httpClient.post<CurrencyResponse>(url, body, { headers }));
  }

  public exChangeCurrency(ceibas: number, quetzals: number): Observable<boolean> {
    const url: string = `${this.baseUrl}/update/${this._currency.value?.id}`;
    const headers: HttpHeaders = this.makeHeader(localStorage.getItem('token')!);
    const body = {
      quetzals: (parseFloat(this._currency.value!.quetzals.toString()) + parseFloat(quetzals.toString())),
      ceibas: (parseInt(this._currency.value!.ceibas.toString()) - parseInt(ceibas.toString()))
    };
    return this.processRequest(this.httpClient.post<CurrencyResponse>(url, body, { headers }));
  }

  public currency(): Observable<Currency|null> {
    return this._currency.asObservable();
  }
}

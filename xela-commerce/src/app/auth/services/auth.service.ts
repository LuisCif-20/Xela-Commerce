import { Injectable, inject } from '@angular/core';
import { AuthResponse, User } from '../interfaces/auth.interface';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, catchError, map, of, throwError } from 'rxjs';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { showError, showSuccess } from '../../shared/utilities/showSnackBar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private snackBar = inject(MatSnackBar);
  private httpClient = inject(HttpClient);
  private readonly baseUrl: string = `${environment.API_URL}/user`;
  private _isLoggedIn: BehaviorSubject<AuthStatus> = new  BehaviorSubject<AuthStatus>(AuthStatus.checking);
  private _currentUser: BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null);

  constructor() {
    this.checkAuthStatus().subscribe({
      next: () => showSuccess(this.snackBar, 'Credenciales comprobadas.'),
      error: (err) => showError(this.snackBar, err)
    });
  }

  private setAuth(user: User, token?: string): boolean {
    this._currentUser.next(user);
    this._isLoggedIn.next(AuthStatus.authenticated);
    if (token) localStorage.setItem('token', token);
    return true;
  }

  private processRequest(request: Observable<AuthResponse>): Observable<boolean> {
    return request.pipe(
      map(({user, token}) => this.setAuth(user, token)),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  private makeHeader(token: string): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  public signIn(credentials: FormData): Observable<boolean> {
    const url = `${this.baseUrl}/sign-in`;
    return this.processRequest(this.httpClient.post<AuthResponse>(url, credentials));
  }

  public signUp(userData: FormData): Observable<boolean> {
    const url = `${this.baseUrl}/sign-up`;
    return this.processRequest(this.httpClient.post<AuthResponse>(url, userData));
  }

  public setInfo(info: FormData): Observable<boolean> {
    const body = {
      full_name: info.get('full_name'),
      birthdate: info.get('birthdate'),
      user_name: info.get('user_name')
    };
    const url:string = `${this.baseUrl}/update/${this._currentUser.value?.id}`;
    const headers: HttpHeaders = this.makeHeader(localStorage.getItem('token')!);
    return this.processRequest(this.httpClient.patch<AuthResponse>(url, body, { headers }));
  }

  public setPwd(pwds: FormData): Observable<boolean> {
    const body = {
      old_password: pwds.get('old_password'),
      password: pwds.get('password')
    };
    const url: string = `${this.baseUrl}/set-pwd/${this._currentUser.value?.id}`;
    const headers: HttpHeaders = this.makeHeader(localStorage.getItem('token')!);
    return this.processRequest(this.httpClient.patch<AuthResponse>(url, body, { headers }));
  }

  public setPfp(pfp: FormData): Observable<boolean> {
    const url: string = `${this.baseUrl}/set-pfp/${this._currentUser.value?.id}`;
    const headers: HttpHeaders = this.makeHeader(localStorage.getItem('token')!);
    return this.processRequest(this.httpClient.post<AuthResponse>(url, pfp, { headers }));
  }

  public logOut() {
    this._currentUser.next(null);
    this._isLoggedIn.next(AuthStatus.notAuthenticated);
    localStorage.removeItem('token');
  }

  public checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/my-data`;
    const token: string|null = localStorage.getItem('token');
    if (!token) {
      this.logOut();
      return of(false);
    }
    const headers: HttpHeaders = this.makeHeader(token);
    return this.httpClient.get<AuthResponse>(url, { headers }).pipe(
      map(({user}) => {
        return this.setAuth(user)
      }),
      catchError((error: HttpErrorResponse) => {
        this._isLoggedIn.next(AuthStatus.notAuthenticated);
        return throwError(() => error);
      })
    );
  }

  public isLoggedIn(): Observable<AuthStatus> {
    return this._isLoggedIn.asObservable();
  }

  public currentUser(): Observable<User|null> {
    return this._currentUser.asObservable();
  }

}

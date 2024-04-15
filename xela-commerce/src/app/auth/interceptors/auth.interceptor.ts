import { HttpClient, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { TokenResponse } from '../interfaces/auth.interface';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const httpClient = inject(HttpClient);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && error.error['reason'] === 'Token has expired.') {
        const currentToken: string = localStorage.getItem('token')!;
        const url: string = `${environment.API_URL}/user/refresh`;
        return httpClient.post<TokenResponse>(url, null, {
          headers: {
            Authorization: `Bearer ${currentToken}`
          }
        }).pipe(
          switchMap(({ token }) => {
            localStorage.setItem('token', token);
            const newReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            });
            return next(newReq);
          }),
          catchError((error: HttpErrorResponse) => throwError(() => error))
        );
      } 
      return throwError(() => error);
    })
  );
};

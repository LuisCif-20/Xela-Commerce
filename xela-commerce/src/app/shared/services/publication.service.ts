import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { Publication, PublicationResponse, PublicationsResponse } from '../interfaces/publication.interface';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private readonly baseUrl: string = `${environment.API_URL}/publication`;

  private httpClient =  inject(HttpClient);
  private _publications: BehaviorSubject<Publication[]> = new BehaviorSubject<Publication[]>([]);

  constructor() { }

  private makeHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  }

  private processRequest(request: Observable<PublicationsResponse>): Observable<boolean> {
    return request.pipe(
      map(({ publications }) => {
        this._publications.next(publications);
        return true;
      }),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  public getPublications(): Observable<boolean> {
    const url: string = `${this.baseUrl}/all`;
    return this.processRequest(this.httpClient.get<PublicationsResponse>(url));
  }

  public setState(pub_id: number, state: string): Observable<boolean> {
    const url: string = `${this.baseUrl}/set-state/${pub_id}`;
    const headers: HttpHeaders = this.makeHeader();
    return this.processRequest(this.httpClient.patch<PublicationsResponse>(url, {state}, {headers}));
  }

  public addPublicatino(formData: FormData): Observable<boolean> {
    const url: string = `${this.baseUrl}/create`;
    const headers: HttpHeaders = this.makeHeader();
    return this.processRequest(this.httpClient.post<PublicationsResponse>(url, formData, {headers}));
  }

  public editPublicatino(pub_id: number, formData: FormData): Observable<boolean> {
    const url: string = `${this.baseUrl}/update/${pub_id}`;
    const headers: HttpHeaders = this.makeHeader();
    return this.processRequest(this.httpClient.post<PublicationsResponse>(url, formData, {headers}));
  }

  public getPubById(id: string): Observable<Publication> {
    const url: string = `${this.baseUrl}/show/${id}`;
    const headers: HttpHeaders = this.makeHeader();
    return this.httpClient.get<PublicationResponse>(url, {headers}).pipe(
      map(({ publication }) => publication),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  public publications(): Observable<Publication[]|[]> {
    return this._publications.asObservable();
  }

}

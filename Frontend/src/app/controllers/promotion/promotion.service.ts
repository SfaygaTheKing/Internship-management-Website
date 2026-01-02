import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Promotion } from '../../models/promotion/promotion';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  private API = '';
  constructor(private http: HttpClient, private authService: AuthService) {
    this.API = environment.apiUrl + '/promotion/';
  }

  private _selectedPromotion!: Promotion;

  private _promotions!: Array<Promotion>;

  private headersProvider(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return headers;
  }

  public findByAnnee(annee: string): Observable<Promotion> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.get<Promotion>(this.API + annee, { headers });
  }

  public findAll(): Observable<Array<Promotion>> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.get<Array<Promotion>>(this.API, { headers });
  }

  public deleteByAnnee(annee: string): Observable<number> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.delete<number>(this.API + annee, { headers });
  }

  public save(): Observable<Promotion> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.post<Promotion>(this.API, this.selectedPromotion, {
      headers,
    });
  }

  public update(): Observable<Promotion> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.put<Promotion>(this.API, this.selectedPromotion, {
      headers,
    });
  }

  public get selectedPromotion(): Promotion {
    return this._selectedPromotion;
  }
  public set selectedPromotion(value: Promotion) {
    this._selectedPromotion = value;
  }
  public get promotions(): Array<Promotion> {
    return this._promotions;
  }
  public set promotions(value: Array<Promotion>) {
    this._promotions = value;
  }
}

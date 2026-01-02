import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Entreprise } from '../../models/entreprise/entreprise';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class EntrepriseService {
  private API = '';
  constructor(private http: HttpClient, private authService: AuthService) {
    this.API = environment.apiUrl + '/entreprise/';
  }

  private _selectedEntreprise!: Entreprise;

  private _entreprises!: Array<Entreprise>;

  private headersProvider(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return headers;
  }

  public findByNumero(numero: string): Observable<Entreprise> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.get<Entreprise>(this.API + numero, { headers });
  }

  public findAll(): Observable<Array<Entreprise>> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.get<Array<Entreprise>>(this.API, { headers });
  }

  public deleteByNumero(numero: string): Observable<number> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.delete<number>(this.API + numero, { headers });
  }

  public save(): Observable<Entreprise> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.post<Entreprise>(this.API, this.selectedEntreprise, {
      headers,
    });
  }

  public update(): Observable<number> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.put<number>(this.API, this.selectedEntreprise, {
      headers,
    });
  }

  public get selectedEntreprise(): Entreprise {
    return this._selectedEntreprise;
  }
  public set selectedEntreprise(value: Entreprise) {
    this._selectedEntreprise = value;
  }
  public get entreprises(): Array<Entreprise> {
    return this._entreprises;
  }
  public set entreprises(value: Array<Entreprise>) {
    this._entreprises = value;
  }
}

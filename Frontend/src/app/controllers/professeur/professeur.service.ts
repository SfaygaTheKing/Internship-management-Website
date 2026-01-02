import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Professeur } from '../../models/professeur/professeur';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfesseurService {
  private API = '';
  constructor(private http: HttpClient, private authService: AuthService) {
    this.API = environment.apiUrl + '/professeur/';
  }

  private _selectedProfesseur!: Professeur;

  private _professeurs!: Array<Professeur>;

  private headersProvider(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return headers;
  }

  public findByNumero(numero: string): Observable<Professeur> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.get<Professeur>(this.API + numero, { headers });
  }

  public findAll(): Observable<Array<Professeur>> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.get<Array<Professeur>>(this.API, { headers });
  }

  public deleteByNumero(numero: string): Observable<number> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.delete<number>(this.API + numero, { headers });
  }

  public save(): Observable<Professeur> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.post<Professeur>(this.API, this.selectedProfesseur, {
      headers,
    });
  }

  public update(passwordChanged: boolean): Observable<number> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.put<number>(
      this.API + passwordChanged,
      this.selectedProfesseur,
      { headers }
    );
  }

  public get selectedProfesseur(): Professeur {
    return this._selectedProfesseur;
  }
  public set selectedProfesseur(value: Professeur) {
    this._selectedProfesseur = value;
  }
  public get professeurs(): Array<Professeur> {
    return this._professeurs;
  }
  public set professeurs(value: Array<Professeur>) {
    this._professeurs = value;
  }
}

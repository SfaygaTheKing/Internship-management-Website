import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Tuteur } from '../../models/tuteur/tuteur';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TuteurService {
  private API = '';
  constructor(private http: HttpClient, private authService: AuthService) {
    this.API = environment.apiUrl + '/tuteur/';
  }

  private _selectedTuteur!: Tuteur;

  private _tuteurs!: Array<Tuteur>;

  private headersProvider(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return headers;
  }

  public findByNumero(numero: string): Observable<Tuteur> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.get<Tuteur>(this.API + numero, { headers });
  }

  public findAll(): Observable<Array<Tuteur>> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.get<Array<Tuteur>>(this.API, { headers });
  }

  public deleteByNumero(numero: string): Observable<number> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.delete<number>(this.API + numero, { headers });
  }

  public save(): Observable<Tuteur> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.post<Tuteur>(this.API, this.selectedTuteur, { headers });
  }

  public update(): Observable<Tuteur> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.put<Tuteur>(this.API, this.selectedTuteur, { headers });
  }

  public get selectedTuteur(): Tuteur {
    return this._selectedTuteur;
  }
  public set selectedTuteur(value: Tuteur) {
    this._selectedTuteur = value;
  }
  public get tuteurs(): Array<Tuteur> {
    return this._tuteurs;
  }
  public set tuteurs(value: Array<Tuteur>) {
    this._tuteurs = value;
  }
}

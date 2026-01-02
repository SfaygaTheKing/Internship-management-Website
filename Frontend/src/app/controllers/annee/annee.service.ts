import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Annee } from '../../models/annee/annee';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AnneeService {
  private API = '';
  constructor(private http: HttpClient, private authService: AuthService) {
    this.API = environment.apiUrl + '/annee/';
  }
  private _selectedAnnee!: Annee;

  private _annees!: Array<Annee>;

  private headersProvider(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return headers;
  }

  public findByAnnee(annee: string): Observable<Annee> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.get<Annee>(this.API + annee, { headers });
  }

  public findAll(): Observable<Array<Annee>> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.get<Array<Annee>>(this.API, { headers });
  }

  public deleteByAnnee(annee: string): Observable<number> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.delete<number>(this.API + annee, { headers });
  }

  public save(): Observable<Annee> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.post<Annee>(this.API, this.selectedAnnee, { headers });
  }

  public update(): Observable<number> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.put<number>(this.API, this.selectedAnnee, { headers });
  }

  public get selectedAnnee(): Annee {
    return this._selectedAnnee;
  }
  public set selectedAnnee(value: Annee) {
    this._selectedAnnee = value;
  }
  public get annees(): Array<Annee> {
    return this._annees;
  }
  public set annees(value: Array<Annee>) {
    this._annees = value;
  }
}

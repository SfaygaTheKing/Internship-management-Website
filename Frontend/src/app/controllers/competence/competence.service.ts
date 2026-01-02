import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Competence } from '../../models/competence/competence';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CompetenceService {
  private API = '';
  constructor(private http: HttpClient, private authService: AuthService) {
    this.API = environment.apiUrl + '/competence/';
  }

  private _selectedCompetence!: Competence;

  private _competences!: Array<Competence>;

  private headersProvider(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return headers;
  }

  public findByCode(code: string): Observable<Competence> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.get<Competence>(this.API + 'code/' + code, { headers });
  }

  public findByLibelle(libelle: string): Observable<Competence> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.get<Competence>(this.API + 'libelle/' + libelle, {
      headers,
    });
  }

  public findAll(): Observable<Array<Competence>> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.get<Array<Competence>>(this.API, { headers });
  }

  public deleteByCode(code: string): Observable<number> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.delete<number>(this.API + code, { headers });
  }

  public save(): Observable<Competence> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.post<Competence>(this.API, this.selectedCompetence, {
      headers,
    });
  }

  public update(): Observable<number> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.put<number>(this.API, this.selectedCompetence, {
      headers,
    });
  }

  public get selectedCompetence(): Competence {
    return this._selectedCompetence;
  }
  public set selectedCompetence(value: Competence) {
    this._selectedCompetence = value;
  }

  public get competences(): Array<Competence> {
    return this._competences;
  }
  public set competences(value: Array<Competence>) {
    this._competences = value;
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { CompetenceRequise } from '../../models/competenceRequise/competence-requise';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CompetenceRequiseService {
  private API = '';
  constructor(private http: HttpClient, private authService: AuthService) {
    this.API = environment.apiUrl + '/competenceRequise/';
  }

  private _selectedCompetenceRequise!: CompetenceRequise;

  private _competencesRequises!: Array<CompetenceRequise>;

  private headersProvider(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return headers;
  }

  public findByCompetenceCodeAndTypeStageType(
    code: string,
    type: string
  ): Observable<CompetenceRequise> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.get<CompetenceRequise>(this.API + code + '/' + type, {
      headers,
    });
  }

  public findAll(): Observable<Array<CompetenceRequise>> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.get<Array<CompetenceRequise>>(this.API, { headers });
  }

  public deleteByCompetenceCodeAndTypeStageType(
    code: string,
    type: string
  ): Observable<void> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.delete<void>(this.API + code + '/' + type, { headers });
  }

  public save(): Observable<CompetenceRequise> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.post<CompetenceRequise>(
      this.API,
      this.selectedCompetenceRequise,
      { headers }
    );
  }

  public update(): Observable<CompetenceRequise> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.put<CompetenceRequise>(
      this.API,
      this.selectedCompetenceRequise
    );
  }

  public get selectedCompetenceRequise(): CompetenceRequise {
    return this._selectedCompetenceRequise;
  }
  public set selectedCompetenceRequise(value: CompetenceRequise) {
    this._selectedCompetenceRequise = value;
  }
  public get competencesRequises(): Array<CompetenceRequise> {
    return this._competencesRequises;
  }
  public set competencesRequises(value: Array<CompetenceRequise>) {
    this._competencesRequises = value;
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { DureeStage } from '../../models/dureeStage/duree-stage';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DureeStageService {
  private API = '';
  constructor(private http: HttpClient, private authService: AuthService) {
    this.API = environment.apiUrl + '/dureeStage/';
  }

  private _selectedDureeStage!: DureeStage;

  private _dureesStage!: Array<DureeStage>;

  private headersProvider(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return headers;
  }

  public findByAnneeAnneeAndTypeStageType(
    annee: string,
    type: string
  ): Observable<DureeStage> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.get<DureeStage>(this.API + annee + '/' + type, {
      headers,
    });
  }

  public findAll(): Observable<Array<DureeStage>> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.get<Array<DureeStage>>(this.API, { headers });
  }

  public deleteByAnneeAnneeAndTypeStageType(
    annee: string,
    type: string
  ): Observable<void> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.delete<void>(this.API + annee + '/' + type, { headers });
  }

  public save(): Observable<DureeStage> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.post<DureeStage>(this.API, this.selectedDureeStage, {
      headers,
    });
  }

  public update(): Observable<DureeStage> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.put<DureeStage>(this.API, this.selectedDureeStage, {
      headers,
    });
  }

  public get selectedDureeStage(): DureeStage {
    return this._selectedDureeStage;
  }
  public set selectedDureeStage(value: DureeStage) {
    this._selectedDureeStage = value;
  }
  public get dureesStage(): Array<DureeStage> {
    return this._dureesStage;
  }
  public set dureesStage(value: Array<DureeStage>) {
    this._dureesStage = value;
  }
}

import { AuthService } from './../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Stage } from '../../models/stage/stage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StageService {
  private API = '';
  constructor(private http: HttpClient, private authService: AuthService) {
    this.API = environment.apiUrl + '/stage/';
  }

  private _selectedStage!: Stage;

  private _stages!: Array<Stage>;

  private headersProvider(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return headers;
  }

  public findByNumero(numero: string): Observable<Stage> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.get<Stage>(this.API + numero, { headers });
  }

  public findAll(): Observable<Array<Stage>> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.get<Array<Stage>>(this.API, { headers });
  }

  public deleteByNumero(numero: string): Observable<void> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.delete<void>(this.API + numero, { headers });
  }

  public save(): Observable<Stage> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.post<Stage>(this.API, this.selectedStage, { headers });
  }

  public update(): Observable<Stage> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.put<Stage>(this.API, this.selectedStage, { headers });
  }

  public get selectedStage(): Stage {
    return this._selectedStage;
  }
  public set selectedStage(value: Stage) {
    this._selectedStage = value;
  }
  public get stages(): Array<Stage> {
    return this._stages;
  }
  public set stages(value: Array<Stage>) {
    this._stages = value;
  }
}

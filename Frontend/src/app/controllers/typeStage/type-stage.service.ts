import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { TypeStage } from '../../models/typeStage/type-stage';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TypeStageService {
  private API = '';
  constructor(private http: HttpClient, private authService: AuthService) {
    this.API = environment.apiUrl + '/typeStage/';
  }

  private _selectedTypeStage!: TypeStage;

  private _typesStage!: Array<TypeStage>;

  private headersProvider(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return headers;
  }

  public findByType(type: string): Observable<TypeStage> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.get<TypeStage>(this.API + type, { headers });
  }

  public findAll(): Observable<Array<TypeStage>> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.get<Array<TypeStage>>(this.API, { headers });
  }

  public deleteByType(type: string): Observable<number> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.delete<number>(this.API + type, { headers });
  }

  public save(): Observable<TypeStage> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.post<TypeStage>(this.API, this.selectedTypeStage, {
      headers,
    });
  }

  public update(): Observable<number> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.put<number>(this.API, this.selectedTypeStage, { headers });
  }

  public get selectedTypeStage(): TypeStage {
    return this._selectedTypeStage;
  }
  public set selectedTypeStage(value: TypeStage) {
    this._selectedTypeStage = value;
  }
  public get typesStage(): Array<TypeStage> {
    return this._typesStage;
  }
  public set typesStage(value: Array<TypeStage>) {
    this._typesStage = value;
  }
}

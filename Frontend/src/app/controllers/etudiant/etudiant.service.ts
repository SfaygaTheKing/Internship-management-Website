import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Etudiant } from '../../models/etudiant/etudiant';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class EtudiantService {
  private API = '';
  constructor(private http: HttpClient, private authService: AuthService) {
    this.API = environment.apiUrl + '/etudiant/';
  }

  private _selectedEtudiant!: Etudiant;

  private _etudiants!: Array<Etudiant>;

  private headersProvider(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return headers;
  }

  public findByNumero(numero: string): Observable<Etudiant> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.get<Etudiant>(this.API + numero, { headers });
  }

  public findAll(): Observable<Array<Etudiant>> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.get<Array<Etudiant>>(this.API, { headers });
  }

  public deleteByNumero(numero: string): Observable<number> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.delete<number>(this.API + numero, { headers });
  }

  public save(): Observable<Etudiant> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.post<Etudiant>(this.API, this.selectedEtudiant, {
      headers,
    });
  }

  public update(): Observable<Etudiant> {
    const headers = this.headersProvider(this.authService.retrieveUser().token);
    return this.http.put<Etudiant>(this.API, this.selectedEtudiant, {
      headers,
    });
  }

  public get selectedEtudiant(): Etudiant {
    return this._selectedEtudiant;
  }
  public set selectedEtudiant(value: Etudiant) {
    this._selectedEtudiant = value;
  }
  public get etudiants(): Array<Etudiant> {
    return this._etudiants;
  }
  public set etudiants(value: Array<Etudiant>) {
    this._etudiants = value;
  }
}
